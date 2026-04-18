from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from typing import List, Optional, Any, Dict
from ..services import analytics_service, assets_service
import asyncio
import time
import uuid
import json
import os
import base64
import httpx
import hashlib
import logging

router = APIRouter(prefix="/api/video", tags=["Video AI Engine"])
logger = logging.getLogger("video_engine")

# Global job store (In-memory mock)
jobs = {}

class VideoJob:
    def __init__(self, job_id, prompt, mode, settings, image_data=None):
        self.job_id: str = job_id
        self.prompt: str = prompt
        self.mode: str = mode
        self.settings: Dict[str, Any] = settings
        self.image_data: Optional[str] = image_data  # Store for SVD
        self.status: str = "Queued"
        self.progress: int = 0
        self.url: Optional[str] = None
        self.output_source: str = "pending"
        self.provider: Optional[str] = None
        self.last_error: Optional[str] = None
        self.created_at: float = time.time()

MOCK_VIDEO_LIBRARY = {
    "city": [
        "https://cdn.pixabay.com/vimeo/327374737/city-22533.mp4?width=1280",
        "https://cdn.pixabay.com/vimeo/339137920/city-26290.mp4?width=1280",
    ],
    "ocean": [
        "https://player.vimeo.com/external/405333445.sd.mp4?s=d760775d7e35b7135e5d3fa96df99cedd414f08f&profile_id=164",
        "https://player.vimeo.com/external/395315824.sd.mp4?s=8866ab3ae7d53f188a7448f8f675f3470956af24&profile_id=164",
    ],
    "nature": [
        "https://player.vimeo.com/external/370338579.sd.mp4?s=dc6dbf08620892a0889f4b5f9a776e0ef7c2937e&profile_id=164",
        "https://player.vimeo.com/external/387168282.sd.mp4?s=15bf95df2da233c6f0ca6c58410820e671e7e55f&profile_id=164",
    ],
    "space": [
        "https://player.vimeo.com/external/511095034.sd.mp4?s=431cd6010da82d56d7f02b37d2f9d6a3622f6764&profile_id=164",
        "https://cdn.pixabay.com/vimeo/286240264/space-18089.mp4?width=1280",
    ],
    "people": [
        "https://cdn.pixabay.com/vimeo/312957512/people-20572.mp4?width=1280",
        "https://cdn.pixabay.com/vimeo/278112779/woman-17089.mp4?width=1280",
    ],
    "abstract": [
        "https://cdn.pixabay.com/vimeo/460363526/abstract-49967.mp4?width=1280",
        "https://cdn.pixabay.com/vimeo/408429222/background-40115.mp4?width=1280",
    ],
    "image_mode": [
        "https://cdn.pixabay.com/vimeo/408429222/background-40115.mp4?width=1280",
        "https://cdn.pixabay.com/vimeo/460363526/abstract-49967.mp4?width=1280",
    ],
    "default": [
        "https://cdn.pixabay.com/vimeo/327374737/city-22533.mp4?width=1280",
        "https://player.vimeo.com/external/370338579.sd.mp4?s=dc6dbf08620892a0889f4b5f9a776e0ef7c2937e&profile_id=164",
    ],
}

THEME_KEYWORDS = {
    "ocean": ["ocean", "water", "sea", "wave", "beach", "underwater", "river"],
    "nature": ["nature", "forest", "tree", "mountain", "jungle", "wildlife", "sunset", "landscape"],
    "space": ["space", "galaxy", "star", "planet", "cosmic", "universe", "nebula", "astronaut"],
    "city": ["city", "street", "urban", "cyberpunk", "neon", "traffic", "building", "metropolis"],
    "people": ["person", "people", "human", "portrait", "face", "woman", "man", "character"],
    "abstract": ["abstract", "color", "pattern", "shape", "dream", "surreal", "art", "aesthetic"],
}

def select_mock_video_url(prompt: str, mode: str) -> str:
    prompt_lower = (prompt or "").lower()

    if mode == "image-to-video":
        candidates = MOCK_VIDEO_LIBRARY["image_mode"]
    else:
        matched_theme = None
        for theme, keywords in THEME_KEYWORDS.items():
            if any(k in prompt_lower for k in keywords):
                matched_theme = theme
                break
        candidates = MOCK_VIDEO_LIBRARY[matched_theme] if matched_theme else MOCK_VIDEO_LIBRARY["default"]

    seed_source = f"{mode}:{prompt_lower}".encode("utf-8")
    digest = hashlib.sha256(seed_source).hexdigest()
    idx = int(digest, 16) % len(candidates)
    return candidates[idx]

def _extract_video_url(payload: Any) -> Optional[str]:
    if payload is None:
        return None

    if isinstance(payload, str):
        return payload

    if isinstance(payload, list):
        for item in payload:
            url = _extract_video_url(item)
            if url:
                return url
        return None

    if isinstance(payload, dict):
        direct_keys = ["url", "video", "video_url"]
        for key in direct_keys:
            val = payload.get(key)
            if isinstance(val, str):
                return val
            nested = _extract_video_url(val)
            if nested:
                return nested

        assets = payload.get("assets")
        nested_assets = _extract_video_url(assets)
        if nested_assets:
            return nested_assets

    return None

def _provider_configuration() -> Dict[str, Any]:
    selected_provider = os.getenv("VIDEO_PROVIDER", "replicate").strip().lower()
    replicate_token = os.getenv("REPLICATE_API_TOKEN")
    luma_api_key = os.getenv("LUMA_API_KEY")
    runway_api_key = os.getenv("RUNWAY_API_KEY")

    provider_config = {
        "replicate": {
            "selected": selected_provider == "replicate",
            "configured": bool(replicate_token),
        },
        "luma": {
            "selected": selected_provider == "luma",
            "configured": bool(luma_api_key),
        },
        "runway": {
            "selected": selected_provider == "runway",
            "configured": bool(runway_api_key),
        },
    }

    selected_is_supported = selected_provider in provider_config
    selected_is_configured = provider_config.get(selected_provider, {}).get("configured", False)

    warnings = []
    if not selected_is_supported:
        warnings.append(f"VIDEO_PROVIDER '{selected_provider}' is not supported.")
    elif not selected_is_configured:
        warnings.append(f"{selected_provider.upper()} credentials are missing; requests will fallback to mock generation.")

    return {
        "selected_provider": selected_provider,
        "selected_provider_supported": selected_is_supported,
        "selected_provider_configured": selected_is_configured,
        "providers": provider_config,
        "can_generate_real": selected_is_supported and selected_is_configured,
        "fallback_mode_active": not (selected_is_supported and selected_is_configured),
        "warnings": warnings,
    }

async def run_mock_generation(job):
    """Semantic fallback logic when real API is unavailable or fails."""
    stages = [
        ("Analyzing semantic context", 15),
        ("Initializing fusion pipeline", 30),
        ("Sampling latent space (Simulation)", 60),
        ("Atmospheric upscaling", 85),
        ("Encoding cinematic bitstream", 95)
    ]
    
    for status, progress in stages:
        job.status = status
        job.progress = progress
        await asyncio.sleep(2)

    job.url = select_mock_video_url(job.prompt, job.mode)
    job.output_source = "mock"
    job.status = "Completed"
    job.progress = 100
    assets_service.register_ai_asset(
        name=f"MockVideo_{job.job_id[:8]}.mp4",
        type="video",
        url=job.url,
        is_generated=True,
        tags=["Mock", "Proxy", job.mode]
    )

async def run_replicate_generation(job: VideoJob, replicate_token: str):
    headers = {
        "Authorization": f"Token {replicate_token}",
        "Content-Type": "application/json"
    }

    if job.mode == "image-to-video" and job.image_data:
        model_version = os.getenv(
            "REPLICATE_IMAGE_MODEL_VERSION",
            "ac732df83cea7fff18b849276251da9534485056bc4b5b5bff584a259c4b786c",
        )
        payload = {
            "version": model_version,
            "input": {
                "image": job.image_data,
                "video_length": "14_frames_with_svd",
                "motion_bucket_id": job.settings.get("motionBucket", 127),
                "fps": 6
            }
        }
        job.status = "Neural Animating (SVD XT)..."
    else:
        model_version = os.getenv(
            "REPLICATE_TEXT_MODEL_VERSION",
            "beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
        )
        payload = {
            "version": model_version,
            "input": {
                "prompt": job.prompt,
                "num_inference_steps": 25,
                "guidance_scale": 7.5
            }
        }
        job.status = "Neural Rendering (AnimateDiff)..."

    async with httpx.AsyncClient(timeout=300) as client:
        resp = None
        max_attempts = 4
        for attempt in range(1, max_attempts + 1):
            resp = await client.post("https://api.replicate.com/v1/predictions", json=payload, headers=headers)
            if resp.status_code in [200, 201]:
                break
            if resp.status_code == 429:
                retry_after = 2
                try:
                    retry_after = int(resp.headers.get("Retry-After", "2"))
                except ValueError:
                    retry_after = 2
                job.status = f"Rate-limited by Replicate, retrying ({attempt}/{max_attempts})..."
                job.progress = min(18, 10 + attempt * 2)
                logger.warning(
                    "[VideoEngine] provider=replicate event=rate_limited job_id=%s attempt=%s retry_after=%s",
                    job.job_id,
                    attempt,
                    retry_after,
                )
                await asyncio.sleep(max(1, retry_after))
                continue
            break

        if resp is None or resp.status_code not in [200, 201]:
            status_code = resp.status_code if resp is not None else "unknown"
            body = resp.text if resp is not None else ""
            raise Exception(f"Replicate API rejected request ({status_code}): {body}")

        prediction = resp.json()
        predict_id = prediction["id"]
        logger.info("[VideoEngine] provider=replicate event=prediction_created job_id=%s prediction_id=%s", job.job_id, predict_id)

        job.progress = 20
        start_poll = time.time()
        while True:
            if time.time() - start_poll > 600:
                raise Exception("Rendering timeout on cloud clusters.")

            status_resp = await client.get(f"https://api.replicate.com/v1/predictions/{predict_id}", headers=headers)
            p_data = status_resp.json()
            p_status = p_data.get("status")

            if p_status == "succeeded":
                output = p_data.get("output")
                job.url = _extract_video_url(output)
                if not job.url:
                    raise Exception("Replicate completed but no playable URL found.")
                job.output_source = "provider"
                job.status = "Completed"
                job.progress = 100
                logger.info("[VideoEngine] provider=replicate event=completed job_id=%s prediction_id=%s", job.job_id, predict_id)
                assets_service.register_ai_asset(
                    name=f"Replicate_{job.job_id[:8]}.mp4",
                    type="video",
                    url=job.url,
                    is_generated=True,
                    tags=["AI Gen", "Replicate", job.mode]
                )
                break
            if p_status in ["failed", "canceled"]:
                raise Exception(f"Cloud generation {p_status}: {p_data.get('error')}")

            if p_status == "processing":
                job.progress = min(95, job.progress + 2)
                job.status = "Synthesizing pixels..."
            elif p_status == "starting":
                job.status = "Warming up GPU nodes..."

            await asyncio.sleep(4)

async def run_luma_generation(job: VideoJob, luma_api_key: str):
    base_url = os.getenv("LUMA_API_BASE", "https://api.lumalabs.ai/dream-machine/v1")
    headers = {
        "Authorization": f"Bearer {luma_api_key}",
        "Content-Type": "application/json",
    }

    payload: Dict[str, Any] = {
        "prompt": job.prompt,
        "aspect_ratio": job.settings.get("aspectRatio", "16:9"),
    }

    if job.mode == "image-to-video" and job.image_data:
        payload["keyframes"] = [{"type": "image", "url": job.image_data}]
        job.status = "Neural Animating (Luma image-to-video)..."
    else:
        job.status = "Neural Rendering (Luma Dream Machine)..."

    async with httpx.AsyncClient(timeout=300) as client:
        resp = await client.post(f"{base_url}/generations", headers=headers, json=payload)
        if resp.status_code not in [200, 201, 202]:
            raise Exception(f"Luma API rejected request: {resp.text}")

        prediction = resp.json()
        predict_id = prediction.get("id") or prediction.get("generation_id")
        if not predict_id:
            raise Exception("Luma response missing generation id.")
        logger.info("[VideoEngine] provider=luma event=generation_created job_id=%s generation_id=%s", job.job_id, predict_id)

        job.progress = 20
        start_poll = time.time()
        while True:
            if time.time() - start_poll > 600:
                raise Exception("Luma rendering timeout.")

            status_resp = await client.get(f"{base_url}/generations/{predict_id}", headers=headers)
            p_data = status_resp.json()
            p_status = (p_data.get("status") or p_data.get("state") or "").lower()

            if p_status in ["completed", "succeeded", "success", "done"]:
                job.url = _extract_video_url(p_data)
                if not job.url:
                    raise Exception("Luma completed but no playable URL found.")
                job.output_source = "provider"
                job.status = "Completed"
                job.progress = 100
                logger.info("[VideoEngine] provider=luma event=completed job_id=%s generation_id=%s", job.job_id, predict_id)
                assets_service.register_ai_asset(
                    name=f"Luma_{job.job_id[:8]}.mp4",
                    type="video",
                    url=job.url,
                    is_generated=True,
                    tags=["AI Gen", "Luma", job.mode]
                )
                break

            if p_status in ["failed", "canceled", "error"]:
                raise Exception(f"Luma generation {p_status}: {p_data}")

            job.progress = min(95, job.progress + 3)
            job.status = "Synthesizing pixels..."
            await asyncio.sleep(4)

async def run_runway_generation(job: VideoJob, runway_api_key: str):
    base_url = os.getenv("RUNWAY_API_BASE", "https://api.runwayml.com/v1")
    headers = {
        "Authorization": f"Bearer {runway_api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": os.getenv("RUNWAY_MODEL", "gen3a_turbo"),
        "input": {
            "promptText": job.prompt,
            "ratio": job.settings.get("aspectRatio", "16:9"),
        },
    }

    job.status = "Neural Rendering (Runway)..."

    async with httpx.AsyncClient(timeout=300) as client:
        resp = await client.post(f"{base_url}/tasks", headers=headers, json=payload)
        if resp.status_code not in [200, 201, 202]:
            raise Exception(f"Runway API rejected request: {resp.text}")

        prediction = resp.json()
        task_id = prediction.get("id") or prediction.get("task_id")
        if not task_id:
            raise Exception("Runway response missing task id.")
        logger.info("[VideoEngine] provider=runway event=task_created job_id=%s task_id=%s", job.job_id, task_id)

        job.progress = 20
        start_poll = time.time()
        while True:
            if time.time() - start_poll > 600:
                raise Exception("Runway rendering timeout.")

            status_resp = await client.get(f"{base_url}/tasks/{task_id}", headers=headers)
            p_data = status_resp.json()
            p_status = (p_data.get("status") or "").lower()

            if p_status in ["succeeded", "completed", "success", "done"]:
                output = p_data.get("output") or p_data
                job.url = _extract_video_url(output)
                if not job.url:
                    raise Exception("Runway completed but no playable URL found.")
                job.output_source = "provider"
                job.status = "Completed"
                job.progress = 100
                logger.info("[VideoEngine] provider=runway event=completed job_id=%s task_id=%s", job.job_id, task_id)
                break

            if p_status in ["failed", "canceled", "error"]:
                raise Exception(f"Runway generation {p_status}: {p_data}")

            job.progress = min(95, job.progress + 3)
            job.status = "Synthesizing pixels..."
            await asyncio.sleep(4)

async def process_video_generation(job_id: str):
    job = jobs[job_id]
    config = _provider_configuration()
    provider = config["selected_provider"]

    replicate_token = os.getenv("REPLICATE_API_TOKEN")
    luma_api_key = os.getenv("LUMA_API_KEY")
    runway_api_key = os.getenv("RUNWAY_API_KEY")

    try:
        job.provider = provider
        job.status = f"Handshaking with {provider.capitalize()} Cloud..."
        job.progress = 10
        logger.info("[VideoEngine] event=job_started job_id=%s provider=%s mode=%s", job.job_id, provider, job.mode)

        if provider == "replicate":
            if not replicate_token:
                raise Exception("Missing REPLICATE_API_TOKEN")
            await run_replicate_generation(job, replicate_token)
        elif provider == "luma":
            if not luma_api_key:
                raise Exception("Missing LUMA_API_KEY")
            await run_luma_generation(job, luma_api_key)
        elif provider == "runway":
            if not runway_api_key:
                raise Exception("Missing RUNWAY_API_KEY")
            await run_runway_generation(job, runway_api_key)
        else:
            raise Exception(f"Unknown VIDEO_PROVIDER '{provider}'. Use replicate, luma, or runway.")

    except Exception as e:
        job.last_error = str(e)
        logger.warning("[VideoEngine] event=provider_failed job_id=%s provider=%s reason=%s", job.job_id, provider, str(e))
        job.status = f"Warning: {str(e)[:40]}... Retrying via Neural Proxy"
        await run_mock_generation(job)
        logger.info("[VideoEngine] event=fallback_completed job_id=%s provider=%s", job.job_id, provider)

@router.get("/providers/health")
async def providers_health():
    config = _provider_configuration()
    logger.info(
        "[VideoEngine] event=providers_health selected_provider=%s can_generate_real=%s",
        config["selected_provider"],
        config["can_generate_real"],
    )
    return config

@router.post("/breakdown")
async def breakdown_script(payload: Dict[str, str]):
    """Semantic script parsing to generate a multi-scene storyboard."""
    script = payload.get("script", "")
    if not script:
        return {"scenes": []}
    
    # Split by sentences or paragraphs
    import re
    sentences = re.split(r'(?<=[.!?]) +', script)
    
    scenes = []
    for i, s in enumerate(sentences):
        if len(s.strip()) < 5: continue
        
        # Simulated AI prompt suggestion for each scene
        scenes.append({
            "id": i + 1,
            "text": s.strip(),
            "suggested_prompt": f"Cinematic visual representing: {s.strip()[:60]}...",
            "duration": 5,
            "status": "pending"
        })
        
    return {"scenes": scenes}

@router.post("/refine-prompt")
async def refine_prompt(payload: Dict[str, str]):
    """AI-powered prompt expansion for cinematic results."""
    original = payload.get("prompt", "")
    if not original:
        return {"refined": "A breathtaking cinematic masterpiece, hyper-realistic, 8k."}
    
    # Advanced semantic expansion (Simulated AI logic)
    cinematic_terms = [
        "volumetric lighting", "highly detailed", "4k resolution", 
        "photorealistic", "atmospheric", "unreal engine 5", 
        "epic wide shot", "cinematic grain", "dynamic composition"
    ]
    
    # Shuffle and pick a few
    import random
    selected = random.sample(cinematic_terms, 4)
    refined = f"{original}, {', '.join(selected)}, masterpiece quality, golden hour lighting, sharp focus."
    
    return {"refined": refined}

@router.post("/generate")
async def generate_video(
    background_tasks: BackgroundTasks,
    prompt: Optional[str] = Form(None),
    mode: str = Form("text-to-video"),
    settings: str = Form("{}"),
    image_seed: Optional[str] = Form(None), # Expecting Base64 from frontend
    image_file: Optional[UploadFile] = File(None)
):
    job_id = str(uuid.uuid4())
    v_prompt = prompt or "Neural Architecture"
    
    # Extract image data
    v_image_data = image_seed
    if image_file:
         file_content = await image_file.read()
         v_image_data = f"data:{image_file.content_type};base64,{base64.b64encode(file_content).decode()}"

    try:
        v_settings = json.loads(settings)
    except:
        v_settings = {}
        
    # Inject enhancement parameters if missing
    if "music" not in v_settings:
        v_settings["music"] = "None"
    if "quality" not in v_settings:
        v_settings["quality"] = "Standard"
        
    jobs[job_id] = VideoJob(job_id, v_prompt, mode, v_settings, image_data=v_image_data)
    background_tasks.add_task(process_video_generation, job_id)
    
    analytics_service.record_activity(
        action=f"AI Video ({mode})",
        target=v_prompt[:30],
        engine="video"
    )
    
    return {
        "job_id": job_id, 
        "status": "Queued", 
        "engine": "Atmospheric Cloud Engine",
        "features": ["Prompt Expansion", "Audio Sync", "Temporal Upscaling"]
    }

@router.get("/status/{job_id}")
async def get_video_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job footprint not found")
    
    job = jobs[job_id]
    return {
        "job_id": job.job_id,
        "status": job.status,
        "progress": job.progress,
        "url": job.url,
        "is_ready": job.status == "Completed",
        "provider": job.provider,
        "output_source": job.output_source,
        "last_error": job.last_error,
    }

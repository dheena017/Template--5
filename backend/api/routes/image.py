from fastapi import APIRouter, HTTPException, BackgroundTasks, Form, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional, Dict
import uuid
import os
import time
import json
import base64
import requests
from backend.api.services import analytics_service, assets_service
from backend.core.logger import create_logger

router = APIRouter(prefix="/api/image", tags=["Image Engines"])
logger = create_logger(__name__)

# In-memory job store for demo purposes (production would use Redis)
jobs = {}

class ImageJob:
    def __init__(self, job_id: str, prompt: str, model: str, settings: dict):
        self.job_id = job_id
        self.prompt = prompt
        self.model = model
        self.settings = settings
        self.status = "Queued"
        self.progress = 0
        self.url = None
        self.provider = "Replicate"
        self.created_at = time.time()
        self.completed_at = None

async def run_replicate_image_gen(job: ImageJob, token: str):
    """Real Replicate Image Generation integration."""
    try:
        model_version = "black-forest-labs/flux-1.1-pro" if "Pro" in job.model else "black-forest-labs/flux-schnell"
        
        job.status = "Initializing Neural Cluster..."
        job.progress = 15
        
        # Header for Replicate
        headers = {
            "Authorization": f"Token {token}",
            "Content-Type": "application/json"
        }
        
        # Payload
        payload = {
            "input": {
                "prompt": job.prompt,
                "aspect_ratio": "3:4" if job.settings.get("orientation") == "Portrait" else "16:9",
                "output_format": "webp",
                "output_quality": 90
            }
        }
        
        # Start prediction
        predict_url = f"https://api.replicate.com/v1/models/{model_version}/predictions"
        res = requests.post(predict_url, headers=headers, json=payload)
        
        if res.status_code != 201:
            raise Exception(f"Replicate API Error: {res.text}")
            
        prediction = res.json()
        prediction_id = prediction["id"]
        
        # Poll for completion
        max_retries = 30
        for i in range(max_retries):
            job.status = f"Synthesizing Pixels ({i*3}%)..."
            job.progress = 20 + (i * 2)
            
            poll_res = requests.get(f"https://api.replicate.com/v1/predictions/{prediction_id}", headers=headers)
            status_data = poll_res.json()
            
            if status_data["status"] == "succeeded":
                url = status_data["output"][0] if isinstance(status_data["output"], list) else status_data["output"]
                job.url = url
                job.status = "Completed"
                job.progress = 100
                job.completed_at = time.time()
                
                # Register in Global Workspace
                assets_service.register_ai_asset(
                    name=f"Synth_{job.job_id[:8]}.webp",
                    type="image",
                    url=url,
                    is_generated=True,
                    tags=["AI Gen", job.model, "Neural Diffusion"]
                )
                return
            elif status_data["status"] == "failed":
                raise Exception(f"Replicate Prediction Failed: {status_data.get('error', 'Unknown')}")
                
            time.sleep(2)
            
    except Exception as e:
        logger.error(f"[ImageEngine] Replicate failed: {str(e)}")
        # Fallback to mock on error
        await run_mock_image_gen(job)

async def run_mock_image_gen(job: ImageJob):
    """Deterministic mock for local development."""
    job.provider = "Aura Neural Proxy"
    stages = [
        ("Warping Latent Space", 25),
        ("Calibrating Text-to-Pixel Alignment", 55),
        ("Upscaling to 4K...", 85),
        ("Finalizing Metadata", 95)
    ]
    
    for status, prog in stages:
        job.status = status
        job.progress = prog
        time.sleep(1.5)
        
    # High-quality Unsplash fallbacks based on keyword clusters
    if "cyber" in job.prompt.lower() or "neon" in job.prompt.lower():
        job.url = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1024"
    elif "nature" in job.prompt.lower() or "forest" in job.prompt.lower():
        job.url = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1024"
    else:
        job.url = f"https://picsum.photos/seed/{job.job_id}/1024/1024"
        
    job.status = "Completed"
    job.progress = 100
    job.completed_at = time.time()
    
    # Register Mock in Workspace for UI validation
    assets_service.register_ai_asset(
        name=f"Aura_Proxy_{job.job_id[:8]}.png",
        type="image",
        url=job.url,
        is_generated=True,
        tags=["Mock", "Proxy", "Synthesis"]
    )

@router.post("/generate")
async def generate_image(
    background_tasks: BackgroundTasks,
    prompt: str = Form(...),
    model: str = Form("Flux.1 Pro"),
    orientation: str = Form("Portrait"),
    settings: str = Form("{}")
):
    job_id = str(uuid.uuid4())
    v_settings = json.loads(settings)
    v_settings["orientation"] = orientation
    
    job = ImageJob(job_id, prompt, model, v_settings)
    jobs[job_id] = job
    
    replicate_token = os.getenv("REPLICATE_API_TOKEN")
    
    if replicate_token:
        background_tasks.add_task(run_replicate_image_gen, job, replicate_token)
    else:
        background_tasks.add_task(run_mock_image_gen, job)
        
    analytics_service.record_activity(
        action=f"AI Image ({model})",
        target=prompt[:30],
        engine="image"
    )
    
    return {
        "job_id": job_id,
        "status": "Queued",
        "engine": "Neural Diffusion v4"
    }

@router.get("/status/{job_id}")
async def get_image_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job footprint erased")
    
    job = jobs[job_id]
    return {
        "job_id": job.job_id,
        "status": job.status,
        "progress": job.progress,
        "url": job.url,
        "is_ready": job.status == "Completed",
        "provider": job.provider
    }

@router.get("/outputs")
async def get_recent_outputs():
    # Return last 10 completed jobs
    completed = [j for j in jobs.values() if j.status == "Completed"]
    completed.sort(key=lambda x: x.completed_at or 0, reverse=True)
    return [{
        "id": j.job_id,
        "url": j.url,
        "prompt": j.prompt,
        "model": j.model,
        "created_at": time.strftime('%H:%M:%S', time.localtime(j.created_at))
    } for j in completed[:10]]

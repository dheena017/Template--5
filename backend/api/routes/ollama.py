from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, List, Dict
import requests
import json
import os
from backend.core.logger import create_logger

router = APIRouter(prefix="/api/ollama", tags=["Local LLM (Ollama)"])
logger = create_logger(__name__)

OLLAMA_BASE_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")

class PromptRequest(BaseModel):
    prompt: str
    model: str = "llama3"
    system_prompt: Optional[str] = "You are a creative AI assistant for the Aura Platform. Help users brainstorm cinematic prompts, refined scripts, and creative ideas."

@router.get("/health")
async def ollama_health():
    """Check if the local Ollama instance is active."""
    try:
        res = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=2)
        if res.status_code == 200:
            return {
                "status": "Online",
                "instance": OLLAMA_BASE_URL,
                "models": res.json().get("models", [])
            }
        return {"status": "Unresponsive", "detail": f"Status {res.status_code}"}
    except Exception as e:
        return {"status": "Offline", "detail": str(e)}

@router.post("/generate")
async def generate_ollama(payload: PromptRequest):
    """Generate high-velocity creative text via local Ollama."""
    try:
        target_url = f"{OLLAMA_BASE_URL}/api/generate"
        body = {
            "model": payload.model,
            "prompt": payload.prompt,
            "system": payload.system_prompt,
            "stream": False
        }
        
        res = requests.post(target_url, json=body, timeout=30)
        if res.status_code != 200:
            raise HTTPException(status_code=500, detail=f"Ollama Error: {res.text}")
            
        data = res.json()
        return {
            "response": data.get("response", ""),
            "model": payload.model,
            "done": True
        }
    except Exception as e:
        logger.error(f"[Ollama] Request failed: {str(e)}")
        # Provide a creative mock fallback if Ollama is actually offline
        return {
            "response": f"(Ollama Offline) [Aura Brain]: {payload.prompt} is a fantastic concept! Let's build a cinematic universe around it with high-frequency neon accents and volumetric lighting.",
            "model": "Aura AI Proxy (Local)",
            "done": True,
            "warning": "Local Ollama node not detected"
        }

@router.post("/refine-prompt")
async def refine_prompt_ollama(payload: Dict[str, str]):
    """Specialized endpoint for expanding short prompts into cinematic masterpieces using Ollama."""
    original = payload.get("prompt", "")
    if not original:
        return {"refined": "A breathtaking cinematic masterpiece, hyper-realistic, 8k."}

    prompt_expansion_cmd = (
        f"Expand the following creative prompt into a highly detailed, cinematic, and professional-grade AI image/video prompt. "
        f"Include architectural terms, lighting styles, and visual details. Respond ONLY with the prompt.\n\n"
        f"Original: {original}"
    )

    try:
        target_url = f"{OLLAMA_BASE_URL}/api/generate"
        res = requests.post(target_url, json={
            "model": "llama3",
            "prompt": prompt_expansion_cmd,
            "stream": False
        }, timeout=15)
        
        if res.status_code == 200:
            return {"refined": res.json().get("response", "").strip()}
    except:
        pass
    
    # Static fallback for prompt engineering simulation
    return {"refined": f"Cinematic {original}, 8k resolution, photorealistic, volumetric lighting, unreal engine 5 render, highly detailed textures."}

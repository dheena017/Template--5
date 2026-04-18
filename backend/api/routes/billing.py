from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.core.db import get_db
from backend.api.models.database_models import Platform, Transaction
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/billing", tags=["Billing"])

class TopUpRequest(BaseModel):
    amount: int

class UpgradeRequest(BaseModel):
    tier: str

@router.get("/balance")
def get_balance(db: Session = Depends(get_db)):
    """Retrieve verified platform financial node status."""
    platform = db.query(Platform).first()
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not initialized")
    
    # Fetch recent transactions
    history = db.query(Transaction).order_by(Transaction.date.desc()).limit(10).all()
    
    return {
        "credits": platform.credits,
        "subscription": platform.subscription_tier,
        "history": [
            {
                "type": t.type,
                "tool": t.tool,
                "amount": t.amount,
                "date": t.date.strftime("%Y-%m-%d"),
                "status": t.status
            } for t in history
        ]
    }

@router.post("/top-up")
def process_top_up(req: TopUpRequest, db: Session = Depends(get_db)):
    """Scale the neural synthesis engine by injecting fresh credits."""
    platform = db.query(Platform).first()
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not initialized")
    
    # 1. Update Persistent Balance
    platform.credits += req.amount
    
    # 2. Record in Financial Ledger
    tx = Transaction(
        platform_id=platform.id,
        type="Credit Purchase",
        amount=req.amount,
        status="COMPLETED"
    )
    db.add(tx)
    db.commit()
    
    return {"status": "success", "new_balance": platform.credits}

@router.post("/upgrade")
def process_upgrade(req: UpgradeRequest, db: Session = Depends(get_db)):
    """Transition the production workspace to a higher performance tier."""
    platform = db.query(Platform).first()
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not initialized")
    
    # 1. Update Subscription Node
    platform.subscription_tier = req.tier
    platform.plan = f"{req.tier} Plan"
    
    # 2. Add Reward Credits for Upgrading
    reward = 5000 if req.tier == "Standard" else 25000 if req.tier == "Pro" else 0
    platform.credits += reward
    
    # 3. Log into Ledger
    tx = Transaction(
        platform_id=platform.id,
        type="Subscription Upgrade",
        tool=req.tier,
        amount=reward,
        status="COMPLETED"
    )
    db.add(tx)
    db.commit()
    
    return {"status": "success", "tier": req.tier, "new_balance": platform.credits}

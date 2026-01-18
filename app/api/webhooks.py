from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def webhook():
    return {"status": "received"}

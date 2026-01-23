from fastapi import APIRouter
from app.schemas.quiz import GenerateQuizRequest
from app.engines.quiz_engine import generate_quiz

router = APIRouter(prefix="/quiz", tags=["Quiz"])


@router.post("/generate")
def generate_quiz_api(payload: GenerateQuizRequest):
    return generate_quiz(payload)

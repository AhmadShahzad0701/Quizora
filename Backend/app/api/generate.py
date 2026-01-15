from fastapi import APIRouter
from app.schemas.quiz_generate import (
    QuizGenerateRequest,
    QuizGenerateResponse,
    QuizQuestion
)

router = APIRouter(prefix="/api/v1/quiz", tags=["Quiz Generation"])


@router.post("/generate", response_model=QuizGenerateResponse)
def generate_quiz(payload: QuizGenerateRequest):
    # 🔹 Dummy response (AI later)
    questions = []

    for i in range(payload.total_questions):
        questions.append(
            QuizQuestion(
                question=f"Dummy Question {i + 1} about {payload.subject}",
                options=["Option A", "Option B", "Option C", "Option D"]
            )
        )

    return QuizGenerateResponse(
        quiz_title=f"{payload.subject} Quiz ({payload.difficulty})",
        questions=questions
    )

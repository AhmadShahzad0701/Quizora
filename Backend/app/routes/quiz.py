from fastapi import APIRouter
from app.schemas.quiz_generate import QuizGenerateRequest
from app.schemas.quiz_response import QuizGenerateResponse, QuizQuestion

router = APIRouter(prefix="/api/v1/quiz", tags=["Quiz Generation"])

@router.post("/generate", response_model=QuizGenerateResponse)
def generate_quiz(payload: QuizGenerateRequest):

    # 🔹 Normalize once
    quiz_title = payload.quizTitle
    total_questions = payload.totalQuestions
    total_marks = payload.totalMarks

    questions = []
    qid = 1

    for _ in range(payload.question_distribution.mcq):
        questions.append(
            QuizQuestion(
                id=qid,
                type="mcq",
                points=2,
                text=f"Dummy MCQ about {payload.subject}",
                options=["A", "B", "C", "D"],
                answer="A"
            )
        )
        qid += 1

    return QuizGenerateResponse(
        quiz_title=quiz_title,
        subject=payload.subject,
        difficulty=payload.difficulty,
        total_marks=total_marks,
        questions=questions
    )

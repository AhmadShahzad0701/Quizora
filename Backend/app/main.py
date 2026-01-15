from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Quizora Foundation API")


class QuizRequest(BaseModel):
    subject: str
    difficulty: str
    total_questions: int


class Question(BaseModel):
    question: str
    options: List[str]


class QuizResponse(BaseModel):
    quiz_title: str
    questions: List[Question]


@app.get("/")
def root():
    return {"status": "OK", "message": "Quizora Foundation API running"}


@app.post("/api/v1/quiz/generate", response_model=QuizResponse)
def generate_quiz(payload: QuizRequest):
    questions = []

    for i in range(1, payload.total_questions + 1):
        questions.append({
            "question": f"Dummy Question {i} about {payload.subject}",
            "options": ["Option A", "Option B", "Option C", "Option D"]
        })

    return {
        "quiz_title": f"{payload.subject} Quiz ({payload.difficulty.capitalize()})",
        "questions": questions
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import GenerateQuizRequest, GenerateQuizResponse
from services.quiz_generator import generate_quiz_dummy

app = FastAPI(title="Quizora AI Service")

# CORS (frontend ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "OK", "message": "Quizora AI Service running"}

@app.post("/api/quiz/generate", response_model=GenerateQuizResponse)
def generate_quiz(request: GenerateQuizRequest):
    return generate_quiz_dummy(request)

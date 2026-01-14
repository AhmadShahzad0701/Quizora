from pydantic import BaseModel
from typing import Dict, List, Optional


# -------------------------
# REQUEST MODELS (UI → API)
# -------------------------

class QuizMetadata(BaseModel):
    title: str
    subject: str
    difficulty: str


class QuizConfig(BaseModel):
    total_questions: int
    question_types: Dict[str, int]   # e.g. {"mcq": 4, "short": 2}


class GenerateQuizRequest(BaseModel):
    metadata: QuizMetadata
    config: QuizConfig


# -------------------------
# RESPONSE MODELS (API → UI)
# -------------------------

class QuizQuestion(BaseModel):
    type: str                         # mcq / true_false / short / long
    question: str
    options: Optional[List[str]] = None
    answer: Optional[str] = None


class GeneratedQuiz(BaseModel):
    title: str
    questions: List[QuizQuestion]


class GenerateQuizResponse(BaseModel):
    quiz: GeneratedQuiz

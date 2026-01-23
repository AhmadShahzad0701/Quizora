from pydantic import BaseModel
from typing import Dict, List, Optional


class QuizMeta(BaseModel):
    title: str
    subject: str
    difficulty: str
    time_limit: int
    total_questions: int
    total_marks: int
    quiz_type: str


class QuizContent(BaseModel):
    text: str
    files: Optional[List[str]] = []


class GenerateQuizRequest(BaseModel):
    meta: QuizMeta
    distribution: Dict[str, int]
    content: QuizContent

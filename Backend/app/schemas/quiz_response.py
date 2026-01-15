from pydantic import BaseModel
from typing import List, Optional

class QuizQuestion(BaseModel):
    id: int
    type: str
    points: int
    text: str
    answer: Optional[str] = None
    options: Optional[List[str]] = None

class QuizGenerateResponse(BaseModel):
    quiz_title: str
    subject: str
    difficulty: str
    total_marks: int
    questions: List[QuizQuestion]

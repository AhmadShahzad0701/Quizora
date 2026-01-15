from pydantic import BaseModel
from typing import Optional

class QuestionDistribution(BaseModel):
    mcq: int = 0
    short: int = 0
    long: int = 0
    true_false: int = 0
    fill_blank: int = 0


class QuizGenerateRequest(BaseModel):
    # 🔹 EXACT frontend keys (NO alias)
    quizTitle: str
    subject: str
    difficulty: str
    description: Optional[str] = None

    totalQuestions: int
    totalMarks: int

    question_distribution: QuestionDistribution

from pydantic import BaseModel
from typing import Dict, List, Optional

class EvaluationItem(BaseModel):
    student_id: Optional[str] = None
    question_id: Optional[str] = None
    question_type: str
    question: str
    student_answer: Optional[str] = ""
    rubric: Optional[Dict[str, int]] = None
    max_score: int
class EvaluationRequest(BaseModel):
    evaluations: List[EvaluationItem]
class EvaluationResult(BaseModel):
    student_id: Optional[str] = None
    question_id: Optional[str] = None
    total_score: int
    breakdown: Dict[str, int]
    feedback: str
    confidence: Optional[float] = None
class EvaluationResponse(BaseModel):
    results: List[EvaluationResult]

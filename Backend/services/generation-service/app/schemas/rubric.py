from pydantic import BaseModel
from typing import List

class RubricRequest(BaseModel):
    question: str
    total_marks: int

class Criteria(BaseModel):
    level: str
    marks: int

class RubricResponse(BaseModel):
    question: str
    criteria: List[Criteria]

from fastapi import APIRouter
from app.schemas.rubric import RubricRequest, RubricResponse
from app.engines.rubric_engine import generate_rubric

router = APIRouter(prefix="/rubric", tags=["Rubric"])

@router.post("/generate", response_model=RubricResponse)
def generate_rubric_api(payload: RubricRequest):
    return generate_rubric(payload)

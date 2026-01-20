from fastapi import APIRouter
from app.schemas.evaluation import (
    EvaluationRequest,
    EvaluationResponse,
    EvaluationResult
)

from app.engines.descriptive_engine import DescriptiveEngine
from app.engines.similarity_engine import SimilarityEngine
from app.engines.nli_engine import NLIEngine
from app.engines.llm_judge import LLMJudge
from app.engines.aggregator import Aggregator

router = APIRouter()

descriptive_engine = DescriptiveEngine()
similarity_engine = SimilarityEngine()
nli_engine = NLIEngine()
aggregator = Aggregator()


@router.post("/", response_model=EvaluationResponse)
def evaluate(request: EvaluationRequest):
    llm_judge = LLMJudge()
    results = []

    for item in request.evaluations:

        if item.question_type != "descriptive":
            continue  # Phase-1: silently ignore unsupported types

        # Step 1: Descriptive base handling (empty answer, default rubric)
        base_eval = descriptive_engine.evaluate(
            question=item.question,
            answer=item.student_answer or "",
            rubric=item.rubric,
            max_score=item.max_score
        )

        # Step 2: Similarity (mock heuristic)
        similarity_score = similarity_engine.evaluate(
            student_answer=item.student_answer or "",
            reference_answer=None  # future: model answer / generated answer
        )

        # Step 3: NLI (mock heuristic)
        nli_score = nli_engine.evaluate(
            question=item.question,
            student_answer=item.student_answer or "",
            reference_answer=None
        )

        # Step 4: LLM Judge (real)
        llm_eval = llm_judge.evaluate(
            question=item.question,
            student_answer=item.student_answer or "",
            rubric=item.rubric or descriptive_engine.DEFAULT_RUBRIC,
            max_score=item.max_score
        )

        # Step 5: Aggregate signals into final marks
        aggregated = aggregator.aggregate(
            scores={
                "llm": llm_eval["score"],
                "nli": nli_score,
                "similarity": similarity_score
            },
            rubric=item.rubric or descriptive_engine.DEFAULT_RUBRIC,
            max_score=item.max_score,
            llm_adjustment=llm_eval.get("weight_adjustment")
        )

        # Step 6: Build final response item
        results.append(
            EvaluationResult(
                student_id=item.student_id,
                question_id=item.question_id,
                total_score=aggregated["final_marks"],
                breakdown=base_eval["breakdown"],
                feedback=llm_eval["justification"],
                confidence=aggregated["final_percentage"]
            )
        )

    return EvaluationResponse(results=results)

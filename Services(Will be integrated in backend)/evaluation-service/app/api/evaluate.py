from fastapi import APIRouter, HTTPException
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

    try:
        for item in request.evaluations:

            # Phase 1: ignore unsupported question types
            if item.question_type != "descriptive":
                continue

            # Step 1: Descriptive base evaluation
            base_eval = descriptive_engine.evaluate(
                question=item.question,
                answer=item.student_answer or "",
                rubric=item.rubric,
                max_score=item.max_score
            )

            # Step 2: Similarity engine
            similarity_score = similarity_engine.evaluate(
                student_answer=item.student_answer or "",
                reference_answer=None
            )

            # Step 3: NLI engine
            nli_score = nli_engine.evaluate(
                question=item.question,
                student_answer=item.student_answer or "",
                reference_answer=None
            )

            # Step 4: LLM Judge (MOST COMMON FAILURE POINT)
            llm_eval = llm_judge.evaluate(
                question=item.question,
                student_answer=item.student_answer or "",
                rubric=item.rubric or descriptive_engine.DEFAULT_RUBRIC,
                max_score=item.max_score
            )

            # Step 5: Aggregate all signals
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

            # Step 6: Build response object
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

    except Exception as e:
        # 🔥 THIS IS CRITICAL — makes the real error visible
        print("ENGINE ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

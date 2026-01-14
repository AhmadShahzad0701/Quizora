from .rubric import Rubric
from .similarity import cosine_similarity, string_similarity


# -------------------------------
# Evaluate SINGLE question
# -------------------------------
def evaluate_question(q):
    rubric = Rubric()
    marks = q["marks"]

    # ---------- MCQ ----------
    if q["qtype"] == "MCQ":
        score = marks if q["student_answer"].strip().lower() == q["correct_answer"].strip().lower() else 0
        return {
            "score": score,
            "out_of": marks
        }

    # ---------- Fill in the Blanks ----------
    if q["qtype"] == "FIB":
        sim = max(
            cosine_similarity(q["correct_answer"], q["student_answer"]),
            string_similarity(q["correct_answer"], q["student_answer"])
        )

        if sim >= 0.85:
            score = marks
        elif sim >= 0.6:
            score = round(marks * 0.5, 2)
        else:
            score = 0

        return {
            "score": score,
            "out_of": marks
        }

    # ---------- Short / Long ----------
    semantic = max(0, cosine_similarity(q["correct_answer"], q["student_answer"]))

    completeness = min(
        1.0,
        len(q["student_answer"].split()) / (len(q["correct_answer"].split()) + 1)
    )

    clarity = max(
        0.0,
        1 - abs(len(q["student_answer"].split()) - len(q["correct_answer"].split()))
        / (len(q["correct_answer"].split()) + 1)
    )

    spelling = string_similarity(q["correct_answer"], q["student_answer"])
    effort = 1 if semantic > 0.85 else 0.5 if semantic > 0.7 else 0

    raw_score = (
        rubric.conceptual_understanding * semantic +
        rubric.language_clarity * clarity +
        rubric.completeness * completeness +
        rubric.spelling_accuracy * spelling +
        rubric.effort_bonus * effort
    ) * marks

    score = round(max(0, min(raw_score, marks)), 2)

    return {
        "score": score,
        "out_of": marks,
        "semantic_similarity": round(semantic, 2)
    }


# -------------------------------
# Evaluate COMPLETE quiz JSON
# -------------------------------
def evaluate_quiz_data(data):
    total_score = 0
    total_marks = 0
    results = []

    for q in data["questions"]:
        res = evaluate_question(q)

        total_score += res["score"]
        total_marks += q["marks"]

        # ---- FEEDBACK LOGIC ----
        if res["score"] >= 0.8 * q["marks"]:
            feedback = "Excellent answer"
        elif res["score"] >= 0.4 * q["marks"]:
            feedback = "Partially correct"
        else:
            feedback = "Needs improvement"

        results.append({
            "qid": q["qid"],
            "question": q["question"],
            "student_answer": q["student_answer"],
            "correct_answer": q["correct_answer"],
            "score": res["score"],
            "out_of": q["marks"],
            "feedback": feedback
        })

    percentage = round((total_score / total_marks) * 100, 2)

    if percentage >= 90:
        grade = "A+"
    elif percentage >= 80:
        grade = "A"
    elif percentage >= 70:
        grade = "B"
    elif percentage >= 60:
        grade = "C"
    else:
        grade = "F"

    return {
        "student_id": data.get("student_id", "N/A"),
        "quiz_id": data.get("quiz_id", "N/A"),
        "percentage": percentage,
        "grade": grade,
        "results": results
    }

from schemas import GenerateQuizRequest, GenerateQuizResponse


def generate_quiz_dummy(request: GenerateQuizRequest) -> GenerateQuizResponse:
    questions = []

    question_counters = request.config.question_types
    difficulty = request.metadata.difficulty

    # MCQs
    for i in range(question_counters.get("mcq", 0)):
        questions.append({
            "type": "mcq",
            "question": f"[{difficulty}] Dummy MCQ Question {i + 1}",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Option A"
        })

    # True / False
    for i in range(question_counters.get("true_false", 0)):
        questions.append({
            "type": "true_false",
            "question": f"[{difficulty}] Dummy True/False Question {i + 1}",
            "answer": "True"
        })

    # Short Answers
    for i in range(question_counters.get("short", 0)):
        questions.append({
            "type": "short",
            "question": f"[{difficulty}] Dummy Short Question {i + 1}"
        })

    # Long Answers
    for i in range(question_counters.get("long", 0)):
        questions.append({
            "type": "long",
            "question": f"[{difficulty}] Dummy Long Question {i + 1}"
        })

    return {
        "quiz": {
            "title": request.metadata.title,
            "questions": questions
        }
    }

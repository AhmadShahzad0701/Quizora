def build_quiz_prompt(payload):
    meta = payload.meta
    dist = payload.distribution
    content = payload.content.text

    return f"""
You are an expert university-level exam paper setter.

Generate a quiz strictly in JSON format.

Quiz Details:
- Title: {meta.title}
- Subject: {meta.subject}
- Difficulty: {meta.difficulty}
- Total Questions: {meta.total_questions}
- Total Marks: {meta.total_marks}

Question Distribution:
{dist}

Study Material:
{content}

Rules:
- Follow the distribution strictly
- Return ONLY valid JSON
- No explanations, no markdown
"""

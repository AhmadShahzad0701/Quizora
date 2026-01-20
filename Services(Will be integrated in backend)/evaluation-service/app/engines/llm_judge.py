import os
import json
import requests


class LLMJudge:
    OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

    def __init__(self):
        # ✅ Stable OpenRouter model
        self.model = "openai/gpt-4o-mini"

    def _build_prompt(self, question, student_answer, rubric, max_score):
        rubric_lines = (
            "General accuracy and completeness"
            if not rubric
            else "\n".join([f"- {k}: {v} marks" for k, v in rubric.items()])
        )

        return f"""
You are an exam evaluator.

Question:
{question}

Student Answer:
{student_answer}

Rubric:
{rubric_lines}

Total Marks: {max_score}

Return ONLY valid JSON.

JSON FORMAT:
{{
  "score": 0.0,
  "justification": "short explanation",
  "weight_adjustment": {{}}
}}
"""

    def evaluate(self, question, student_answer, rubric, max_score):
        api_key = os.getenv("OPENROUTER_API_KEY")

        if not api_key:
            raise RuntimeError("OPENROUTER_API_KEY not found in environment")

        payload = {
            "model": self.model,
            "messages": [
                {"role": "user", "content": self._build_prompt(
                    question, student_answer, rubric, max_score
                )}
            ],
            "temperature": 0,
            "max_tokens": 300
        }

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            # Optional but recommended by OpenRouter
            "HTTP-Referer": "http://localhost",
            "X-Title": "Evaluation Service"
        }

        response = requests.post(
            self.OPENROUTER_API_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        if response.status_code != 200:
            raise RuntimeError(
                f"OpenRouter API Error {response.status_code}: {response.text}"
            )

        content = response.json()["choices"][0]["message"]["content"]

        try:
            parsed = json.loads(content)
        except json.JSONDecodeError:
            raise RuntimeError(f"Invalid JSON from model: {content}")

        return {
            "score": float(parsed.get("score", 0)),
            "justification": parsed.get("justification", ""),
            "weight_adjustment": parsed.get("weight_adjustment", {})
        }

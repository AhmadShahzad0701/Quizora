import os
import json
import requests
from typing import Dict, Optional


class LLMJudge:
    OPENROUTER_API_URL = "https://api.groq.com/openai/v1/chat/completions"

    def __init__(self):
        self.model = "llama3-8b-8192"  # ✅ valid Groq model

    def _build_prompt(self, question, student_answer, rubric, max_score):
        rubric_lines = "\n".join([f"- {k}: {v} marks" for k, v in rubric.items()])
        return f"""
You are an exam evaluator.

Question:
{question}

Student Answer:
{student_answer}

Rubric:
{rubric_lines}

Total Marks: {max_score}

Return STRICT JSON ONLY:
{{
  "score": 0.0,
  "justification": "short explanation",
  "weight_adjustment": {{}}
}}
"""

    def evaluate(self, question, student_answer, rubric, max_score):
        api_key = os.getenv("GROQ_API_KEY")
        print("RUNTIME KEY CHECK:", api_key)

        if not api_key:
            raise RuntimeError("GROQ_API_KEY not found")

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": "You are a strict grading assistant."},
                {"role": "user", "content": self._build_prompt(question, student_answer, rubric, max_score)}
            ],
            "temperature": 0.0,
            "max_tokens": 512   # ✅ REQUIRED
        }

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        response = requests.post(
            self.OPENROUTER_API_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        response.raise_for_status()

        content = response.json()["choices"][0]["message"]["content"]

        parsed = json.loads(content)

        return {
            "score": max(0.0, min(float(parsed.get("score", 0.5)), 1.0)),
            "justification": parsed.get("justification", ""),
            "weight_adjustment": parsed.get("weight_adjustment", {})
        }

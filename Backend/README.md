Backend/
│
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   └── logging.py
│   │
│   ├── api/
│   │   ├── v1/
│   │   │   ├── router.py
│   │   │
│   │   │   ├── generation/
│   │   │   │   ├── generation_routes.py
│   │   │   │   ├── generation_service.py
│   │   │   │   ├── generation_prompt.py
│   │   │   │   └── generation_schema.py
│   │   │
│   │   │   └── evaluation/
│   │   │       ├── evaluation_routes.py
│   │   │       ├── evaluation_service.py
│   │   │       ├── evaluation_prompt.py
│   │   │       └── evaluation_schema.py
│   │
│   ├── ai/
│   │   └── llm_client.py
│   │
│   ├── utils/
│   │   └── response_formatter.py
│   │
│   └── __init__.py
│
├── tests/
│   ├── test_generation.py
│   └── test_evaluation.py
│
├── requirements.txt
└── README.md
























backend/
│
├── app/                    # 👈 Pure backend application
│
├── tests/                  # 👈 Testing (later semester)
│
├── requirements.txt
├── README.md
└── .gitignore


app/
│
├── main.py                 # Entry point (FastAPI instance)
│
├── core/                   # System-level configs
│   ├── config.py           # env, settings
│   └── security.py         # auth helpers (later)
│
├── api/                    # HTTP routes only
│   ├── v1/
│   │   ├── auth.py
│   │   ├── quiz_generation.py
│   │   ├── quiz_evaluation.py
│   │   ├── student.py
│   │   └── teacher.py
│
├── services/               # Business logic (NO FastAPI here)
│   ├── ai/
│   │   ├── client.py       # OpenRouter / LLM client
│   │   ├── generation.py
│   │   └── evaluation.py
│   │
│   ├── users/
│   │   ├── student_service.py
│   │   └── teacher_service.py
│
├── schemas/                # Pydantic models
│   ├── quiz.py
│   ├── evaluation.py
│   ├── user.py
│
└── utils/                  # Small helpers
    └── logger.py



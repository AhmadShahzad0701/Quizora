# app/config/model_config.py

import os
from typing import Literal

class ModelConfig:
    """Configuration for LLM providers (OpenRouter + LLAMA  fallback)"""
    
    # OpenRouter Settings
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
    OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
    OPENROUTER_MODEL = "openai/gpt-4o-mini"
    OPENROUTER_TIMEOUT = 30  # seconds
    
    # LLAMA (Ollama) Settings
    OLLAMA_BASE_URL = "http://localhost:11434/api/generate"
    OLLAMA_MODEL = "llama3.1:8b"
    OLLAMA_TIMEOUT = 60

    
    # General Settings
    MAX_TOKENS = 4000
    TEMPERATURE = 0.7
    
    # Fallback Strategy
    PRIMARY_PROVIDER: Literal["openrouter", "ollama"] = "openrouter"
    FALLBACK_ENABLED = True

config = ModelConfig()
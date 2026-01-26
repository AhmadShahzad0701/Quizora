# app/engines/llm_provider.py

import requests
import json
import time
from typing import Dict, Any, Tuple
from app.config.model_config import config

class LLMProvider:
    """
    Unified LLM Provider with OpenRouter (Primary) + LLAMA (Ollama)
    Automatic fallback from OpenRouter to LLAMA if issues arise
    """
    
    def __init__(self):
        self.config = config
        self.last_used_provider = None
        self.response_time = 0
    
    def _extract_json_from_text(self, text: str) -> str:
        """
        Extract JSON from text that may contain extra formatting
        Handles:
        - Markdown code blocks (```json ... ```)
        - Plain text before/after JSON
        - Multiple JSON objects (returns first)
        """
        import re
        
        # Remove markdown code blocks
        text = re.sub(r'```json\s*', '', text)
        text = re.sub(r'```\s*', '', text)
        
        # Try to find JSON object or array
        # Look for { ... } or [ ... ]
        json_patterns = [
            r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}',  # Nested objects
            r'\[[^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*\]'  # Nested arrays
        ]
        
        for pattern in json_patterns:
            matches = re.findall(pattern, text, re.DOTALL)
            if matches:
                # Return the longest match (most likely the complete JSON)
                longest = max(matches, key=len)
                
                # Validate it's actually JSON
                try:
                    json.loads(longest)
                    return longest
                except:
                    continue
        
        # If no JSON found, return original (will fail later in parsing)
        return text.strip()
    


    def generate(self, prompt: str, system_message: str = "") -> Tuple[str, Dict[str, Any]]:
        """
        Generate response with automatic fallback
        
        Returns:
            Tuple[str, Dict]: (response_text, metadata)
            metadata contains: provider, success, response_time, error (if any)
        """
        
        # Try Primary Provider (OpenRouter)
        if self.config.PRIMARY_PROVIDER == "openrouter":
            print("\n🔄 [LLM] Trying OpenRouter...")
            response, metadata = self._try_openrouter(prompt, system_message)
            
            if metadata["success"]:
                return response, metadata
            
            # Fallback to LLAMA
            if self.config.FALLBACK_ENABLED:
                print(f"⚠️  [LLM] OpenRouter failed: {metadata.get('error', 'Unknown error')}")
                print("🔄 [LLM] Switching to Local Model (LLAMA)...")
                return self._try_llama(prompt, system_message)
            else:
                return response, metadata
        
        # Direct llama (if primary is llama)
        else:
            return self._try_llama(prompt, system_message)
    
    def _try_openrouter(self, prompt: str, system_message: str) -> Tuple[str, Dict[str, Any]]:
        """Try OpenRouter API"""
        start_time = time.time()
        
        try:
            # Check API Key
            if not self.config.OPENROUTER_API_KEY:
                raise ValueError("OPENROUTER_API_KEY not set")
            
            # Build messages
            messages = []
            if system_message:
                messages.append({"role": "system", "content": system_message})
            messages.append({"role": "user", "content": prompt})
            
            # API Request
            response = requests.post(
                self.config.OPENROUTER_BASE_URL,
                headers={
                    "Authorization": f"Bearer {self.config.OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "Quizora Generation Service"
                },
                json={
                    "model": self.config.OPENROUTER_MODEL,
                    "messages": messages
                },
                timeout=self.config.OPENROUTER_TIMEOUT
            )
            
            response.raise_for_status()
            data = response.json()
            
            # Extract response
            content = data["choices"][0]["message"]["content"]
            response_time = time.time() - start_time
            
            # Metadata
            metadata = {
                "provider": "OpenRouter",
                "model": self.config.OPENROUTER_MODEL,
                "success": True,
                "response_time": f"{response_time:.2f}s",
                "error": None
            }
            
            self.last_used_provider = "OpenRouter"
            self.response_time = response_time
            
            print(f"✅ [OpenRouter] Response received in {response_time:.2f}s")
            
            return content, metadata
            
        except requests.exceptions.Timeout:
            response_time = time.time() - start_time
            return "", {
                "provider": "OpenRouter",
                "success": False,
                "response_time": f"{response_time:.2f}s",
                "error": "Request timeout"
            }
            
        except requests.exceptions.ConnectionError:
            response_time = time.time() - start_time
            return "", {
                "provider": "OpenRouter",
                "success": False,
                "response_time": f"{response_time:.2f}s",
                "error": "No internet connection"
            }
            
        except Exception as e:
            response_time = time.time() - start_time
            return "", {
                "provider": "OpenRouter",
                "success": False,
                "response_time": f"{response_time:.2f}s",
                "error": str(e)
            }
    
    def _try_llama(self, prompt: str, system_message: str) -> Tuple[str, Dict[str, Any]]:
        """Try LLAMA (Ollama) Local Model"""
        start_time = time.time()
        
        try:
            # Combine system message and prompt
            full_prompt = prompt
            if system_message:
                full_prompt = f"{system_message}\n\n{prompt}"
            
            # API Request to Ollama
            response = requests.post(
            self.config.OLLAMA_BASE_URL,
            json={
                "model": self.config.OLLAMA_MODEL,
                "prompt": full_prompt,
                "stream": False
            },
            timeout=self.config.OLLAMA_TIMEOUT
            )

            
            response.raise_for_status()
            data = response.json()
            
            # Extract response
            raw_content = data.get("response", "")
            response_time = time.time() - start_time
            
            # Clean and extract JSON from LLAMA's response
            content = self._extract_json_from_text(raw_content)
            
            if not content:
                raise ValueError("No valid JSON found in LLAMA response")
            
            # Metadata
            metadata = {
                "provider": "LLAMA (Local)",
                "model": self.config.OLLAMA_MODEL,
                "success": True,
                "response_time": f"{response_time:.2f}s",
                "error": None
            }
            
            self.last_used_provider = "LLAMA"
            self.response_time = response_time
            
            print(f"✅ [LLAMA] Response received in {response_time:.2f}s")
            
            return content, metadata
            
        except requests.exceptions.ConnectionError:
            response_time = time.time() - start_time
            return "", {
                "provider": "LLAMA (Local)",
                "success": False,
                "response_time": f"{response_time:.2f}s",
                "error": "Ollama not running. Start with: ollama serve"
            }
            
        except Exception as e:
            response_time = time.time() - start_time
            return "", {
                "provider": "LLAMA (Local)",
                "success": False,
                "response_time": f"{response_time:.2f}s",
                "error": str(e)
            }
    
    def get_last_provider_info(self) -> str:
        """Get formatted info about last used provider"""
        if self.last_used_provider:
            return f"[{self.last_used_provider}] ⏱️ {self.response_time:.2f}s"
        return "[No request made yet]"
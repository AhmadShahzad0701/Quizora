from sentence_transformers import SentenceTransformer, util
import difflib

model = SentenceTransformer("all-MiniLM-L6-v2")

def cosine_similarity(a, b):
    e1 = model.encode(a, convert_to_tensor=True)
    e2 = model.encode(b, convert_to_tensor=True)
    return max(0.0, util.cos_sim(e1, e2).item())

def string_similarity(a, b):
    return difflib.SequenceMatcher(None, a.lower(), b.lower()).ratio()

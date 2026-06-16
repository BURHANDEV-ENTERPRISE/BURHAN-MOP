# 3-Tier Memory Engine

MOP Memory is organized into three tiers:
1. **Working Memory** (`working.jsonl`): Session-level in-flight memory.
2. **Episodic Memory** (`YYYY-MM.jsonl`): Monthly memory.
3. **Long-term Facts** (`facts.json`): Distilled facts, promoted when referred to >=3x in 30 days.

---
{
  "title": "Citation-Grounded RAG Answering",
  "slug": "citation-grounded-rag-answering",
  "content_type": "pattern",
  "summary": "Answer questions only from retrieved context, requiring evidence citations and explicit abstention when context is insufficient.",
  "tags": ["pattern", "rag", "citations", "grounding"],
  "task_type": ["rag", "question-answering"],
  "technique": ["grounded-generation", "abstention-policy"],
  "risk": ["hallucination", "citation-mismatch"],
  "provider_scope": "multi",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Prompting Guide",
      "url": "https://platform.openai.com/docs/guides/prompting",
      "source_type": "doc"
    },
    {
      "label": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "source_type": "standard"
    },
    {
      "label": "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
      "url": "https://arxiv.org/abs/2310.11511",
      "source_type": "paper"
    },
    {
      "label": "Corrective Retrieval Augmented Generation (CRAG)",
      "url": "https://arxiv.org/abs/2401.15884",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "context-management-and-constraints",
    "policy-compliance-checking",
    "prompt-injection-safety-checklist",
    "rag-research-landscape-2020-2026"
  ]
}
---
# Citation-Grounded RAG Answering

## Problem

RAG answers often cite incorrect passages or answer beyond retrieved evidence.

## Baseline Prompt

```text
Answer the user question based on the provided context.
```

## Improved Prompt

```text
You may only answer using the retrieved context chunks.

Return JSON:
{
  "answer": "string",
  "citations": ["chunk_id_1", "chunk_id_2"],
  "confidence": 0.00,
  "abstain": false,
  "abstain_reason": "string | null"
}

Rules:
- If context does not support an answer, set abstain=true.
- Each factual claim must map to a cited chunk id.
- Do not cite chunk ids that were not provided.
```

## Why It Works

Explicit citation and abstention fields force grounded behavior and enable automated citation checks.

## Failure Modes

1. Citations that do not contain the claimed fact.
2. Over-abstaining when weak but sufficient evidence exists.
3. Confidence not aligned with citation quality.

## Eval Setup

Measure exact citation validity, abstain precision/recall, and answer faithfulness across held-out questions.

## Cost/Latency Notes

Citation validation adds post-processing but greatly improves trust in high-stakes responses.

## References

Combine this pattern with retrieval quality metrics. Prompt quality cannot fix missing or irrelevant retrieval data.

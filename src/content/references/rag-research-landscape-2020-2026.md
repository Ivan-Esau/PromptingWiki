---
{
  "title": "RAG Research Landscape 2020-2026",
  "slug": "rag-research-landscape-2020-2026",
  "content_type": "reference",
  "summary": "Scientific references for retrieval-augmented generation, including grounding, corrective retrieval, and graph-based retrieval.",
  "tags": ["references", "rag", "grounding", "retrieval"],
  "task_type": ["rag", "question-answering"],
  "technique": ["retrieval-augmentation", "self-rag", "graph-rag"],
  "risk": ["ungrounded-answers", "retrieval-errors"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020)",
      "url": "https://arxiv.org/abs/2005.11401",
      "source_type": "paper"
    },
    {
      "label": "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection (2023)",
      "url": "https://arxiv.org/abs/2310.11511",
      "source_type": "paper"
    },
    {
      "label": "Corrective Retrieval Augmented Generation (CRAG) (2024)",
      "url": "https://arxiv.org/abs/2401.15884",
      "source_type": "paper"
    },
    {
      "label": "From Local to Global: A GraphRAG Approach to Query-Focused Summarization (2024)",
      "url": "https://arxiv.org/abs/2404.16130",
      "source_type": "paper"
    },
    {
      "label": "Retrieval-Augmented Generation for LLMs: A Survey (2023)",
      "url": "https://arxiv.org/abs/2312.10997",
      "source_type": "paper"
    },
    {
      "label": "GraphRAG: A Survey (2024)",
      "url": "https://arxiv.org/abs/2408.08921",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "citation-grounded-rag-answering",
    "policy-compliance-checking",
    "tool-use-planning-react-tot",
    "agent-memory-privacy-controls"
  ]
}
---
# RAG Research Landscape 2020-2026

RAG methods evolved from simple retrieval-then-generation pipelines to reflective and graph-structured retrieval systems.

## Core Progression

1. Original RAG established external knowledge grounding for generation.
2. Self-RAG added self-reflection about retrieval sufficiency.
3. CRAG introduced corrective retrieval mechanisms when evidence is weak.
4. GraphRAG approaches improved global-context synthesis over connected evidence.

## Implementation Implications

1. Prompt design must include retrieval confidence and abstention behavior.
2. Evaluation must separately score retrieval quality and answer faithfulness.
3. Citation quality is a first-class metric, not optional metadata.

## Practical Mapping in This Wiki

These works directly support:

1. Citation-grounded answering patterns.
2. Policy compliance workflows requiring explicit evidence.
3. Safety controls for untrusted retrieval contexts.

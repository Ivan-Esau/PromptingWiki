---
{
  "title": "Tool-Use Planning with ReAct and Tree-of-Thought",
  "slug": "tool-use-planning-react-tot",
  "content_type": "pattern",
  "summary": "A planning prompt pattern for multi-step tasks that combines ReAct tool calls with deliberate branching and verification.",
  "tags": ["pattern", "agentic", "planning", "tool-use"],
  "task_type": ["automation", "rag", "question-answering"],
  "technique": ["react", "tree-of-thought", "plan-and-solve"],
  "risk": ["tool-misuse", "premature-commitment", "hallucination"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "ReAct: Synergizing Reasoning and Acting in Language Models (2022)",
      "url": "https://arxiv.org/abs/2210.03629",
      "source_type": "paper"
    },
    {
      "label": "Tree of Thoughts: Deliberate Problem Solving with LLMs (2023)",
      "url": "https://arxiv.org/abs/2305.10601",
      "source_type": "paper"
    },
    {
      "label": "Plan-and-Solve Prompting (2023)",
      "url": "https://arxiv.org/abs/2305.04091",
      "source_type": "paper"
    },
    {
      "label": "Large Language Models are Zero-Shot Reasoners (2022)",
      "url": "https://arxiv.org/abs/2205.11916",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "citation-grounded-rag-answering",
    "task-decomposition-for-workflows",
    "web-agent-task-execution",
    "agentic-evaluation-harness"
  ]
}
---
# Tool-Use Planning with ReAct and Tree-of-Thought

## Problem

Agentic prompts often fail because they choose the first plausible tool action without explicit plan verification.

## Baseline Prompt

```text
Use available tools to solve the user task and return the final answer.
```

## Improved Prompt

```text
You are an agent with tools.

Step 1: Build a 3-step candidate plan.
Step 2: Generate 2 alternative plans for difficult steps.
Step 3: Choose one plan using evidence quality and tool cost.
Step 4: Execute ReAct loop:
- Thought: what to do next
- Action: tool_name(arguments)
- Observation: tool result
Step 5: Before final answer, run a verification pass:
- Are claims grounded in observations?
- Are citations or tool outputs sufficient?

Return JSON:
{
  "plan": ["..."],
  "actions": [{"tool": "string", "purpose": "string"}],
  "answer": "string",
  "verification": {"grounded": true, "issues": ["string"]}
}
```

## Why It Works

This pattern separates planning from execution and introduces explicit branch exploration before committing to a tool path.

## Failure Modes

1. Over-planning causes unnecessary latency.
2. Tool observations are ignored when model priors are strong.
3. Verification becomes superficial if no hard checks are included.

## Eval Setup

Evaluate on tasks requiring at least two tools and one external knowledge lookup. Score success, groundedness, and tool efficiency.

## Cost/Latency Notes

Branching and verification increase token and tool usage. Constrain branch count and require early-stop conditions.

## References

Use this pattern for high-stakes tasks where tool traces and reproducibility matter more than minimal latency.

---
{
  "title": "Agent Benchmark Research 2023-2026",
  "slug": "agent-benchmark-research-2023-2026",
  "content_type": "reference",
  "summary": "Primary benchmarks used to evaluate agentic systems on web tasks, software engineering, and open-ended assistant behavior.",
  "tags": ["references", "benchmarks", "agents", "evaluation"],
  "task_type": ["agentic", "quality-assurance"],
  "technique": ["benchmarking", "trace-evaluation"],
  "risk": ["benchmark-overfitting"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "AgentBench: Evaluating LLMs as Agents (2023)",
      "url": "https://arxiv.org/abs/2308.03688",
      "source_type": "paper"
    },
    {
      "label": "WebArena: A Realistic Web Environment for Building Autonomous Agents (2023)",
      "url": "https://arxiv.org/abs/2307.13854",
      "source_type": "paper"
    },
    {
      "label": "Mind2Web: Towards a Generalist Agent for the Web (2023)",
      "url": "https://arxiv.org/abs/2306.06070",
      "source_type": "paper"
    },
    {
      "label": "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (2023)",
      "url": "https://arxiv.org/abs/2310.06770",
      "source_type": "paper"
    },
    {
      "label": "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments (2024)",
      "url": "https://arxiv.org/abs/2404.07972",
      "source_type": "paper"
    },
    {
      "label": "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (2024)",
      "url": "https://arxiv.org/abs/2405.15793",
      "source_type": "paper"
    },
    {
      "label": "GAIA: A Benchmark for General AI Assistants (2023)",
      "url": "https://arxiv.org/abs/2311.12983",
      "source_type": "paper"
    },
    {
      "label": "MLGym: A New Framework and Benchmark for Advancing AI Research Agents (2025)",
      "url": "https://arxiv.org/abs/2502.14499",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "agentic-evaluation-harness",
    "web-agent-task-execution",
    "software-engineering-agent-loop",
    "prompt-eval-suite-design"
  ]
}
---
# Agent Benchmark Research 2023-2026

Benchmark coverage is essential because agent quality depends on environment interaction, not only final text outputs.

## Benchmark Families

1. Web interaction benchmarks: WebArena and Mind2Web.
2. Software engineering benchmarks: SWE-bench and SWE-agent setups.
3. Broad assistant tasks: AgentBench and GAIA.
4. Research-agent workflows: MLGym.

## Evaluation Lessons

1. Final success rate alone hides critical safety and trace-quality failures.
2. Benchmarks vary in realism, observability, and action-space difficulty.
3. Production evaluation should blend benchmark tasks with internal domain tasks.

## Practical Mapping in This Wiki

Use this collection to design:

1. Agentic eval harness thresholds.
2. Release gates for automation risk.
3. Trace-level regression dashboards.

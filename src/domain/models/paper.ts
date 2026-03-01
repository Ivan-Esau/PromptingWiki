export const PAPER_TOPICS = [
  'foundations',
  'transformers',
  'pretraining',
  'prompting',
  'instruction-tuning',
  'reasoning',
  'retrieval',
  'tool-use',
  'agents',
  'alignment',
  'safety',
  'evaluation',
  'multimodal'
] as const;

export type PaperTopic = (typeof PAPER_TOPICS)[number];

export const PAPER_TOPIC_LABELS: Record<PaperTopic, string> = {
  foundations: 'Foundations',
  transformers: 'Transformers',
  pretraining: 'Pretraining',
  prompting: 'Prompting',
  'instruction-tuning': 'Instruction Tuning',
  reasoning: 'Reasoning',
  retrieval: 'Retrieval',
  'tool-use': 'Tool Use',
  agents: 'Agents',
  alignment: 'Alignment',
  safety: 'Safety',
  evaluation: 'Evaluation',
  multimodal: 'Multimodal'
};

export interface Paper {
  id: string;
  title: string;
  year: number;
  venue: string;
  authors: string[];
  url: string;
  doi?: string;
  topics: PaperTopic[];
  summary: string;
  references: string[];
}

export function isPaperTopic(value: string): value is PaperTopic {
  return PAPER_TOPICS.includes(value as PaperTopic);
}

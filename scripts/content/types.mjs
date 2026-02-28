import path from 'node:path';

export const CONTENT_ROOT = path.resolve('src/content');
export const OUTPUT_ROOT = path.resolve('src/data');

export const CONTENT_TYPES = new Set(['concept', 'pattern', 'use_case', 'eval', 'safety', 'provider_note', 'reference']);
export const PROVIDER_SCOPES = new Set(['neutral', 'openai', 'anthropic', 'google', 'multi']);
export const DIFFICULTY_LEVELS = new Set(['intro', 'intermediate', 'advanced']);
export const SOURCE_TYPES = new Set(['doc', 'paper', 'standard']);

export const REQUIRED_FIELDS = [
  'title',
  'slug',
  'content_type',
  'summary',
  'tags',
  'provider_scope',
  'difficulty',
  'last_reviewed',
  'references',
  'related_pages'
];

export const REQUIRED_HEADINGS = {
  pattern: ['problem', 'baseline prompt', 'improved prompt', 'why it works', 'failure modes', 'eval setup', 'cost/latency notes', 'references'],
  use_case: ['scenario and constraints', 'prompt assembly', 'test set', 'expected output rubric', 'observed failures and fixes', 'deployment notes', 'references'],
  eval: ['what is measured', 'dataset design', 'scoring rubric', 'regression procedure', 'pass/fail thresholds'],
  safety: ['threat model', 'controls', 'failure handling', 'references']
};

export function normalizeHeading(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function validateDate(value) {
  if (typeof value !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}

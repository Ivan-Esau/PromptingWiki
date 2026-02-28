import { describe, expect, it } from 'vitest';
import { parseHashRoute } from '../src/adapters/router/hashRouter';

describe('hash router parser', () => {
  it('parses home and known section routes', () => {
    expect(parseHashRoute('#/')).toEqual({ type: 'home' });
    expect(parseHashRoute('#/library')).toEqual({ type: 'section', section: 'library' });
  });

  it('parses page route and falls back to not-found', () => {
    expect(parseHashRoute('#/page/prompt-research-2022-2026')).toEqual({ type: 'page', slug: 'prompt-research-2022-2026' });
    expect(parseHashRoute('#/unknown/path')).toEqual({ type: 'not-found' });
  });
});

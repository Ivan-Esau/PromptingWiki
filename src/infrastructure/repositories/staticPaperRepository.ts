import rawPapers from '../data/papers.json';
import { isPaperTopic, type Paper } from '../../domain/models/paper';
import type { PaperRepository } from './paperRepository';

interface RawPaper {
  id: string;
  title: string;
  year: number;
  venue: string;
  authors: string[];
  url: string;
  doi?: string;
  topics: string[];
  summary: string;
  references: string[];
}

function assertNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid paper field "${fieldName}"`);
  }

  return value.trim();
}

function parseRawPaper(rawPaper: RawPaper): Paper {
  const id = assertNonEmptyString(rawPaper.id, 'id');
  const title = assertNonEmptyString(rawPaper.title, 'title');
  const venue = assertNonEmptyString(rawPaper.venue, 'venue');
  const url = assertNonEmptyString(rawPaper.url, 'url');
  const summary = assertNonEmptyString(rawPaper.summary, 'summary');

  if (!Number.isInteger(rawPaper.year) || rawPaper.year < 1900 || rawPaper.year > 2100) {
    throw new Error(`Invalid year for paper "${id}"`);
  }

  if (!Array.isArray(rawPaper.authors) || rawPaper.authors.length === 0) {
    throw new Error(`Invalid authors for paper "${id}"`);
  }

  if (!Array.isArray(rawPaper.references)) {
    throw new Error(`Invalid references for paper "${id}"`);
  }

  if (!Array.isArray(rawPaper.topics) || rawPaper.topics.length === 0) {
    throw new Error(`Paper "${id}" must contain at least one topic`);
  }

  const topics = rawPaper.topics.map((topic) => {
    if (!isPaperTopic(topic)) {
      throw new Error(`Paper "${id}" contains unknown topic "${topic}"`);
    }

    return topic;
  });

  return {
    id,
    title,
    year: rawPaper.year,
    venue,
    authors: rawPaper.authors.map((author) => assertNonEmptyString(author, 'author')),
    url,
    doi: rawPaper.doi ? assertNonEmptyString(rawPaper.doi, 'doi') : undefined,
    topics,
    summary,
    references: rawPaper.references.map((reference) => assertNonEmptyString(reference, 'reference'))
  };
}

class StaticPaperRepository implements PaperRepository {
  private readonly papers: Paper[];

  constructor(rawCorpus: RawPaper[]) {
    this.papers = rawCorpus.map((paper) => parseRawPaper(paper));
  }

  async listPapers(): Promise<Paper[]> {
    return this.papers.map((paper) => ({
      ...paper,
      authors: [...paper.authors],
      topics: [...paper.topics],
      references: [...paper.references]
    }));
  }
}

export const staticPaperRepository = new StaticPaperRepository(rawPapers as RawPaper[]);

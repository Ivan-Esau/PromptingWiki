import { parseMarkdownContent } from './parse.mjs';
import { CONTENT_TYPES, DIFFICULTY_LEVELS, PROVIDER_SCOPES, REQUIRED_FIELDS, REQUIRED_HEADINGS, SOURCE_TYPES, normalizeHeading, validateDate } from './types.mjs';

function validateFrontmatter(page) {
  const errors = [];
  const filePath = page.file_path;

  for (const field of REQUIRED_FIELDS) {
    if (!(field in page)) errors.push(`${filePath}: missing "${field}"`);
  }

  if (page.schema_version !== undefined && page.schema_version !== 1) {
    errors.push(`${filePath}: schema_version must be 1 when provided`);
  }

  if (typeof page.title !== 'string' || page.title.trim().length < 4) {
    errors.push(`${filePath}: title must be a non-empty string`);
  }

  if (typeof page.slug !== 'string' || !/^[a-z0-9-]+$/.test(page.slug)) {
    errors.push(`${filePath}: slug must match /^[a-z0-9-]+$/`);
  }

  if (!CONTENT_TYPES.has(page.content_type)) {
    errors.push(`${filePath}: content_type must be one of ${Array.from(CONTENT_TYPES).join(', ')}`);
  }

  if (typeof page.summary !== 'string' || page.summary.trim().length < 30) {
    errors.push(`${filePath}: summary must be at least 30 characters`);
  }

  if (!Array.isArray(page.tags) || page.tags.length === 0 || !page.tags.every((item) => typeof item === 'string')) {
    errors.push(`${filePath}: tags must be a non-empty string array`);
  }

  for (const field of ['task_type', 'technique', 'risk']) {
    if (page[field] !== undefined) {
      const value = page[field];
      if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
        errors.push(`${filePath}: ${field} must be a string array`);
      }
    }
  }

  if (!PROVIDER_SCOPES.has(page.provider_scope)) {
    errors.push(`${filePath}: provider_scope must be one of ${Array.from(PROVIDER_SCOPES).join(', ')}`);
  }

  if (!DIFFICULTY_LEVELS.has(page.difficulty)) {
    errors.push(`${filePath}: difficulty must be one of ${Array.from(DIFFICULTY_LEVELS).join(', ')}`);
  }

  if (!validateDate(page.last_reviewed)) {
    errors.push(`${filePath}: last_reviewed must be YYYY-MM-DD`);
  }

  if (!Array.isArray(page.references) || page.references.length === 0) {
    errors.push(`${filePath}: references must be a non-empty array`);
  } else {
    const urls = new Set();
    for (const reference of page.references) {
      if (typeof reference !== 'object' || reference === null) {
        errors.push(`${filePath}: each reference must be an object`);
        continue;
      }
      if (typeof reference.label !== 'string' || reference.label.trim().length < 3) {
        errors.push(`${filePath}: each reference must include a label`);
      }
      if (typeof reference.url !== 'string' || !/^https?:\/\//.test(reference.url)) {
        errors.push(`${filePath}: each reference must include an http(s) url`);
      } else {
        const normalized = reference.url.trim().replace(/\/$/, '');
        if (urls.has(normalized)) {
          errors.push(`${filePath}: duplicate reference url "${reference.url}"`);
        }
        urls.add(normalized);
      }
      if (!SOURCE_TYPES.has(reference.source_type)) {
        errors.push(`${filePath}: reference source_type must be one of ${Array.from(SOURCE_TYPES).join(', ')}`);
      }
      if (reference.year !== undefined && (typeof reference.year !== 'number' || reference.year < 1900 || reference.year > 2100)) {
        errors.push(`${filePath}: reference year must be a number between 1900 and 2100`);
      }
      if (reference.authors !== undefined && (!Array.isArray(reference.authors) || !reference.authors.every((item) => typeof item === 'string'))) {
        errors.push(`${filePath}: reference authors must be a string array`);
      }
      if (reference.venue !== undefined && typeof reference.venue !== 'string') {
        errors.push(`${filePath}: reference venue must be a string`);
      }
      if (reference.doi !== undefined && typeof reference.doi !== 'string') {
        errors.push(`${filePath}: reference doi must be a string`);
      }
    }
  }

  if (!Array.isArray(page.related_pages) || !page.related_pages.every((item) => typeof item === 'string')) {
    errors.push(`${filePath}: related_pages must be a string array`);
  }

  return errors;
}

function validateHeadings(page) {
  const required = REQUIRED_HEADINGS[page.content_type];
  if (!required) return [];
  const normalized = new Set(page.headings.map((heading) => normalizeHeading(heading)));
  return required.filter((expected) => !normalized.has(expected)).map((expected) => `${page.file_path}: missing required heading "${expected}"`);
}

function validateQuality(page) {
  const errors = [];
  if (page.content_type === 'pattern' || page.content_type === 'use_case') {
    if (page.code_fence_count < 1) {
      errors.push(`${page.file_path}: ${page.content_type} pages must include at least one fenced code block`);
    }
  }
  return errors;
}

function validateRelations(pages) {
  const errors = [];
  const slugs = new Set();
  for (const page of pages) {
    if (slugs.has(page.slug)) errors.push(`${page.file_path}: duplicate slug "${page.slug}"`);
    slugs.add(page.slug);
  }

  for (const page of pages) {
    for (const related of page.related_pages) {
      if (!slugs.has(related)) {
        errors.push(`${page.file_path}: related page "${related}" does not exist`);
      }
      if (related === page.slug) {
        errors.push(`${page.file_path}: related page must not reference itself`);
      }
    }
  }
  return errors;
}

export async function readAndValidateContent() {
  const pages = await parseMarkdownContent();
  const errors = [];

  for (const page of pages) {
    errors.push(...validateFrontmatter(page));
    errors.push(...validateHeadings(page));
    errors.push(...validateQuality(page));
  }
  errors.push(...validateRelations(pages));

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return pages.sort((a, b) => {
    if (a.section === b.section) return a.title.localeCompare(b.title);
    return a.section.localeCompare(b.section);
  });
}

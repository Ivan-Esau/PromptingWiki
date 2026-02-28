import fs from 'node:fs/promises';
import path from 'node:path';
import { CONTENT_ROOT } from './types.mjs';

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseInline(markdownLine) {
  let html = escapeHtml(markdownLine);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label, url) => {
    const safeUrl = escapeHtml(url);
    return `<a href="${safeUrl}" target="_blank" rel="noreferrer">${label}</a>`;
  });
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function convertMarkdown(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  const toc = [];
  const headings = [];
  const textFragments = [];
  const headingIds = new Map();

  let paragraph = [];
  let listType = null;
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeLines = [];
  let codeFenceCount = 0;
  let blockquote = [];

  const openList = (nextListType) => {
    if (!listType) {
      listType = nextListType;
      html.push(`<${listType}>`);
      return;
    }
    if (listType !== nextListType) {
      html.push(`</${listType}>`);
      listType = nextListType;
      html.push(`<${listType}>`);
    }
  };

  const flushList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(' ').trim();
    if (text) {
      html.push(`<p>${parseInline(text)}</p>`);
      textFragments.push(text);
    }
    paragraph = [];
  };

  const flushBlockquote = () => {
    if (blockquote.length === 0) return;
    const text = blockquote.join(' ').trim();
    if (text) {
      html.push(`<blockquote><p>${parseInline(text)}</p></blockquote>`);
      textFragments.push(text);
    }
    blockquote = [];
  };

  const closeTextBlocks = () => {
    flushParagraph();
    flushList();
    flushBlockquote();
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '  ');
    const codeFence = line.match(/^```([\w-]+)?\s*$/);

    if (inCodeBlock) {
      if (codeFence) {
        const languageClass = codeLanguage ? ` class="language-${codeLanguage}"` : '';
        const codeText = codeLines.join('\n');
        html.push(`<pre class="code-block"><code${languageClass}>${escapeHtml(codeText)}</code></pre>`);
        textFragments.push(codeText);
        codeFenceCount += 1;
        inCodeBlock = false;
        codeLanguage = '';
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (codeFence) {
      closeTextBlocks();
      inCodeBlock = true;
      codeLanguage = codeFence[1] ?? '';
      continue;
    }

    if (line.trim() === '') {
      closeTextBlocks();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeTextBlocks();
      const depth = heading[1].length;
      const title = heading[2].trim();
      const baseId = slugify(title);
      const seen = headingIds.get(baseId) ?? 0;
      headingIds.set(baseId, seen + 1);
      const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;
      html.push(`<h${depth} id="${id}">${parseInline(title)}</h${depth}>`);
      headings.push(title);
      textFragments.push(title);
      if (depth >= 2 && depth <= 3) {
        toc.push({ id, title, depth });
      }
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      flushBlockquote();
      openList('ul');
      const item = unordered[1].trim();
      html.push(`<li>${parseInline(item)}</li>`);
      textFragments.push(item);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      flushBlockquote();
      openList('ol');
      const item = ordered[1].trim();
      html.push(`<li>${parseInline(item)}</li>`);
      textFragments.push(item);
      continue;
    }

    const quote = line.match(/^>\s?(.+)$/);
    if (quote) {
      flushParagraph();
      flushList();
      blockquote.push(quote[1].trim());
      continue;
    }

    paragraph.push(line.trim());
  }

  closeTextBlocks();
  if (inCodeBlock) {
    const languageClass = codeLanguage ? ` class="language-${codeLanguage}"` : '';
    const codeText = codeLines.join('\n');
    html.push(`<pre class="code-block"><code${languageClass}>${escapeHtml(codeText)}</code></pre>`);
    textFragments.push(codeText);
    codeFenceCount += 1;
  }

  const plainText = textFragments.join(' ').replace(/\s+/g, ' ').trim();
  return {
    html: html.join('\n'),
    toc,
    headings,
    plainText,
    excerpt: plainText.slice(0, 220).trimEnd(),
    codeFenceCount
  };
}

function inferSection(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.startsWith('learn/')) return { section: 'learn', subsection: 'learn' };
  if (normalized.startsWith('library/patterns/')) return { section: 'library', subsection: 'patterns' };
  if (normalized.startsWith('library/use-cases/')) return { section: 'library', subsection: 'use-cases' };
  if (normalized.startsWith('library/anti-patterns/')) return { section: 'library', subsection: 'anti-patterns' };
  if (normalized.startsWith('validate/')) return { section: 'validate', subsection: 'validate' };
  if (normalized.startsWith('operate/')) return { section: 'operate', subsection: 'operate' };
  if (normalized.startsWith('references/')) return { section: 'references', subsection: 'references' };
  if (normalized.startsWith('glossary/')) return { section: 'glossary', subsection: 'glossary' };
  return { section: 'library', subsection: 'other' };
}

function parseFrontmatter(rawContent, filePath) {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    throw new Error(`Missing JSON frontmatter in ${filePath}`);
  }

  let metadata;
  try {
    metadata = JSON.parse(match[1]);
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown parse error';
    throw new Error(`Invalid JSON frontmatter in ${filePath}: ${reason}`);
  }

  const markdown = normalized.slice(match[0].length).trim();
  return { metadata, markdown };
}

export async function getMarkdownFiles(rootDir = CONTENT_ROOT) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '_meta') continue;
    const absolute = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await getMarkdownFiles(absolute);
      files.push(...nested);
      continue;
    }
    if (entry.isFile() && absolute.endsWith('.md')) {
      files.push(absolute);
    }
  }

  return files.sort();
}

export async function parseMarkdownContent() {
  const markdownFiles = await getMarkdownFiles();
  if (markdownFiles.length === 0) {
    throw new Error('No markdown content files found under src/content.');
  }

  const pages = [];
  for (const filePath of markdownFiles) {
    const raw = await fs.readFile(filePath, 'utf8');
    const { metadata, markdown } = parseFrontmatter(raw, filePath);
    const converted = convertMarkdown(markdown);
    const relativePath = path.relative(CONTENT_ROOT, filePath);

    pages.push({
      ...metadata,
      ...inferSection(relativePath),
      body_html: converted.html,
      toc: converted.toc,
      headings: converted.headings,
      plain_text: converted.plainText,
      excerpt: converted.excerpt,
      code_fence_count: converted.codeFenceCount,
      file_path: relativePath.replace(/\\/g, '/')
    });
  }

  return pages;
}

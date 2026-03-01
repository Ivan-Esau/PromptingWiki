import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const corpusPath = path.join(rootDir, 'src', 'infrastructure', 'data', 'papers.json');
const corpusRaw = fs.readFileSync(corpusPath, 'utf8');
const corpus = JSON.parse(corpusRaw);

if (!Array.isArray(corpus)) {
  console.error('Corpus must be a JSON array.');
  process.exit(1);
}

const idSet = new Set();
let errorCount = 0;

for (const paper of corpus) {
  if (typeof paper.id !== 'string' || paper.id.length === 0) {
    console.error('Paper has an invalid or missing id.');
    errorCount += 1;
    continue;
  }

  if (idSet.has(paper.id)) {
    console.error(`Duplicate paper id: ${paper.id}`);
    errorCount += 1;
  }
  idSet.add(paper.id);

  if (!Number.isInteger(paper.year)) {
    console.error(`Paper ${paper.id} has invalid year.`);
    errorCount += 1;
  }

  try {
    new URL(paper.url);
  } catch {
    console.error(`Paper ${paper.id} has invalid URL.`);
    errorCount += 1;
  }

  if (!Array.isArray(paper.references)) {
    console.error(`Paper ${paper.id} references must be an array.`);
    errorCount += 1;
  }
}

for (const paper of corpus) {
  if (!Array.isArray(paper.references)) {
    continue;
  }

  for (const reference of paper.references) {
    if (!idSet.has(reference)) {
      console.error(`Paper ${paper.id} references unknown id "${reference}".`);
      errorCount += 1;
    }
    if (reference === paper.id) {
      console.error(`Paper ${paper.id} references itself.`);
      errorCount += 1;
    }
  }
}

if (errorCount > 0) {
  console.error(`Corpus validation failed with ${errorCount} issue(s).`);
  process.exit(1);
}

console.log(`Corpus validation passed (${corpus.length} papers).`);

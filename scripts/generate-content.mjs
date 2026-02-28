import path from 'node:path';
import { readAndValidateContent } from './content/validate.mjs';
import { writeContentArtifacts } from './content/index.mjs';


try {
  const pages = await readAndValidateContent();
  const { publicPages, contentIndexPath, searchIndexPath } = await writeContentArtifacts(pages);

  console.log(`Generated content index (${publicPages.length} pages).`);
  console.log(`Wrote ${path.relative(process.cwd(), contentIndexPath)} and ${path.relative(process.cwd(), searchIndexPath)}.`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Content generation failed.\n');
  console.error(message);
  process.exit(1);
}

import { readAndValidateContent } from './content/validate.mjs';

try {
  const pages = await readAndValidateContent();
  console.log(`Validated ${pages.length} content files.`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Content validation failed.\n');
  console.error(message);
  process.exit(1);
}

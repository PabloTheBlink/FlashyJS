import { build, transform } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await build({ entryPoints: ['entry.mjs'], bundle: true, format: 'esm', platform: 'browser', minify: true, outfile: 'dist/flashy.mjs' });
await build({ entryPoints: ['flashy.js'], bundle: true, format: 'cjs', platform: 'node', minify: true, outfile: 'dist/flashy.cjs' });
const umd = await transform(await readFile('flashy.js', 'utf8'), { minify: true, target: 'es2018' });
await writeFile('dist/flashy.umd.min.js', umd.code);
for (const path of ['dist/flashy.mjs', 'dist/flashy.cjs', 'dist/flashy.umd.min.js']) {
  const bytes = await readFile(path);
  console.log(`${path}: ${bytes.length} B, ${gzipSync(bytes).length} B gzip`);
}

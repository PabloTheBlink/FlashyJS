const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { gzipSync } = require('node:zlib');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const vm = require('node:vm');
const cjs = require('../dist/flashy.cjs');

test('CJS and ESM entries expose a callable 2.0 API', async () => {
  const esm = await import(pathToFileURL(path.resolve(__dirname, '../dist/flashy.mjs')));
  assert.equal(typeof cjs, 'function');
  assert.equal(typeof esm.default, 'function');
  assert.equal(cjs.version, '2.0.0');
  assert.equal(typeof esm.default.promise, 'function');
});

test('minified UMD core stays below 8 KB gzip', () => {
  const bytes = readFileSync(path.resolve(__dirname, '../dist/flashy.umd.min.js'));
  assert.ok(gzipSync(bytes).length < 8192);
});

test('UMD entry installs window.flashy without a module loader', () => {
  const source = readFileSync(path.resolve(__dirname, '../dist/flashy.umd.min.js'), 'utf8');
  const context = {};
  vm.runInNewContext(source, context);
  assert.equal(typeof context.flashy, 'function');
  assert.equal(context.flashy.version, '2.0.0');
});

test('React wrapper configures the shared core without bundling React', () => {
  const source = readFileSync(path.resolve(__dirname, '../react.js'), 'utf8');
  const module = { exports: {} };
  const configured = [];
  const core = { setDefaults: value => configured.push(value) };
  vm.runInNewContext(source, {
    module,
    require: name => name === 'react' ? { useEffect: callback => callback() } : core,
  });
  assert.equal(module.exports.useFlashy(), core);
  assert.equal(module.exports.Toaster({ theme: 'auto', position: undefined }), null);
  assert.equal(configured.length, 1);
  assert.equal(configured[0].theme, 'auto');
  assert.equal('position' in configured[0], false);
});

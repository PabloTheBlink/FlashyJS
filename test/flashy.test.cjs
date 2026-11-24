const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { installDOM } = require('./dom.cjs');
const flashy = require('../flashy.js');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

beforeEach(() => { installDOM(); flashy.setDefaults({ type: 'default', position: 'top-right', duration: 4000, closable: true, theme: 'light', visibleToasts: 3 }); });
afterEach(() => flashy.destroy());

test('1.x call, helpers, close callback and escaped text remain available', () => {
  let closed = 0;
  const dismiss = flashy('<img src=x>', { onClose: () => closed++ });
  assert.equal(document.querySelector('.flashy-content').textContent, '<img src=x>');
  assert.equal(document.querySelector('.flashy-icon').tagName, 'SPAN');
  dismiss(); dismiss();
  assert.equal(closed, 1);
  flashy.success('Done');
  assert.equal(document.querySelector('.flashy-notification.success').getAttribute('role'), 'status');
  flashy.error('Bad');
  assert.equal(document.querySelector('.flashy-notification.error').getAttribute('role'), 'alert');
});

test('promise uses one toast and resolves with its original value', async () => {
  const promise = flashy.promise(() => Promise.resolve({ id: 3 }), { loading: 'Saving', success: value => `Saved ${value.id}`, error: 'Failed' });
  const toast = document.querySelector('.flashy-notification');
  assert.equal(toast.querySelector('.flashy-content').textContent, 'Saving');
  assert.deepEqual(await promise, { id: 3 });
  assert.equal(document.querySelector('.flashy-notification'), toast);
  assert.equal(toast.querySelector('.flashy-content').textContent, 'Saved 3');
  assert.equal(toast.getAttribute('role'), 'status');
});

test('promise rejection changes the same toast and propagates the error', async () => {
  const error = new Error('offline');
  const promise = flashy.promise(Promise.reject(error), { loading: 'Saving', success: 'Saved', error: cause => cause.message });
  const toast = document.querySelector('.flashy-notification');
  await assert.rejects(promise, error);
  assert.equal(document.querySelector('.flashy-notification'), toast);
  assert.equal(toast.querySelector('.flashy-content').textContent, 'offline');
  assert.equal(toast.getAttribute('aria-live'), 'assertive');
});

test('visible stack expands on hover and touch and limits older toasts', () => {
  flashy.setDefaults({ visibleToasts: 2, duration: 0 });
  flashy('First'); flashy('Second'); flashy('Third');
  const container = document.querySelector('.flashy-container');
  assert.equal(container.querySelectorAll('.flashy-notification').length, 3);
  assert.equal(container.children[0].style.display, 'none');
  assert.equal(container.children[0].querySelector('.flashy-close').tabIndex, -1);
  container.dispatchEvent({ type: 'mouseenter' });
  assert.equal(container.classList.contains('expanded'), true);
  container.dispatchEvent({ type: 'mouseleave' });
  assert.equal(container.classList.contains('expanded'), false);
  container.dispatchEvent({ type: 'touchstart' });
  assert.equal(container.classList.contains('expanded'), true);
  document.dispatchEvent({ type: 'touchstart', target: document.body });
  assert.equal(container.classList.contains('expanded'), false);
});

test('timer pauses on hover and hidden tab then resumes', async () => {
  flashy('Short', { duration: 40 });
  const container = document.querySelector('.flashy-container');
  container.dispatchEvent({ type: 'mouseenter' });
  await sleep(60);
  assert.equal(document.querySelector('.flashy-notification').style.display, '');
  container.dispatchEvent({ type: 'mouseleave' });
  document.hidden = true;
  document.dispatchEvent({ type: 'visibilitychange' });
  await sleep(60);
  assert.equal(document.querySelector('.flashy-notification').style.display, '');
  document.hidden = false;
  document.dispatchEvent({ type: 'visibilitychange' });
  await sleep(55);
  assert.equal(document.querySelector('.flashy-notification').style.display, 'none');
});

test('Escape closes latest toast without moving focus', () => {
  flashy('First', { duration: 0 }); flashy('Second', { duration: 0 });
  const toasts = document.querySelectorAll('.flashy-notification');
  document.dispatchEvent({ type: 'keydown', key: 'Escape' });
  assert.equal(toasts[0].style.display, '');
  assert.equal(toasts[1].style.display, 'none');
  assert.equal(document.activeElement, undefined);
});

test('auto theme and reduced motion stylesheet are available', () => {
  flashy('Auto', { theme: 'auto' });
  assert.equal(document.querySelector('.flashy-notification').classList.contains('auto'), true);
  const css = document.getElementById('flashy-styles').textContent;
  assert.match(css, /prefers-color-scheme:dark/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /--flashy-light-bg/);
});

test('rich toast renders description, avatar and action callback without triggering toast click', () => {
  let actions = 0, clicks = 0;
  flashy('Archived', { duration: 0, description: 'Undo this change', image: '/avatar.png', imageAlt: 'Alex', action: { label: 'Undo', onClick: () => actions++ }, onClick: () => clicks++ });
  const toast = document.querySelector('.flashy-notification');
  assert.equal(toast.querySelector('.flashy-description').textContent, 'Undo this change');
  assert.equal(toast.querySelector('.flashy-avatar').alt, 'Alex');
  const action = toast.querySelector('.flashy-action');
  assert.equal(action.textContent, 'Undo');
  action.dispatchEvent({ type: 'click' });
  toast.dispatchEvent({ type: 'click', target: action });
  assert.equal(actions, 1);
  assert.equal(clicks, 0);
});

test('glass, aurora and midnight themes stay selectable with restrained surfaces', () => {
  for (const theme of ['glass', 'aurora', 'midnight']) {
    flashy('Theme', { theme, duration: 0 });
    assert.ok(document.querySelector(`.flashy-notification.${theme}`));
  }
  const css = document.getElementById('flashy-styles').textContent;
  assert.match(css, /backdrop-filter:blur\(12px\)/);
  assert.doesNotMatch(css, /radial-gradient|linear-gradient|flashy-aurora 10s/);
  assert.match(css, /--flashy-aurora-bg:#292b30/);
  assert.match(css, /--flashy-midnight-bg/);
});

test('horizontal swipe with distance threshold dismisses and small drag returns', async () => {
  let closed = 0;
  flashy('Swipe', { duration: 0, onClose: () => closed++ });
  const toast = document.querySelector('.flashy-notification');
  toast.dispatchEvent({ type: 'pointerdown', clientX: 20, clientY: 20, timeStamp: 1, pointerId: 1 });
  toast.dispatchEvent({ type: 'pointermove', clientX: 45, clientY: 21, timeStamp: 40, pointerId: 1 });
  toast.dispatchEvent({ type: 'pointerup', clientX: 45, clientY: 21, timeStamp: 50, pointerId: 1 });
  assert.equal(toast.style['--flashy-swipe-x'], '0px');
  assert.equal(closed, 0);
  toast.dispatchEvent({ type: 'pointerdown', clientX: 20, clientY: 20, timeStamp: 100, pointerId: 1 });
  toast.dispatchEvent({ type: 'pointermove', clientX: 170, clientY: 22, timeStamp: 150, pointerId: 1 });
  toast.dispatchEvent({ type: 'pointerup', clientX: 170, clientY: 22, timeStamp: 160, pointerId: 1 });
  assert.ok(toast.classList.contains('swiping-out'));
  await sleep(210);
  assert.equal(closed, 1);
});

test('a short fast flick dismisses by velocity', async () => {
  flashy('Flick', { duration: 0 });
  const toast = document.querySelector('.flashy-notification');
  toast.dispatchEvent({ type: 'pointerdown', clientX: 10, clientY: 10, timeStamp: 10, pointerId: 1 });
  toast.dispatchEvent({ type: 'pointermove', clientX: 43, clientY: 10, timeStamp: 20, pointerId: 1 });
  toast.dispatchEvent({ type: 'pointerup', clientX: 43, clientY: 10, timeStamp: 30, pointerId: 1 });
  assert.ok(toast.classList.contains('swiping-out'));
  await sleep(210);
  assert.equal(toast.style.display, 'none');
});

test('promise ring stays on same icon and morphs into final state', async () => {
  const result = flashy.promise(Promise.resolve(42), { loading: 'Working', success: 'Done', error: 'Failed' });
  const toast = document.querySelector('.flashy-notification');
  const icon = toast.querySelector('.flashy-icon');
  assert.ok(icon.innerHTML.includes('flashy-promise-ring'));
  await result;
  assert.equal(toast.querySelector('.flashy-icon'), icon);
  assert.ok(toast.classList.contains('promise-settled'));
  assert.ok(icon.innerHTML.includes('flashy-promise-result'));
});

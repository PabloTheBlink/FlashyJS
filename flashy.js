/* FlashyJS 2.0 - browser, CommonJS and AMD entry */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else if (typeof define === 'function' && define.amd) define(factory);
  else root.flashy = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const defaults = { type: 'default', position: 'top-right', duration: 4000, closable: true, animation: 'spring', theme: 'light', icon: undefined, description: '', image: '', imageAlt: '', action: null, onClick: null, onClose: null, visibleToasts: 3 };
  const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
  const icons = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error: '<path d="M18 6 6 18M6 6l12 12"/>',
    warning: '<path d="M12 3 2 21h20L12 3ZM12 9v4m0 4v.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v5m0-8v.01"/>',
    default: '<circle cx="12" cy="12" r="10"/><path d="M12 11v5m0-8v.01"/>',
    loading: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
  };
  const css = `
:root{--flashy-font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;--flashy-font-size:14px;--flashy-border-radius:12px;--flashy-light-bg:#fff;--flashy-light-text:#202124;--flashy-light-border:#dfe1e5;--flashy-dark-bg:#202124;--flashy-dark-text:#f5f5f4;--flashy-dark-border:#3b3d40;--flashy-success:#168364;--flashy-error:#d84c53;--flashy-warning:#ac7115;--flashy-info:#5374bb;--flashy-default:#68717d;--flashy-shadow:0 12px 32px #00000024,0 2px 6px #00000012;--flashy-gap:12px;--flashy-glass-bg:#ffffffd9;--flashy-glass-border:#dfe1e5;--flashy-glass-text:#202124;--flashy-aurora-bg:#292b30;--flashy-aurora-text:#f5f5f4;--flashy-midnight-bg:#121416;--flashy-midnight-text:#f5f5f4}
.flashy-container{position:fixed;z-index:10000;pointer-events:none;width:min(400px,calc(100vw - 32px));height:0;perspective:900px}
.flashy-container.top-left,.flashy-container.top-center,.flashy-container.top-right{top:16px}
.flashy-container.bottom-left,.flashy-container.bottom-center,.flashy-container.bottom-right{bottom:16px}
.flashy-container.top-left,.flashy-container.bottom-left{left:16px}
.flashy-container.top-right,.flashy-container.bottom-right{right:16px}
.flashy-container.top-center,.flashy-container.bottom-center{left:50%;translate:-50% 0}
.flashy-notification{--flashy-action-bg:color-mix(in srgb,var(--flashy-accent) 13%,transparent);box-sizing:border-box;position:absolute;left:0;right:0;display:flex;align-items:center;gap:12px;min-height:64px;padding:13px 14px;overflow:hidden;border:1px solid var(--flashy-border);border-radius:var(--flashy-border-radius);background:var(--flashy-bg);color:var(--flashy-text);font:var(--flashy-font-size)/1.4 var(--flashy-font-family);box-shadow:var(--flashy-shadow);pointer-events:auto;touch-action:pan-y;user-select:none;will-change:transform,opacity,translate;transition:transform .46s cubic-bezier(.2,1.2,.32,1),opacity .24s,box-shadow .4s,translate .25s ease;translate:var(--flashy-swipe-x,0px) 0;cursor:grab}
.flashy-notification:active{cursor:grabbing}
.flashy-container.top-left .flashy-notification,.flashy-container.top-center .flashy-notification,.flashy-container.top-right .flashy-notification{top:0;transform-origin:top center}
.flashy-container.bottom-left .flashy-notification,.flashy-container.bottom-center .flashy-notification,.flashy-container.bottom-right .flashy-notification{bottom:0;transform-origin:bottom center}
.flashy-notification.light{--flashy-bg:var(--flashy-light-bg);--flashy-text:var(--flashy-light-text);--flashy-border:var(--flashy-light-border)}
.flashy-notification.dark{--flashy-bg:var(--flashy-dark-bg);--flashy-text:var(--flashy-dark-text);--flashy-border:var(--flashy-dark-border)}
.flashy-notification.auto{--flashy-bg:var(--flashy-light-bg);--flashy-text:var(--flashy-light-text);--flashy-border:var(--flashy-light-border)}
@media(prefers-color-scheme:dark){.flashy-notification.auto{--flashy-bg:var(--flashy-dark-bg);--flashy-text:var(--flashy-dark-text);--flashy-border:var(--flashy-dark-border)}}
.flashy-notification.glass{--flashy-bg:var(--flashy-glass-bg);--flashy-text:var(--flashy-glass-text);--flashy-border:var(--flashy-glass-border);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.flashy-notification.aurora{--flashy-bg:var(--flashy-aurora-bg);--flashy-text:var(--flashy-aurora-text);--flashy-border:#4a4d52}
.flashy-notification.midnight{--flashy-bg:var(--flashy-midnight-bg);--flashy-text:var(--flashy-midnight-text);--flashy-border:#35383d}
.flashy-notification.success{--flashy-accent:var(--flashy-success)}.flashy-notification.error{--flashy-accent:var(--flashy-error)}.flashy-notification.warning{--flashy-accent:var(--flashy-warning)}.flashy-notification.info{--flashy-accent:var(--flashy-info)}.flashy-notification.default,.flashy-notification.loading{--flashy-accent:var(--flashy-default)}
.flashy-icon{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:color-mix(in srgb,var(--flashy-accent) 13%,transparent);color:var(--flashy-accent);position:relative}.flashy-icon svg{width:19px;height:19px}.flashy-avatar{flex:none;width:38px;height:38px;object-fit:cover;border-radius:12px}.flashy-content{flex:1;min-width:0;overflow-wrap:anywhere;font-weight:650;letter-spacing:-.015em}.flashy-description{display:block;margin-top:3px;color:var(--flashy-text);opacity:.68;font-size:.88em;font-weight:400;line-height:1.35;letter-spacing:0}.flashy-action{flex:none;border:1px solid color-mix(in srgb,var(--flashy-accent) 36%,transparent);border-radius:9px;background:var(--flashy-action-bg);color:inherit;padding:7px 10px;font:700 12px/1 var(--flashy-font-family);cursor:pointer}.flashy-action:hover{background:color-mix(in srgb,var(--flashy-accent) 25%,transparent)}.flashy-close{flex:none;align-self:flex-start;border:0;background:none;color:inherit;opacity:.55;font-size:20px;line-height:1;cursor:pointer;padding:0 1px}.flashy-close:hover{opacity:1}.flashy-close:focus-visible,.flashy-action:focus-visible{outline:2px solid var(--flashy-accent);outline-offset:3px}
.flashy-progress{position:absolute;bottom:0;left:0;height:2px;width:100%;background:var(--flashy-accent);opacity:.65}
.flashy-container.expanded{height:auto!important;display:flex;gap:var(--flashy-gap)}.flashy-container.expanded.top-left,.flashy-container.expanded.top-center,.flashy-container.expanded.top-right{flex-direction:column-reverse}.flashy-container.expanded.bottom-left,.flashy-container.expanded.bottom-center,.flashy-container.expanded.bottom-right{flex-direction:column}
.flashy-container.expanded .flashy-notification{position:relative;top:auto;bottom:auto;transform:none!important;opacity:1!important;box-shadow:var(--flashy-shadow)}
.flashy-notification.removing{opacity:0!important;pointer-events:none}.flashy-notification.swiping-out{transition:translate .22s ease-out,opacity .22s ease-out;opacity:0}
.flashy-notification.animate-spring{animation:flashy-spring .64s cubic-bezier(.18,.85,.2,1)}.flashy-notification.animate-fade{animation:flashy-fade .24s}.flashy-notification.animate-slide{animation:flashy-slide .35s}.flashy-notification.animate-bounce{animation:flashy-spring .64s cubic-bezier(.18,.85,.2,1)}.flashy-notification.animate-zoom{animation:flashy-zoom .25s}
.flashy-promise-ring,.flashy-promise-result{position:absolute;inset:4px;width:28px!important;height:28px!important;transition:opacity .25s,transform .35s cubic-bezier(.2,1.6,.4,1)}.flashy-promise-ring{animation:flashy-spin 1s linear infinite}.flashy-promise-ring circle:last-child{stroke-dasharray:45 80;stroke-linecap:round}.flashy-promise-result{opacity:0;transform:scale(.5)}.promise-settled .flashy-promise-ring{opacity:0;transform:scale(.5)}.promise-settled .flashy-promise-result{opacity:1;transform:scale(1)}.flashy-promise-result .flashy-cross{display:none}.promise-settled.error .flashy-promise-result .flashy-check{display:none}.promise-settled.error .flashy-promise-result .flashy-cross{display:block}
@keyframes flashy-spring{0%{opacity:0;scale:.82;translate:0 -22px}55%{opacity:1;scale:1.04;translate:0 3px}78%{scale:.985;translate:0 -1px}100%{scale:1;translate:0 0}}@keyframes flashy-fade{from{opacity:0}to{opacity:1}}@keyframes flashy-slide{from{opacity:0;translate:20px 0}to{opacity:1;translate:0 0}}@keyframes flashy-zoom{from{opacity:0;scale:.95}to{opacity:1;scale:1}}@keyframes flashy-spin{to{rotate:360deg}}
@media(prefers-reduced-motion:reduce){.flashy-notification,.flashy-promise-ring,.flashy-promise-result{animation:none!important;transition:none!important}.flashy-notification{scale:1!important;translate:0 0!important}.flashy-progress{transition:none!important}}
`;
  const containers = new Map();
  const records = new Map();
  let listening = false;
  let closeSequence = 0;

  function getContainer(position) {
    let container = containers.get(position);
    if (!container) {
      container = document.createElement('div');
      container.className = `flashy-container ${position} flashy-theme-${defaults.theme}`;
      container.addEventListener('mouseenter', () => { container.classList.add('expanded'); pauseAll(container); layout(container); });
      container.addEventListener('mouseleave', () => { container.classList.remove('expanded'); resumeAll(container); layout(container); });
      container.addEventListener('touchstart', () => { container.classList.add('expanded'); pauseAll(container); layout(container); }, { passive: true });
      document.body.appendChild(container);
      containers.set(position, container);
    }
    return container;
  }

  function setup() {
    if (!document.getElementById('flashy-styles')) {
      const style = document.createElement('style');
      style.id = 'flashy-styles';
      style.textContent = css;
      document.head.appendChild(style);
    }
    if (!listening) {
      document.addEventListener('visibilitychange', visibilityChanged);
      document.addEventListener('keydown', keyDown);
      document.addEventListener('touchstart', outsideTouch, { passive: true });
      listening = true;
    }
  }

  function layout(container) {
    const items = [...container.children].filter(el => records.has(el) && !el.classList.contains('removing'));
    const visible = Math.max(1, Math.floor(Number(container._visibleToasts) || 3));
    const limit = Math.min(visible, items.length);
    const newest = items[items.length - 1];
    container.style.height = newest ? `${newest.offsetHeight + (limit - 1) * 10}px` : '0px';
    items.forEach((el, i) => {
      const depth = items.length - 1 - i;
      const hidden = depth >= visible;
      el.style.display = hidden ? 'none' : '';
      el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
      el.style.zIndex = String(items.length - depth);
      const sign = container.className.includes('bottom-') ? -1 : 1;
      el.style.transform = `translateY(${sign * depth * 13}px) translateZ(${-depth * 24}px) rotateX(${sign * depth * -2}deg) scale(${1 - depth * .055})`;
      el.style.opacity = String(1 - depth * .13);
      el.style.filter = depth ? `brightness(${1 - depth * .045})` : '';
      for (const button of el.querySelectorAll('.flashy-close, .flashy-action')) button.tabIndex = hidden ? -1 : 0;
    });
  }

  function pause(record) {
    if (!record.timer) return;
    clearTimeout(record.timer);
    record.timer = null;
    record.remaining = Math.max(0, record.remaining - (Date.now() - record.started));
    const bar = record.el.querySelector('.flashy-progress');
    if (bar && record.duration) {
      bar.style.transition = 'none';
      bar.style.width = `${Math.max(0, record.remaining / record.duration * 100)}%`;
    }
  }
  function resume(record) {
    if (record.closed || record.timer || !record.remaining || document.hidden || record.el.parentNode.classList.contains('expanded')) return;
    record.started = Date.now();
    record.timer = setTimeout(() => close(record), record.remaining);
    const bar = record.el.querySelector('.flashy-progress');
    if (bar) {
      bar.style.transition = `width ${record.remaining}ms linear`;
      requestAnimationFrame(() => { if (!record.closed && record.timer) bar.style.width = '0%'; });
    }
  }
  function pauseAll(container) { for (const el of container.children) { const r = records.get(el); if (r) pause(r); } }
  function resumeAll(container) { for (const el of container.children) { const r = records.get(el); if (r) resume(r); } }
  function visibilityChanged() { for (const r of records.values()) document.hidden ? pause(r) : resume(r); }
  function keyDown(event) {
    if (event.key !== 'Escape') return;
    const visible = [...records.values()].filter(r => !r.closed && r.el.style.display !== 'none');
    if (visible.length) close(visible[visible.length - 1]);
  }
  function outsideTouch(event) {
    for (const container of containers.values()) {
      if (container.classList.contains('expanded') && !container.contains(event.target)) {
        container.classList.remove('expanded'); resumeAll(container); layout(container);
      }
    }
  }
  function close(record) {
    if (!record || record.closed) return;
    record.closed = true;
    pause(record);
    record.el.classList.add('removing');
    records.delete(record.el);
    const container = record.el.parentNode;
    if (typeof record.config.onClose === 'function') {
      try { record.config.onClose(); } catch (error) { console.warn('Flashy: onClose failed', error); }
    }
    // Remove immediately from the accessibility tree and stack; retain exit animation briefly.
    record.el.setAttribute('aria-hidden', 'true');
    record.el.style.display = 'none';
    layout(container);
    setTimeout(() => { if (record.el.parentNode) record.el.remove(); }, 200);
  }
  function normalize(options) {
    const config = { ...defaults, ...(typeof options === 'string' ? { type: options } : options) };
    if (!icons[config.type]) config.type = 'default';
    if (!positions.includes(config.position)) config.position = 'top-right';
    if (!['spring', 'slide', 'fade', 'bounce', 'zoom'].includes(config.animation)) config.animation = 'spring';
    if (!['light', 'dark', 'auto', 'glass', 'aurora', 'midnight'].includes(config.theme)) config.theme = 'light';
    config.duration = Number.isFinite(Number(config.duration)) ? Math.max(0, Number(config.duration)) : defaults.duration;
    return config;
  }
  function render(record, message, type) {
    const el = record.el;
    el.className = `flashy-notification ${type} ${record.config.theme} animate-${record.config.animation} ${record.config.position}${record.promiseState ? ' promise-' + record.promiseState : ''}`;
    el.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
    el.setAttribute('aria-live', type === 'error' || type === 'warning' ? 'assertive' : 'polite');
    const icon = record.config.icon !== undefined ? record.config.icon : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[type]}</svg>`;
    const iconEl = el.querySelector('.flashy-icon');
    if (iconEl && !record.promiseState) iconEl.innerHTML = icon || '';
    if (iconEl && record.promiseState === 'loading') iconEl.innerHTML = '<svg class="flashy-promise-ring" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="16" cy="16" r="12" opacity=".2"/><circle cx="16" cy="16" r="12"/></svg><svg class="flashy-promise-result" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="flashy-check" d="m8 16 5 5 11-12"/><path class="flashy-cross" d="M10 10 22 22 M22 10 10 22"/></svg>';
    el.querySelector('.flashy-content').textContent = String(message);
    if (record.config.description) {
      const detail = document.createElement('span'); detail.className = 'flashy-description'; detail.textContent = String(record.config.description);
      el.querySelector('.flashy-content').appendChild(detail);
    }
  }
  function swipe(record) {
    const el = record.el;
    let startX = 0, startY = 0, startTime = 0, lastX = 0, lastTime = 0, active = false;
    el.addEventListener('pointerdown', event => {
      if (event.button && event.pointerType === 'mouse') return;
      if (event.target.closest('.flashy-close') || event.target.closest('.flashy-action')) return;
      active = true; startX = lastX = event.clientX; startY = event.clientY; startTime = lastTime = event.timeStamp || Date.now();
      el.setPointerCapture?.(event.pointerId);
    });
    el.addEventListener('pointermove', event => {
      if (!active) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) < 5 || Math.abs(dx) < Math.abs(event.clientY - startY)) return;
      el.style.setProperty('--flashy-swipe-x', `${dx}px`);
      el.style.opacity = String(Math.max(.35, 1 - Math.abs(dx) / (el.offsetWidth || 400)));
      lastX = event.clientX; lastTime = event.timeStamp || Date.now();
    });
    const finish = event => {
      if (!active) return;
      active = false;
      const dx = event.clientX - startX;
      const velocity = (event.clientX - lastX) / Math.max(1, (event.timeStamp || Date.now()) - lastTime);
      const overall = dx / Math.max(1, (event.timeStamp || Date.now()) - startTime);
      if (Math.abs(dx) > (el.offsetWidth || 400) * .28 || (Math.abs(dx) > 18 && Math.abs(velocity || overall) > .55)) {
        record.swiped = Date.now();
        el.classList.add('swiping-out');
        el.style.setProperty('--flashy-swipe-x', `${Math.sign(dx) * (el.offsetWidth || 400) * 1.3}px`);
        setTimeout(() => close(record), 190);
      } else {
        el.style.setProperty('--flashy-swipe-x', '0px');
        layout(el.parentNode);
      }
    };
    el.addEventListener('pointerup', finish);
    el.addEventListener('pointercancel', finish);
  }
  function flashy(message, options = {}) {
    if (typeof document === 'undefined') { console.warn('Flashy: No se puede usar fuera del navegador'); return () => {}; }
    if (!message || typeof message !== 'string') { console.warn('Flashy: El mensaje debe ser una cadena de texto'); return () => {}; }
    setup();
    const config = normalize(options);
    const container = getContainer(config.position);
    container._visibleToasts = config.visibleToasts;
    container.classList.remove('flashy-theme-light', 'flashy-theme-dark', 'flashy-theme-auto', 'flashy-theme-glass', 'flashy-theme-aurora', 'flashy-theme-midnight');
    container.classList.add(`flashy-theme-${config.theme}`);
    const el = document.createElement('div');
    el.innerHTML = '<span class="flashy-icon" aria-hidden="true"></span><div class="flashy-content"></div>';
    if (config.image) {
      const image = document.createElement('img'); image.className = 'flashy-avatar'; image.src = String(config.image); image.alt = String(config.imageAlt || '');
      el.insertBefore(image, el.querySelector('.flashy-content'));
    }
    if (config.action && config.action.label && typeof config.action.onClick === 'function') {
      const action = document.createElement('button'); action.className = 'flashy-action'; action.type = 'button'; action.textContent = String(config.action.label);
      action.addEventListener('click', event => { event.stopPropagation(); try { config.action.onClick(); } catch (error) { console.warn('Flashy: action failed', error); } });
      el.appendChild(action);
    }
    if (config.closable) {
      const button = document.createElement('button');
      button.className = 'flashy-close'; button.type = 'button'; button.setAttribute('aria-label', 'Cerrar notificación'); button.textContent = '×';
      button.addEventListener('click', event => { event.stopPropagation(); close(records.get(el)); });
      el.appendChild(button);
    }
    if (config.duration > 0) {
      const bar = document.createElement('div'); bar.className = 'flashy-progress'; bar.setAttribute('aria-hidden', 'true'); el.appendChild(bar);
    }
    const record = { el, config, duration: config.duration, remaining: config.duration, started: 0, timer: null, closed: false, sequence: ++closeSequence, promiseState: config.type === 'loading' && config._promise ? 'loading' : '' };
    render(record, message, config.type);
    swipe(record);
    if (typeof config.onClick === 'function') el.addEventListener('click', event => {
      if (event.target.closest('.flashy-close') || event.target.closest('.flashy-action') || Date.now() - (record.swiped || 0) < 300) return;
      try { config.onClick(); } catch (error) { console.warn('Flashy: onClick failed', error); }
    });
    records.set(el, record);
    container.appendChild(el);
    layout(container);
    if (config.duration > 0) resume(record);
    return () => close(record);
  }
  flashy.promise = function (promiseOrFn, messages) {
    const before = closeSequence;
    flashy(String(messages.loading), { type: 'loading', duration: 0, closable: false, _promise: true });
    const record = [...records.values()].find(item => item.sequence > before);
    let promise;
    try { promise = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn; }
    catch (error) { promise = Promise.reject(error); }
    return Promise.resolve(promise).then(
      value => { if (record && !record.closed) settle(record, messages.success, value, 'success'); return value; },
      error => { if (record && !record.closed) settle(record, messages.error, error, 'error'); throw error; }
    );
  };
  function settle(record, message, value, type) {
    let text;
    try { text = typeof message === 'function' ? message(value) : message; }
    catch (error) { text = String(error); }
    record.config.type = type;
    record.config.closable = true;
    record.promiseState = 'settled';
    render(record, text, type);
    if (!record.el.querySelector('.flashy-close')) {
      const button = document.createElement('button'); button.className = 'flashy-close'; button.type = 'button'; button.setAttribute('aria-label', 'Cerrar notificación'); button.textContent = '×';
      button.addEventListener('click', event => { event.stopPropagation(); close(record); });
      record.el.appendChild(button);
    }
    record.duration = defaults.duration;
    record.remaining = defaults.duration;
    if (record.duration > 0 && !record.el.querySelector('.flashy-progress')) {
      const bar = document.createElement('div'); bar.className = 'flashy-progress'; bar.setAttribute('aria-hidden', 'true'); record.el.appendChild(bar);
    }
    layout(record.el.parentNode);
    resume(record);
  }
  flashy.closeAll = () => { for (const record of [...records.values()]) close(record); };
  flashy.setDefaults = options => { if (options && typeof options === 'object') Object.assign(defaults, options); for (const container of containers.values()) { container._visibleToasts = defaults.visibleToasts; layout(container); } };
  flashy.getOptions = () => ({ ...defaults });
  flashy.destroy = () => {
    flashy.closeAll();
    for (const container of containers.values()) container.remove();
    containers.clear();
    if (typeof document !== 'undefined') {
      document.getElementById('flashy-styles')?.remove();
      if (listening) {
        document.removeEventListener('visibilitychange', visibilityChanged);
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('touchstart', outsideTouch);
      }
    }
    listening = false;
  };
  for (const type of ['success', 'error', 'warning', 'info']) flashy[type] = (message, options = {}) => flashy(message, { ...options, type });
  flashy.version = '2.0.0';
  return flashy;
});

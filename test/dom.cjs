class Element {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.className = '';
    this.style = { setProperty(name, value) { this[name] = value; } };
    this.attributes = {};
    this.listeners = new Map();
    this.textContent = '';
    this._html = '';
    this.offsetHeight = 52;
  }
  get classList() {
    const self = this;
    return {
      contains(name) { return self.className.split(' ').includes(name); },
      add(...names) { self.className = [...new Set([...self.className.split(' ').filter(Boolean), ...names])].join(' '); },
      remove(...names) { self.className = self.className.split(' ').filter(name => !names.includes(name)).join(' '); }
    };
  }
  set innerHTML(html) {
    this._html = html;
    if (html.includes('flashy-icon') && html.includes('flashy-content')) {
      this.children = [];
      const icon = new Element('span'); icon.className = 'flashy-icon';
      const content = new Element('div'); content.className = 'flashy-content';
      this.appendChild(icon); this.appendChild(content);
    }
  }
  get innerHTML() { return this._html; }
  appendChild(child) { if (child.parentNode) child.remove(); this.children.push(child); child.parentNode = this; return child; }
  insertBefore(child, sibling) { if (child.parentNode) child.remove(); const at = this.children.indexOf(sibling); this.children.splice(at < 0 ? this.children.length : at, 0, child); child.parentNode = this; return child; }
  removeChild(child) { this.children.splice(this.children.indexOf(child), 1); child.parentNode = null; return child; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name] ?? null; }
  addEventListener(name, callback) { const list = this.listeners.get(name) || []; list.push(callback); this.listeners.set(name, list); }
  removeEventListener(name, callback) { this.listeners.set(name, (this.listeners.get(name) || []).filter(fn => fn !== callback)); }
  dispatchEvent(event) { event.target ||= this; event.stopPropagation ||= () => {}; for (const fn of this.listeners.get(event.type) || []) fn(event); }
  contains(target) { return this === target || this.children.some(child => child.contains(target)); }
  closest(selector) { for (let node = this; node; node = node.parentNode) if (node.matches(selector)) return node; return null; }
  matches(selector) { return selector.startsWith('.') ? selector.slice(1).split('.').every(name => this.classList.contains(name)) : selector.startsWith('#') ? this.id === selector.slice(1) : false; }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  querySelectorAll(selector) { const selectors = selector.split(',').map(part => part.trim()); return this.children.flatMap(child => [...(selectors.some(part => child.matches(part)) ? [child] : []), ...child.querySelectorAll(selector)]); }
}
class Document extends Element {
  constructor() { super('document'); this.head = this.appendChild(new Element('head')); this.body = this.appendChild(new Element('body')); this.hidden = false; }
  createElement(name) { return new Element(name); }
  getElementById(id) { return this.querySelector(`#${id}`); }
}
function installDOM() {
  global.document = new Document();
  global.requestAnimationFrame = callback => setTimeout(callback, 0);
  return global.document;
}
module.exports = { installDOM };

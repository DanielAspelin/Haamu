'use strict';

/**
 * Haamu HTML foundation.
 * Owns generic DOM construction only; no Plate state, animation, rendering,
 * layout policy, or application command behavior.
 */
(() => {
  const element = (tag, options = {}) => {
    const node = document.createElement(tag);
    if (options.className) node.className = options.className;
    if (options.text != null) node.textContent = String(options.text);
    for (const [name, value] of Object.entries(options.attributes ?? {})) {
      if (value != null) node.setAttribute(name, String(value));
    }
    for (const [name, value] of Object.entries(options.dataset ?? {})) {
      if (value != null) node.dataset[name] = String(value);
    }
    for (const child of options.children ?? []) {
      if (child) node.append(child);
    }
    return node;
  };

  globalThis.HaamuHTML = Object.freeze({
    version: '0.1.0',
    element,
    fragment: (...children) => {
      const fragment = document.createDocumentFragment();
      fragment.append(...children.filter(Boolean));
      return fragment;
    }
  });
})();

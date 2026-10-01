'use strict';

/**
 * Haamu HTML Button.
 * Generates the production-equivalent corner control DOM only.
 * Opening/closing Plates remains outside this module.
 */
(() => {
  const HTML = globalThis.HaamuHTML;
  if (!HTML) throw new Error('HaamuHTML must load before html.button.js');

  const create = ({ position, className, label }) => {
    const button = HTML.element('button', {
      className,
      attributes: { type: 'button', 'aria-label': label },
      dataset: { position, snap: position }
    });
    return button;
  };

  globalThis.HaamuHTMLButton = Object.freeze({ version: '0.2.0', create });
})();

'use strict';

/**
 * Haamu HTML Plate.
 * Generates Plate structure only. It owns neither transition state nor
 * WebText/particle rendering.
 */
(() => {
  const HTML = globalThis.HaamuHTML;
  if (!HTML) throw new Error('HaamuHTML must load before html.plate.js');

  const create = ({ id, corner, platform, prompt }) => {
    const content = HTML.element('div', { className: 'plate-content-row' });
    const promptRow = HTML.element('div', {
      className: 'plate-prompt-row',
      children: prompt ? [prompt.root] : []
    });
    const matrix = HTML.element('div', {
      className: 'plate-matrix',
      children: [content, promptRow]
    });
    const root = HTML.element('section', {
      className: 'corner-menu',
      attributes: { id, 'aria-hidden': 'true' },
      dataset: { corner, platform },
      children: [matrix]
    });
    return Object.freeze({ root, matrix, content, promptRow, prompt });
  };

  globalThis.HaamuHTMLPlate = Object.freeze({ version: '0.1.0', create });
})();

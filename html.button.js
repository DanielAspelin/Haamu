'use strict';

/**
 * Haamu HTML Button.
 * Generates semantic corner-button DOM only. It does not open/close Plates.
 */
(() => {
  const HTML = globalThis.HaamuHTML;
  if (!HTML) throw new Error('HaamuHTML must load before html.button.js');

  const create = ({ position, label, controls }) => HTML.element('button', {
    className: 'corner start',
    text: label,
    attributes: {
      type: 'button',
      'aria-expanded': 'false',
      'aria-controls': controls
    },
    dataset: { position }
  });

  globalThis.HaamuHTMLButton = Object.freeze({ version: '0.1.0', create });
})();

'use strict';

/**
 * Haamu HTML Prompt.
 * Generates semantic input/projection attachment structure only.
 * Input remains native authority; visual rendering belongs elsewhere.
 */
(() => {
  const HTML = globalThis.HaamuHTML;
  if (!HTML) throw new Error('HaamuHTML must load before html.prompt.js');

  const create = ({ id, label = 'Prompt' }) => {
    const textarea = HTML.element('textarea', {
      className: 'plate-prompt',
      attributes: {
        id,
        rows: '1',
        spellcheck: 'false',
        autocomplete: 'off',
        'aria-label': label
      }
    });
    const projection = HTML.element('div', {
      className: 'plate-prompt-projection',
      attributes: { 'aria-hidden': 'true' }
    });
    const wrap = HTML.element('div', {
      className: 'plate-prompt-wrap',
      children: [textarea, projection]
    });
    return Object.freeze({ root: wrap, input: textarea, projection });
  };

  globalThis.HaamuHTMLPrompt = Object.freeze({ version: '0.1.0', create });
})();

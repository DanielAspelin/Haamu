'use strict';

/**
 * Haamu HTML Prompt.
 * Generates the production-equivalent static Prompt DOM only.
 * Native input behavior, WebText rendering and Plate transitions remain
 * independent responsibilities.
 */
(() => {
  const HTML = globalThis.HaamuHTML;
  if (!HTML) throw new Error('HaamuHTML must load before html.prompt.js');

  const create = ({ promptId, title }) => {
    const input = HTML.element('textarea', {
      className: 'plate-prompt',
      attributes: {
        rows: '1', placeholder: title, autocomplete: 'off', spellcheck: 'false',
        autocorrect: 'off', autocapitalize: 'off', 'data-gramm': 'false',
        'data-gramm_editor': 'false', 'data-enable-grammarly': 'false',
        'aria-label': title + ' prompt'
      },
      dataset: { logicalPrompt: promptId }
    });
    input.rows = 1;
    input.spellcheck = false;

    const measure = HTML.element('div', {
      className: 'plate-prompt-measure', attributes: { 'aria-hidden': 'true' }
    });
    const caret = HTML.element('span', {
      className: 'plate-prompt-caret', attributes: { 'aria-hidden': 'true' }
    });
    caret.hidden = true;
    const field = HTML.element('div', {
      className: 'plate-prompt-text-field', children: [caret]
    });
    const projection = HTML.element('div', {
      className: 'plate-prompt-projection plate-prompt-text-area is-empty',
      attributes: { 'aria-hidden': 'true' }, children: [field]
    });
    const label = HTML.element('span', { className: 'plate-prompt-label', text: title });
    label.style.cssText = [
      'display:block','visibility:visible','opacity:1',
      'color:rgba(0,0,0,.78)','-webkit-text-fill-color:rgba(0,0,0,.78)',
      '-webkit-text-stroke:0','text-shadow:0 1px 0 rgba(255,255,255,.32)',
      'mix-blend-mode:normal'
    ].join(';');

    const root = HTML.element('div', {
      className: 'plate-prompt-wrap',
      children: [measure, projection, input, label]
    });
    return Object.freeze({ root, input, measure, projection, field, caret, label });
  };

  globalThis.HaamuHTMLPrompt = Object.freeze({ version: '0.2.0', create });
})();

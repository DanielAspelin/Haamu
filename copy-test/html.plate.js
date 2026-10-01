'use strict';

/**
 * Haamu HTML Plate.
 * Generates the production-equivalent static Plate DOM only.
 * State, event behavior, transition policy and rendering remain external.
 */
(() => {
  const HTML = globalThis.HaamuHTML;
  if (!HTML) throw new Error('HaamuHTML must load before html.plate.js');

  const create = ({ corner, platform, title, promptId, plateId, channelId, plateState = 'normal' }) => {
    const prompt = globalThis.HaamuHTMLPrompt.create({ promptId, title });

    const contentRegion = HTML.element('div', {
      className: 'plate-content-region',
      attributes: { role: 'cell', 'aria-live': 'polite' },
      dataset: { logicalPlate: plateId, channel: channelId }
    });
    const contentRow = HTML.element('div', {
      className: 'plate-row plate-content-row',
      attributes: { role: 'row' }, children: [contentRegion]
    });
    const promptRow = HTML.element('div', {
      className: 'plate-row plate-prompt-row',
      attributes: { role: 'row' }, children: [prompt.root]
    });
    const table = HTML.element('div', {
      className: 'plate-table', attributes: { role: 'table' },
      children: [contentRow, promptRow]
    });
    const matrix = HTML.element('div', {
      className: 'plate-matrix', dataset: { matrix: platform + '-' + corner },
      children: [table]
    });

    const children = [];
    let stateToggle = null;
    if (platform === 'desktop') {
      stateToggle = HTML.element('button', {
        className: 'plate-state-toggle', text: '□',
        attributes: {
          type: 'button', 'aria-label': 'Maximize ' + title + ' Plate',
          'aria-pressed': 'false'
        },
        dataset: { action: 'toggle-maximize' }
      });
      children.push(stateToggle);
    }
    children.push(matrix);

    const root = HTML.element('section', {
      className: 'corner-menu',
      attributes: { 'aria-hidden': 'true' },
      dataset: {
        corner, platform, prompt: promptId, plate: plateId, channel: channelId,
        plateState: platform === 'mobile' ? 'automatic' : plateState
      },
      children
    });

    return Object.freeze({
      root, stateToggle, matrix, table, contentRow, contentRegion, promptRow, prompt
    });
  };

  globalThis.HaamuHTMLPlate = Object.freeze({ version: '0.2.0', create });
})();

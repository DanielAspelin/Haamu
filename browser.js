'use strict';

/**
 * Haamu Browser — four-corner / four-pane visual projection.
 * Center is intentionally unoccupied.
 */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.109.0',
  position: 'between-browser-entry-and-web-entry',
});

globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('browser');

const HaamuLayout = Object.freeze({
  version: '0.7.0',
  center: 'empty',
  corners: Object.freeze({
    topLeft: Object.freeze({ role: 'start', color: 'neon-green' }),
    topRight: Object.freeze({ role: 'start', color: 'lemon-yellow' }),
    bottomLeft: Object.freeze({ role: 'start', color: 'purple' }),
    bottomRight: Object.freeze({ role: 'start', color: 'orange' }),
  }),
  panes: Object.freeze(['top-center', 'left-middle', 'right-middle', 'bottom-center']),
});

globalThis.HaamuLayout = HaamuLayout;

function projectHaamuBrowser(root = document.getElementById('haamu-root')) {
  if (!root) throw new Error('Haamu visual root not found.');

  // Phase 1 is deliberately geometry-only: remove every prior projection.
  root.replaceChildren();
  const shell = document.createElement('main');
  shell.className = 'haamu-interface';
  const mobilePlatform = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  shell.classList.add(mobilePlatform ? 'haamu-mobile' : 'haamu-desktop');
  shell.setAttribute('aria-label', 'Haamu interface');

  // First projected layer after the shell background: centered identity text.
  // Controls and plates remain on their higher established z-index layers.
  const wordmarkLayer = document.createElement('div');
  wordmarkLayer.className = 'haamu-wordmark-layer';
  wordmarkLayer.setAttribute('aria-hidden', 'true');
  const wordmark = document.createElement('div');
  wordmark.className = 'haamu-wordmark';
  wordmark.textContent = 'HAAMU';
  wordmarkLayer.appendChild(wordmark);
  shell.appendChild(wordmarkLayer);

  const positions = [
    ['top-left', 'corner start neon-green', 'Start control, top left'],
    ['top-center', 'pane top-pane', 'Top pane'],
    ['top-right', 'corner start lemon-yellow', 'Start control, top right'],
    ['left-middle', 'pane left-pane', 'Left pane'],
    ['center', 'center', ''],
    ['right-middle', 'pane right-pane', 'Right pane'],
    ['bottom-left', 'corner start purple', 'Start control, bottom left'],
    ['bottom-center', 'pane bottom-pane', 'Bottom pane'],
    ['bottom-right', 'corner start orange', 'Start control, bottom right'],
  ];

  for (const [position, classes, label] of positions) {
    const element = classes.includes('start')
      ? document.createElement('button')
      : document.createElement('section');
    element.className = classes;
    element.dataset.position = position;
    if (classes.includes('start')) {
      element.dataset.snap = position;
    }
    if (label) element.setAttribute('aria-label', label);
    if (classes.includes('start')) element.type = 'button';
    shell.appendChild(element);
  }

  /*
   * Plate layer is constructed before the control layer is promoted.
   * This is a real projection layer, not only a z-index convention.
   */
  const plateLayer = document.createElement('div');
  plateLayer.className = 'plate-layer';
  plateLayer.setAttribute('aria-hidden', 'true');
  shell.prepend(plateLayer);

  const menus = new Map();
  const logicalPrompts = new Map();
  const plateTitles = Object.freeze({
    'top-left': 'SERVER',
    'top-right': 'LOCAL',
    'bottom-left': 'GLOBAL',
    'bottom-right': 'CLIENT',
  });
  for (const button of shell.querySelectorAll('.corner.start')) {
    const corner = button.dataset.position;
    const promptId = 'prompt-' + corner;
    const projections = Object.create(null);

    for (const platform of ['mobile', 'desktop']) {
      const menu = document.createElement('section');
      menu.className = 'corner-menu';
      menu.dataset.corner = corner;
      menu.dataset.platform = platform;
      menu.dataset.prompt = promptId;
      menu.setAttribute('aria-hidden', 'true');

      const matrix = document.createElement('div');
      matrix.className = 'plate-matrix';
      matrix.dataset.matrix = platform + '-' + corner;

      const table = document.createElement('div');
      table.className = 'plate-table';
      table.setAttribute('role', 'table');

      const promptRow = document.createElement('div');
      promptRow.className = 'plate-row plate-prompt-row';
      promptRow.setAttribute('role', 'row');

      const prompt = document.createElement('input');
      prompt.className = 'plate-prompt';
      prompt.type = 'text';
      prompt.placeholder = plateTitles[corner] + ' — Prompt';
      prompt.setAttribute('placeholder', plateTitles[corner] + ' — Prompt');
      prompt.autocomplete = 'off';
      prompt.setAttribute('aria-label', plateTitles[corner] + ' prompt');
      prompt.dataset.logicalPrompt = promptId;
      prompt.addEventListener('input', () => {
        logicalPrompts.set(promptId, prompt.value);
        for (const peer of plateLayer.querySelectorAll('[data-logical-prompt="' + promptId + '"]')) {
          if (peer !== prompt) peer.value = prompt.value;
        }
      });

      const promptWrap = document.createElement('div');
      promptWrap.className = 'plate-prompt-wrap';
      const promptLabel = document.createElement('span');
      promptLabel.className = 'plate-prompt-label';
      promptLabel.textContent = plateTitles[corner] + ' — Prompt';
      promptWrap.appendChild(prompt);
      promptWrap.appendChild(promptLabel);
      prompt.addEventListener('input', () => {
        promptWrap.classList.toggle('has-value', prompt.value.length > 0);
      });
      promptRow.appendChild(promptWrap);
      table.appendChild(promptRow);
      matrix.appendChild(table);
      menu.appendChild(matrix);
      plateLayer.appendChild(menu);
      projections[platform] = menu;
    }

    menus.set(corner, projections);
    button.setAttribute('aria-expanded', 'false');
    let buttonMorph = null;
    let buttonMorphTimers = [];
    button.addEventListener('click', () => {
      buttonMorph?.cancel();
      buttonMorphTimers.forEach(clearTimeout);
      buttonMorphTimers = [];

      const rgb = getComputedStyle(button).getPropertyValue('--corner-rgb').trim();
      const paint = (background, brightness, scale) => {
        button.style.backgroundColor = background;
        button.style.filter = 'brightness(' + brightness + ')';
        button.style.transform = 'scale(' + scale + ')';
      };

      paint('rgba(' + rgb + ', .32)', .52, .90);
      buttonMorphTimers.push(setTimeout(() => {
        paint('rgba(' + rgb + ', 1)', 1.65, 1.06);
      }, 260));
      buttonMorphTimers.push(setTimeout(() => {
        button.style.backgroundColor = '';
        button.style.filter = '';
        button.style.transform = '';
      }, 620));

      const activePlatform = mobilePlatform ? 'mobile' : 'desktop';
      const current = [...menus.entries()].find(([, pair]) =>
        Object.values(pair).some(candidate => candidate.classList.contains('open')));
      const same = current && current[0] === button.dataset.position;

      if (current) {
        const [position, pair] = current;
        for (const active of Object.values(pair)) {
          active.classList.remove('open');
          active.setAttribute('aria-hidden', 'true');
        }
        shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');
      }

      if (!same) {
        const menu = projections[activePlatform];
        menu.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => menu.classList.add('open'));
      }
    });
  }

  shell.addEventListener('click', (event) => {
    if (event.target.closest('.corner.start') || event.target.closest('.corner-menu')) return;

    for (const [position, pair] of menus.entries()) {
      const open = Object.values(pair).filter(active => active.classList.contains('open'));
      if (!open.length) continue;
      for (const active of open) {
        active.classList.remove('open');
        active.setAttribute('aria-hidden', 'true');
      }
      shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');
    }
  });

  root.appendChild(shell);
  document.documentElement.dataset.haamu = 'ready';
  return Object.freeze({
    state: 'READY',
    layout: HaamuLayout.version,
    corners: 4,
    panes: 4,
    center: 'empty',
    cornerMenus: 8,
    matrices: 8,
    tables: 8,
    logicalPrompts: 4,
  });
}

globalThis.projectHaamuBrowser = projectHaamuBrowser;

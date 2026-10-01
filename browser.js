'use strict';

/**
 * Haamu Browser — four-corner / four-pane visual projection.
 * Center is intentionally unoccupied.
 */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.112.0',
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
  globalThis.HaamuVisual?.dispose();
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
  // Individual closed plates own visibility and focus exclusion.
  shell.prepend(plateLayer);

  const controlAnimation = HaamuBrowserAnimation.create();
  const views = new Map();
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
      menu.inert = true;

      const matrix = document.createElement('div');
      matrix.className = 'plate-matrix';
      matrix.dataset.matrix = platform + '-' + corner;

      const table = document.createElement('div');
      table.className = 'plate-table';


      const promptRow = document.createElement('div');
      promptRow.className = 'plate-row plate-prompt-row';


      const prompt = document.createElement('input');
      prompt.className = 'plate-prompt';
      prompt.type = 'text';
      prompt.placeholder = plateTitles[corner];
      prompt.setAttribute('placeholder', plateTitles[corner]);
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
      promptLabel.textContent = plateTitles[corner];
      promptWrap.appendChild(prompt);
      promptWrap.appendChild(promptLabel);
      prompt.addEventListener('input', () => {
        promptWrap.classList.toggle('has-value', prompt.value.length > 0);
      });
      promptRow.appendChild(promptWrap);
      table.appendChild(promptRow);
      matrix.appendChild(table);
      menu.appendChild(matrix);
      const content = document.createElement('div');
      content.className = 'plate-content';
      menu.appendChild(content);
      const plate = HaamuWebPlate.create({ id: platform + '-' + corner, platform, corner });
      views.set(platform + '-' + corner, HaamuWebDOM.mount(content, plate));
      plateLayer.appendChild(menu);
      projections[platform] = menu;
    }

    menus.set(corner, projections);
    button.setAttribute('aria-expanded', 'false');
    HaamuWebDOM.decorateButton(button);
    button.addEventListener('click', () => {
      controlAnimation.animate(corner, button, [
        { transform: 'scale(1)' }, { transform: 'scale(.90)' },
        { transform: 'scale(1.06)' }, { transform: 'scale(1)' },
      ], { duration: 620 });

      const activePlatform = mobilePlatform ? 'mobile' : 'desktop';
      const current = [...menus.entries()].find(([, pair]) =>
        Object.values(pair).some(candidate => candidate.classList.contains('open')));
      const same = current && current[0] === button.dataset.position;

      if (current) {
        const [position, pair] = current;
        for (const active of Object.values(pair)) {
          active.classList.remove('open');
          active.setAttribute('aria-hidden', 'true');
        active.inert = true;
        }
        shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');
      }

      if (!same) {
        const menu = projections[activePlatform];
        menu.setAttribute('aria-hidden', 'false');
        menu.inert = false;
        button.setAttribute('aria-expanded', 'true');
        menu.classList.add('open');
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
        active.inert = true;
      }
      shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');
    }
  });

  globalThis.HaamuVisual = Object.freeze({
    // Presentation-only API: callers supply text and real numeric results.
    render(corner, value, options = {}) {
      if (!views.has('desktop-' + corner)) throw new RangeError('Unknown corner');
      const results = {};
      for (const platform of ['mobile', 'desktop']) results[platform] = views.get(platform + '-' + corner).render(value, options);
      return Object.freeze(results);
    },
    animate(corner, id, keyframes, options) {
      return views.get((mobilePlatform ? 'mobile-' : 'desktop-') + corner)?.animate(id, keyframes, options);
    },
    button(corner, label, value = '') {
      const button = shell.querySelector('.corner[data-position="' + corner + '"]');
      if (!button) throw new RangeError('Unknown corner');
      HaamuWebDOM.updateButton(button, label, value);
    },
    dispose() { controlAnimation.dispose(); for (const view of views.values()) view.dispose(); },
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

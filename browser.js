'use strict';

/**
 * Haamu Browser — four-corner / four-pane visual projection.
 * Center is intentionally unoccupied.
 */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.71.0',
  position: 'between-browser-entry-and-web-entry',
});

globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('browser');

const HaamuLayout = Object.freeze({
  version: '0.6.0',
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
  shell.setAttribute('aria-label', 'Haamu interface');

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
  for (const button of shell.querySelectorAll('.corner.start')) {
    const menu = document.createElement('section');
    menu.className = 'corner-menu';
    menu.dataset.corner = button.dataset.position;
    menu.setAttribute('aria-hidden', 'true');
    plateLayer.appendChild(menu);
    menus.set(button.dataset.position, menu);

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

      const current = [...menus.entries()].find(([, candidate]) => candidate.classList.contains('open'));
      const same = current && current[0] === button.dataset.position;

      if (current) {
        const [position, active] = current;
        active.classList.remove('open');
        active.setAttribute('aria-hidden', 'true');
        shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');
      }

      if (!same) {
        menu.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => menu.classList.add('open'));
      }
    });
  }

  shell.addEventListener('click', (event) => {
    if (event.target.closest('.corner.start') || event.target.closest('.corner-menu')) return;

    for (const [position, active] of menus.entries()) {
      if (!active.classList.contains('open')) continue;
      active.classList.remove('open');
      active.setAttribute('aria-hidden', 'true');
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
    cornerMenus: 4,
  });
}

globalThis.projectHaamuBrowser = projectHaamuBrowser;

'use strict';

/**
 * Haamu Browser — four-corner / four-pane visual projection.
 * Center is intentionally unoccupied.
 */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.7.0',
  position: 'between-browser-entry-and-web-entry',
});

globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('browser');

const HaamuLayout = Object.freeze({
  version: '0.4.0',
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
    if (label) element.setAttribute('aria-label', label);
    if (classes.includes('start')) element.type = 'button';
    shell.appendChild(element);
  }

  const menus = new Map();
  for (const button of shell.querySelectorAll('.corner.start')) {
    const menu = document.createElement('section');
    menu.className = 'corner-menu';
    menu.dataset.corner = button.dataset.position;
    menu.setAttribute('aria-hidden', 'true');
    for (let sequence = 0; sequence < 4; sequence += 1) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'corner-menu-item';
      item.style.setProperty('--sequence', sequence);
      item.setAttribute('aria-label', 'Menu item ' + (sequence + 1));
      menu.appendChild(item);
    }
    shell.appendChild(menu);
    menus.set(button.dataset.position, menu);

    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      if (shell.dataset.menuTransition === 'true') return;
      const current = [...menus.entries()].find(([, candidate]) => candidate.classList.contains('open'));
      const openingSame = current && current[0] === button.dataset.position;

      const openMenu = () => {
        menu.classList.remove('closing');
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        shell.dataset.menuTransition = 'false';
      };

      if (!current) {
        shell.dataset.menuTransition = 'true';
        requestAnimationFrame(openMenu);
        return;
      }

      shell.dataset.menuTransition = 'true';
      const [position, active] = current;
      active.classList.add('closing');
      active.classList.remove('open');
      active.setAttribute('aria-hidden', 'true');
      shell.querySelector('.corner.start[data-position="' + position + '"]')?.setAttribute('aria-expanded', 'false');

      window.setTimeout(() => {
        active.classList.remove('closing');
        if (openingSame) {
          shell.dataset.menuTransition = 'false';
        } else {
          requestAnimationFrame(openMenu);
        }
      }, 760);
    });
  }

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

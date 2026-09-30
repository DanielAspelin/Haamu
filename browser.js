'use strict';

/**
 * Haamu browser boundary and initial visual projection.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.2.0',
});

function projectHaamuBrowser(root = document.getElementById('haamu-root')) {
  if (!root) throw new Error('Haamu visual root not found.');

  const haamu = globalThis.Haamu ?? {};
  const families = globalThis.HaamuFamilies ?? {};
  const domains = [
    ['Suomisaundi', 'Community knowledge corpus', 'Suomisaundi/'],
    ['GNU', 'Versioned manual corpus', 'GNU/'],
    ['Forks', 'Governed software forks', 'Forks/'],
    ['Wrappers', 'Governed software wrappers', 'Wrappers/']
  ];

  root.innerHTML = '';
  const shell = document.createElement('main');
  shell.className = 'haamu-shell';
  shell.innerHTML = `
    <header class="haamu-header">
      <div><strong>HAAMU</strong><span> ${haamu.domain ?? 'haamu.space'}</span></div>
      <output id="haamu-status">READY</output>
    </header>
    <section class="haamu-hero">
      <p class="eyebrow">OPEN COMMUNITY · TECHNOLOGY · CULTURE</p>
      <h1>Haamu</h1>
      <p>A public surface for communities, software, music, research and open experimentation.</p>
    </section>
    <section class="haamu-grid" aria-label="Haamu domains"></section>
    <footer>
      <span>runtime ${haamu.version ?? 'unknown'}</span>
      <span>${Object.keys(families).length} browser/web boundaries registered</span>
    </footer>`;

  const grid = shell.querySelector('.haamu-grid');
  for (const [name, description, path] of domains) {
    const card = document.createElement('a');
    card.className = 'haamu-card';
    card.href = path;
    card.innerHTML = `<span class="card-kind">DOMAIN</span><h2>${name}</h2><p>${description}</p><span class="card-path">${path}</span>`;
    grid.appendChild(card);
  }
  root.appendChild(shell);
  document.documentElement.dataset.haamu = 'ready';
  return Object.freeze({ state: 'READY', domains: domains.length });
}

globalThis.projectHaamuBrowser = projectHaamuBrowser;

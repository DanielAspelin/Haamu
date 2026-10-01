'use strict';

/** Final DOM projection of Plate-owned composition; never changes shell geometry. */
globalThis.HaamuWebDOM = Object.freeze({
  decorateButton(button) {
    const label = document.createElement('span');
    label.className = 'corner-label';
    const value = document.createElement('span');
    value.className = 'corner-value';
    button.append(label, value);
  },
  updateButton(button, label, value) {
    button.querySelector('.corner-label').textContent = String(label);
    button.querySelector('.corner-value').textContent = String(value);
    button.setAttribute('aria-label', [label, value].filter(part => part !== '').join(' '));
  },
  mount(host, plate) {
    const animation = HaamuBrowserAnimation.create();
    const targets = new Map();
    let disposed = false;
    return Object.freeze({
      render(value, options = {}) {
        if (disposed) throw new Error('Projection disposed');
        const result = HaamuWebText.processForPlate(value, plate, options);
        const grid = document.createElement('div');
        grid.className = 'visual-grid';
        grid.style.setProperty('--visual-columns', result.grid.columns);
        animation.cancel();
        targets.clear();
        for (const cell of result.grid.cells) {
          let url = null;
          if (cell.source.link) {
            try { const candidate = new URL(cell.source.link, document.baseURI); if (['https:', 'http:'].includes(candidate.protocol)) url = candidate; } catch {}
          }
          const element = document.createElement(url ? 'a' : 'span');
          element.className = 'visual-cell';
          element.dataset.cellId = cell.id;
          element.style.gridRow = cell.row + 1;
          element.style.gridColumn = cell.column + 1;
          if (url) element.href = url.href;
          // One node per visual unit preserves grapheme clusters within each cell.
          element.textContent = cell.source.text;
          const id = result.matrix.id + ':' + cell.id;
          element.dataset.visualId = id;
          targets.set(id, element);
          for (const node of result.mesh.nodes.filter(node => node.cellId === cell.id)) targets.set(node.id, element);
          grid.appendChild(element);
        }
        host.replaceChildren(grid);
        return result;
      },
      animate(id, keyframes, options) { return animation.animate(id, targets.get(id), keyframes, options); },
      dispose() { disposed = true; animation.dispose(); targets.clear(); host.replaceChildren(); },
    });
  },
});
globalThis.HaamuFamilies['web.dom'] = Object.freeze({family:'web',role:'web.dom',version:'0.2.0'});

'use strict';


/* module-private execution scope */
(() => {
/** Haamu Web Grid — deterministic matrix-to-layout projection. */
globalThis.HaamuFamilies ??= Object.create(null);

const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

const HaamuWebGrid = Object.freeze({
  family: 'web', role: 'web.grid', type: 'matrix-grid-layout', version: '0.1.0',

  layout(matrix, options = {}) {
    if (!matrix || matrix.type !== 'matrix') throw new TypeError('Matrix required.');
    const width = Math.max(0, finite(options.width, matrix.columns));
    const height = Math.max(0, finite(options.height, matrix.rows));
    const gapX = Math.max(0, finite(options.gapX, 0));
    const gapY = Math.max(0, finite(options.gapY, 0));
    const cellWidth = Math.max(0, (width - gapX * (matrix.columns - 1)) / matrix.columns);
    const cellHeight = Math.max(0, (height - gapY * (matrix.rows - 1)) / matrix.rows);

    const cells = matrix.cells.map(cell => Object.freeze({
      type: 'grid-cell',
      id: cell.id,
      source: cell,
      row: cell.row,
      column: cell.column,
      x: cell.column * (cellWidth + gapX),
      y: cell.row * (cellHeight + gapY),
      width: cellWidth,
      height: cellHeight,
    }));

    return Object.freeze({
      type: 'grid-layout', matrixId: matrix.id, width, height,
      rows: matrix.rows, columns: matrix.columns,
      cells: Object.freeze(cells),
    });
  },
});

globalThis.HaamuFamilies['web.grid'] = Object.freeze({
  family: HaamuWebGrid.family, role: HaamuWebGrid.role,
  type: HaamuWebGrid.type, version: HaamuWebGrid.version,
});
globalThis.HaamuWebGrid = HaamuWebGrid;
})();

'use strict';

/**
 * Haamu Matrix — generated, renderer-neutral matrix state.
 *
 * Matrix owns content coordinates and navigation state. It never owns plate
 * geometry. A browser/plate projection may replace the active matrix without
 * moving or reconstructing the qualified visual shell.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const freezeCell = (cell) => Object.freeze({
  type: 'matrix-cell',
  row: cell.row,
  column: cell.column,
  id: cell.id ?? `r${cell.row}c${cell.column}`,
  text: cell.text == null ? '' : String(cell.text),
  link: cell.link == null ? null : String(cell.link),
  parsed: globalThis.HaamuWebText?.parse
    ? globalThis.HaamuWebText.parse(cell.text == null ? '' : String(cell.text))
    : null,
});

const HaamuMatrix = Object.freeze({
  family: 'web',
  role: 'web.matrix',
  type: 'matrix-generator-navigator',
  version: '0.1.0',

  generate(definition = {}) {
    const rows = Math.max(1, Math.trunc(Number(definition.rows) || 1));
    const columns = Math.max(1, Math.trunc(Number(definition.columns) || 1));
    const supplied = Array.isArray(definition.cells) ? definition.cells : [];
    const byCoordinate = new Map(supplied.map(cell => [`${cell.row}:${cell.column}`, cell]));
    const cells = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        cells.push(freezeCell(byCoordinate.get(`${row}:${column}`) ?? { row, column }));
      }
    }

    return Object.freeze({
      type: 'matrix',
      id: String(definition.id ?? 'matrix'),
      rows,
      columns,
      cells: Object.freeze(cells),
    });
  },

  cell(matrix, row, column) {
    return matrix.cells.find(cell => cell.row === row && cell.column === column) ?? null;
  },

  links(matrix) {
    return Object.freeze(matrix.cells.filter(cell => cell.link !== null));
  },

  navigator(initialMatrix, resolver) {
    if (!initialMatrix || initialMatrix.type !== 'matrix') throw new TypeError('Initial matrix required.');
    if (typeof resolver !== 'function') throw new TypeError('Matrix resolver required.');
    let active = initialMatrix;
    const history = [initialMatrix.id];

    return Object.freeze({
      active: () => active,
      history: () => Object.freeze([...history]),
      navigate(target) {
        const next = resolver(String(target), active);
        if (!next || next.type !== 'matrix') throw new Error('Matrix target could not be resolved.');
        active = next;
        history.push(next.id);
        return active;
      },
    });
  },
});

globalThis.HaamuFamilies['web.matrix'] = Object.freeze({
  family: HaamuMatrix.family,
  role: HaamuMatrix.role,
  type: HaamuMatrix.type,
  version: HaamuMatrix.version,
});
globalThis.HaamuMatrix = HaamuMatrix;

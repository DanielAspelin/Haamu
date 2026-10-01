'use strict';

/** Haamu Web Mesh — addressable relationships over grid/text projections. */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebMesh = Object.freeze({
  family: 'web', role: 'web.mesh', type: 'grid-text-mesh', version: '0.1.0',

  generate(grid, options = {}) {
    if (!grid || grid.type !== 'grid-layout') throw new TypeError('Grid layout required.');
    const nodes = [];
    const edges = [];

    for (const cell of grid.cells) {
      const parsed = cell.source.parsed;
      const units = parsed?.tokens ?? [];
      units.forEach((unit, index) => {
        const id = `${grid.matrixId}:${cell.id}:text:${index}`;
        nodes.push(Object.freeze({
          type: 'mesh-node', id, kind: 'text',
          cellId: cell.id, tokenIndex: index, token: unit,
          animation: Object.freeze({ target: id, independentlyAddressable: true }),
        }));
        if (index > 0) edges.push(Object.freeze({
          type: 'mesh-edge',
          from: `${grid.matrixId}:${cell.id}:text:${index - 1}`,
          to: id, relation: 'next',
        }));
      });
    }

    return Object.freeze({
      type: 'web-mesh', matrixId: grid.matrixId, grid,
      nodes: Object.freeze(nodes), edges: Object.freeze(edges),
      animationScope: options.animationScope ?? 'token',
    });
  },
});

globalThis.HaamuFamilies['web.mesh'] = Object.freeze({
  family: HaamuWebMesh.family, role: HaamuWebMesh.role,
  type: HaamuWebMesh.type, version: HaamuWebMesh.version,
});
globalThis.HaamuWebMesh = HaamuWebMesh;

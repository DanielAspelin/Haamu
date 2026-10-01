'use strict';

/**
 * Haamu Web Plate — target/container boundary for generated composition.
 * Plate owns the environment, not the semantic content or host-browser geometry.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebPlate = Object.freeze({
  family: 'web',
  role: 'web.plate',
  type: 'plate-composition-provider',
  version: '0.1.0',

  create(definition = {}) {
    const id = String(definition.id ?? 'plate');
    const state = { matrix: null, grid: null, mesh: null };

    const plate = {
      type: 'web-plate',
      id,
      platform: definition.platform ?? 'common',
      corner: definition.corner ?? null,

      generateMatrix(matrixDefinition = {}) {
        if (!globalThis.HaamuMatrix?.generate) throw new Error('HaamuMatrix unavailable.');
        state.matrix = globalThis.HaamuMatrix.generate({
          id: matrixDefinition.id ?? `${id}:matrix`,
          ...matrixDefinition,
        });
        state.grid = null;
        state.mesh = null;
        return state.matrix;
      },

      generateGrid(options = {}) {
        if (!state.matrix) this.generateMatrix(options.matrix ?? {});
        if (!globalThis.HaamuWebGrid?.layout) throw new Error('HaamuWebGrid unavailable.');
        state.grid = globalThis.HaamuWebGrid.layout(state.matrix, options);
        state.mesh = null;
        return state.grid;
      },

      generateMesh(options = {}) {
        if (!state.grid) this.generateGrid(options.grid ?? options);
        if (!globalThis.HaamuWebMesh?.generate) throw new Error('HaamuWebMesh unavailable.');
        state.mesh = globalThis.HaamuWebMesh.generate(state.grid, options);
        return state.mesh;
      },

      composition() {
        return Object.freeze({ matrix: state.matrix, grid: state.grid, mesh: state.mesh });
      },
    };

    return Object.freeze(plate);
  },
});

globalThis.HaamuFamilies['web.plate'] = Object.freeze({
  family: HaamuWebPlate.family,
  role: HaamuWebPlate.role,
  type: HaamuWebPlate.type,
  version: HaamuWebPlate.version,
});
globalThis.HaamuWebPlate = HaamuWebPlate;

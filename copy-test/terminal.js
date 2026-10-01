'use strict';

/**
 * Haamu Terminal — terminal-output stream and WebText/Plate bridge.
 * Terminal preserves output provenance; visual composition remains owned by
 * WebText + Matrix/Grid/Mesh + Plate.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuTerminal=Object.freeze({
  family:'terminal', role:'terminal.output', type:'terminal-output-bridge', version:'0.1.0',

  validate(output) {
    return !!output && output.type==='terminal-output' &&
      typeof output.payload==='string' && typeof output.shell==='string';
  },

  process(output, plate, options={}) {
    if (!this.validate(output)) throw new TypeError('Terminal output record required.');
    if (!globalThis.HaamuWebText?.processForPlate) throw new Error('HaamuWebText unavailable.');
    return Object.freeze({
      type:'terminal-plate-processing',
      output,
      text:globalThis.HaamuWebText.processForPlate(output.payload,plate,options),
    });
  },

  allocate(output, plate, options={}) {
    if (!this.validate(output)) throw new TypeError('Terminal output record required.');
    return globalThis.HaamuWebText.allocateToPlate(output.payload,plate,options);
  },

  render(output, plate, options={}) {
    if (!this.validate(output)) throw new TypeError('Terminal output record required.');
    return globalThis.HaamuWebText.renderToPlate(output.payload,plate,options);
  },
});

globalThis.HaamuFamilies['terminal.output']=Object.freeze({
  family:HaamuTerminal.family, role:HaamuTerminal.role, type:HaamuTerminal.type, version:HaamuTerminal.version,
});
globalThis.HaamuTerminal=HaamuTerminal;

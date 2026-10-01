'use strict';

/** Haamu WebAssembly boundary with text-buffer interoperability. */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebAssembly = Object.freeze({
  family: 'web',
  role: 'web.assembly',
  version: '0.2.0',

  supported() {
    return typeof WebAssembly === 'object';
  },

  text(value, options = {}) {
    if (!globalThis.HaamuWebText) throw new Error('Haamu Web Text is unavailable.');
    return globalThis.HaamuWebText.toWebAssembly(value, options);
  },

  memoryView(memory, offset = 0, length) {
    if (!(memory instanceof WebAssembly.Memory)) throw new TypeError('Expected WebAssembly.Memory.');
    const available = memory.buffer.byteLength - offset;
    return new Uint8Array(memory.buffer, offset, length ?? available);
  },

  writeText(memory, value, options = {}) {
    const packet = this.text(value, options);
    const offset = Math.max(0, Math.trunc(Number(options.offset) || 0));
    const target = this.memoryView(memory, offset, packet.byteLength);
    target.set(packet.bytes);
    return Object.freeze({ offset, byteLength: packet.byteLength, packet });
  },
});

globalThis.HaamuFamilies['web.assembly'] = Object.freeze({
  family: HaamuWebAssembly.family, role: HaamuWebAssembly.role, version: HaamuWebAssembly.version,
});
globalThis.HaamuWebAssembly = HaamuWebAssembly;

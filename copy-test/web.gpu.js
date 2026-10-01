'use strict';

/** Haamu WebGPU boundary with vector-text buffer interoperability. */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebGPU = Object.freeze({
  family: 'web',
  role: 'web.gpu',
  version: '0.2.0',

  supported() {
    return typeof navigator !== 'undefined' && 'gpu' in navigator;
  },

  text(value, options = {}) {
    if (!globalThis.HaamuWebText) throw new Error('Haamu Web Text is unavailable.');
    return globalThis.HaamuWebText.toWebGPU(value, options);
  },

  createTextBuffers(device, value, options = {}) {
    if (!device?.createBuffer) throw new TypeError('Expected GPUDevice-compatible object.');
    if (typeof GPUBufferUsage === 'undefined') throw new Error('WebGPU buffer constants are unavailable.');
    const packet = this.text(value, options);
    const usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST;
    const codePointBuffer = device.createBuffer({ size: Math.max(4, packet.codePoints.byteLength), usage });
    const positionBuffer = device.createBuffer({ size: Math.max(4, packet.positions.byteLength), usage });
    device.queue.writeBuffer(codePointBuffer, 0, packet.codePoints);
    device.queue.writeBuffer(positionBuffer, 0, packet.positions);
    return Object.freeze({ packet, codePointBuffer, positionBuffer });
  },
});

globalThis.HaamuFamilies['web.gpu'] = Object.freeze({
  family: HaamuWebGPU.family, role: HaamuWebGPU.role, version: HaamuWebGPU.version,
});
globalThis.HaamuWebGPU = HaamuWebGPU;

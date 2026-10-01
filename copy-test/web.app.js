'use strict';

/**
 * Haamu web.app boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.app'] = Object.freeze({
  family: 'web',
  role: 'web.app',
  version: '0.1.0',
});

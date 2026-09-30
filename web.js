'use strict';

/**
 * Haamu web boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web'] = Object.freeze({
  family: 'web',
  role: 'web',
  version: '0.1.0',
});

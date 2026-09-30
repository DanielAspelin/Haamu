'use strict';

/**
 * Haamu browser boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser'] = Object.freeze({
  family: 'browser',
  role: 'browser',
  version: '0.1.0',
});

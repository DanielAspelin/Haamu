'use strict';

/**
 * Haamu browser.default boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.default'] = Object.freeze({
  family: 'browser',
  role: 'browser.default',
  version: '0.1.0',
});

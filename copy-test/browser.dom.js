'use strict';

/**
 * Haamu browser.dom boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.dom'] = Object.freeze({
  family: 'browser',
  role: 'browser.dom',
  version: '0.1.0',
});

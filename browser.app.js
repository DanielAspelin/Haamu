'use strict';

/**
 * Haamu browser.app boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.app'] = Object.freeze({
  family: 'browser',
  role: 'browser.app',
  version: '0.1.0',
});

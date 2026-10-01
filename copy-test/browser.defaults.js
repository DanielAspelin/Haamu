'use strict';

/**
 * Haamu browser.defaults boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.defaults'] = Object.freeze({
  family: 'browser',
  role: 'browser.defaults',
  version: '0.1.0',
});

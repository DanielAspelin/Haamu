'use strict';

/**
 * Haamu browser.layout boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.layout'] = Object.freeze({
  family: 'browser',
  role: 'browser.layout',
  version: '0.1.0',
});

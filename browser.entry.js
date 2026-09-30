'use strict';

/**
 * Haamu browser.entry boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.entry'] = Object.freeze({
  family: 'browser',
  role: 'browser.entry',
  version: '0.1.0',
});

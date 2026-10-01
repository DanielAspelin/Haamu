'use strict';

/**
 * Haamu browser.admission boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.admission'] = Object.freeze({
  family: 'browser',
  role: 'browser.admission',
  version: '0.1.0',
});

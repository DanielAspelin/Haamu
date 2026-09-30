'use strict';

/**
 * Haamu browser.landscape boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.landscape'] = Object.freeze({
  family: 'browser',
  role: 'browser.landscape',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu browser.processing boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.processing'] = Object.freeze({
  family: 'browser',
  role: 'browser.processing',
  version: '0.1.0',
});

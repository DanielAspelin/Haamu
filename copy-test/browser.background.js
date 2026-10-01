'use strict';

/**
 * Haamu browser.background boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.background'] = Object.freeze({
  family: 'browser',
  role: 'browser.background',
  version: '0.1.0',
});

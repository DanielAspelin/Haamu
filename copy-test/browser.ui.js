'use strict';

/**
 * Haamu browser.ui boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.ui'] = Object.freeze({
  family: 'browser',
  role: 'browser.ui',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu browser.viewport boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.viewport'] = Object.freeze({
  family: 'browser',
  role: 'browser.viewport',
  version: '0.1.0',
});

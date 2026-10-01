'use strict';

/**
 * Haamu browser.volatility boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.volatility'] = Object.freeze({
  family: 'browser',
  role: 'browser.volatility',
  version: '0.1.0',
});

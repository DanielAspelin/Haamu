'use strict';

/**
 * Haamu browser.mobile boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.mobile'] = Object.freeze({
  family: 'browser',
  role: 'browser.mobile',
  version: '0.1.0',
});

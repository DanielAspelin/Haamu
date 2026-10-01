'use strict';

/**
 * Haamu browser.mobile.defaults boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.mobile.defaults'] = Object.freeze({
  family: 'browser',
  role: 'browser.mobile.defaults',
  version: '0.1.0',
});

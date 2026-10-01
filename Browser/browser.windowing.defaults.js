'use strict';

/**
 * Haamu browser.windowing.defaults boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.windowing.defaults'] = Object.freeze({
  family: 'browser',
  role: 'browser.windowing.defaults',
  version: '0.1.0',
});

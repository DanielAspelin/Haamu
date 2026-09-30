'use strict';

/**
 * Haamu browser.pop.in boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.pop.in'] = Object.freeze({
  family: 'browser',
  role: 'browser.pop.in',
  version: '0.1.0',
});

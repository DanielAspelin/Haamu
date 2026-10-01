'use strict';

/**
 * Haamu browser.pop.out boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.pop.out'] = Object.freeze({
  family: 'browser',
  role: 'browser.pop.out',
  version: '0.1.0',
});

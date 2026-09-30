'use strict';

/**
 * Haamu browser.parallelism boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.parallelism'] = Object.freeze({
  family: 'browser',
  role: 'browser.parallelism',
  version: '0.1.0',
});

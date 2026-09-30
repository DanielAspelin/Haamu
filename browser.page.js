'use strict';

/**
 * Haamu browser.page boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.page'] = Object.freeze({
  family: 'browser',
  role: 'browser.page',
  version: '0.1.0',
});

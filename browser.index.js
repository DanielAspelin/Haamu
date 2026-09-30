'use strict';

/**
 * Haamu browser.index boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.index'] = Object.freeze({
  family: 'browser',
  role: 'browser.index',
  version: '0.1.0',
});

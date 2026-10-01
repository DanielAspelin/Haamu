'use strict';

/**
 * Haamu browser.bsd boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.bsd'] = Object.freeze({
  family: 'browser',
  role: 'browser.bsd',
  version: '0.1.0',
});

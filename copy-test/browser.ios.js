'use strict';

/**
 * Haamu browser.ios boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.ios'] = Object.freeze({
  family: 'browser',
  role: 'browser.ios',
  version: '0.1.0',
});

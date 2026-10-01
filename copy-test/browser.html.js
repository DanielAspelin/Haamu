'use strict';

/**
 * Haamu browser.html boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.html'] = Object.freeze({
  family: 'browser',
  role: 'browser.html',
  version: '0.1.0',
});

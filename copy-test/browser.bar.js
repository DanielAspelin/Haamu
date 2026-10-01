'use strict';

/**
 * Haamu browser.bar boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.bar'] = Object.freeze({
  family: 'browser',
  role: 'browser.bar',
  version: '0.1.0',
});

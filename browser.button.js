'use strict';

/**
 * Haamu browser.button boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.button'] = Object.freeze({
  family: 'browser',
  role: 'browser.button',
  version: '0.1.0',
});

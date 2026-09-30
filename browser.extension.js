'use strict';

/**
 * Haamu browser.extension boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.extension'] = Object.freeze({
  family: 'browser',
  role: 'browser.extension',
  version: '0.1.0',
});

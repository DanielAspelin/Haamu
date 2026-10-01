'use strict';

/**
 * Haamu browser.navigation boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.navigation'] = Object.freeze({
  family: 'browser',
  role: 'browser.navigation',
  version: '0.1.0',
});

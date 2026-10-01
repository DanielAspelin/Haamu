'use strict';

/**
 * Haamu browser.interface boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.interface'] = Object.freeze({
  family: 'browser',
  role: 'browser.interface',
  version: '0.1.0',
});

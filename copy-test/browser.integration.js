'use strict';

/**
 * Haamu browser.integration boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.integration'] = Object.freeze({
  family: 'browser',
  role: 'browser.integration',
  version: '0.1.0',
});

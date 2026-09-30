'use strict';

/**
 * Haamu browser.persistence boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.persistence'] = Object.freeze({
  family: 'browser',
  role: 'browser.persistence',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu browser.windows boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.windows'] = Object.freeze({
  family: 'browser',
  role: 'browser.windows',
  version: '0.1.0',
});

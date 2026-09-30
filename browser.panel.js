'use strict';

/**
 * Haamu browser.panel boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.panel'] = Object.freeze({
  family: 'browser',
  role: 'browser.panel',
  version: '0.1.0',
});

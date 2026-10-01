'use strict';

/**
 * Haamu browser.linux boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.linux'] = Object.freeze({
  family: 'browser',
  role: 'browser.linux',
  version: '0.1.0',
});

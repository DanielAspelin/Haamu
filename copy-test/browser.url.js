'use strict';

/**
 * Haamu browser.url boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.url'] = Object.freeze({
  family: 'browser',
  role: 'browser.url',
  version: '0.1.0',
});

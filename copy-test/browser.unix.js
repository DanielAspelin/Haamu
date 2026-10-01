'use strict';

/**
 * Haamu browser.unix boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.unix'] = Object.freeze({
  family: 'browser',
  role: 'browser.unix',
  version: '0.1.0',
});

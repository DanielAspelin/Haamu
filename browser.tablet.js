'use strict';

/**
 * Haamu browser.tablet boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.tablet'] = Object.freeze({
  family: 'browser',
  role: 'browser.tablet',
  version: '0.1.0',
});

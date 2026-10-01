'use strict';

/**
 * Haamu browser.common boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.common'] = Object.freeze({
  family: 'browser',
  role: 'browser.common',
  version: '0.1.0',
});

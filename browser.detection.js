'use strict';

/**
 * Haamu browser.detection boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.detection'] = Object.freeze({
  family: 'browser',
  role: 'browser.detection',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu browser.snapping boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.snapping'] = Object.freeze({
  family: 'browser',
  role: 'browser.snapping',
  version: '0.1.0',
});

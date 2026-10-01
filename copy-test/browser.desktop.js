'use strict';

/**
 * Haamu browser.desktop boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.desktop'] = Object.freeze({
  family: 'browser',
  role: 'browser.desktop',
  version: '0.1.0',
});

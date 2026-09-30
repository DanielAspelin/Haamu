'use strict';

/**
 * Haamu browser.macos boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.macos'] = Object.freeze({
  family: 'browser',
  role: 'browser.macos',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu browser.desktop.defaults boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.desktop.defaults'] = Object.freeze({
  family: 'browser',
  role: 'browser.desktop.defaults',
  version: '0.1.0',
});

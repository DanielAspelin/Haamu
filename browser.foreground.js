'use strict';

/**
 * Haamu browser.foreground boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.foreground'] = Object.freeze({
  family: 'browser',
  role: 'browser.foreground',
  version: '0.1.0',
});

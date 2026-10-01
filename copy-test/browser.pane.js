'use strict';

/**
 * Haamu browser.pane boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.pane'] = Object.freeze({
  family: 'browser',
  role: 'browser.pane',
  version: '0.1.0',
});

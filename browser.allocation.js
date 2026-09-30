'use strict';

/**
 * Haamu browser.allocation boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.allocation'] = Object.freeze({
  family: 'browser',
  role: 'browser.allocation',
  version: '0.1.0',
});

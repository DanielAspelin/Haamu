'use strict';

/**
 * Haamu browser.concurrency boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.concurrency'] = Object.freeze({
  family: 'browser',
  role: 'browser.concurrency',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu browser.paging boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.paging'] = Object.freeze({
  family: 'browser',
  role: 'browser.paging',
  version: '0.1.0',
});

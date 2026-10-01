'use strict';

/**
 * Haamu browser.mobile.composition boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.mobile.composition'] = Object.freeze({
  family: 'browser',
  role: 'browser.mobile.composition',
  version: '0.1.0',
});

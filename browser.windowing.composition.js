'use strict';

/**
 * Haamu browser.windowing.composition boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.windowing.composition'] = Object.freeze({
  family: 'browser',
  role: 'browser.windowing.composition',
  version: '0.1.0',
});

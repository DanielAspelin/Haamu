'use strict';

/**
 * Haamu browser.windowing boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.windowing'] = Object.freeze({
  family: 'browser',
  role: 'browser.windowing',
  version: '0.1.0',
});

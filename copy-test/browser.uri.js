'use strict';

/**
 * Haamu browser.uri boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.uri'] = Object.freeze({
  family: 'browser',
  role: 'browser.uri',
  version: '0.1.0',
});

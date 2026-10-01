'use strict';

/**
 * Haamu browser.token.generator boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.token.generator'] = Object.freeze({
  family: 'browser',
  role: 'browser.token.generator',
  version: '0.1.0',
});

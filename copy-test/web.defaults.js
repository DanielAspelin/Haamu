'use strict';

/**
 * Haamu web.defaults boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.defaults'] = Object.freeze({
  family: 'web',
  role: 'web.defaults',
  version: '0.1.0',
});

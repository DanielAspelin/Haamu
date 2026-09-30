'use strict';

/**
 * Haamu web.entry boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.entry'] = Object.freeze({
  family: 'web',
  role: 'web.entry',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.processing boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.processing'] = Object.freeze({
  family: 'web',
  role: 'web.processing',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.caching boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.caching'] = Object.freeze({
  family: 'web',
  role: 'web.caching',
  version: '0.1.0',
});

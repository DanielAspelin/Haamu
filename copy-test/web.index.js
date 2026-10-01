'use strict';

/**
 * Haamu web.index boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.index'] = Object.freeze({
  family: 'web',
  role: 'web.index',
  version: '0.1.0',
});

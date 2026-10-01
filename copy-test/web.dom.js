'use strict';

/**
 * Haamu web.dom boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.dom'] = Object.freeze({
  family: 'web',
  role: 'web.dom',
  version: '0.1.0',
});

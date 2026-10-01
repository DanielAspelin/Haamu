'use strict';

/**
 * Haamu web.delivery boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.delivery'] = Object.freeze({
  family: 'web',
  role: 'web.delivery',
  version: '0.1.0',
});

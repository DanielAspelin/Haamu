'use strict';

/**
 * Haamu web.token boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.token'] = Object.freeze({
  family: 'web',
  role: 'web.token',
  version: '0.1.0',
});

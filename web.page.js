'use strict';

/**
 * Haamu web.page boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.page'] = Object.freeze({
  family: 'web',
  role: 'web.page',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.assembly boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.assembly'] = Object.freeze({
  family: 'web',
  role: 'web.assembly',
  version: '0.1.0',
});

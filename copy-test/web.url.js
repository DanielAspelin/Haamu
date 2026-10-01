'use strict';

/**
 * Haamu web.url boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.url'] = Object.freeze({
  family: 'web',
  role: 'web.url',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.html boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.html'] = Object.freeze({
  family: 'web',
  role: 'web.html',
  version: '0.1.0',
});

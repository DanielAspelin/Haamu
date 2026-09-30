'use strict';

/**
 * Haamu web.bar boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.bar'] = Object.freeze({
  family: 'web',
  role: 'web.bar',
  version: '0.1.0',
});

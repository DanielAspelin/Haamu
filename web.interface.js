'use strict';

/**
 * Haamu web.interface boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.interface'] = Object.freeze({
  family: 'web',
  role: 'web.interface',
  version: '0.1.0',
});

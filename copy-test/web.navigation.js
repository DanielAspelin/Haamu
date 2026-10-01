'use strict';

/**
 * Haamu web.navigation boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.navigation'] = Object.freeze({
  family: 'web',
  role: 'web.navigation',
  version: '0.1.0',
});

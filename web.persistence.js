'use strict';

/**
 * Haamu web.persistence boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.persistence'] = Object.freeze({
  family: 'web',
  role: 'web.persistence',
  version: '0.1.0',
});

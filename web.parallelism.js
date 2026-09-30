'use strict';

/**
 * Haamu web.parallelism boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.parallelism'] = Object.freeze({
  family: 'web',
  role: 'web.parallelism',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.allocation boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.allocation'] = Object.freeze({
  family: 'web',
  role: 'web.allocation',
  version: '0.1.0',
});

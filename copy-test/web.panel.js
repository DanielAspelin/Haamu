'use strict';

/**
 * Haamu web.panel boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.panel'] = Object.freeze({
  family: 'web',
  role: 'web.panel',
  version: '0.1.0',
});

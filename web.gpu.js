'use strict';

/**
 * Haamu web.gpu boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.gpu'] = Object.freeze({
  family: 'web',
  role: 'web.gpu',
  version: '0.1.0',
});

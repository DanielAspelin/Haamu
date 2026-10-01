'use strict';

/**
 * Haamu web.uri boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.uri'] = Object.freeze({
  family: 'web',
  role: 'web.uri',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.mime boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.mime'] = Object.freeze({
  family: 'web',
  role: 'web.mime',
  version: '0.1.0',
});

'use strict';

/**
 * Haamu web.browser boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.browser'] = Object.freeze({
  family: 'web',
  role: 'web.browser',
  version: '0.1.0',
});

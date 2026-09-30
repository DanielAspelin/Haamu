'use strict';

/**
 * Haamu web.snapping boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.snapping'] = Object.freeze({
  family: 'web',
  role: 'web.snapping',
  version: '0.1.0',
});

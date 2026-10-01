'use strict';

/**
 * Haamu web.pane boundary.
 * Topology derived from the Terraformer web family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.pane'] = Object.freeze({
  family: 'web',
  role: 'web.pane',
  version: '0.1.0',
});

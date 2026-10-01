'use strict';

/**
 * Haamu browser.desktop.composition boundary.
 * Topology derived from the Terraformer browser family; implementation is Haamu-owned.
 */

globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.desktop.composition'] = Object.freeze({
  family: 'browser',
  role: 'browser.desktop.composition',
  version: '0.1.0',
});

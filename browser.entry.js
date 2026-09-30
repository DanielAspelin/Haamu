'use strict';

/**
 * Haamu Browser Entry — outer human ingress boundary.
 * Architectural ingress:
 * Human -> Browser Entry -> Browser -> Web Entry -> Web -> Haamu internals.
 * Reverse projection:
 * Haamu internals -> Web -> Web Entry -> Browser -> Browser Entry -> Human.
 */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['browser.entry'] = Object.freeze({
  family: 'browser', role: 'browser.entry', version: '0.3.0',
  position: 'outer-ingress'
});
globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('browser.entry');

'use strict';

/** Haamu Web Entry — internal web ingress reached through Browser. */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web.entry'] = Object.freeze({
  family: 'web', role: 'web.entry', version: '0.2.0',
  position: 'inside-browser'
});
globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('web.entry');

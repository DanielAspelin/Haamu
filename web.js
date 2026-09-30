'use strict';

/** Haamu Web — internal web boundary. Completes ingress and starts projection. */
globalThis.HaamuFamilies ??= Object.create(null);
globalThis.HaamuFamilies['web'] = Object.freeze({
  family: 'web', role: 'web', version: '0.2.0',
  position: 'internal-web'
});
globalThis.HaamuIngress ??= [];
globalThis.HaamuIngress.push('web');

function startHaamuProjection() {
  const expected = ['browser.entry','browser','web.entry','web'];
  const observed = globalThis.HaamuIngress.slice(-4);
  const valid = expected.every((v, i) => observed[i] === v);
  if (!valid) throw new Error('Haamu ingress order violation: ' + observed.join(' -> '));

  const status = globalThis.projectHaamuBrowser?.();
  globalThis.HaamuRuntime = Object.freeze({
    state: status?.state ?? 'FAILED',
    ingress: Object.freeze(observed),
    projection: Object.freeze(['web','web.entry','browser','browser.entry']),
    startedAt: new Date().toISOString()
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startHaamuProjection, {once:true});
} else {
  startHaamuProjection();
}

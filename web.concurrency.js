'use strict';

/** Haamu web.concurrency — dependency-aware cooperative work negotiation. */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebConcurrency = Object.freeze({
  family:'web', role:'web.concurrency', type:'execution-concurrency', version:'0.2.0',
  negotiate(request = {}) {
    const units = Array.isArray(request.units) ? request.units : [];
    const completed = new Set(request.completed ?? []);
    const ready = units.filter(unit => (unit.dependsOn ?? []).every(id => completed.has(id)));
    const blocked = units.filter(unit => !ready.includes(unit));
    return Object.freeze({
      type:'concurrency-negotiation', stage:request.stage ?? 'unknown',
      ready:Object.freeze(ready), blocked:Object.freeze(blocked),
      backPressure:blocked.length > 0, direction:request.direction ?? 'forward',
    });
  },
});
globalThis.HaamuFamilies['web.concurrency']=Object.freeze({family:'web',role:'web.concurrency',type:HaamuWebConcurrency.type,version:HaamuWebConcurrency.version});
globalThis.HaamuWebConcurrency=HaamuWebConcurrency;

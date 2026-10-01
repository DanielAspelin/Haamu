'use strict';

/** Haamu web.parallelism — bounded parallel execution planning. */
globalThis.HaamuFamilies ??= Object.create(null);

const HaamuWebParallelism = Object.freeze({
  family:'web', role:'web.parallelism', type:'execution-parallelism', version:'0.2.0',
  negotiate(request = {}) {
    const units = Array.isArray(request.units) ? request.units : [];
    const hardware = typeof navigator !== 'undefined' ? Number(navigator.hardwareConcurrency) : 1;
    const capacity = Math.max(1, Math.trunc(Number(request.capacity) || hardware || 1));
    const lanes = Array.from({length:Math.min(capacity, Math.max(1, units.length))},()=>[]);
    units.forEach((unit,index)=>lanes[index % lanes.length].push(unit));
    return Object.freeze({
      type:'parallelism-negotiation', stage:request.stage ?? 'unknown',
      capacity, lanes:Object.freeze(lanes.map(lane=>Object.freeze(lane))),
      direction:request.direction ?? 'forward',
    });
  },
});
globalThis.HaamuFamilies['web.parallelism']=Object.freeze({family:'web',role:'web.parallelism',type:HaamuWebParallelism.type,version:HaamuWebParallelism.version});
globalThis.HaamuWebParallelism=HaamuWebParallelism;

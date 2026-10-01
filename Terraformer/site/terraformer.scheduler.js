'use strict';
const TERRAFORMER_SCHEDULER_SYSTEM=Object.freeze({schema:'TERRAFORMER-SCHEDULER-SYSTEM/1',id:'system.scheduler',name:'Scheduler',family:'computation',type:'scheduler-system',state:'integrated-reconciliation',canonicalPath:'terraformer://scheduler/',dependsOn:Object.freeze(['system.scheduling']),rule:'Scheduler selects admitted runnable work; selection does not expand task authority.'});

module.exports=Object.freeze({TERRAFORMER_SCHEDULER_SYSTEM});

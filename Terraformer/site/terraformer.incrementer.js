'use strict';
const SYSTEM=Object.freeze({schema:'TERRAFORMER-INCREMENTER/1',id:'worker.incrementer',concept:'Incrementer',type:'numeric-transformation-worker',system:'system.arithmetic',operation:'increment',automaticMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,state:'integrated'});
function normalize(value,name){if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError(name+' must be a finite number');return value;}
function increment(value,step=1){return normalize(value,'value')+normalize(step,'step');}
function describe(){return SYSTEM;}
function selfTest(){const failures=[];if(increment(0)!==1)failures.push('default-step');if(increment(4,3)!==7)failures.push('explicit-step');if(increment(4,-2)!==2)failures.push('negative-step');return Object.freeze({schema:'TERRAFORMER-INCREMENTER-SELF-TEST/1',pass:failures.length===0,failures:Object.freeze(failures),authorityGranted:false,persistencePerformed:false});}
module.exports=Object.freeze({SYSTEM,increment,describe,selfTest});

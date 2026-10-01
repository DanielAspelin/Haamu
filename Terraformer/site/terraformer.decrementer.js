'use strict';
const SYSTEM=Object.freeze({schema:'TERRAFORMER-DECREMENTER/1',id:'worker.decrementer',concept:'Decrementer',type:'numeric-transformation-worker',system:'system.arithmetic',operation:'decrement',automaticMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,state:'integrated'});
function normalize(value,name){if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError(name+' must be a finite number');return value;}
function decrement(value,step=1){return normalize(value,'value')-normalize(step,'step');}
function describe(){return SYSTEM;}
function selfTest(){const failures=[];if(decrement(1)!==0)failures.push('default-step');if(decrement(7,3)!==4)failures.push('explicit-step');if(decrement(4,-2)!==6)failures.push('negative-step');return Object.freeze({schema:'TERRAFORMER-DECREMENTER-SELF-TEST/1',pass:failures.length===0,failures:Object.freeze(failures),authorityGranted:false,persistencePerformed:false});}
module.exports=Object.freeze({SYSTEM,decrement,describe,selfTest});

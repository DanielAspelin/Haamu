'use strict';
const SYSTEM=Object.freeze({schema:'TERRAFORMER-INCREMENT/1',id:'process.increment',concept:'Increment',type:'numeric-transformation-process',system:'system.arithmetic',actor:'worker.incrementer',direction:1,automaticMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,state:'integrated'});
function normalize(value,name){if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError(name+' must be a finite number');return value;}
function apply(value,step=1){const input=normalize(value,'value'),delta=normalize(step,'step'),output=input+delta;return Object.freeze({schema:'TERRAFORMER-INCREMENT-RESULT/1',process:SYSTEM.id,actor:SYSTEM.actor,input,step:delta,output,persisted:false,authorityGranted:false});}
function selfTest(){const a=apply(2),b=apply(2,3);return Object.freeze({pass:a.output===3&&b.output===5,persistencePerformed:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,apply,selfTest});

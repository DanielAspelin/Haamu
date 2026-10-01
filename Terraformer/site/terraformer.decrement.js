'use strict';
const SYSTEM=Object.freeze({schema:'TERRAFORMER-DECREMENT/1',id:'process.decrement',concept:'Decrement',type:'numeric-transformation-process',system:'system.arithmetic',actor:'worker.decrementer',direction:-1,automaticMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,state:'integrated'});
function normalize(value,name){if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError(name+' must be a finite number');return value;}
function apply(value,step=1){const input=normalize(value,'value'),delta=normalize(step,'step'),output=input-delta;return Object.freeze({schema:'TERRAFORMER-DECREMENT-RESULT/1',process:SYSTEM.id,actor:SYSTEM.actor,input,step:delta,output,persisted:false,authorityGranted:false});}
function selfTest(){const a=apply(2),b=apply(5,3);return Object.freeze({pass:a.output===1&&b.output===2,persistencePerformed:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,apply,selfTest});

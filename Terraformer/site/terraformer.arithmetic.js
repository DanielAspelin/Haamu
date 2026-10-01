"use strict";
const SYSTEM=Object.freeze({id:"system.arithmetic",concept:"Arithmetic",type:"arithmetic-process-system",activeByDefault:false,automaticExecution:false,persistencePerformed:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_ARITHMETIC_SYSTEM=Object.freeze({schema:'TERRAFORMER-ARITHMETIC-SYSTEM/1',id:'system.arithmetic',name:'Arithmetic System',family:'compute',type:'computation-system',state:'integrated',uri:'terraformer://system/arithmetic',governs:Object.freeze(['addition','subtraction','multiplication','division','remainder','power','absolute','minimum','maximum','sum','average','comparison','clamp']),capabilities:Object.freeze(['add','subtract','multiply','divide','remainder','power','absolute','minimum','maximum','sum','average','compare','clamp','validate','audit']),rule:'Arithmetic is deterministic for admitted finite numeric inputs and grants no authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_ARITHMETIC_SYSTEM});

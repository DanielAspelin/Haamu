"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-PRIORITY-SYSTEM/1",id:"system.priority",concept:"Priority",typeOf:"system.system",role:"numeric-priority-value",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function normalize(value){const n=Number(value);if(!Number.isSafeInteger(n)||n<0)throw Error("PRIORITY_INVALID");return n;}
function assign(subject,value){if(!subject)throw Error("PRIORITY_SUBJECT_REQUIRED");return Object.freeze({subject:String(subject),priority:normalize(value),descriptive:true,executionOrderGranted:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,normalize,assign});

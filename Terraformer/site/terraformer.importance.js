"use strict";
const LEVELS=Object.freeze([{level:1,name:"MINIMAL"},{level:2,name:"LOW"},{level:3,name:"MODERATE"},{level:4,name:"HIGH"},{level:5,name:"CRITICAL"}].map(Object.freeze));
const SYSTEM=Object.freeze({schema:"TERRAFORMER-IMPORTANCE-SYSTEM/1",id:"system.importance",concept:"Importance",typeOf:"system.system",levels:5,qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function resolve(value){const n=typeof value==="number"?value:LEVELS.find(x=>x.name===String(value).trim().toUpperCase())?.level;const x=LEVELS.find(x=>x.level===n);if(!x)throw Error("IMPORTANCE_INVALID");return x;}
function assign(subject,value){if(!subject)throw Error("IMPORTANCE_SUBJECT_REQUIRED");const x=resolve(value);return Object.freeze({subject:String(subject),importance:x.level,name:x.name,descriptive:true,priorityImplied:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,LEVELS,resolve,assign});

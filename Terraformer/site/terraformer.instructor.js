"use strict";
const TERRAFORMER_INSTRUCTOR=Object.freeze({schema:'TERRAFORMER-INSTRUCTOR/1',id:'agent.instructor',name:'Instructor',family:'agent',type:'instruction-agent',state:'integrated',canonicalPath:'terraformer://instruction/instructor/',system:'system.instruction',authorityInherited:false,capabilities:Object.freeze(['receive-authorized-instruction','validate-scope','present-instruction','observe-result']),rule:'Instructor handles only admitted instructions within authorized scope; it cannot self-authorize, broaden scope, or turn instruction representation into execution.'});
module.exports=Object.freeze({TERRAFORMER_INSTRUCTOR});

/* Terraformer v0.48.14: qualified immutable depth-0 declaration migration. */
const TF_INSTRUCTOR_V407=Object.freeze({id:"system.instructor",name:"Instructor",system:"system.instruction",selfAuthorizing:false});

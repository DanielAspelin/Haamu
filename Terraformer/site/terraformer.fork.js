"use strict";
const SYSTEM=Object.freeze({id:"system.fork",concept:"Fork",type:"lineage-derived-result-system",process:"system.forking",actor:"system.forker",lineagePreserved:true,originReplaced:false,originMutated:false,automaticExecution:false,automaticPersistence:false,authorityInherited:false,authorityGranted:false});
function describe(spec={}){const source=String(spec.source??"");if(!source)throw new Error("Fork requires source identity.");return Object.freeze({system:SYSTEM.id,source,identity:spec.identity==null?null:String(spec.identity),lineagePreserved:true,authorityInherited:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,describe});

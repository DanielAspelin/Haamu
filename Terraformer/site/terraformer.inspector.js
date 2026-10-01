"use strict";
const TERRAFORMER_INSPECTOR=Object.freeze({schema:'TERRAFORMER-INSPECTOR/1',id:'agent.inspector',name:'Inspector',family:'agent',type:'bounded-agent',state:'integrated',canonicalPath:'terraformer://forensic/inspector/',system:'system.inspection',authorityInherited:false,capabilities:Object.freeze(['receive-scope','observe','act-admitted','report','verify']),rule:'Inspector acts only within admitted inspection scope and cannot independently expand access, mutate evidence, enforce findings, or authorize effects.'});
const WORKER=Object.freeze({id:"system.inspector",concept:"Inspector",role:"assurance-process-actor",operatesOn:"system.inspection",activeByDefault:false,authorityGranted:false});
module.exports=Object.freeze({TERRAFORMER_INSPECTOR,WORKER});

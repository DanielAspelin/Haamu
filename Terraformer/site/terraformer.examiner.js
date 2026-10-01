"use strict";
const TERRAFORMER_EXAMINER=Object.freeze({schema:'TERRAFORMER-EXAMINER/1',id:'agent.examiner',name:'Examiner',family:'agent',type:'bounded-agent',state:'integrated',canonicalPath:'terraformer://forensic/examiner/',system:'system.examination',authorityInherited:false,capabilities:Object.freeze(['receive-scope','observe','act-admitted','report','verify']),rule:'Examiner performs admitted examinations while preserving provenance; it cannot manufacture evidence, legal conclusions, or authority.'});
const WORKER=Object.freeze({id:"system.examiner",concept:"Examiner",role:"assurance-process-actor",operatesOn:"system.examination",activeByDefault:false,authorityGranted:false});
module.exports=Object.freeze({TERRAFORMER_EXAMINER,WORKER});

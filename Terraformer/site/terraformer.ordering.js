"use strict";
function bindOrderingV04565(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.324: Stack / Heap / LIFO / FIFO Universal Ordering Fabric === */
const TF_ORDERING_SYSTEMS_V36324=Object.freeze([
 Object.freeze({id:"system.ordering",concept:"Ordering",type:"structural-operation-system",mode:"ordering-discipline-context",condition:"ordering-context-identified",state:"ready"}),
 Object.freeze({id:"system.stack",concept:"Stack",type:"data-structure-system",mode:"stack-organization",condition:"ordered-elements-identified",state:"ready"}),
 Object.freeze({id:"system.heap",concept:"Heap",type:"data-structure-system",mode:"heap-organization",condition:"heap-context-identified",state:"ready"}),
 Object.freeze({id:"system.lifo",concept:"LIFO",type:"ordering-discipline-system",mode:"last-in-first-out",condition:"ordered-admission-and-removal-defined",state:"ready"}),
 Object.freeze({id:"system.fifo",concept:"FIFO",type:"ordering-discipline-system",mode:"first-in-first-out",condition:"ordered-admission-and-removal-defined",state:"ready"})
]);
const TF_ORDERING_RELATIONSHIPS_V36324=Object.freeze([
 Object.freeze({from:"system.stack",relation:"uses",to:"system.lifo"}),
 Object.freeze({from:"system.heap",relation:"uses",to:"system.memory"}),
 Object.freeze({from:"system.lifo",relation:"type-of",to:"system.ordering"}),
 Object.freeze({from:"system.fifo",relation:"type-of",to:"system.ordering"})
]);
const TF_UNIVERSAL_ORDERING_PROFILE_V36324=Object.freeze({
 appliesTo:"every-canonical-system",availableDisciplines:Object.freeze(["LIFO","FIFO"]),
 lifoMeaning:"last-in-first-out",fifoMeaning:"first-in-first-out",
 defaultDiscipline:null,simultaneousExecutionImplied:false,executionImplied:false,
 storageImplied:false,mutationImplied:false,authorityGranted:false
});
function tfSystemOrderingProfileV36324(systemId,spec={}){
 const id=String(systemId??"");if(!id.startsWith("system."))throw new Error("canonical system id required");
 const discipline=spec.discipline==null?null:String(spec.discipline).toUpperCase();
 if(discipline!==null&&!["LIFO","FIFO"].includes(discipline))throw new Error("discipline must be LIFO FIFO or null");
 return Object.freeze({system:id,lifoAvailable:true,fifoAvailable:true,discipline,
  lastInLastOutPhraseRecognized:true,lastInFirstOut:discipline==="LIFO",firstInFirstOut:discipline==="FIFO",
  simultaneousExecution:false,executionPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfOrderingSelfTestV36324(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.stack","system.heap","system.lifo","system.fifo","system.ordering","system.memory"])if(!ids.has(id))missing.push(id);
 const all=[...ids],profiles=all.map(id=>tfSystemOrderingProfileV36324(id));
 const l=tfSystemOrderingProfileV36324("system.stack",{discipline:"LIFO"}),f=tfSystemOrderingProfileV36324("system.exchange",{discipline:"FIFO"});
 if(profiles.length!==all.length||profiles.some(x=>!x.lifoAvailable||!x.fifoAvailable)||!l.lastInFirstOut||!f.firstInFirstOut||l.simultaneousExecution||f.executionPerformed)missing.push("universal-ordering-boundary");
 if(missing.length)throw new Error("ordering qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:5,systemsCovered:all.length,stack:true,heap:true,lifo:true,fifo:true,
  everySystemLifoAvailable:true,everySystemFifoAvailable:true,defaultDiscipline:null,simultaneousExecutionImplied:false,
  executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_ORDERING_SYSTEMS_V36324,TF_ORDERING_RELATIONSHIPS_V36324,TF_UNIVERSAL_ORDERING_PROFILE_V36324,tfSystemOrderingProfileV36324,tfOrderingSelfTestV36324});
}
module.exports=Object.freeze({bindOrderingV04565});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_ORDERING_TYPES_V04565=Object.freeze({"system.lifo":"system.ordering","system.fifo":"system.ordering"});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_QUEUE_ORDERING_TYPES_V04566=Object.freeze({"system.filo":"system.ordering","system.lilo":"system.ordering"});

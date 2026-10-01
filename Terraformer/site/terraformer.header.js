"use strict";
function bindHeaderStructuralV04547(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.307: Header Structural Fabric === */
const TF_HEADER_RECONCILIATION_V36307=Object.freeze({id:"system.header",concept:"Header",status:"existing-canonical-system",
 typeContext:"structural-information",modeContext:"identifying-or-descriptive-prefix",duplicateCreated:false});
const TF_HEADER_RELATIONSHIPS_V36307=Object.freeze([
 Object.freeze({from:"system.header",relation:"describes",to:"system.column"}),
 Object.freeze({from:"system.header",relation:"describes",to:"system.table"}),
 Object.freeze({from:"system.sheet",relation:"uses",to:"system.header"}),
 Object.freeze({from:"system.database",relation:"uses",to:"system.header"}),
 Object.freeze({from:"system.header",relation:"represents",to:"system.data"})
]);
function tfHeaderContextV36307(spec={}){
 const subject=String(spec.subject??"").trim();if(!subject)throw new Error("header requires subject");
 return Object.freeze({system:"system.header",subject,scope:String(spec.scope??"generic"),structural:true,
  headerRowImplied:false,columnHeaderImplied:false,protocolHeaderImplied:false,storageImplied:false,persistenceImplied:false,
  executionPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfHeaderSystemSelfTestV36307(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.header","system.column","system.row","system.cell","system.table","system.sheet","system.database","system.data"])if(!ids.has(id))missing.push(id);
 const h=tfHeaderContextV36307({subject:"system.table",scope:"tabular"});
 if(!h.structural||h.headerRowImplied||h.columnHeaderImplied||h.protocolHeaderImplied||h.storageImplied||h.authorityGranted)missing.push("header-boundary");
 if(missing.length)throw new Error("header qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:0,reconciledExistingSystems:1,header:true,genericHeader:true,headerRowNotImplied:true,columnHeaderNotImplied:true,
  protocolHeaderNotImplied:true,storageSeparate:true,persistenceSeparate:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_HEADER_RECONCILIATION_V36307,TF_HEADER_RELATIONSHIPS_V36307,tfHeaderContextV36307,tfHeaderSystemSelfTestV36307});
}
module.exports=Object.freeze({bindHeaderStructuralV04547});

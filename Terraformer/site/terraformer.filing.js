"use strict";
function bindFilingV04571(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.330: Filing / Filer Role Fabric === */
const TF_FILING_SYSTEMS_V36330=Object.freeze([
 Object.freeze({id:"system.filing",concept:"Filing",type:"information-organization-process-system",mode:"file-organization-and-placement",condition:"filing-context-identified",state:"ready"}),
 Object.freeze({id:"system.filer",concept:"Filer",type:"process-actor-system",mode:"filing-actor",condition:"filing-operation-admitted",state:"ready"})
]);
const TF_FILING_RELATIONSHIPS_V36330=Object.freeze([
 Object.freeze({from:"system.filing",relation:"operates-on",to:"system.file"}),
 Object.freeze({from:"system.filing",relation:"may-use",to:"system.filesystem"}),
 Object.freeze({from:"system.filer",relation:"operates-on",to:"system.filing"}),
 Object.freeze({from:"system.filer",relation:"may-use",to:"system.reader"}),
 Object.freeze({from:"system.filer",relation:"may-use",to:"system.writer"})
]);
function tfFilingPlanV36330(spec={}){
 const file=spec.file==null?null:String(spec.file);
 const destination=spec.destination==null?null:String(spec.destination);
 return Object.freeze({system:"system.filing",actor:"system.filer",file,destination,
  fileSystem:"system.filesystem",organizationPlanned:true,fileDistinctFromFiling:true,
  filerDistinctFromFiling:true,readMayBeRequired:true,writeMayBeRequired:true,
  mutationPerformed:false,persistencePerformed:false,fileMoved:false,fileWritten:false,
  destructive:false,authorityGranted:false});
}
function tfFilingSelfTestV36330(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.filing","system.filer","system.file","system.filesystem","system.reader","system.writer"])if(!ids.has(id))missing.push(id);
 const p=tfFilingPlanV36330({file:"example",destination:"archive"});
 if(!p.organizationPlanned||!p.fileDistinctFromFiling||!p.filerDistinctFromFiling||p.mutationPerformed||p.persistencePerformed||p.fileMoved||p.fileWritten||p.destructive||p.authorityGranted)missing.push("filing-boundary");
 if(missing.length)throw new Error("filing qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:2,filing:true,filer:true,fileReused:true,filesystemReused:true,
  readerReused:true,writerReused:true,processActorDistinct:true,mutationPerformed:false,
  persistencePerformed:false,destructive:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_FILING_SYSTEMS_V36330,TF_FILING_RELATIONSHIPS_V36330,tfFilingPlanV36330,tfFilingSelfTestV36330});
}
module.exports=Object.freeze({bindFilingV04571});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_FILING_TYPES_V04571=Object.freeze({"system.filesystem":"system.file"});

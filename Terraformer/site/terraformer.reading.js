"use strict";
function bindReadingV04500(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.block-reading",concept:"Block Reading",role:"process",workerRole:"Block Reader",actorSystem:"system.block-reader"}),Object.freeze({id:"system.block-page-reading",concept:"Block Page Reading",role:"process",workerRole:"Block Page Reader",actorSystem:"system.block-page-reader"})]);
 return Object.freeze({SYSTEMS});
}

function bindExternalSystemReadingV04515(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.282: External System Reading & Window Representation === */
const TF_EXTERNAL_SYSTEM_FABRIC_V36282=Object.freeze([
 Object.freeze({id:"system.external-system",concept:"External System",type:"external-system-entity",mode:"read-only",condition:"admitted-source",state:"available"}),
 Object.freeze({id:"system.external-system-reading",concept:"External System Reading",type:"inspection-process",mode:"read-only",condition:"source-validated",state:"ready"}),
 Object.freeze({id:"system.external-system-representation",concept:"External System Representation",type:"representation-process",mode:"bounded",condition:"read-model-validated",state:"ready"}),
 Object.freeze({id:"system.system-window",concept:"System Window",type:"window-representation",mode:"bounded",condition:"representation-admitted",state:"ready"})
]);
function tfExternalSystemReadPlanV36282(spec={}){
 const path=String(spec.path||""),jsFile=/\.js$/i.test(path),admitted=jsFile&&spec.authorized===true;
 return Object.freeze({system:"system.external-system-reading",externalSystem:"system.external-system",path,admitted,readOnly:true,
  execute:false,evaluate:false,importModule:false,mergeAuthority:false,mergeOwnership:false,persist:false,authorityGranted:false});
}
function tfExternalSystemWindowModelV36282(spec={}){
 const read=tfExternalSystemReadPlanV36282(spec),title=String(spec.title||spec.path||"External System");
 return Object.freeze({system:"system.external-system-representation",windowSystem:"system.system-window",externalSystem:"system.external-system",
  admitted:read.admitted,title,representation:Object.freeze({kind:"system",surface:"window",source:"external-javascript",readOnly:true}),
  sourceExecution:false,authorityTransfer:false,ownershipTransfer:false,persistenceTransfer:false});
}
function tfExternalSystemFabricSelfTestV36282(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_EXTERNAL_SYSTEM_FABRIC_V36282){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 const denied=tfExternalSystemReadPlanV36282({path:"other.js"}),ok=tfExternalSystemWindowModelV36282({path:"other.js",authorized:true,title:"Other System"});
 if(denied.admitted||!ok.admitted||ok.sourceExecution||ok.authorityTransfer||ok.ownershipTransfer||ok.persistenceTransfer)missing.push("external-boundary");
 if(missing.length)throw new Error("external system representation qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,externalSystem:true,externalJSReading:true,readOnly:true,systemRepresentation:true,systemWindow:true,
  sourceExecution:false,authorityTransfer:false,ownershipTransfer:false,persistenceTransfer:false,missing:0});
}
 return Object.freeze({TF_EXTERNAL_SYSTEM_FABRIC_V36282,tfExternalSystemReadPlanV36282,tfExternalSystemWindowModelV36282,tfExternalSystemFabricSelfTestV36282});
}
module.exports=Object.freeze({bindReadingV04500,bindExternalSystemReadingV04515});

"use strict";
const SYSTEM=Object.freeze({id:"system.service",concept:"Service",type:"system-capability-system",privateByDefault:true,inertByDefault:true,admissionRequired:true,automaticStart:false,networkExposure:false,authorityGranted:false});
function bindServiceV04592(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.351: Universal Per-System Service Fabric === */
const TF_SERVICE_DEFAULTS_V36351=Object.freeze({privateByDefault:true,inertByDefault:true,admissionRequired:true,
 automaticStart:false,backgroundExecution:false,networkExposure:false,externalPublication:false,
 persistencePerformed:false,externalEffect:false,authorityGranted:false});
const TF_SERVICE_RELATIONSHIPS_V36351=Object.freeze([
 Object.freeze({from:"system.service",relation:"uses",to:"system.interface"}),
 Object.freeze({from:"system.service",relation:"may-use",to:"system.engine"}),
 Object.freeze({from:"system.service",relation:"may-use",to:"system.execution"})
]);
function tfSystemServiceV36351(systemId,sourceText){
 const id=String(systemId??"");if(!id.startsWith("system."))throw new Error("[TF:system.service:invalid-input] Canonical System identity required.");
 if(sourceText!=null&&!new Set(tfCanonicalSystemIdsV36196(String(sourceText))).has(id))throw new Error("[TF:system.service:not-found] Canonical System not found: "+id+".");
 return Object.freeze({system:"system.service",owner:id,serviceId:id+"::service",...TF_SERVICE_DEFAULTS_V36351});
}
function tfUniversalServiceFabricV36351(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({system:"system.service",systemsCovered:systems.length,services:Object.freeze(systems.map(id=>tfSystemServiceV36351(id))),
  schema:TF_SERVICE_DEFAULTS_V36351,materialization:"derived-shared-schema",automaticStart:false,networkExposure:false,authorityGranted:false});
}
function tfServiceSelfTestV36351(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.service","system.interface","system.engine","system.execution"])if(!ids.has(id))missing.push(id);
 const systems=[...ids],fabric=tfUniversalServiceFabricV36351(sourceText),owners=new Set(fabric.services.map(x=>x.owner)),serviceIds=new Set(fabric.services.map(x=>x.serviceId));
 if(fabric.services.length!==systems.length)missing.push("service-coverage");
 for(const id of systems)if(!owners.has(id))missing.push("owner:"+id);
 if(serviceIds.size!==systems.length)missing.push("service-identity-uniqueness");
 if(fabric.services.some(x=>!x.privateByDefault||!x.inertByDefault||!x.admissionRequired||x.automaticStart||x.backgroundExecution||x.networkExposure||x.externalPublication||x.persistencePerformed||x.externalEffect||x.authorityGranted))missing.push("service-boundary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal Service qualification failed: "+[...new Set(missing)].slice(0,32).join(",")+".");
 return Object.freeze({pass:true,newSystems:0,serviceReused:true,systemsCovered:systems.length,services:systems.length,everySystemOwnService:true,
  sharedImmutableSchema:true,perSystemCodeDuplication:false,privateByDefault:true,inertByDefault:true,admissionRequired:true,
  automaticStart:false,networkExposure:false,externalPublication:false,persistencePerformed:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SERVICE_DEFAULTS_V36351=TF_SERVICE_DEFAULTS_V36351;
globalThis.TF_SERVICE_RELATIONSHIPS_V36351=TF_SERVICE_RELATIONSHIPS_V36351;
globalThis.tfSystemServiceV36351=tfSystemServiceV36351;
globalThis.tfUniversalServiceFabricV36351=tfUniversalServiceFabricV36351;
 return Object.freeze({SYSTEM,TF_SERVICE_DEFAULTS_V36351,TF_SERVICE_RELATIONSHIPS_V36351,tfSystemServiceV36351,tfUniversalServiceFabricV36351,tfServiceSelfTestV36351});
}
const TERRAFORMER_SERVICE_SYSTEM=Object.freeze({schema:'TERRAFORMER-SERVICE-SYSTEM/1',id:'system.service',name:'Service System',family:'business',type:'service-system',state:'integrated',canonicalPath:'terraformer://service/',dependsOn:Object.freeze(['system.business']),governs:Object.freeze(['service', 'identity', 'state', 'relation', 'evidence']),rule:'Service System models service definitions, capabilities, terms, and delivery references without creating contractual or operational authority.'});

module.exports=Object.freeze({SYSTEM,bindServiceV04592,TERRAFORMER_SERVICE_SYSTEM});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfServiceProbePlanV4032({providerId="",serviceId="",url="",method="HEAD",timeoutMs=5000}={}){
 const u=String(url),m=String(method).toUpperCase();
 if(!/^https?:\/\//i.test(u))throw new TypeError("probe requires explicit http(s) provider endpoint");
 if(!TF_SERVICE_READINESS_V4032.methods.includes(m))throw new TypeError("probe method must be HEAD or GET");
 const t=Math.max(250,Math.min(30000,Number(timeoutMs)||5000));
 return Object.freeze({system:"system.service-readiness",providerId:String(providerId),serviceId:String(serviceId),
  url:u,method:m,timeoutMs:t,readOnly:true,credentials:false,body:false,activate:false});
}

function tfServiceReadinessBatchV4032(plans=[]){
 if(!Array.isArray(plans))throw new TypeError("plans must be an array");
 if(plans.length>TF_SERVICE_READINESS_V4032.constraints.maxConcurrent)throw new RangeError("probe batch exceeds concurrency bound");
 return Object.freeze(plans.map(p=>tfServiceProbePlanV4032(p)));
}


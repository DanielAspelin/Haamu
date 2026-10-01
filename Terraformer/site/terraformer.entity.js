const TERRAFORMER_ENTITY_KIND_MODEL=Object.freeze({schema:'TERRAFORMER-ENTITY-KIND-MODEL/1',kinds:Object.freeze(['system','agent','worker','module','tool','capability']),rule:'Entity kind determines structural role, never authority.'});
'use strict';
/* Terraformer v0.44.40 — Universal Entity Logging & Reporting extraction. */
function bindEntityV04440(deps={}){
 const {tfEntityDescriptorV36206,tfUniversalEntityMetadataCoverageV36206}=deps;
 if(typeof tfEntityDescriptorV36206!=='function'||typeof tfUniversalEntityMetadataCoverageV36206!=='function') throw new Error('entity dependency contract incomplete');
const TF_ENTITY_OBSERVABILITY_SCHEMA_V36207=Object.freeze({
 schema:"TERRAFORMER-ENTITY-OBSERVABILITY/1",
 kinds:Object.freeze(["system","worker","generator","automator"]),
 metadata:Object.freeze(["type","mode","condition","state"]),
 loggingSystem:"system.logging",reportingSystem:"system.reporting",reporter:"system.reporter",
 persistence:false,authorityGranted:false,
 rule:"Every System, Worker, Generator and Automator can log and report its canonical type, mode, condition and state. Observation does not change entity state or grant authority."
});
const TF_ENTITY_LOG_V36207=[];
function tfEntityObservationV36207(kind,entity,operation="observe"){
 const e=tfEntityDescriptorV36206(kind,entity),id=String(e.id||e.key||e.name||"");
 if(!id)throw new Error("observable entity identity required");
 return Object.freeze({schema:"TERRAFORMER-ENTITY-OBSERVATION/1",kind:String(kind),id,operation:String(operation),
   type:e.type,mode:e.mode,condition:e.condition,state:e.state});
}
function tfEntityLogV36207(kind,entity,operation="observe"){
 const x=tfEntityObservationV36207(kind,entity,operation);
 const record=Object.freeze({...x,sequence:TF_ENTITY_LOG_V36207.length+1,logger:"system.logging",persistent:false});
 TF_ENTITY_LOG_V36207.push(record);return record;
}
function tfEntityReportV36207(kind,entity,operation="report"){
 const x=tfEntityObservationV36207(kind,entity,operation);
 return Object.freeze({...x,reportingSystem:"system.reporting",reporter:"system.reporter",authoritative:false,persistent:false});
}
function tfEntityObservabilityDescriptorV36207(kind,entity){
 const e=tfEntityDescriptorV36206(kind,entity);
 return Object.freeze({...e,logging:Object.freeze({enabled:true,system:"system.logging",persistent:false}),
   reporting:Object.freeze({enabled:true,system:"system.reporting",reporter:"system.reporter",persistent:false}),
   log:()=>tfEntityLogV36207(kind,e),report:()=>tfEntityReportV36207(kind,e)});
}
function tfUniversalEntityObservabilityCoverageV36207(sourceText){
 const base=tfUniversalEntityMetadataCoverageV36206(sourceText);
 const groups={
  systems:base.groups.systems.map(x=>tfEntityObservabilityDescriptorV36207("system",x)),
  workers:base.groups.workers.map(x=>tfEntityObservabilityDescriptorV36207("worker",x)),
  generators:base.groups.generators.map(x=>tfEntityObservabilityDescriptorV36207("generator",x)),
  automators:base.groups.automators.map(x=>tfEntityObservabilityDescriptorV36207("automator",x))
 },missing=[];
 for(const [group,items] of Object.entries(groups))for(const x of items){
   for(const k of ["type","mode","condition","state"])if(x[k]===undefined||x[k]===null||x[k]==="")missing.push({group,id:x.id,key:k});
   if(!x.logging?.enabled||x.logging.system!=="system.logging")missing.push({group,id:x.id,key:"logging"});
   if(!x.reporting?.enabled||x.reporting.system!=="system.reporting"||x.reporting.reporter!=="system.reporter")missing.push({group,id:x.id,key:"reporting"});
 }
 return Object.freeze({groups:Object.freeze(groups),counts:Object.freeze(Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length]))),missing:Object.freeze(missing),pass:missing.length===0});
}
function tfUniversalEntityObservabilitySelfTestV36207(sourceText){
 const c=tfUniversalEntityObservabilityCoverageV36207(sourceText);if(!c.pass)throw new Error("universal logging/reporting coverage failure");
 for(const [group,items] of Object.entries(c.groups)){const kind=group==="systems"?"system":group==="workers"?"worker":group==="generators"?"generator":"automator";const sample=items[0],l=tfEntityLogV36207(kind,sample,"self-test"),r=tfEntityReportV36207(kind,sample,"self-test");for(const k of ["type","mode","condition","state"])if(l[k]===undefined||r[k]===undefined)throw new Error("observation metadata omission")}
 return Object.freeze({pass:true,...c.counts,loggingCoverage:true,reportingCoverage:true,reportedMetadata:Object.freeze(["type","mode","condition","state"]),missing:0,loggingPersistent:false,reportingPersistent:false,authorityGranted:false});
}


 return Object.freeze({TF_ENTITY_OBSERVABILITY_SCHEMA_V36207,tfEntityObservationV36207,tfEntityLogV36207,tfEntityReportV36207,tfEntityObservabilityDescriptorV36207,tfUniversalEntityObservabilityCoverageV36207,tfUniversalEntityObservabilitySelfTestV36207});
}


function bindNetworkEntityExpansionV04497(deps={}){
 const {tfCanonicalSystemIdsV36196,getOperationalEntityFabric,systems}=deps;
 const TF_NETWORK_ENTITY_EXPANSION_V36265=Object.freeze(systems);
 function tfExpandedEntityDescriptorV36265(e){
 const policy=(e.id==="system.network.scanner"||e.id==="system.interrupter")?"authorization-required":"bounded";
 return Object.freeze({...e,uuidKind:"architectural-v5",worker:Object.freeze({derived:true,role:e.role==="actor"?"self-role-worker":"system-worker"}),
  generator:Object.freeze({present:true,policy}),automator:Object.freeze({present:true,policy,background:e.id==="system.network.discovery"}),
  logging:Object.freeze({present:true,persistenceByDefault:false}),reporting:Object.freeze({present:true,persistenceByDefault:false}),
  forensic:Object.freeze({present:true,observational:true,mutatesEntity:false}),grantsAuthority:false});
}
 const TF_NETWORK_ENTITY_DESCRIPTORS_V36265=Object.freeze(TF_NETWORK_ENTITY_EXPANSION_V36265.map(tfExpandedEntityDescriptorV36265));
 function tfNetworkEntityExpansionSelfTestV36265(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of getOperationalEntityFabric()){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const e of TF_NETWORK_ENTITY_DESCRIPTORS_V36265){if(!ids.has(e.id))missing.push(e.id);
  for(const k of ["type","mode","state","condition","worker","generator","automator","logging","reporting","forensic"])if(e[k]==null)missing.push(e.id+":"+k);
  if(e.grantsAuthority||e.logging.persistenceByDefault||e.reporting.persistenceByDefault||e.forensic.mutatesEntity)missing.push(e.id+":boundary");
 }
 const mapping=TF_NETWORK_ENTITY_DESCRIPTORS_V36265.find(e=>e.id==="system.network.mapping"),mapper=TF_NETWORK_ENTITY_DESCRIPTORS_V36265.find(e=>e.id==="system.network.mapper");
 if(mapping?.role!=="process"||mapper?.role!=="actor")missing.push("mapping-mapper-semantics");
 if(missing.length)throw new Error("network entity expansion qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,entities:TF_NETWORK_ENTITY_DESCRIPTORS_V36265.length,discovery:true,scanner:true,mapping:true,mapper:true,interrupt:true,interrupter:true,
  typeCoverage:true,modeCoverage:true,stateCoverage:true,conditionCoverage:true,workerCoverage:true,generatorCoverage:true,automatorCoverage:true,
  loggingCoverage:true,reportingCoverage:true,forensicCoverage:true,mappingProcess:true,mapperActor:true,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_NETWORK_ENTITY_EXPANSION_V36265,TF_NETWORK_ENTITY_DESCRIPTORS_V36265,tfExpandedEntityDescriptorV36265,tfNetworkEntityExpansionSelfTestV36265});
}

/* Terraformer v0.47.13 — canonical physical entity inventory / URI alignment. */
function tfEntityInventoryV04713(){
 const fs=require('fs'),path=require('path');
 const p=path.join(__dirname,'terraformer.entities.json');
 return JSON.parse(fs.readFileSync(p,'utf8'));
}
function tfEntityUriValidateV04713(){
 const x=tfEntityInventoryV04713(),seen=new Map(),errors=[];
 if(x.uriScheme!=='terraformer'||x.uriSystem!=='system.uri')errors.push('uri-governance');
 for(const e of x.records){
  if(!e.id||!e.owner||!e.class)errors.push('incomplete:'+String(e.id||'?'));
  if(e.uri!==null){
   let u;try{u=new URL(e.uri)}catch{errors.push('invalid-uri:'+e.id);continue}
   if(u.protocol!=='terraformer:')errors.push('scheme:'+e.id);
   if(seen.has(e.uri)&&seen.get(e.uri)!==e.id)errors.push('collision:'+e.uri);
   else seen.set(e.uri,e.id);
  }else if(e.uriStatus!=='UNRESOLVED_COLLISION')errors.push('unexplained-null-uri:'+e.id);
  if(e.authorityGranted!==false)errors.push('authority:'+e.id);
 }
 return Object.freeze({pass:errors.length===0,entities:x.records.length,canonical:x.coverage.uriCanonical,projected:x.coverage.uriProjected,unresolved:x.coverage.uriUnresolved,errors:Object.freeze(errors)});
}

/* Terraformer v0.47.14 — canonical System entity/topology/orthogonality coverage. */
function tfCanonicalSystemEntitiesV04714(){return tfEntityInventoryV04713().records.filter(x=>x.kind==='system');}
function tfEntityBySystemIdV04714(id){return tfCanonicalSystemEntitiesV04714().find(x=>x.id===String(id))||null;}
function tfEntityTopologyValidateV04714(){
 const x=tfEntityInventoryV04713(),ids=new Set(),errors=[];
 for(const e of x.records){
  if(ids.has(e.id))errors.push('duplicate-id:'+e.id); ids.add(e.id);
  if(e.kind!=='system'||e.class!=='System')errors.push('non-system:'+e.id);
  if(!Array.isArray(e.uriSegments)||e.uriSegments.some(s=>!/^[a-z0-9]+$/.test(s)))errors.push('segment:'+e.id);
  if(e.authorityGranted!==false)errors.push('authority:'+e.id);
 }
 return Object.freeze({pass:errors.length===0,systems:x.records.length,physicalized:x.coverage.physicalizedSystems,unphysicalized:x.coverage.unphysicalizedSystems,uriCollisionSystems:x.coverage.uriCollisionSystems,errors:Object.freeze(errors)});
}
module.exports=Object.freeze({TERRAFORMER_ENTITY_KIND_MODEL,bindEntityV04440,bindNetworkEntityExpansionV04497,tfEntityInventoryV04713,tfEntityUriValidateV04713,tfCanonicalSystemEntitiesV04714,tfEntityBySystemIdV04714,tfEntityTopologyValidateV04714});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfEntityV4063(id,{kind="generic",visibility="PRIVATE",provenance="unknown"}={}){
 if(!id)throw new TypeError("entity id");
 return Object.freeze({system:"system.entity",entityId:String(id),kind:String(kind),
  visibility:String(visibility),provenance:String(provenance),authority:false});
}

function tfTypedEntityV4064(id,{entityClass="machine",kind=null,visibility=null,provenance="unknown"}={}){
 if(!id)throw new TypeError("entity id");
 if(!["human","machine"].includes(entityClass))throw new RangeError("entityClass");
 const human=entityClass==="human";
 return Object.freeze({system:human?"system.human-entity":"system.machine-entity",
  entity:tfEntityV4063(id,{kind:kind||entityClass,visibility:visibility||(human?"PRIVATE":"INTERNAL"),provenance}),
  entityClass,privacyBoundary:human,authority:false});
}


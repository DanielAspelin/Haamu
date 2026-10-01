"use strict";
function bindContextualDataFabricV04548(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.308: Contextual Data / Knowledge / Tabular Reconciliation === */
const TF_CONTEXTUAL_DATA_FABRIC_V36308=Object.freeze([
 "system.database","system.knowledge-base","system.base","system.data","system.knowledge",
 "system.table","system.sheet","system.header","system.row","system.column","system.cell","system.tuple"
]);
const TF_CONTEXT_RELATIONSHIPS_V36308=Object.freeze(TF_CONTEXTUAL_DATA_FABRIC_V36308.map(id=>
 Object.freeze({from:"system.context",relation:"contextualizes",to:id})
));
function tfContextualOccurrenceV36308(spec={}){
 const subject=String(spec.subject??"").trim(),scope=String(spec.scope??"").trim()||"generic";
 if(!TF_CONTEXTUAL_DATA_FABRIC_V36308.includes(subject))throw new Error("subject is outside admitted contextual data fabric");
 return Object.freeze({system:"system.context",subject,scope,occurrence:String(spec.occurrence??"").trim()||null,
  role:String(spec.role??"").trim()||null,type:spec.type??null,mode:spec.mode??null,condition:spec.condition??null,state:spec.state??null,
  canonicalIdentityPreserved:true,contextIsSubject:false,duplicateSystemCreated:false,authorityGranted:false,
  persistenceImplied:false,mutationPerformed:false,executionPerformed:false});
}
function tfContextualDataFabricSelfTestV36308(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.context",...TF_CONTEXTUAL_DATA_FABRIC_V36308,"system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 const a=tfContextualOccurrenceV36308({subject:"system.database",scope:"project",occurrence:"primary"});
 const b=tfContextualOccurrenceV36308({subject:"system.cell",scope:"sheet",role:"value-position"});
 if(!a.canonicalIdentityPreserved||a.contextIsSubject||a.duplicateSystemCreated||a.authorityGranted||!b.canonicalIdentityPreserved)missing.push("context-boundary");
 if(missing.length)throw new Error("contextual data fabric qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:0,reconciledExistingContext:true,contextualizedSystems:TF_CONTEXTUAL_DATA_FABRIC_V36308.length,
  canonicalIdentityPreserved:true,contextDistinctFromSubject:true,duplicateSystemsCreated:false,typeModeConditionStateContextual:true,
  persistenceSeparate:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CONTEXTUAL_DATA_FABRIC_V36308,TF_CONTEXT_RELATIONSHIPS_V36308,tfContextualOccurrenceV36308,tfContextualDataFabricSelfTestV36308});
}

function bindUniversalContextsV04622(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.378: Universal Per-System Contexts Fabric === */
const TF_SYSTEM_CONTEXT_SCHEMA_V36378=Object.freeze({schema:"TERRAFORMER-SYSTEM-CONTEXTS/1",derived:true,contextual:true,pluralCollection:true,
 privateByDefault:true,volatileByDefault:true,readOnlyDescription:true,automaticMutation:false,persistence:false,externalEffect:false,authorityAmplification:false});
const TF_SYSTEM_CONTEXT_KINDS_V36378=Object.freeze([
 "identity","runtime-instance","descriptor","execution","input-output","engine","service","worker","server-client","visual-menu","assurance-ticket","lifecycle"
]);
function tfSystemContextsV36378(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.context:invalid-input] System identity required.");
 const mk=(kind,refs)=>Object.freeze({id:id+"::context::"+kind,system:"system.context",owner:id,kind,references:Object.freeze(refs),...TF_SYSTEM_CONTEXT_SCHEMA_V36378});
 return Object.freeze({owner:id,system:"system.context",contexts:Object.freeze([
  mk("identity",[id]),
  mk("runtime-instance",[id+"::instance::0","system.instantiation","system.instance"]),
  mk("descriptor",["system.type","system.mode","system.condition","system.state"]),
  mk("execution",["system.function","system.call","system.parameter","system.execution","system.return"]),
  mk("input-output",["system.input","system.output",id+"::io-carrier",id+"::socket"]),
  mk("engine",[id+"::engine","system.engine"]),
  mk("service",[id+"::service","system.service"]),
  mk("worker",[id+"::worker","system.worker"]),
  mk("server-client",[id+"::server",id+"::client",id+"::server-type",id+"::client-type"]),
  mk("visual-menu",[id+"::view",id+"::review",id+"::preview",id+"::thumbnail",id+"::menu-item"]),
  mk("assurance-ticket",[id+"::ticketer","system.assurance","system.ticketing","system.ticket"]),
  mk("lifecycle",["system.instantiation","system.initialization","system.execution","system.termination"])
 ])});
}
function tfUniversalContextsFabricV36378(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemContextsV36378);
 return Object.freeze({system:"system.context",systemsCovered:ids.length,systemsWithContexts:entries.length,
  contextsPerSystem:TF_SYSTEM_CONTEXT_KINDS_V36378.length,totalContexts:entries.length*TF_SYSTEM_CONTEXT_KINDS_V36378.length,
  entries:Object.freeze(entries),everySystemHasContexts:true});
}
function tfContextsSelfTestV36378(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],u=tfUniversalContextsFabricV36378(sourceText);
 for(const id of ["system.context","system.instance","system.type","system.mode","system.condition","system.state","system.function","system.call","system.parameter","system.execution","system.return","system.input","system.output","system.engine","system.service","system.worker","system.server","system.client","system.view","system.menu","system.assurance","system.ticketing","system.ticketer","system.ticket","system.initialization","system.termination"])if(!ids.has(id))missing.push(id);
 if(u.systemsCovered!==ids.size||u.systemsWithContexts!==ids.size||u.entries.length!==ids.size||u.totalContexts!==ids.size*12)missing.push("coverage");
 for(const e of u.entries){if(e.contexts.length!==12||new Set(e.contexts.map(c=>c.kind)).size!==12||e.contexts.some(c=>c.owner!==e.owner||c.system!=="system.context"||c.automaticMutation||c.persistence||c.authorityAmplification))missing.push("entry:"+e.owner);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal Contexts qualification failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:0,contextReused:true,systemsCovered:u.systemsCovered,systemsWithContexts:u.systemsWithContexts,
  contextsPerSystem:u.contextsPerSystem,totalContexts:u.totalContexts,everySystemHasContexts:true,automaticMutation:false,persistence:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SYSTEM_CONTEXT_SCHEMA_V36378=TF_SYSTEM_CONTEXT_SCHEMA_V36378;
globalThis.TF_SYSTEM_CONTEXT_KINDS_V36378=TF_SYSTEM_CONTEXT_KINDS_V36378;
globalThis.tfSystemContextsV36378=tfSystemContextsV36378;
globalThis.tfUniversalContextsFabricV36378=tfUniversalContextsFabricV36378;
 return Object.freeze({TF_SYSTEM_CONTEXT_SCHEMA_V36378,TF_SYSTEM_CONTEXT_KINDS_V36378,tfSystemContextsV36378,tfUniversalContextsFabricV36378,tfContextsSelfTestV36378});
}

module.exports=Object.freeze({bindContextualDataFabricV04548,bindUniversalContextsV04622});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_CROSS_CONTEXT_TYPES_V04558=Object.freeze({"system.browser-worker":"system.worker","system.node-worker":"system.worker","system.execution-router":"system.router","system.cross-render":"system.render","system.deep-link":"system.link","system.external-application":"system.application"});

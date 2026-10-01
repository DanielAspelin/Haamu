'use strict';
const fs=require('fs'),path=require('path'),ID='terraformer.system',VERSION='0.44.11',REGISTRY='terraformer.systems.json',KIND='SYSTEM_REGISTRY';
function loadRegistry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.kind!==KIND||x.authority!==false)throw Error(ID+': invalid registry');return Object.freeze(x);}
function resolve(id){const r=loadRegistry();if(typeof id!=='string'||!id)throw Error('SYSTEM_ID_INVALID');const all=[...(r.keySystems||[]),...(r.systems||[])];const key=all.find(x=>(x.id||x)===id);return Object.freeze({id,registered:!!key,authority:false,registryVersion:r.version});}
function loadFileBoundary(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,'terraformer.boundaries.json'),'utf8'));if(!x.types.includes('FILE_BOUNDARY')||x.authority!==false||!Array.isArray(x.files))throw Error(ID+': invalid file boundary');return Object.freeze(x);}
function loadDeclarativeRegistry(name,owner){const x=JSON.parse(fs.readFileSync(path.join(__dirname,name),'utf8'));if(x.authority!==false||x.owner!==owner)throw Error('REGISTRY_OWNER_INVALID');return Object.freeze(x);}
function descriptor(){return Object.freeze({id:ID,version:VERSION,registry:REGISTRY,boundary:'SYSTEM_BOUNDARY',authority:false});}
function qualify(){const r=loadRegistry();return Object.freeze({pass:r.kind===KIND&&r.authority===false,id:ID});}
module.exports=Object.freeze({ID,VERSION,REGISTRY,loadRegistry,loadFileBoundary,loadDeclarativeRegistry,resolve,descriptor,qualify});


/* Terraformer v0.44.41 — Ordered Morphological Role + System-Derived Worker Fabric */
function bindSystemFabricV04441(deps){
 const {tfCanonicalSystemIdsV36196,tfAutomationPolicyV36196,tfEntityObservabilityDescriptorV36207,tfWorkerDescriptorsV36206}=deps||{};
 for(const [n,f] of Object.entries({tfCanonicalSystemIdsV36196,tfAutomationPolicyV36196,tfEntityObservabilityDescriptorV36207,tfWorkerDescriptorsV36206})) if(typeof f!=='function') throw Error('terraformer.system fabric dependency missing: '+n);
 const TF_ROLE_ORDER_V36208=Object.freeze(["concept","process-ion","activity-ing","actor-er","machinery","network"]);
const TF_ROLE_FAMILIES_V36208=Object.freeze({
 computation:Object.freeze({concept:"system.computation",processIon:"computation",activityIng:"computing",actorEr:"computer",machinery:"computing-machinery",network:"computing-network"}),
 processing:Object.freeze({concept:"system.processing",processIon:"process",activityIng:"processing",actorEr:"processor",machinery:"processing-machinery",network:"processing-network"}),
 scheduling:Object.freeze({concept:"system.scheduling",processIon:"scheduling-operation",activityIng:"scheduling",actorEr:"scheduler",machinery:"scheduling-machinery",network:"scheduling-network"}),
 communication:Object.freeze({concept:"system.communication",processIon:"communication",activityIng:"communicating",actorEr:"communicator",machinery:"communication-machinery",network:"communication-network"}),
 connection:Object.freeze({concept:"system.connection",processIon:"connection",activityIng:"connecting",actorEr:"connector",machinery:"connection-machinery",network:"connection-network"}),
 generation:Object.freeze({concept:"system.generation",processIon:"generation",activityIng:"generating",actorEr:"generator",machinery:"generation-machinery",network:"generation-network"}),
 automation:Object.freeze({concept:"system.automation",processIon:"automation",activityIng:"automating",actorEr:"automator",machinery:"automation-machinery",network:"automation-network"}),
 operation:Object.freeze({concept:"system.operation",processIon:"operation",activityIng:"operating",actorEr:"operator",machinery:"operating-machinery",network:"operations-network"}),
 reporting:Object.freeze({concept:"system.reporting",processIon:"report-production",activityIng:"reporting",actorEr:"reporter",machinery:"reporting-machinery",network:"reporting-network"}),
 logging:Object.freeze({concept:"system.logging",processIon:"log-production",activityIng:"logging",actorEr:"logger",machinery:"logging-machinery",network:"logging-network"}),
 routing:Object.freeze({concept:"system.route",processIon:"route-operation",activityIng:"routing",actorEr:"router",machinery:"routing-machinery",network:"routing-network"}),
 storage:Object.freeze({concept:"system.storage",processIon:"storage-operation",activityIng:"storing",actorEr:"storage-worker",machinery:"storage-machinery",network:"storage-network"})
});
function tfRoleFamilyV36208(name){const f=TF_ROLE_FAMILIES_V36208[String(name||"").toLowerCase()];return f?Object.freeze({...f,order:TF_ROLE_ORDER_V36208}):null}
function tfRoleRelevanceV36208(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),out={};
 for(const [name,f] of Object.entries(TF_ROLE_FAMILIES_V36208)){
   out[name]=Object.freeze({family:name,concept:f.concept,conceptPresent:ids.has(f.concept),
     ordered:Object.freeze(TF_ROLE_ORDER_V36208.map(role=>Object.freeze({role,value:role==="concept"?f.concept:role==="process-ion"?f.processIon:role==="activity-ing"?f.activityIng:role==="actor-er"?f.actorEr:role==="machinery"?f.machinery:f.network}))),
     semantics:Object.freeze({processIon:"named process/result where linguistically defensible",activityIng:"ongoing activity",actorEr:"actor/worker or machine role",machinery:"mechanism/equipment composition",network:"connected topology/transport composition"})});
 } return Object.freeze(out);
}
function tfRoleObservationV36208(name,sourceText){
 const r=tfRoleRelevanceV36208(sourceText)[String(name||"").toLowerCase()];if(!r)return null;
 return Object.freeze({schema:"TERRAFORMER-ORDERED-ROLE-OBSERVATION/1",family:r.family,type:"semantic-role-family",mode:"ordered-relevance",condition:r.conceptPresent?"concept-present":"concept-absent",state:r.conceptPresent?"available":"deferred",roles:r.ordered});
}
function tfRoleFabricSelfTestV36208(sourceText){
 const r=tfRoleRelevanceV36208(sourceText),bad=[];for(const [n,f] of Object.entries(r)){if(!f.conceptPresent)bad.push(n);if(f.ordered.length!==6)bad.push(n+":order");for(const x of f.ordered)if(!x.value)bad.push(n+":"+x.role)}
 if(bad.length)throw new Error("role fabric coverage failure "+bad.join(","));
 return Object.freeze({pass:true,families:Object.keys(r).length,order:TF_ROLE_ORDER_V36208,computation:Object.freeze({ion:"computation",ing:"computing",er:"computer"}),processing:Object.freeze({ing:"processing",er:"processor"}),machinery:true,networking:true,forcedSuffixes:false,missing:0});
}

 const TF_WORKER_FABRIC_SCHEMA_V36209=Object.freeze({
 schema:"TERRAFORMER-SYSTEM-DERIVED-WORKER-FABRIC/1",parent:"system.worker",
 derivation:"one bounded canonical worker role per canonical system unless an equivalent explicit worker identity already occupies that exact worker id",
 required:Object.freeze(["type","mode","condition","state"]),logging:"system.logging",reporting:"system.reporting",
 authorityGranted:false,persistence:false
});
function tfSystemWorkerDescriptorV36209(systemId){
 const sid=String(systemId);if(!/^system\.[a-zA-Z0-9_.-]+$/.test(sid))throw new Error("invalid worker source system");
 const stem=sid.slice(7),policy=tfAutomationPolicyV36196(sid);
 return tfEntityObservabilityDescriptorV36207("worker",Object.freeze({
   id:"worker."+stem,key:stem,name:stem+" Worker",family:"system-derived-worker",parent:sid,systemId:sid,
   type:"system-worker",mode:policy==="manual-only"?"manual":policy==="authorization-required"?"authorized":"bounded",
   condition:Object.freeze(["system-present","scope-valid","policy-allows","input-valid"]),
   state:"registered",policy,requiresAuthorization:policy==="authorization-required",requiresHumanDecision:policy==="manual-only",
   grantsAuthority:false,persists:false
 }));
}
function tfSystemDerivedWorkerFabricV36209(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText),explicit=tfWorkerDescriptorsV36206().map(x=>tfEntityObservabilityDescriptorV36207("worker",x));
 const byId=new Map(explicit.map(x=>[String(x.id),x])),derived=[];
 for(const sid of systems){const w=tfSystemWorkerDescriptorV36209(sid);if(!byId.has(w.id)){byId.set(w.id,w);derived.push(w)}}
 return Object.freeze({systems:Object.freeze(systems),explicit:Object.freeze(explicit),derived:Object.freeze(derived),workers:Object.freeze([...byId.values()])});
}
function tfWorkerFabricCoverageV36209(sourceText){
 const f=tfSystemDerivedWorkerFabricV36209(sourceText),missing=[];
 for(const sid of f.systems){const id="worker."+sid.slice(7),w=f.workers.find(x=>x.id===id);if(!w)missing.push({system:sid,key:"worker"});
   else {for(const k of ["type","mode","condition","state"])if(w[k]===undefined||w[k]===null||w[k]==="")missing.push({system:sid,worker:id,key:k});
     if(!w.logging?.enabled)missing.push({system:sid,worker:id,key:"logging"});if(!w.reporting?.enabled)missing.push({system:sid,worker:id,key:"reporting"});}}
 return Object.freeze({pass:missing.length===0,systems:f.systems.length,explicitWorkers:f.explicit.length,derivedWorkers:f.derived.length,totalWorkers:f.workers.length,systemWorkerCoverage:f.systems.length-missing.filter(x=>x.key==="worker").length,missing:Object.freeze(missing),fabric:f});
}
function tfWorkerFabricSelfTestV36209(sourceText){
 const c=tfWorkerFabricCoverageV36209(sourceText);if(!c.pass||c.systemWorkerCoverage!==c.systems)throw new Error("worker fabric coverage failure");
 const policies=c.fabric.workers.reduce((a,x)=>(a[x.policy||"bounded"]=(a[x.policy||"bounded"]||0)+1,a),{});
 return Object.freeze({pass:true,systems:c.systems,explicitWorkers:c.explicitWorkers,derivedWorkers:c.derivedWorkers,totalWorkers:c.totalWorkers,systemWorkerCoverage:c.systemWorkerCoverage,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,policies:Object.freeze(policies),missing:0,authorityGranted:false});
}

 return Object.freeze({TF_ROLE_ORDER_V36208,TF_ROLE_FAMILIES_V36208,tfRoleFamilyV36208,tfRoleRelevanceV36208,tfRoleObservationV36208,tfRoleFabricSelfTestV36208,TF_WORKER_FABRIC_SCHEMA_V36209,tfSystemWorkerDescriptorV36209,tfSystemDerivedWorkerFabricV36209,tfWorkerFabricCoverageV36209,tfWorkerFabricSelfTestV36209});
}




function bindSystemScopedControlV04513(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.280: System-Scoped Control & Lifecycle Fabric === */
const TF_SYSTEM_SCOPED_CONTROL_V36280=Object.freeze([
 Object.freeze({id:"system.system-configuration",concept:"System Configuration",type:"system-control-process",mode:"authorization-required",condition:"validated-and-admitted",state:"ready",uses:"system.configuration",
  stages:Object.freeze(["inspect","propose","validate","authorize","apply-plan","verify","report"])}),
 Object.freeze({id:"system.system-emulation",concept:"System Emulation",type:"system-representation-process",mode:"bounded",condition:"validated-model",state:"ready",uses:"system.emulation",
  stages:Object.freeze(["identify","model","admit","emulate-plan","observe","verify","report"])}),
 Object.freeze({id:"system.system-virtualization",concept:"System Virtualization",type:"system-representation-process",mode:"authorization-required",condition:"validated-and-admitted",state:"ready",uses:"system.virtualization",
  stages:Object.freeze(["identify","define-boundary","allocate-plan","validate","authorize","virtualize-plan","verify","report"])}),
 Object.freeze({id:"system.system-management",concept:"System Management",type:"system-control-process",mode:"authorization-required",condition:"managed-scope-admitted",state:"ready",uses:"system.management",
  stages:Object.freeze(["identify","observe","plan","authorize","coordinate","verify","report"])}),
 Object.freeze({id:"system.system-maintenance",concept:"System Maintenance",type:"system-lifecycle-process",mode:"authorization-required",condition:"maintenance-window-admitted",state:"ready",uses:"system.maintenance",
  stages:Object.freeze(["inspect","diagnose","checkpoint","authorize","maintain-plan","verify","recover-if-needed","report"])})
]);
function tfSystemScopedControlPlanV36280(kind,spec={}){
 const d=TF_SYSTEM_SCOPED_CONTROL_V36280.find(x=>x.id==="system."+String(kind));if(!d)throw new Error("unknown system-scoped control");
 const authorized=d.mode!=="authorization-required"||spec.authorized===true,valid=/^system\.[a-z0-9_.-]+$/.test(String(spec.target||""));
 return Object.freeze({system:d.id,target:String(spec.target||""),admitted:valid&&authorized,stages:d.stages,executes:false,mutates:false,authorityGranted:false});
}
function tfSystemScopedControlSelfTestV36280(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_SYSTEM_SCOPED_CONTROL_V36280){if(!ids.has(x.id))missing.push(x.id);if(!ids.has(x.uses))missing.push(x.uses);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 const denied=tfSystemScopedControlPlanV36280("system-management",{target:"system.call"}),ok=tfSystemScopedControlPlanV36280("system-management",{target:"system.call",authorized:true});
 const emu=tfSystemScopedControlPlanV36280("system-emulation",{target:"system.call"});
 if(denied.admitted||!ok.admitted||!emu.admitted||ok.executes||ok.mutates||ok.authorityGranted)missing.push("control-boundary");
 if(missing.length)throw new Error("system-scoped control qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,systemConfiguration:true,systemEmulation:true,systemVirtualization:true,systemManagement:true,systemMaintenance:true,
  typeCoverage:true,modeCoverage:true,conditionCoverage:true,stateCoverage:true,generalConceptsPreserved:true,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SYSTEM_SCOPED_CONTROL_V36280,tfSystemScopedControlPlanV36280,tfSystemScopedControlSelfTestV36280});
}

function bindSystemArchitectureCompletionV04520(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.287: System-System Architecture Completion === */
const TF_SYSTEM_ARCHITECTURE_PRIMITIVES_V36287=Object.freeze([Object.freeze({id:"system.startup",concept:"Startup",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.shutdown",concept:"Shutdown",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.suspension",concept:"Suspension",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.resumption",concept:"Resumption",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.migration",concept:"Migration",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.permission",concept:"Permission",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.isolation",concept:"Isolation",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.quarantine",concept:"Quarantine",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"}),Object.freeze({id:"system.replacement",concept:"Replacement",type:"system-architecture-primitive",mode:"bounded",condition:"scope-defined",state:"ready"})]);
const TF_SYSTEM_SCOPED_ARCHITECTURE_V36287=Object.freeze([Object.freeze({id:"system.system-discovery",concept:"System Discovery",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.discovery"}),Object.freeze({id:"system.system-identification",concept:"System Identification",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.identification"}),Object.freeze({id:"system.system-admission",concept:"System Admission",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.admission"}),Object.freeze({id:"system.system-registration",concept:"System Registration",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.registration"}),Object.freeze({id:"system.system-validation",concept:"System Validation",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.validation"}),Object.freeze({id:"system.system-verification",concept:"System Verification",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.verification"}),Object.freeze({id:"system.system-qualification",concept:"System Qualification",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.qualification"}),Object.freeze({id:"system.system-initialization",concept:"System Initialization",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.initialization"}),Object.freeze({id:"system.system-startup",concept:"System Startup",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.startup"}),Object.freeze({id:"system.system-shutdown",concept:"System Shutdown",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.shutdown"}),Object.freeze({id:"system.system-suspension",concept:"System Suspension",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.suspension"}),Object.freeze({id:"system.system-resumption",concept:"System Resumption",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.resumption"}),Object.freeze({id:"system.system-recovery",concept:"System Recovery",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.recovery"}),Object.freeze({id:"system.system-migration",concept:"System Migration",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.migration"}),Object.freeze({id:"system.system-reconstruction",concept:"System Reconstruction",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.reconstruction"}),Object.freeze({id:"system.system-monitoring",concept:"System Monitoring",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.monitoring"}),Object.freeze({id:"system.system-diagnostic",concept:"System Diagnostic",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.diagnostic"}),Object.freeze({id:"system.system-testing",concept:"System Testing",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.testing"}),Object.freeze({id:"system.system-audit",concept:"System Audit",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.audit"}),Object.freeze({id:"system.system-security",concept:"System Security",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.security"}),Object.freeze({id:"system.system-permission",concept:"System Permission",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.permission"}),Object.freeze({id:"system.system-authorization",concept:"System Authorization",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.authorization"}),Object.freeze({id:"system.system-dependency",concept:"System Dependency",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.dependency"}),Object.freeze({id:"system.system-relationship",concept:"System Relationship",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.relationship"}),Object.freeze({id:"system.system-communication",concept:"System Communication",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.communication"}),Object.freeze({id:"system.system-interface",concept:"System Interface",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.interface"}),Object.freeze({id:"system.system-integration",concept:"System Integration",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.integration"}),Object.freeze({id:"system.system-isolation",concept:"System Isolation",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.isolation"}),Object.freeze({id:"system.system-quarantine",concept:"System Quarantine",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.quarantine"}),Object.freeze({id:"system.system-archive",concept:"System Archive",type:"system-scoped-process",mode:"bounded",condition:"target-system-identified",state:"ready",uses:"system.archive"}),Object.freeze({id:"system.system-replacement",concept:"System Replacement",type:"system-scoped-process",mode:"authorization-required",condition:"target-system-identified",state:"ready",uses:"system.replacement"})]);
const TF_SYSTEM_LIFECYCLE_PHASES_V36287=Object.freeze({
 admission:Object.freeze(["system.system-discovery","system.system-identification","system.system-validation","system.system-admission","system.system-registration"]),
 lifecycle:Object.freeze(["system.system-initialization","system.system-startup","system.system-suspension","system.system-resumption","system.system-shutdown"]),
 assurance:Object.freeze(["system.system-testing","system.system-verification","system.system-qualification","system.system-audit","system.system-monitoring","system.system-diagnostic"]),
 operation:Object.freeze(["system.system-configuration","system.system-management","system.system-maintenance","system.system-recovery","system.system-reconstruction","system.system-migration"]),
 boundary:Object.freeze(["system.system-security","system.system-permission","system.system-authorization","system.system-isolation","system.system-containerization","system.system-emulation","system.system-virtualization"]),
 interaction:Object.freeze(["system.system-interface","system.system-communication","system.system-relationship","system.system-dependency","system.system-integration"]),
 lineage:Object.freeze(["system.system-replacement","system.system-quarantine","system.system-archive","system.system-destruction"])
});
function tfSystemArchitecturePlanV36287(kind,spec={}){
 const id="system.system-"+String(kind),d=TF_SYSTEM_SCOPED_ARCHITECTURE_V36287.find(x=>x.id===id);
 if(!d)throw new Error("unknown system-scoped architecture operation");
 const target=String(spec.target||""),auth=d.mode!=="authorization-required"||spec.authorized===true;
 return Object.freeze({system:id,target,admitted:/^system\.[a-z0-9_.-]+$/.test(target)&&auth,uses:d.uses,executes:false,mutates:false,authorityGranted:false});
}
function tfSystemArchitectureCompletionSelfTestV36287(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_SYSTEM_ARCHITECTURE_PRIMITIVES_V36287)if(!ids.has(x.id))missing.push(x.id);
 for(const x of TF_SYSTEM_SCOPED_ARCHITECTURE_V36287){if(!ids.has(x.id))missing.push(x.id);if(!ids.has(x.uses))missing.push(x.uses);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const arr of Object.values(TF_SYSTEM_LIFECYCLE_PHASES_V36287))for(const id of arr)if(!ids.has(id))missing.push(id);
 const denied=tfSystemArchitecturePlanV36287("quarantine",{target:"system.call"}),ok=tfSystemArchitecturePlanV36287("quarantine",{target:"system.call",authorized:true});
 if(denied.admitted||!ok.admitted||ok.executes||ok.mutates||ok.authorityGranted)missing.push("system-architecture-boundary");
 if(missing.length)throw new Error("system architecture completion failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,primitivesAdded:TF_SYSTEM_ARCHITECTURE_PRIMITIVES_V36287.length,systemScoped:TF_SYSTEM_SCOPED_ARCHITECTURE_V36287.length,
  phases:Object.keys(TF_SYSTEM_LIFECYCLE_PHASES_V36287).length,admission:true,lifecycle:true,assurance:true,operation:true,boundary:true,interaction:true,lineage:true,
  executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SYSTEM_ARCHITECTURE_PRIMITIVES_V36287,TF_SYSTEM_SCOPED_ARCHITECTURE_V36287,TF_SYSTEM_LIFECYCLE_PHASES_V36287,tfSystemArchitecturePlanV36287,tfSystemArchitectureCompletionSelfTestV36287});
}
const TERRAFORMER_SYSTEM_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM-SYSTEM/1',id:'system.system',name:'System System',family:'architecture',type:'system-meta-system',state:'integrated',canonicalPath:'terraformer://system/',dependsOn:Object.freeze(['system.root','system.hierarchy']),governs:Object.freeze(['system-identity','system-type','system-state','system-relation','system-boundary','system-discovery','system-description']),recursiveAuthority:false,rule:'System System describes, relates, and discovers Terraformer systems without instantiating recursive system authority or granting authority over described systems.'});

module.exports=Object.freeze({...module.exports,bindSystemFabricV04441,bindSystemScopedControlV04513,bindSystemArchitectureCompletionV04520,TERRAFORMER_SYSTEM_SYSTEM});

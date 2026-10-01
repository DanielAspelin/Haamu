"use strict";
function bindRoleV04500(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.block-reader",concept:"Block Reader",role:"actor",processSystem:"system.block-reading"}),Object.freeze({id:"system.block-writer",concept:"Block Writer",role:"actor",processSystem:"system.block-writing"}),Object.freeze({id:"system.block-page-reader",concept:"Block Page Reader",role:"actor",processSystem:"system.block-page-reading"}),Object.freeze({id:"system.block-page-writer",concept:"Block Page Writer",role:"actor",processSystem:"system.block-page-writing"}),Object.freeze({id:"system.symbol",concept:"Symbol",role:"representation"}),Object.freeze({id:"system.symbolic",concept:"Symbolic",role:"representation-mode"}),Object.freeze({id:"system.symbolizer",concept:"Symbolizer",role:"actor"})]);
 return Object.freeze({SYSTEMS});
}


function bindOperationalRoleFabricV04507(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.275: Calling / Execution / Returning / Looping Morphological Fabric === */
const TF_OPERATIONAL_ENTITY_FABRIC_V36275=Object.freeze([
 Object.freeze({id:"system.loop",concept:"Loop",type:"control-entity",mode:"bounded",condition:"bounded",state:"ready"})
]);
const TF_OPERATIONAL_ROLE_FABRIC_V36275=Object.freeze([
 Object.freeze({id:"system.calling",concept:"Calling",type:"process",mode:"bounded",condition:"admitted",state:"ready",actor:"system.caller",entity:"system.call"}),
 Object.freeze({id:"system.caller",concept:"Caller",type:"actor",mode:"bounded",condition:"available",state:"ready",process:"system.calling"}),
 Object.freeze({id:"system.execution",concept:"Execution",type:"process",mode:"authorization-required",condition:"admitted",state:"ready",actor:"system.executor"}),
 Object.freeze({id:"system.executor",concept:"Executor",type:"actor",mode:"authorization-required",condition:"available",state:"ready",process:"system.execution"}),
 Object.freeze({id:"system.returning",concept:"Returning",type:"process",mode:"bounded",condition:"admitted",state:"ready",actor:"system.returner",entity:"system.return"}),
 Object.freeze({id:"system.returner",concept:"Returner",type:"actor",mode:"bounded",condition:"available",state:"ready",process:"system.returning"}),
 Object.freeze({id:"system.looping",concept:"Looping",type:"process",mode:"bounded",condition:"bounded",state:"ready",actor:"system.looper",entity:"system.loop"}),
 Object.freeze({id:"system.looper",concept:"Looper",type:"actor",mode:"bounded",condition:"available",state:"ready",process:"system.looping"})
]);
const TF_OPERATIONAL_ROLE_RELATIONSHIPS_V36275=Object.freeze([
 Object.freeze({process:"system.calling",actor:"system.caller",entity:"system.call"}),
 Object.freeze({process:"system.execution",actor:"system.executor",entity:"system.function"}),
 Object.freeze({process:"system.returning",actor:"system.returner",entity:"system.return"}),
 Object.freeze({process:"system.looping",actor:"system.looper",entity:"system.loop"})
]);
function tfOperationalRoleFabricSelfTestV36275(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_OPERATIONAL_ENTITY_FABRIC_V36275){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const x of TF_OPERATIONAL_ROLE_FABRIC_V36275){
  if(!ids.has(x.id))missing.push(x.id);
  for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);
  if(x.actor&&!ids.has(x.actor))missing.push(x.actor);
  if(x.process&&!ids.has(x.process))missing.push(x.process);
 }
 for(const x of TF_OPERATIONAL_ROLE_RELATIONSHIPS_V36275)for(const id of [x.process,x.actor,x.entity])if(!ids.has(id))missing.push(id);
 if(missing.length)throw new Error("operational role fabric qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,pairs:4,calling:true,caller:true,execution:true,executor:true,returning:true,returner:true,looping:true,looper:true,
  typeCoverage:true,modeCoverage:true,conditionCoverage:true,stateCoverage:true,universalTreeCoverage:true,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_OPERATIONAL_ENTITY_FABRIC_V36275,TF_OPERATIONAL_ROLE_FABRIC_V36275,TF_OPERATIONAL_ROLE_RELATIONSHIPS_V36275,tfOperationalRoleFabricSelfTestV36275});
}
function bindRoleSeparationV04675(deps={}){
const TERRAFORMER_ROLE_CHAIN=Object.freeze(['system','function','tool-specialization','worker-or-agent','implementation','evidence']);
const TERRAFORMER_ROLE_SEPARATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.role-separation',name:'Role Separation System',family:'systemization',type:'role-separation-system',state:'integrated',canonicalPath:'terraformer://systemization/role/',dependsOn:Object.freeze(['system.systemization','system.relation']),governs:Object.freeze(['system-role','function-role','tool-role','worker-role','agent-role','implementation-role','evidence-role','canonical-owner','role-interface']),rule:'Role Separation assigns one canonical architectural role per identity while allowing explicit interfaces between roles; role association does not transfer authority, qualification, implementation proof, or execution permission.'});
function tfRoleOfIdentity(x){
 const id=String(x&&x.id||'');
 if(id.startsWith('system.'))return 'system';
 if(id.startsWith('agent.'))return 'agent';
 if(id.startsWith('language.worker.')||id.startsWith('tool.worker.')||id.startsWith('worker.'))return 'worker';
 if(id.startsWith('tool.'))return 'tool';
 return 'unclassified';
}
function tfCanonicalRoleInventory(){
 const systems=Object.values(deps.SYSTEM_REGISTRY).map(x=>Object.freeze({id:x.id,role:'system',specialization:String(x.id).startsWith('system.tool.')?'tool':null,owner:x.id,parent:x.parent||null}));
 const tools=deps.TERRAFORMER_TOOL_SYSTEMS.map(x=>Object.freeze({id:x.id,role:'system',specialization:'tool',owner:x.id,parent:'system.tool'}));
 const workers=deps.tfWorkerUriInventory().map(x=>Object.freeze({id:x.id,role:'worker',owner:String(x.id).startsWith('language.worker.')?'system.language':'system.tool',parent:String(x.id).startsWith('language.worker.')?'system.language':'system.tool'}));
 const agents=[...deps.TERRAFORMER_STRUCTURAL_AGENTS,...deps.TERRAFORMER_FINANCE_COMMERCE_AGENTS,deps.TERRAFORMER_GUARD,deps.TERRAFORMER_RECEPTIONIST,deps.TERRAFORMER_ENGINEER,deps.TERRAFORMER_ADMINISTRATOR].map(x=>Object.freeze({id:x.id,role:'agent',owner:x.system||null,parent:x.system||null}));
 return Object.freeze({systems:Object.freeze(systems),tools:Object.freeze(tools),workers:Object.freeze(workers),agents:Object.freeze(agents)});
}
function tfRoleSeparationAudit(){
 const inv=tfCanonicalRoleInventory(),all=[...inv.systems,...inv.tools,...inv.workers,...inv.agents],byId=new Map(),collisions=[];
 for(const x of all){const a=byId.get(x.id)||[];a.push(x);byId.set(x.id,a)}
 for(const [id,a] of byId)if(new Set(a.map(x=>x.role)).size>1)collisions.push(Object.freeze({id,roles:Object.freeze([...new Set(a.map(x=>x.role))])}));
 const conceptualPairs=Object.freeze([
  Object.freeze({system:'system.language.parser',worker:'language.worker.parser',interface:'implements-function'}),
  Object.freeze({system:'system.language.token',worker:'language.worker.tokenizer',interface:'implements-function'}),
  Object.freeze({system:'system.language.serialization',worker:'language.worker.serializer',interface:'implements-function'}),
  Object.freeze({system:'system.language.translation',worker:null,interface:'tool-or-worker-required-for-execution'}),
  Object.freeze({system:'system.reader',worker:null,interface:'implementation-evidence-required'}),
  Object.freeze({system:'system.writer',worker:null,interface:'implementation-evidence-required'}),
  Object.freeze({system:'system.processor',worker:null,interface:'implementation-evidence-required'})
 ]);
 const knownSystems=new Set(inv.systems.map(x=>x.id)),unresolvedPairs=conceptualPairs.filter(x=>!knownSystems.has(x.system));
 return Object.freeze({schema:'TERRAFORMER-ROLE-SEPARATION-AUDIT/1',chain:TERRAFORMER_ROLE_CHAIN,counts:Object.freeze({systems:inv.systems.length,tools:inv.tools.length,workers:inv.workers.length,agents:inv.agents.length}),identityRoleCollisions:Object.freeze(collisions),conceptualPairs,unresolvedPairs:Object.freeze(unresolvedPairs),canonicalIdentityUnique:collisions.length===0,authorityAmplification:false,qualificationInheritance:false});
}
 return Object.freeze({TERRAFORMER_ROLE_CHAIN,TERRAFORMER_ROLE_SEPARATION_SYSTEM,tfRoleOfIdentity,tfCanonicalRoleInventory,tfRoleSeparationAudit});
}
module.exports=Object.freeze({bindRoleV04500,bindOperationalRoleFabricV04507,bindRoleSeparationV04675});

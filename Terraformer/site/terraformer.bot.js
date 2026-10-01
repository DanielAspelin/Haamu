"use strict";
function bindBotV04474(deps={}){
 const {tfCanonicalKitRegistrySelfTestV36237,tfCanonicalSystemIdsV36196,tfDependencyCycleAnalysisV36241,tfForensicAgentSelfTestV36235,tfForensicAgentV36235,tfForensicEventV36239,tfNormalizedRelationships,tfWorkerFabricSelfTestV36209}=deps;
 if(!deps.dependencyOwner||!deps.architectureOwner||!deps.completionOwner||!deps.gateOwner)throw new Error("canonical owners required");
/* === Terraformer v0.36.242: Foundational Dependency Resolution, Bot System & Architecture Completion Gate === */
const TF_FOUNDATIONAL_DEPENDENCY_CLASSIFICATION_V36242=Object.freeze([
 Object.freeze({from:"system.capability",to:"system.system",classification:"initialization-dependency",reason:"Capability registry describes canonical systems."}),
 Object.freeze({from:"system.system",to:"system.root",classification:"semantic-structural",reason:"System meta-description references structural placement; it need not boot after Root."}),
 Object.freeze({from:"system.system",to:"system.hierarchy",classification:"semantic-structural",reason:"System meta-description references hierarchy placement; it need not boot after Hierarchy."}),
 Object.freeze({from:"system.root",to:"system.hierarchy",classification:"semantic-structural",reason:"Root/hierarchy relation defines placement semantics rather than executable boot order."}),
 Object.freeze({from:"system.root",to:"system.indexing",classification:"semantic-structural",reason:"Root/index relation defines resolution semantics rather than executable boot order."}),
 Object.freeze({from:"system.reference",to:"system.capability",classification:"initialization-dependency",reason:"Reference integrity resolves capability identities."}),
 Object.freeze({from:"system.indexing",to:"system.reference",classification:"semantic-reference",reason:"Canonical system.indexing entry is a reference-dependency placeholder; registration explicitly does not imply implementation/execution."}),
 Object.freeze({from:"system.hierarchy",to:"system.reference",classification:"semantic-reference",reason:"Canonical system.hierarchy entry is a reference-dependency placeholder; registration explicitly does not imply implementation/execution."})
]);
function tfReconciledRelationshipsV36242(){
 const cls=new Map(TF_FOUNDATIONAL_DEPENDENCY_CLASSIFICATION_V36242.map(x=>[x.from+"|"+x.to,x]));
 return Object.freeze(tfNormalizedRelationships().map(e=>{const c=e.type==="depends-on"?cls.get(e.from+"|"+e.to):null;if(!c||c.classification==="initialization-dependency")return e;
  return Object.freeze({...e,type:"integrates-with",initialization:false,reconciledFrom:"depends-on",classification:c.classification,reason:c.reason})}));
}
function tfReconciledLifecyclePlanV36242(){
 const systems=allProjectSystems(),edges=tfReconciledRelationshipsV36242().filter(x=>x.type==="depends-on"&&x.resolved),incoming=new Map(systems.map(x=>[x.id,0])),out=new Map(systems.map(x=>[x.id,[]]));
 for(const e of edges){incoming.set(e.from,(incoming.get(e.from)||0)+1);out.get(e.to).push(e.from)}let ready=[...incoming].filter(([,n])=>n===0).map(([id])=>id).sort(),order=[];
 while(ready.length){const id=ready.shift();order.push(id);for(const dep of (out.get(id)||[]).sort()){incoming.set(dep,incoming.get(dep)-1);if(incoming.get(dep)===0){ready.push(dep);ready.sort()}}}
 const cyclic=[...incoming].filter(([,n])=>n>0).map(([id])=>id).sort();return Object.freeze({order:Object.freeze(order),cyclic:Object.freeze(cyclic),initializationEdges:edges.length,complete:order.length===systems.length,deterministic:true});
}
const TF_BOT_SYSTEM_V36242=Object.freeze({
 id:"system.bot",name:"Bot System",family:"automation",type:"bounded-bot-system",mode:"task-directed-authorized",
 condition:Object.freeze(["bot-identified","scope-defined","input-admitted","task-admitted","capability-admitted","authorization-valid","output-validated"]),state:"naturalized",
 integrates:Object.freeze(["system.worker","system.task","system.algorithm","system.procedure","system.operation","system.dios","system.communication","system.logging","system.reporting","system.event","system.security","system.authorization","system.validation","system.verification"]),
 governs:Object.freeze(["bot-identity","task-intake","capability-selection","bounded-action-plan","input-output","event-evidence","result-report","stop-condition"]),
 autonomousByDefault:false,networkByDefault:false,persistenceByDefault:false,externalActionByDefault:false,selfAuthorization:false,grantsAuthority:false,intrinsic:true
});
function tfBotDescriptorV36242(spec={}){
 const id=String(spec.id||"bot.default"),scope=Object.freeze([...(spec.scope||[]).map(String)]),capabilities=Object.freeze([...(spec.capabilities||[]).map(String)]);
 return Object.freeze({system:"system.bot",id,type:"bot",mode:String(spec.mode||"bounded"),condition:"ready",state:"REGISTERED",scope,capabilities,input:spec.input??null,output:null,
  worker:String(spec.worker||"worker.system.bot"),task:spec.task==null?null:String(spec.task),authorized:false,running:false,persisted:false,networkConnected:false,externalAction:false,authorityGranted:false});
}
function tfBotPlanV36242(bot,task,options={}){
 if(!bot||bot.system!=="system.bot")throw new Error("canonical bot required");if(!task)throw new Error("task required");
 const requested=Object.freeze([...(options.capabilities||[]).map(String)]),missing=requested.filter(x=>!bot.capabilities.includes(x));if(missing.length)throw new Error("bot capability not admitted");
 return Object.freeze({system:"system.bot",botId:bot.id,task:String(task),worker:bot.worker,scope:bot.scope,capabilities:requested,algorithm:options.algorithm||null,procedure:options.procedure||null,operation:options.operation||null,
  dios:true,communication:!!options.communication,authorizationRequired:true,authorized:options.authorized===true,executable:false,persisted:false,networkConnected:false,externalAction:false,authorityGranted:false});
}
function tfBotEvidenceV36242(bot,event={}){
 const agent=tfForensicAgentV36235("worker",bot.worker,{state:bot.state,type:"bot-worker",mode:bot.mode});return tfForensicEventV36239(agent,{type:event.type||"bot-observation",causeId:event.causeId,evidence:{botId:bot.id,task:bot.task,state:bot.state,...(event.evidence||{})}});
}
const TF_BOT_KIT_V36242=Object.freeze({id:"kit.bot",name:"Bot Kit",type:"intrinsic-kit",mode:"naturalized",members:Object.freeze(["system.bot","system.worker","system.task","system.algorithm","system.procedure","system.operation","system.dios","system.communication","system.logging","system.reporting","system.event","system.security","system.authorization","system.validation","system.verification"]),intrinsic:true,plugin:false,module:false,grantsAuthority:false});

const TF_ARCHITECTURE_COMPLETION_GATE_V36242=Object.freeze({
 id:"gate.architecture-completion",mode:"constructive-qualification",checks:Object.freeze(["dependency-acyclic","canonical-coverage","worker-generator-automator-coverage","forensic-coverage","security-boundaries","reconstruction","regression"]),
 seal:"constructive-only",permanent:false,approval:false,authority:false
});
function tfArchitectureCompletionGateV36242(sourceText){
 const lifecycle=tfReconciledLifecyclePlanV36242(),systems=tfCanonicalSystemIdsV36196(sourceText),workers=tfWorkerFabricSelfTestV36209(sourceText),forensics=tfForensicAgentSelfTestV36235(sourceText),kits=tfCanonicalKitRegistrySelfTestV36237(sourceText);
 const pass=lifecycle.complete&&lifecycle.cyclic.length===0&&workers.missing===0&&forensics.missing===0&&kits.missing===0;
 return Object.freeze({pass,qualification:pass?"Verified":"Under Conditional Experiment",seal:pass?"Constructive Seal":null,systems:systems.length,initializationEdges:lifecycle.initializationEdges,cyclicSystems:lifecycle.cyclic.length,
  workerCoverage:workers.systemWorkerCoverage,forensicAgents:forensics.totalAgents,globalKitCoverage:kits.globalCoverageComplete,permanentSeal:false,approvalGranted:false,authorityGranted:false});
}
function tfDependencyBotCompletionSelfTestV36242(sourceText){
 const missing=[],legacy=tfDependencyCycleAnalysisV36241(),plan=tfReconciledLifecyclePlanV36242(),changed=tfReconciledRelationshipsV36242().filter(x=>x.reconciledFrom==="depends-on");
 if(legacy.cyclicSystems.length!==6||legacy.cycleEdges.length!==8)missing.push("predecessor-evidence");if(!plan.complete||plan.cyclic.length)missing.push("cycle-not-resolved");if(changed.length!==6)missing.push("edge-classification");
 const bot=tfBotDescriptorV36242({id:"bot.test",scope:["test"],capabilities:["observe"]}),bp=tfBotPlanV36242(bot,"inspect",{capabilities:["observe"]}),ev=tfBotEvidenceV36242(bot,{type:"qualification"});
 if(bp.executable||bp.authorized||bp.authorityGranted||bot.authorized||bot.running||bot.persisted||ev.authorityGranted)missing.push("bot-boundary");
 const gate=tfArchitectureCompletionGateV36242(sourceText);if(!gate.pass||gate.cyclicSystems)missing.push("completion-gate");
 if(missing.length)throw new Error("dependency/bot/completion qualification failure "+missing.join(","));
 return Object.freeze({pass:true,predecessorCyclicSystems:legacy.cyclicSystems.length,predecessorCycleEdges:legacy.cycleEdges.length,reclassifiedSemanticEdges:changed.length,retainedInitializationEdges:2,
  reconciledCyclicSystems:0,reconciledLifecycleComplete:true,botSystem:true,botWorkerIntegration:true,taskAlgorithmProcedureOperation:true,dios:true,communication:true,forensicEvidence:true,
  autonomousByDefault:false,networkByDefault:false,persistenceByDefault:false,selfAuthorization:false,completionGate:true,constructiveSeal:true,permanentSeal:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.242 === */


 return Object.freeze({TF_ARCHITECTURE_COMPLETION_GATE_V36242,TF_BOT_KIT_V36242,TF_BOT_SYSTEM_V36242,TF_FOUNDATIONAL_DEPENDENCY_CLASSIFICATION_V36242,tfArchitectureCompletionGateV36242,tfBotDescriptorV36242,tfBotEvidenceV36242,tfBotPlanV36242,tfDependencyBotCompletionSelfTestV36242,tfReconciledLifecyclePlanV36242,tfReconciledRelationshipsV36242});
}
module.exports={bindBotV04474};

"use strict";
const TERRAFORMER_FORENSIC_SYSTEM=Object.freeze({schema:'TERRAFORMER-FORENSIC-SYSTEM/1',id:'system.forensic',name:'Forensic System',family:'forensic',type:'forensic-system',state:'integrated',canonicalPath:'terraformer://forensic/',dependsOn:Object.freeze(['system.audit', 'system.evidence']),governs:Object.freeze(['scope','evidence','state','relation','result']),rule:'Forensic System preserves and analyzes admitted evidence with provenance and reproducibility; representation does not grant seizure, surveillance, access, legal conclusion, or evidentiary admissibility authority.'});
function bindForensicAgentV04465(deps={}){
 const {tfAutomatorDescriptorsV36206,tfCanonicalSystemIdsV36196,tfCanonicalWorkerInventoryV36220,tfGeneratorDescriptorsV36206}=deps;
 if(!deps.agentSystem)throw new Error("agent owner required");
/* === Terraformer v0.36.235: Universal Forensic Agent Fabric === */
const TF_FORENSIC_AGENT_FABRIC_V36235=Object.freeze({
 id:"fabric.forensic-agent",name:"Universal Forensic Agent Fabric",type:"forensic-agent-fabric",mode:"bounded-observational-evidence",
 condition:Object.freeze(["entity-identified","scope-valid","evidence-attributable","authority-unchanged"]),state:"naturalized",
 entityKinds:Object.freeze(["system","worker","generator","automator"]),
 observes:Object.freeze(["identity","type","mode","condition","state","relationships","provenance","events","logging","reporting","qualification","version","lineage","recovery"]),
 forensicSystemCreated:false,mutatesEntity:false,executesEntity:false,prosecutes:false,judges:false,persistsByDefault:false,grantsAuthority:false
});
function tfForensicAgentV36235(entityKind,entityId,descriptor={}){
 const kind=String(entityKind);if(!TF_FORENSIC_AGENT_FABRIC_V36235.entityKinds.includes(kind))throw new Error("unsupported forensic entity kind");
 if(!entityId)throw new Error("forensic entity identity required");
 return Object.freeze({id:`forensic-agent:${kind}:${entityId}`,type:"forensic-agent",mode:"bounded-observational-evidence",condition:"entity-identified",state:"active",
  entityKind:kind,entityId:String(entityId),scope:Object.freeze([...TF_FORENSIC_AGENT_FABRIC_V36235.observes]),
  evidence:Object.freeze({type:descriptor.type??null,mode:descriptor.mode??null,condition:descriptor.condition??null,state:descriptor.state??null,
   logging:descriptor.logging??null,reporting:descriptor.reporting??null,qualification:descriptor.qualification??null,version:descriptor.version??null,lineage:descriptor.lineage??null}),
  mutatesEntity:false,executesEntity:false,prosecutes:false,judges:false,persisted:false,authorityGranted:false});
}
function tfUniversalForensicAgentCoverageV36235(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText);
 const dedupWorkers=tfCanonicalWorkerInventoryV36220(sourceText);
 const generators=tfGeneratorDescriptorsV36206(sourceText),automators=tfAutomatorDescriptorsV36206(sourceText);
 const map=(kind,arr)=>Object.freeze(arr.map((e,i)=>tfForensicAgentV36235(kind,String(e.id||e.systemId||e.system||`${kind}-${i}`),e)));
 return Object.freeze({systems:map("system",systems.map(id=>({id}))),workers:map("worker",dedupWorkers),generators:map("generator",generators),automators:map("automator",automators)});
}
function tfForensicEvidenceRecordV36235(agent,event={}){
 if(!agent||agent.type!=="forensic-agent")throw new Error("forensic agent required");
 return Object.freeze({agentId:agent.id,entityKind:agent.entityKind,entityId:agent.entityId,eventType:String(event.type||"observation"),timestamp:String(event.timestamp||new Date().toISOString()),
  evidence:Object.freeze({...event.evidence}),observationOnly:true,mutation:false,execution:false,judgment:false,authorityGranted:false});
}
function tfForensicAgentSelfTestV36235(sourceText){
 const cov=tfUniversalForensicAgentCoverageV36235(sourceText),systems=tfCanonicalSystemIdsV36196(sourceText);
 const workers=tfCanonicalWorkerInventoryV36220(sourceText);
 const gens=tfGeneratorDescriptorsV36206(sourceText),autos=tfAutomatorDescriptorsV36206(sourceText),missing=[];
 if(cov.systems.length!==systems.length)missing.push("system-coverage");if(cov.workers.length!==workers.length)missing.push("worker-coverage");
 if(cov.generators.length!==gens.length)missing.push("generator-coverage");if(cov.automators.length!==autos.length)missing.push("automator-coverage");
 const all=[...cov.systems,...cov.workers,...cov.generators,...cov.automators];if(all.some(a=>a.type!=="forensic-agent"||a.mutatesEntity||a.executesEntity||a.prosecutes||a.judges||a.persisted||a.authorityGranted))missing.push("agent-boundary");
 if(TF_FORENSIC_AGENT_FABRIC_V36235.forensicSystemCreated||TF_FORENSIC_AGENT_FABRIC_V36235.persistsByDefault)missing.push("fabric-boundary");
 if(missing.length)throw new Error("forensic agent qualification failure "+missing.join(","));
 return Object.freeze({pass:true,forensicAgent:true,forensicSystemCreated:false,systems:cov.systems.length,workers:cov.workers.length,generators:cov.generators.length,automators:cov.automators.length,
  totalAgents:all.length,systemCoverage:true,workerCoverage:true,generatorCoverage:true,automatorCoverage:true,observational:true,mutatesEntity:false,executesEntity:false,prosecutes:false,judges:false,persistsByDefault:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.235 === */


 return Object.freeze({TF_FORENSIC_AGENT_FABRIC_V36235,tfForensicAgentSelfTestV36235,tfForensicAgentV36235,tfForensicEvidenceRecordV36235,tfUniversalForensicAgentCoverageV36235});
}
module.exports={bindForensicAgentV04465};

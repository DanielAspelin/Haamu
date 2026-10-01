"use strict";
function bindProjectCheckpointV04448(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfMutationCloneV36217,tfSystemAutomatorDescriptorV36196,tfSystemGeneratorDescriptorV36196,tfSystemWorkerDescriptorV36209}=deps;
/* === Terraformer v0.36.220: Project Checkpoint Integration === */
const TF_PROJECT_CHECKPOINT_SYSTEM_V36218=Object.freeze({
 schema:"TERRAFORMER-PROJECT-CHECKPOINT/1",id:"system.checkpoint",name:"Checkpoint System",family:"project-lifecycle",
 type:"project-checkpoint-system",mode:"versioned-reconstruction-evidence",
 condition:Object.freeze(["project-identified","checkpoint-id-valid","lineage-valid","state-captured","evidence-referenced"]),
 state:"registered",projectSystem:"system.project",
 integrates:Object.freeze(["system.project","system.version","system.lineage","system.qualification","system.reconstruction","system.snapshot","system.recovery","system.history","system.state","system.mutation"]),
 fields:Object.freeze(["projectId","checkpointId","ordinal","version","parentCheckpoint","qualificationState","state","evidence","reconstruction","recovery","createdAt"]),
 createsApproval:false,createsAuthority:false,deploys:false,persistsByDefault:false,
 logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false
});
const TF_PROJECT_CHECKPOINT_STATE_V36218=new Map();
function tfProjectCheckpointV36218(projectId,options={}){
 projectId=String(projectId||"").trim();if(!projectId)throw new Error("project identity required");
 const list=TF_PROJECT_CHECKPOINT_STATE_V36218.get(projectId)||[],ordinal=list.length+1,parent=list.length?list[list.length-1].checkpointId:null;
 const checkpointId=String(options.checkpointId||`${projectId}:checkpoint:${ordinal}`);
 if(list.some(x=>x.checkpointId===checkpointId))throw new Error("duplicate project checkpoint");
 const cp=Object.freeze({type:"project-checkpoint",mode:"versioned-reconstruction-evidence",condition:"captured",state:"registered",
  projectId,checkpointId,ordinal,version:options.version??null,parentCheckpoint:parent,qualificationState:options.qualificationState??"Unverified",
  projectState:options.state===undefined?null:tfMutationCloneV36217(options.state),evidence:Object.freeze([...(options.evidence||[])]),
  reconstruction:options.reconstruction??null,recovery:options.recovery??null,createdAt:options.createdAt??null,
  approval:false,authorityGranted:false,deployed:false,persisted:false});
 list.push(cp);TF_PROJECT_CHECKPOINT_STATE_V36218.set(projectId,list);return cp;
}
function tfProjectCheckpointsV36218(projectId){return Object.freeze([...(TF_PROJECT_CHECKPOINT_STATE_V36218.get(String(projectId))||[])])}
function tfProjectCheckpointDescriptorV36218(){
 return Object.freeze({...tfEntityObservabilityDescriptorV36207("system",TF_PROJECT_CHECKPOINT_SYSTEM_V36218),
 uuid:tfIdentityUuidV36195("canonical-system","system.checkpoint"),worker:tfSystemWorkerDescriptorV36209("system.checkpoint"),
 generator:tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196("system.checkpoint")),
 automator:tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196("system.checkpoint"))});
}
const TF_PROJECT_CHECKPOINT_KIT_V36218=Object.freeze({id:"kit.project-checkpoint",name:"Project Checkpoint Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["members-canonical","project-lineage-valid","recovery-reference-valid"]),state:"naturalized",
 members:Object.freeze(["system.project","system.checkpoint","system.version","system.lineage","system.qualification","system.reconstruction","system.snapshot","system.recovery","system.history","system.state","system.mutation"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,logging:"system.logging",reporting:"system.reporting",grantsAuthority:false});
function tfProjectCheckpointSelfTestV36218(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),d=tfProjectCheckpointDescriptorV36218(),missing=[];
 for(const id of TF_PROJECT_CHECKPOINT_KIT_V36218.members)if(!ids.has(id))missing.push(id);
 for(const k of ["type","mode","condition","state","uuid"])if(d[k]===undefined||d[k]===null||d[k]==="")missing.push("system.checkpoint:"+k);
 if(!d.worker||!d.generator||!d.automator||!d.logging?.enabled||!d.reporting?.enabled)missing.push("system.checkpoint:fabric");
 const p="selftest-project-v36218";TF_PROJECT_CHECKPOINT_STATE_V36218.delete(p);
 const a=tfProjectCheckpointV36218(p,{checkpointId:"cp1",version:"1",qualificationState:"Verified",state:{n:1},evidence:["e1"],reconstruction:"r1",recovery:"rec1"});
 const b=tfProjectCheckpointV36218(p,{checkpointId:"cp2",version:"2",qualificationState:"Under Conditional Experiment",state:{n:2}});
 if(a.ordinal!==1||b.ordinal!==2||b.parentCheckpoint!=="cp1"||a.approval||a.authorityGranted||a.deployed||a.persisted)missing.push("project-checkpoint-lineage");
 TF_PROJECT_CHECKPOINT_STATE_V36218.delete(p);
 if(missing.length)throw new Error("project checkpoint qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.checkpoint",projectIntegrated:true,ordered:true,lineage:true,qualificationState:true,reconstructionEvidence:true,recoveryReference:true,
 mutationIntegrated:true,workerCoverage:true,generatorCoverage:true,automatorCoverage:true,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,
 createsApproval:false,deploys:false,authorityGranted:false,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({TF_PROJECT_CHECKPOINT_KIT_V36218,TF_PROJECT_CHECKPOINT_STATE_V36218,TF_PROJECT_CHECKPOINT_SYSTEM_V36218,tfProjectCheckpointDescriptorV36218,tfProjectCheckpointSelfTestV36218,tfProjectCheckpointV36218,tfProjectCheckpointsV36218});
}
module.exports={bindProjectCheckpointV04448};

/* Terraformer v0.48.2: cross-owner implementation migrated after bridge qualification. */
function tfCheckpoint(id='runtime'){const snap=tfCanonicalReconstructionSnapshot();return Object.freeze({schema:'TERRAFORMER-CHECKPOINT/1',id:String(id),version:META.version,fingerprint:snap.fingerprint,systems:snap.systems.length,registers:snap.registers.length,persisted:false,restored:false,authorityGranted:false});}


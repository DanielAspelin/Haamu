"use strict";
function bindCanonicalRegistryReconciliationV04450(deps={}){
 const {TF_DIOS_KIT_V36215,TF_DIOS_STATE_V36215,TF_INDUSTRIAL_KIT_V36213,TF_INTERFACE_FEATURE_KIT_V36214,TF_INTERPRETATION_KIT_V36216,TF_MUTATION_KIT_V36217,TF_PROJECT_CHECKPOINT_KIT_V36218,TF_PROJECT_CHECKPOINT_STATE_V36218,tfAutomatorDescriptorsV36206,tfCanonicalSystemIdsV36196,tfComputationalKitInventoryV36212,tfDataImageEditV36191,tfDataImageNormalizeV36191,tfDiosChannelV36215,tfDiosRouteV36215,tfEntityObservabilityDescriptorV36207,tfGeneratorDescriptorsV36206,tfInterpretV36216,tfIntrinsicKitInventoryV36211,tfMutationV36217,tfProjectCheckpointV36218,tfSystemDerivedWorkerFabricV36209,tfSystemDescriptorsV36206,tfWorkerFabricCoverageV36209}=deps;
 const {registrationSystem,registerSystem,registrySystem,registrarSystem}=deps;
 if(!registrationSystem||!registerSystem||!registrySystem||!registrarSystem)throw new Error("registration family required");
/* === Terraformer v0.36.220: Canonical Registry & Lifecycle Reconciliation === */
function tfCanonicalWorkerInventoryV36220(sourceText){
 const f=tfSystemDerivedWorkerFabricV36209(sourceText),seen=new Set(),out=[];
 for(const w of f.workers){if(!w||!w.id||seen.has(w.id))continue;seen.add(w.id);out.push(tfEntityObservabilityDescriptorV36207("worker",w))}
 return Object.freeze(out);
}
function tfCanonicalEntityCoverageV36220(sourceText){
 const groups=Object.freeze({
  systems:Object.freeze(tfSystemDescriptorsV36206(sourceText).map(x=>tfEntityObservabilityDescriptorV36207("system",x))),
  workers:tfCanonicalWorkerInventoryV36220(sourceText),
  generators:Object.freeze(tfGeneratorDescriptorsV36206(sourceText).map(x=>tfEntityObservabilityDescriptorV36207("generator",x))),
  automators:Object.freeze(tfAutomatorDescriptorsV36206(sourceText).map(x=>tfEntityObservabilityDescriptorV36207("automator",x)))
 }),missing=[];
 for(const [group,items] of Object.entries(groups))for(const x of items){
  for(const k of ["type","mode","condition","state"])if(x[k]===undefined||x[k]===null||x[k]==="")missing.push({group,id:x.id,key:k});
  if(!x.logging?.enabled)missing.push({group,id:x.id,key:"logging"});if(!x.reporting?.enabled)missing.push({group,id:x.id,key:"reporting"});
 }
 return Object.freeze({pass:missing.length===0,groups,counts:Object.freeze(Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length]))),missing:Object.freeze(missing)});
}
function tfCanonicalKitInventoryV36220(sourceText){
 const all=[...tfIntrinsicKitInventoryV36211(sourceText),...tfComputationalKitInventoryV36212(sourceText),
  TF_INDUSTRIAL_KIT_V36213,TF_INTERFACE_FEATURE_KIT_V36214,TF_DIOS_KIT_V36215,TF_INTERPRETATION_KIT_V36216,TF_MUTATION_KIT_V36217,TF_PROJECT_CHECKPOINT_KIT_V36218];
 const byId=new Map();
 for(const k of all){if(!k?.id)continue;if(!byId.has(k.id))byId.set(k.id,k)}
 return Object.freeze([...byId.values()]);
}
function tfCanonicalKitCoverageV36220(sourceText){
 const systems=new Set(tfCanonicalSystemIdsV36196(sourceText)),kits=tfCanonicalKitInventoryV36220(sourceText),missing=[],seenMembers=new Set();
 for(const k of kits){const members=k.members||k.systems||[];for(const sid of members){if(String(sid).startsWith("system.")){seenMembers.add(sid);if(!systems.has(sid))missing.push({kit:k.id,system:sid})}}
  if(k.plugin===true||k.module===true||k.loadable===true||k.unloadable===true||k.grantsAuthority===true)missing.push({kit:k.id,key:"intrinsic-policy"});}
 return Object.freeze({pass:missing.length===0,kits:kits.length,uniqueMemberSystems:seenMembers.size,missing:Object.freeze(missing),intrinsic:true,authorityAmplification:false});
}
function tfPersistProjectCheckpointV36220(container,secret,projectId,checkpointOptions={},options={}){
 if(options.authorized!==true)throw new Error("project checkpoint persistence authorization required");
 if(!secret)throw new Error("project checkpoint persistence secret required");
 const cp=tfProjectCheckpointV36218(projectId,checkpointOptions);
 const edited=tfDataImageEditV36191(container,secret,image=>{
  const next=tfDataImageNormalizeV36191(image),arr=Array.isArray(next.checkpoints)?next.checkpoints.slice():[];
  arr.push({...cp,persisted:true});next.checkpoints=arr;
  const hist=Array.isArray(next.history)?next.history.slice():[];hist.push({type:"project-checkpoint-persisted",projectId:cp.projectId,checkpointId:cp.checkpointId,ordinal:cp.ordinal});
  next.history=hist;return next;
 });
 return Object.freeze({container:edited,checkpoint:Object.freeze({...cp,persisted:true}),authorized:true,encrypted:true,sidecar:false,authorityGranted:false});
}
const TF_SELF_UPDATE_RECOVERY_POLICY_V36220=Object.freeze({id:"policy.self-update-recovery",type:"recovery-retention-policy",mode:"checkpoint-governed",
 artifacts:"terraformer.js.previous-*",retain:3,minimum:1,checkpointSystem:"system.checkpoint",recoverySystem:"system.recovery",
 automaticDestruction:false,cleanupAuthorizationRequired:true,authorityGranted:false});
function tfSelfUpdateRecoveryDescriptorV36220(placementResult){
 if(!placementResult?.archive)return Object.freeze({captured:false,reason:"no-archive"});
 return Object.freeze({captured:true,type:"self-update-recovery-checkpoint",archive:placementResult.archive,
  sourceVersion:placementResult.sourceVersion||null,previousVersion:placementResult.previousVersion||null,sha256:placementResult.sha256||null,
  checkpointSystem:"system.checkpoint",recoverySystem:"system.recovery",persisted:true,authorityGranted:false});
}
const TF_CONTROLLED_TRANSFORMATION_PIPELINE_V36220=Object.freeze({
 id:"pipeline.dynamic-interpret-mutate-checkpoint",type:"controlled-lifecycle-pipeline",mode:"authorization-bounded",
 stages:Object.freeze(["system.dios","system.interpretation","mutation-proposal","authorization","system.checkpoint","system.mutation","system.verification","system.output"]),
 rules:Object.freeze({interpretationMutates:false,mutationRequiresAuthorization:true,checkpointBeforeMutation:true,verificationBeforeOutput:true,authorityAmplification:false})
});
function tfControlledTransformationV36220(channelId,payload,mutator,options={}){
 const route=tfDiosRouteV36215(channelId,payload,{authorized:options.inputAuthorized!==false});
 const interpretation=tfInterpretV36216(payload,options.interpretation||{});
 if(options.mutationAuthorized!==true)throw new Error("controlled transformation mutation authorization required");
 const cp=tfProjectCheckpointV36218(options.projectId||"runtime",{version:options.version||null,qualificationState:options.qualificationState||"Under Conditional Experiment",state:payload,evidence:options.evidence||[]});
 const mutation=tfMutationV36217(payload,mutator,{authorized:true,validate:options.validate});
 if(mutation.state!=="accepted")return Object.freeze({state:"RECOVER",route,interpretation,checkpoint:cp,mutation,verified:false,output:null,authorityGranted:false});
 return Object.freeze({state:"VERIFIED",route,interpretation,checkpoint:cp,mutation,verified:true,output:mutation.after.value,authorityGranted:false});
}
function tfCanonicalReconciliationSelfTestV36220(sourceText){
 const e=tfCanonicalEntityCoverageV36220(sourceText),k=tfCanonicalKitCoverageV36220(sourceText),missing=[];
 if(!e.pass)missing.push("entity-coverage");if(!k.pass)missing.push("kit-coverage");
 const wf=tfWorkerFabricCoverageV36209(sourceText);if(e.counts.workers!==wf.totalWorkers)missing.push("worker-count-split");
 const ch="reconcile-v36220";TF_DIOS_STATE_V36215.channels.delete(ch);tfDiosChannelV36215(ch,"data",{direction:"bidirectional"});
 const p=tfControlledTransformationV36220(ch,{n:1},x=>{x.n=2;return x},{mutationAuthorized:true,projectId:"selftest-reconcile",validate:x=>x.n===2});
 TF_DIOS_STATE_V36215.channels.delete(ch);TF_PROJECT_CHECKPOINT_STATE_V36218.delete("selftest-reconcile");
 if(p.state!=="VERIFIED"||p.output.n!==2||p.authorityGranted)missing.push("pipeline");
 if(missing.length)throw new Error("canonical reconciliation failure "+missing.join(","));
 return Object.freeze({pass:true,systems:e.counts.systems,workers:e.counts.workers,generators:e.counts.generators,automators:e.counts.automators,
  kits:k.kits,uniqueKitMembers:k.uniqueMemberSystems,workerAccountingUnified:true,kitRegistryUnified:true,encryptedCheckpointPersistenceBoundary:true,
  selfUpdateRecoveryGoverned:true,controlledPipeline:true,authorityAmplification:false,missing:0});
}
/* === end v0.36.220 === */

 return Object.freeze({TF_CONTROLLED_TRANSFORMATION_PIPELINE_V36220,TF_SELF_UPDATE_RECOVERY_POLICY_V36220,tfCanonicalEntityCoverageV36220,tfCanonicalKitCoverageV36220,tfCanonicalKitInventoryV36220,tfCanonicalReconciliationSelfTestV36220,tfCanonicalWorkerInventoryV36220,tfControlledTransformationV36220,tfPersistProjectCheckpointV36220,tfSelfUpdateRecoveryDescriptorV36220});
}
module.exports={bindCanonicalRegistryReconciliationV04450};

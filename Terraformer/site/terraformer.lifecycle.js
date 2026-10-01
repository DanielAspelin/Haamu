"use strict";
function bindLifecycleV04451(deps={}){
 const LIFECYCLE_SYSTEM=Object.freeze({schema:"TERRAFORMER-LIFECYCLE-SYSTEM/2",id:"system.lifecycle",name:"Lifecycle System",
  family:"lifecycle",type:"lifecycle-system",mode:"governed-state-transition",
  states:Object.freeze(["registered","admitted","active","suspended","retired"]),
  authorityGranted:false,persists:false});
 function descriptor(){return LIFECYCLE_SYSTEM;}
 function transition(current,next,options={}){
  if(!options.authorized)throw new Error("lifecycle: authorization required");
  if(!LIFECYCLE_SYSTEM.states.includes(next))throw new Error("lifecycle: invalid state");
  return Object.freeze({from:String(current||"registered"),to:next,authorityGranted:false});
 }
 function selfTest(){return Object.freeze({pass:LIFECYCLE_SYSTEM.authorityGranted===false,states:LIFECYCLE_SYSTEM.states.length,authorityGranted:false});}
 return Object.freeze({LIFECYCLE_SYSTEM,descriptor,transition,selfTest});
}


/* v0.44.78 lifecycle reporting/status successor facet is composed by terraformer.js; lifecycle ownership remains here. */

function bindSystemLifecycleControlV04511(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.279: System Creation / Destruction Lifecycle === */
const TF_SYSTEM_LIFECYCLE_CONTROL_V36279=Object.freeze([
 Object.freeze({id:"system.system-creation",concept:"System Creation",type:"system-lifecycle-process",mode:"bounded",condition:"validated-and-admitted",state:"ready",
  stages:Object.freeze(["specify","validate","classify","assign-identity","construct","register","verify","activate"]),
  preservesLineage:true,grantsAuthority:false}),
 Object.freeze({id:"system.system-destruction",concept:"System Destruction",type:"system-lifecycle-process",mode:"authorization-required",condition:"explicitly-authorized-and-recoverable",state:"ready",
  stages:Object.freeze(["identify","authorize","checkpoint","detach","deactivate","destruct","verify-absence","retain-lineage"]),
  preservesLineage:true,requiresCheckpoint:true,irreversibleEraseByDefault:false,grantsAuthority:false})
]);
function tfSystemCreationPlanV36279(spec={}){
 const id=String(spec.systemId||"");const valid=/^system\.[a-z0-9_.-]+$/.test(id);
 return Object.freeze({system:"system.system-creation",target:id,admitted:valid&&spec.validated===true,stages:TF_SYSTEM_LIFECYCLE_CONTROL_V36279[0].stages,
  creates:false,registers:false,authorityGranted:false});
}
function tfSystemDestructionPlanV36279(spec={}){
 const id=String(spec.systemId||"");const authorized=spec.authorized===true,checkpoint=spec.checkpoint===true;
 return Object.freeze({system:"system.system-destruction",target:id,admitted:/^system\.[a-z0-9_.-]+$/.test(id)&&authorized&&checkpoint,
  stages:TF_SYSTEM_LIFECYCLE_CONTROL_V36279[1].stages,destructs:false,erasesLineage:false,irreversibleErase:false,authorityGranted:false});
}
function tfSystemLifecycleControlSelfTestV36279(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=["system.system-creation","system.system-destruction"].filter(x=>!ids.has(x));
 const c=tfSystemCreationPlanV36279({systemId:"system.example",validated:true}),d0=tfSystemDestructionPlanV36279({systemId:"system.example",authorized:true}),
 d1=tfSystemDestructionPlanV36279({systemId:"system.example",authorized:true,checkpoint:true});
 if(!c.admitted||c.creates||c.authorityGranted)missing.push("creation-boundary");
 if(d0.admitted||!d1.admitted||d1.destructs||d1.erasesLineage||d1.irreversibleErase||d1.authorityGranted)missing.push("destruction-boundary");
 if(missing.length)throw new Error("system lifecycle control qualification failure "+missing.join(","));
 return Object.freeze({pass:true,systemCreation:true,systemDestruction:true,creationValidated:true,destructionAuthorizationRequired:true,
  destructionCheckpointRequired:true,lineagePreserved:true,irreversibleEraseDefault:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SYSTEM_LIFECYCLE_CONTROL_V36279,tfSystemCreationPlanV36279,tfSystemDestructionPlanV36279,tfSystemLifecycleControlSelfTestV36279});
}
module.exports={bindLifecycleV04451,bindSystemLifecycleControlV04511};

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const LIFECYCLE_SCHEMA='TERRAFORMER-LIFECYCLE/1';

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_LIFECYCLE_LOG_CHANNELS_V36434=Object.freeze(["normal","startup","maintenance","termination","error"]);

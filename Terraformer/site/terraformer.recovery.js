"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.recovery",concept:"Recovery",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfRecoveryPlan(errorRecord,{persistent=false,authorized=false}={}){if(persistent&&!authorized)return {schema:'TERRAFORMER-RECOVERY-PLAN/1',ok:false,state:'AUTHORIZATION_REQUIRED',lane:'persistent',errorId:errorRecord&&errorRecord.id||null};const lane=persistent?'persistent':'volatile';return {schema:'TERRAFORMER-RECOVERY-PLAN/1',ok:true,lane,steps:TERRAFORMER_RECOVERY_SYSTEM.lanes[lane],errorId:errorRecord&&errorRecord.id||null,verificationRequired:true,readmissionRequired:true,persistence:persistent}}

function tfRecoveryRecord(plan,result='planned'){const r={schema:'TERRAFORMER-RECOVERY-RECORD/1',id:tfUuidGenerate(),at:Date.now(),lane:plan.lane,state:String(result),errorId:plan.errorId||null,persistent:plan.lane==='persistent'};TF_ERROR_RECOVERY_STATE.recoveries.push(r);if(TF_ERROR_RECOVERY_STATE.recoveries.length>256)TF_ERROR_RECOVERY_STATE.recoveries.shift();TF_ERROR_RECOVERY_STATE.generation++;return r}

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TF_ERROR_RECOVERY_STATE={errors:[],recoveries:[],generation:0};

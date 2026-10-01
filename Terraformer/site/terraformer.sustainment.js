"use strict";
/* Candidate physicalization of an already-evidenced identity; not yet canonical responsibility ownership. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.sustainment",concept:"Sustainment",
 typeOf:"system.candidate",origin:"terraformer.temporary.js",
 establishedType:null,establishedFamily:"lifecycle",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfSustainmentRecord(kind,id,data={}){const key=String(id||tfUuidGenerate()),rec={id:key,kind,admitted:data.admitted===true,resolved:data.resolved===true,createdAt:Date.now(),reason:String(data.reason||''),source:String(data.source||'explicit'),volatile:true};if(kind==='observation')TF_SUSTAINMENT_STATE.observations.set(key,rec);else if(kind==='decision')TF_SUSTAINMENT_STATE.decisions.set(key,rec);else if(kind==='work')TF_SUSTAINMENT_STATE.work.set(key,rec);else throw new Error('Unknown sustainment record kind');return rec;}

function tfSustainmentEvidence(){const vals=m=>[...m.values()],work=vals(TF_SUSTAINMENT_STATE.work).filter(x=>x.admitted&&!x.resolved),observations=vals(TF_SUSTAINMENT_STATE.observations).filter(x=>x.admitted&&!x.resolved),decisions=vals(TF_SUSTAINMENT_STATE.decisions).filter(x=>x.admitted&&!x.resolved);return {work,observations,decisions,pendingPrivilege:TF_PRIVILEGE_CONTINUATIONS.size,recoveryOwner:!!globalThis.__TERRAFORMER_UPDATE_HANDOFF__,justified:work.length>0||observations.length>0||decisions.length>0||TF_PRIVILEGE_CONTINUATIONS.size>0||!!globalThis.__TERRAFORMER_UPDATE_HANDOFF__};}

/* Terraformer v0.47.99: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfAssessSustainment(){const e=tfSustainmentEvidence();let target='PACIFIED';if(e.work.length||e.pendingPrivilege||e.recoveryOwner)target='ACTIVE';else if(e.observations.length||e.decisions.length)target='OBSERVING';else if(TF_SUSTAINMENT_STATE.state==='ACTIVE'||TF_SUSTAINMENT_STATE.state==='OBSERVING')target='QUIESCENT';return {schema:'TERRAFORMER-SUSTAINMENT-ASSESSMENT/1',current:TF_SUSTAINMENT_STATE.state,target,evidence:e,invariant:TERRAFORMER_SUSTAINMENT.invariant};}

function tfTransitionSustainment(target,reason='assessment'){if(!TERRAFORMER_SUSTAINMENT.states.includes(target))throw new Error('Invalid sustainment state');const a=tfAssessSustainment();if((target==='ACTIVE'||target==='OBSERVING')&&!a.evidence.justified)throw new Error('Sustainment denied: no admitted justification');if(target==='PACIFIED'&&a.evidence.justified)throw new Error('Pacification denied: admitted obligation remains');if(target==='PACIFIED'){TF_PRIVILEGE_CONTINUATIONS.clear();TF_SUSTAINMENT_STATE.work.clear();}TF_SUSTAINMENT_STATE.state=target;TF_SUSTAINMENT_STATE.generation++;TF_SUSTAINMENT_STATE.lastTransition=Date.now();return {schema:'TERRAFORMER-SUSTAINMENT-TRANSITION/1',state:target,generation:TF_SUSTAINMENT_STATE.generation,reason,evidence:tfSustainmentEvidence(),volatile:true};}


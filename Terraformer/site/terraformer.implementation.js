"use strict";
/* Reverse-naturalized owner from established terraformer.temporary.js definition. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-IMPLEMENTATION-SYSTEM/1",id:"system.implementation",concept:"Implementation",
 typeOf:"system.system",family:"system",establishedType:"governed-change-actor-system",origin:"terraformer.temporary.js",
 transition:"REVERSE_NATURALIZATION",qualification:"UNDER_CONDITIONAL_EXPERIMENT",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
function bindImplementation(deps={}){
 const {TERRAFORMER_IMPLEMENTATION_EVIDENCE,TERRAFORMER_IMPLEMENTATION_QUALIFICATION}=deps;
 if(!TERRAFORMER_IMPLEMENTATION_EVIDENCE||!TERRAFORMER_IMPLEMENTATION_QUALIFICATION) throw new Error('implementation registries required');
 function tfImplementationEvidence(system){
  const tests=TERRAFORMER_IMPLEMENTATION_EVIDENCE[system.id]||[];
  return Object.freeze({schema:'TERRAFORMER-IMPLEMENTATION-EVIDENCE/1',system:system.id,tests:Object.freeze([...tests]),mapped:tests.length>0,implementationProven:false,reason:tests.length?'test-evidence-mapped-requires-system-specific-qualification':'no-system-specific-evidence-mapped'});
 }
 function tfImplementationQualification(system){
  const q=TERRAFORMER_IMPLEMENTATION_QUALIFICATION[system.id];
  if(!q)return Object.freeze({schema:'TERRAFORMER-IMPLEMENTATION-QUALIFICATION/1',system:system.id,qualified:false,state:'Unverified',tests:Object.freeze([]),scope:null});
  return Object.freeze({schema:'TERRAFORMER-IMPLEMENTATION-QUALIFICATION/1',system:system.id,qualified:true,state:'Verified',tests:q.tests,implementation:q.implementation,scope:q.scope,authorityAmplification:false});
 }
 return Object.freeze({tfImplementationEvidence,tfImplementationQualification});
}
module.exports=Object.freeze({SYSTEM,describe,bindImplementation});

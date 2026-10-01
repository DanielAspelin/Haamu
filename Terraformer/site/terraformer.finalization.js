"use strict";
/* Reverse-naturalized minimal owner from established terraformer.temporary.js definition. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-FINALIZATION-SYSTEM/1",id:"system.finalization",concept:"Finalization",
 typeOf:"system.system",family:"system",establishedType:"lifecycle-assurance-system",origin:"terraformer.temporary.js",
 transition:"REVERSE_NATURALIZATION",qualification:"UNDER_CONDITIONAL_EXPERIMENT",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfFinalizationStatusV36441(owner,{requirementsSatisfied=false,qualificationSatisfied=false,auditSatisfied=false,historyContinuous=false,corruptionClear=false,preparationSatisfied=false,healthAcceptable=false,explicitFinalize=false,materialContradiction=false,started=true}={}){const id=String(owner?.id??owner??"");if(!id)throw new Error("[TF:system.finalization:invalid-input] System identity required.");const evidence=Object.freeze({requirementsSatisfied:!!requirementsSatisfied,qualificationSatisfied:!!qualificationSatisfied,auditSatisfied:!!auditSatisfied,historyContinuous:!!historyContinuous,corruptionClear:!!corruptionClear,preparationSatisfied:!!preparationSatisfied,healthAcceptable:!!healthAcceptable});const ready=Object.values(evidence).every(Boolean);let status=!started?"not-started":ready?"ready":"blocked";if(started&&!ready&&Object.values(evidence).some(Boolean))status="in-progress";if(explicitFinalize&&ready)status="finalized";if(materialContradiction&&explicitFinalize)status="reopened";return Object.freeze({id:id+"::finalization-status",owner:id,system:"system.finalization-status",finalization:"system.finalization",finalizer:"system.finalizer",status,ready,explicitFinalize:!!explicitFinalize,materialContradiction:!!materialContradiction,evidence,reason:status==="blocked"||status==="in-progress"?"readiness-evidence-incomplete":status==="ready"?"readiness-evidence-satisfied-awaiting-explicit-finalizer":status==="reopened"?"material-contradiction-requires-requalification":status,...TF_FINALIZATION_BOUNDARY_V36441});}

function tfUniversalFinalizationFabricV36441(sourceText){const ids=tfCanonicalSystemIdsV36196(sourceText),records=ids.map(id=>tfFinalizationStatusV36441(id));return Object.freeze({version:"0.36.441",systems:ids.length,records:Object.freeze(records),everySystemHasFinalizationStatus:records.length===ids.length&&new Set(records.map(x=>x.id)).size===ids.length,states:TF_FINALIZATION_STATES_V36441,boundary:TF_FINALIZATION_BOUNDARY_V36441});}

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_FINALIZATION_STATES_V36441=Object.freeze(["not-started","in-progress","blocked","ready","finalized","reopened"]);

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_FINALIZATION_BOUNDARY_V36441=Object.freeze({automaticFinalization:false,qualificationIsFinalization:false,completionIsFinalization:false,sealingIsFinalization:false,terminationIsFinalization:false,deploymentIsFinalization:false,automaticMutation:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false});

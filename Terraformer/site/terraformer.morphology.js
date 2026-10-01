"use strict";
/* Terraformer Morphology System — semantic form analysis; candidate evidence, never automatic admission. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-MORPHOLOGY-SYSTEM/1",id:"system.morphology",concept:"Morphology",
 typeOf:"system.language",responsibility:"Analyze Token form and morphological evidence for governed semantic classification.",
 qualification:"UNDER_CONDITIONAL_EXPERIMENT",canonicalResponsibility:true,authorityGranted:false,
 automaticAdmission:false,automaticPhysicalization:false,automaticExecution:false,automaticPersistence:false
});
const RULES=Object.freeze({
 systemCandidate:Object.freeze({suffixes:Object.freeze(["ion","ing"]),evidence:"CANDIDATE_ONLY"}),
 workerCandidate:Object.freeze({suffixes:Object.freeze(["er","or"]),evidence:"STRONG_AGENTIVE_CANDIDATE_ONLY"}),
 finalR:Object.freeze({suffixes:Object.freeze(["r"]),evidence:"WEAK_WORKER_CANDIDATE_ONLY"}),
 constraints:Object.freeze(["CONTEXT","IDENTITY","NON_OVERLAP","RESPONSIBILITY","SEMANTICS","QUALIFICATION"])
});
function classify(token){
 const value=String(token||"").toLowerCase();
 const evidence=[];
 if(RULES.systemCandidate.suffixes.some(x=>value.endsWith(x))) evidence.push("SYSTEM_MORPHOLOGY_CANDIDATE");
 if(RULES.workerCandidate.suffixes.some(x=>value.endsWith(x))) evidence.push("WORKER_MORPHOLOGY_CANDIDATE");
 else if(value.endsWith("r")) evidence.push("WEAK_WORKER_MORPHOLOGY_CANDIDATE");
 return Object.freeze({token:value,evidence:Object.freeze(evidence),automaticAdmission:false});
}
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,RULES,classify,describe});

"use strict";
function bindStructuralAssuranceV04551(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.311: Structural Assurance & Establishment Fabric === */
const TF_STRUCTURAL_ASSURANCE_SYSTEMS_V36311=Object.freeze([
 Object.freeze({id:"system.duplication",concept:"Duplication",type:"structural-process-system",mode:"repeat-or-copy",condition:"source-and-duplicate-context-identified",state:"ready"}),
 Object.freeze({id:"system.deduplication",concept:"Deduplication",type:"structural-process-system",mode:"duplicate-identification-and-reconciliation",condition:"comparison-domain-and-equivalence-rule-identified",state:"ready"}),
 Object.freeze({id:"system.prerequisite",concept:"Prerequisite",type:"requirement-system",mode:"prior-required-condition",condition:"dependent-subject-and-prior-condition-identified",state:"ready"}),
 Object.freeze({id:"system.establishment",concept:"Establishment",type:"lifecycle-process-system",mode:"bring-into-defined-standing",condition:"subject-and-establishment-criteria-identified",state:"ready"}),
 Object.freeze({id:"system.ghost",concept:"Ghost",type:"testing-representation-system",mode:"non-authoritative-shadow-or-placeholder",condition:"represented-subject-and-test-context-identified",state:"ready"}),
 Object.freeze({id:"system.bait",concept:"Bait",type:"testing-stimulus-system",mode:"controlled-test-stimulus",condition:"test-context-and-expected-observation-identified",state:"ready"})
]);
const TF_STRUCTURAL_ASSURANCE_RELATIONSHIPS_V36311=Object.freeze([
 Object.freeze({from:"system.deduplication",relation:"operates-on",to:"system.duplication"}),
 Object.freeze({from:"system.prerequisite",relation:"type-of",to:"system.requirement"}),
 Object.freeze({from:"system.dependency",relation:"may-use",to:"system.prerequisite"}),
 Object.freeze({from:"system.establishment",relation:"uses",to:"system.requirement"}),
 Object.freeze({from:"system.establishment",relation:"may-use",to:"system.prerequisite"}),
 Object.freeze({from:"system.testing",relation:"may-use",to:"system.ghost"}),
 Object.freeze({from:"system.testing",relation:"may-use",to:"system.bait"}),
 Object.freeze({from:"system.tester",relation:"may-use",to:"system.ghost"}),
 Object.freeze({from:"system.tester",relation:"may-use",to:"system.bait"})
]);
function tfStructuralAssuranceContextV36311(kind,spec={}){
 kind=String(kind??"").toLowerCase();
 const admitted=["duplication","deduplication","prerequisite","establishment","ghost","bait"];
 if(!admitted.includes(kind))throw new Error("unadmitted structural assurance kind");
 return Object.freeze({system:"system."+kind,subject:String(spec.subject??"").trim()||null,
  context:String(spec.context??"").trim()||"generic",canonical:true,
  deceptionImplied:false,externalTargeting:false,autonomousAction:false,authorityGranted:false,
  destructiveDeduplication:false,establishmentAuthorityImplied:false,executionPerformed:false,mutationPerformed:false});
}
function tfStructuralAssuranceSelfTestV36311(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 const required=["system.duplication","system.deduplication","system.requirement","system.prerequisite","system.dependency",
 "system.establishment","system.ghost","system.bait","system.testing","system.tester"];
 for(const id of required)if(!ids.has(id))missing.push(id);
 const g=tfStructuralAssuranceContextV36311("ghost",{subject:"system.table",context:"test"});
 const b=tfStructuralAssuranceContextV36311("bait",{subject:"system.testing",context:"controlled"});
 const d=tfStructuralAssuranceContextV36311("deduplication",{subject:"system.data"});
 if(g.deceptionImplied||b.externalTargeting||b.autonomousAction||d.destructiveDeduplication||g.authorityGranted)missing.push("safety-boundary");
 if(missing.length)throw new Error("structural assurance qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:6,reusedSystems:4,duplication:true,deduplication:true,requirement:true,prerequisite:true,
 dependency:true,establishment:true,ghost:true,bait:true,testing:true,tester:true,ghostNonAuthoritative:true,
 baitControlledTestStimulus:true,destructiveDeduplication:false,authorityAmplification:false,executionPerformed:false,mutationPerformed:false,missing:0});
}
 return Object.freeze({TF_STRUCTURAL_ASSURANCE_SYSTEMS_V36311,TF_STRUCTURAL_ASSURANCE_RELATIONSHIPS_V36311,tfStructuralAssuranceContextV36311,tfStructuralAssuranceSelfTestV36311});
}
module.exports=Object.freeze({bindStructuralAssuranceV04551});

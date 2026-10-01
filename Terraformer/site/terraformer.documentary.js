"use strict";
function bindTextCorruptionDocumentaryV04580(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.340: Text Boundary / Corruption Test / Documentary Fabric === */
const TF_TEXT_CORRUPTION_DOCUMENTARY_SYSTEMS_V36340=Object.freeze([
 Object.freeze({id:"system.line-break",concept:"Line Break",type:"text-structure-system",mode:"line-boundary-representation",condition:"text-context-identified",state:"ready"}),
 Object.freeze({id:"system.white-space",concept:"White Space",type:"text-structure-system",mode:"spacing-and-separation-representation",condition:"text-context-identified",state:"ready"}),
 Object.freeze({id:"system.corruption",concept:"Corruption",type:"integrity-condition-system",mode:"corruption-condition-representation",condition:"integrity-context-identified",state:"ready"}),
 Object.freeze({id:"system.corruption-test",concept:"Corruption Test",type:"integrity-test-system",mode:"bounded-corruption-evidence-test",condition:"test-subject-admitted",state:"ready"}),
 Object.freeze({id:"system.documentary",concept:"Documentary",type:"documentary-content-system",mode:"documentary-form-and-content",condition:"documentary-context-identified",state:"ready"})
]);
const TF_TEXT_CORRUPTION_DOCUMENTARY_RELATIONSHIPS_V36340=Object.freeze([
 Object.freeze({from:"system.line-break",relation:"part-of",to:"system.text"}),
 Object.freeze({from:"system.white-space",relation:"part-of",to:"system.text"}),
 Object.freeze({from:"system.corruption-test",relation:"uses",to:"system.testing"}),
 Object.freeze({from:"system.corruption-test",relation:"observes",to:"system.corruption"}),
 Object.freeze({from:"system.documentation",relation:"uses",to:"system.document"}),
 Object.freeze({from:"system.documentary",relation:"uses",to:"system.document"})
]);
function tfCorruptionTestV36340(spec={}){
 const evidence=Array.isArray(spec.evidence)?spec.evidence.slice():[];
 return Object.freeze({system:"system.corruption-test",conditionSystem:"system.corruption",testingSystem:"system.testing",
  evidence:Object.freeze(evidence),corruptionObserved:evidence.length>0,corruptionAssumed:false,
  destructiveRepair:false,automaticMutation:false,persistencePerformed:false,authorityGranted:false});
}
function tfTextDocumentarySelfTestV36340(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.line-break","system.white-space","system.corruption","system.corruption-test","system.documentation","system.documentary","system.document","system.testing","system.tester"])if(!ids.has(id))missing.push(id);
 const clean=tfCorruptionTestV36340(),found=tfCorruptionTestV36340({evidence:["qualified-fixture"]});
 if(clean.corruptionObserved||clean.corruptionAssumed||!found.corruptionObserved||found.corruptionAssumed||found.destructiveRepair||found.automaticMutation||found.authorityGranted)missing.push("corruption-test-boundary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Text / corruption / documentary qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:5,documentationReused:true,documentReused:true,lineBreak:true,whiteSpace:true,
  corruption:true,corruptionTest:true,documentary:true,corruptionAssumed:false,destructiveRepair:false,
  authorityAmplification:false,missing:0});
}
globalThis.TF_TEXT_CORRUPTION_DOCUMENTARY_SYSTEMS_V36340=TF_TEXT_CORRUPTION_DOCUMENTARY_SYSTEMS_V36340;
globalThis.TF_TEXT_CORRUPTION_DOCUMENTARY_RELATIONSHIPS_V36340=TF_TEXT_CORRUPTION_DOCUMENTARY_RELATIONSHIPS_V36340;
globalThis.tfCorruptionTestV36340=tfCorruptionTestV36340;
 return Object.freeze({TF_TEXT_CORRUPTION_DOCUMENTARY_SYSTEMS_V36340,TF_TEXT_CORRUPTION_DOCUMENTARY_RELATIONSHIPS_V36340,tfCorruptionTestV36340,tfTextDocumentarySelfTestV36340});
}
module.exports=Object.freeze({bindTextCorruptionDocumentaryV04580});

"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-DISAGREEMENT-SYSTEM/1",id:"system.disagreement",concept:"Disagreement",
 typeOf:"system.system",family:"negotiation-outcome",registry:"terraformer.disagreements.json",
 authorityGranted:false,consentImplied:false,legalEffectImplied:false,automaticExecution:false
});
function record(subject,evidence=[]){return Object.freeze({schema:"TERRAFORMER-DISAGREEMENT/1",subject,evidence:Object.freeze([...evidence]),authorityGranted:false,consentImplied:false});}
module.exports=Object.freeze({SYSTEM,record});

"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-SYSTEM/1",id:"system.candidate",concept:"Candidate",
 typeOf:"system.system",family:"classification",registry:"terraformer.candidates.json",
 qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function classify(subject,evidence=[]){if(!subject)throw Error("candidate: subject required");return Object.freeze({subject,type:"Candidate",evidence:Object.freeze([...evidence]),canonical:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,classify});

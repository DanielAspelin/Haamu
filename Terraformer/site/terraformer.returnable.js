"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-RETURNABLE-SYSTEM/1",id:"system.returnable",concept:"Returnable",typeOf:"system.system",registry:"terraformer.returnables.json",authorityGranted:false,returnExecutionGranted:false});
function classify(subject,criteria="admitted-return-contract"){if(subject===undefined)throw Error("returnable: subject required");return Object.freeze({schema:"TERRAFORMER-RETURNABLE/1",subject,criteria,returnable:true,authorityGranted:false,returnExecutionGranted:false});}
module.exports=Object.freeze({SYSTEM,classify});

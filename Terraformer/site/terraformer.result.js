"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-RESULT-SYSTEM/1",id:"system.result",concept:"Result",
 typeOf:"system.system",family:"outcome",registry:"terraformer.results.json",
 rule:"A Result represents a bounded observed or derived outcome; it does not manufacture success, qualification, approval, or authority.",authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function define(subject,evidence=[]){return Object.freeze({schema:"TERRAFORMER-RESULT/1",subject,evidence:Object.freeze([...evidence]),authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,define});

"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-ACHIEVEMENT-SYSTEM/1",id:"system.achievement",concept:"Achievement",
 typeOf:"system.system",family:"outcome",registry:"terraformer.achievements.json",
 rule:"An Achievement represents an evidenced attained condition against stated criteria; it does not manufacture qualification, approval, entitlement, or authority.",authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function define(subject,evidence=[]){return Object.freeze({schema:"TERRAFORMER-ACHIEVEMENT/1",subject,evidence:Object.freeze([...evidence]),authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,define});

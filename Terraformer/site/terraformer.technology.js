"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-TECHNOLOGY-SYSTEM/1",id:"system.technology",concept:"Technology",
 typeOf:"system.system",family:"technology",registry:"terraformer.technologies.json",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function classify(subject,evidence=[]){if(!subject)throw Error("technology: subject required");return Object.freeze({subject,evidence:Object.freeze([...evidence]),technological:true,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,classify});

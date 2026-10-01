"use strict";
/* Reverse-naturalized minimal owner from established terraformer.industry.js definition. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-DELIVERY-SYSTEM/1",id:"system.delivery",concept:"Delivery",
 typeOf:"system.system",family:"industry",establishedType:"delivery-system",origin:"terraformer.industry.js",
 transition:"REVERSE_NATURALIZATION",qualification:"UNDER_CONDITIONAL_EXPERIMENT",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

const DELIVERY_PATH_V04784=Object.freeze({schema:"TERRAFORMER-DELIVERY-PATH/1",version:"0.47.84",
 from:"system.program",via:"system.delivery",to:"system.platform",targetMustBeExplicit:true,
 publicationImplied:false,executionImplied:false,authorityGranted:false});
function plan(program,targetPlatform){if(!program||!targetPlatform)throw Error("PROGRAM_AND_TARGET_PLATFORM_REQUIRED");
 return Object.freeze({program:String(program),targetPlatform:String(targetPlatform),planOnly:true,
 deliveryPerformed:false,publicationPerformed:false,authorityGranted:false});}
module.exports=Object.freeze({...module.exports,DELIVERY_PATH_V04784,plan});

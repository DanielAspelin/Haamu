"use strict";
/* Reverse-naturalized minimal owner from established terraformer.industry.js definition. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-MANUFACTURING-SYSTEM/1",id:"system.manufacturing",concept:"Manufacturing",
 typeOf:"system.system",family:"system",establishedType:"manufacturing-system",origin:"terraformer.industry.js",
 transition:"REVERSE_NATURALIZATION",qualification:"UNDER_CONDITIONAL_EXPERIMENT",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

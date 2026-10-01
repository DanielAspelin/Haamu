"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-SINGLE-SYSTEM/1",
 id:"system.single",
 concept:"Single",
 typeOf:"system.system",
 family:"classification-behavior-primitive",
 semantics:"single-scope or single-member characteristic",
 registry:null,
 authorityGranted:false,
 automaticExecution:false,
 automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

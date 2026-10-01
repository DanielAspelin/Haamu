"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CHAIN-SYSTEM/1",
 id:"system.chain",concept:"Chain",typeOf:"system.passage",
 topologyType:"Passage",registry:"terraformer.chains.json",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

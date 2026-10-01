"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-BUSLINE-SYSTEM/1",
 id:"system.busline",concept:"Busline",typeOf:"system.passage",
 topologyType:"Passage",registry:"terraformer.buslines.json",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

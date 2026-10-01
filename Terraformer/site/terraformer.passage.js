"use strict";
const PASSAGE=Object.freeze({
  schema:"TERRAFORMER-PASSAGE/1", id:"system.passage", concept:"Passage",
  typeOf:"Topology", typeIndex:0, zeroPoint:true,
  responsibility:"Classify passage-oriented topology structures without granting traversal, transmission, connection, execution, persistence, access, or authority.",
  registry:"terraformer.passages.json", authorityGranted:false,
  qualification:"UNDER_CONDITIONAL_EXPERIMENT"
});
function describe(){return PASSAGE;}
function validate(x=PASSAGE){return !!x&&x.id==="system.passage"&&x.typeOf==="Topology"&&x.authorityGranted===false;}
module.exports=Object.freeze({PASSAGE,describe,validate});

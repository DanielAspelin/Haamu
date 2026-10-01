"use strict";
const GRAPH=Object.freeze({
  schema:"TERRAFORMER-GRAPH/1",
  id:"system.graph",
  concept:"Graph",
  typeOf:"System",
  responsibility:"Represent governed nodes and relationships as a graph structure without manufacturing connectivity, topology, authority, execution, persistence, or qualification.",
  registry:"terraformer.graphs.json",
  authorityGranted:false,
  automaticExecution:false,
  qualification:"UNDER_CONDITIONAL_EXPERIMENT"
});
function describe(){return GRAPH;}
function validate(candidate=GRAPH){
  return !!candidate && candidate.id==="system.graph" && candidate.typeOf==="System" &&
    candidate.registry==="terraformer.graphs.json" && candidate.authorityGranted===false;
}
function selfTest(){return Object.freeze({schema:"TERRAFORMER-GRAPH-SELF-TEST/1",pass:validate(),id:GRAPH.id,authorityGranted:false});}
module.exports=Object.freeze({GRAPH,describe,validate,selfTest});

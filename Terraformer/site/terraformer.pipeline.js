"use strict";
function bindPipelineV04495(){
 const SYSTEM=Object.freeze({id:"system.pipeline",name:"Pipeline System",family:"composition",type:"pipeline-system",mode:"bounded-composition",state:"naturalized",grantsAuthority:false});
 const NETWORK_DISCOVERY_PIPELINE=Object.freeze(["Discovery","Scanner","Observation","Mapper","Topology"]);
 function describeNetworkDiscoveryPipeline(){return Object.freeze({system:SYSTEM,stages:NETWORK_DISCOVERY_PIPELINE,executes:false,authorityGranted:false});}
 return Object.freeze({SYSTEM,NETWORK_DISCOVERY_PIPELINE,describeNetworkDiscoveryPipeline});
}
module.exports={bindPipelineV04495};

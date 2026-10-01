"use strict";
function bindInterconnectionV04535(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.300: Interconnection System === */
const TF_INTERCONNECTION_SYSTEM_V36300=Object.freeze({
 id:"system.interconnection",concept:"Interconnection",type:"topology-system",mode:"typed-link",
 condition:"endpoints-and-relationship-identified",state:"ready"
});
const TF_INTERCONNECTION_RELATIONSHIPS_V36300=Object.freeze([
 Object.freeze({from:"system.interconnection",relation:"uses",to:"system.connection"}),
 Object.freeze({from:"system.interconnection",relation:"operates-on",to:"system.network"}),
 Object.freeze({from:"system.bridge",relation:"uses",to:"system.interconnection"}),
 Object.freeze({from:"system.router",relation:"uses",to:"system.interconnection"}),
 Object.freeze({from:"system.switch",relation:"uses",to:"system.interconnection"}),
 Object.freeze({from:"system.protocol",relation:"uses",to:"system.interconnection"}),
 Object.freeze({from:"system.port",relation:"uses",to:"system.interconnection"})
]);
function tfInterconnectionPlanV36300(spec={}){
 const source=String(spec.source??""),target=String(spec.target??""),relationship=String(spec.relationship??"interconnects-with");
 if(!source||!target)throw new Error("interconnection requires source and target");
 const direction=spec.direction==="unidirectional"?"unidirectional":"bidirectional";
 return Object.freeze({system:"system.interconnection",source,target,relationship,direction,
  typed:true,endpointsIdentified:true,directPhysicalConnection:false,connected:false,binds:false,routes:false,switches:false,bridges:false,
  transmits:false,executes:false,mutates:false,authorityGranted:false});
}
function tfInterconnectionSelfTestV36300(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.interconnection","system.connection","system.network","system.bridge","system.router","system.switch","system.protocol","system.port","system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 const p=tfInterconnectionPlanV36300({source:"system.protocol",target:"system.port",relationship:"resolves-with"});
 if(!p.typed||!p.endpointsIdentified||p.direction!=="bidirectional"||p.directPhysicalConnection||p.connected||p.transmits||p.executes||p.authorityGranted)missing.push("interconnection-boundary");
 if(missing.length)throw new Error("interconnection qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,interconnection:true,connectionBridge:true,networkContext:true,typedEndpoints:true,bidirectionalDefault:true,
  physicalConnectionNotImplied:true,transmissionNotImplied:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_INTERCONNECTION_SYSTEM_V36300,TF_INTERCONNECTION_RELATIONSHIPS_V36300,tfInterconnectionPlanV36300,tfInterconnectionSelfTestV36300});
}
module.exports=Object.freeze({bindInterconnectionV04535});

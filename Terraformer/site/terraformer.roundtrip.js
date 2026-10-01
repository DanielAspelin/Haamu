"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-ROUNDTRIP-SYSTEM/1",id:"system.roundtrip",concept:"RoundTrip",
 typeOf:"system.system",registry:"terraformer.roundtrips.json",
 authorityGranted:false,automaticExecution:false,automaticTransmission:false,automaticPersistence:false
});
function verify(spec){
 if(!spec||!Array.isArray(spec.members)||!Array.isArray(spec.edges)||!spec.members.length)return false;
 const next=new Map();
 for(const e of spec.edges){if(next.has(e.from))return false;next.set(e.from,e.to);}
 const start=spec.members[0];let cur=start;
 for(let i=0;i<=spec.edges.length;i++){if(!next.has(cur))return false;cur=next.get(cur);if(cur===start)return true;}
 return false;
}
module.exports=Object.freeze({SYSTEM,verify});

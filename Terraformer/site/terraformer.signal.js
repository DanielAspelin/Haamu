"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-SIGNAL-SYSTEM/1",id:"system.signal",concept:"Signal",
 typeOf:"system.system",family:"information-communication",registry:"terraformer.signals.json",
 reporting:"system.reporting",messaging:"system.messaging",
 transmissionImplied:false,publicationImplied:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function create(kind,payload=null){if(typeof kind!=="string"||!kind.trim())throw Error("signal: kind required");return Object.freeze({schema:"TERRAFORMER-SIGNAL/1",kind:kind.trim(),payload,authorityGranted:false,transmissionImplied:false});}
module.exports=Object.freeze({SYSTEM,create});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfPropagateSignal(origin,target,payload={},authorityScope='observe',parent=null){if(!TF_COGNITIVE_STATE.neuralNodes.has(origin)||!TF_COGNITIVE_STATE.neuralNodes.has(target))throw new Error('Propagation endpoints are not neural-registered');const edge=[...TF_COGNITIVE_STATE.neuralEdges.values()].find(e=>e.from===origin&&e.to===target);if(!edge)throw new Error('Propagation edge not admitted');const hops=parent?Number(parent.hops||0)+1:1;if(hops>TERRAFORMER_PROPAGATION.maxHops)throw new Error('Propagation TTL exceeded');const signal={schema:'TERRAFORMER-PROPAGATED-SIGNAL/1',id:tfUuidGenerate(),origin,target,authorityScope:String(authorityScope),payloadDigest:crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex'),hops,path:[...(parent?.path||[origin]),target],createdAt:Date.now(),authorityAmplification:false,volatile:true};TF_COGNITIVE_STATE.signals.set(signal.id,signal);return signal;}


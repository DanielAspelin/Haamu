"use strict";
const SYSTEM=Object.freeze({id:"system.neural",concept:"Neural",type:"neural-system",automaticExecution:false,persistencePerformed:false,authorityGranted:false,scaffold:true});
module.exports=Object.freeze({SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfNeuralConnect(from,to,scope='information'){if(!TF_COGNITIVE_STATE.neuralNodes.has(from)||!TF_COGNITIVE_STATE.neuralNodes.has(to))throw new Error('Neural edge endpoints must be registered');const id=from+'->'+to+':'+scope,e={id,from,to,scope:String(scope),authorityAmplification:false,volatile:true};TF_COGNITIVE_STATE.neuralEdges.set(id,e);return e;}


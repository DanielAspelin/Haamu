'use strict';
const TERRAFORMER_BINDER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.binder',name:'Binder',system:'system.binding',state:'integrated',canonicalPath:'terraformer://binding/binder/',capabilities:Object.freeze(['receive-bind-request','prepare-binding-reference','validate-scope','report-evidence']),authorityInherited:false,rule:'Binder is bounded to admitted binding work and cannot mutate resources or transfer authority.'});

function describe(){return TERRAFORMER_BINDER_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.binder'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_BINDER_AGENT,describe,selfTest});

'use strict';
const TERRAFORMER_CONCATENATOR_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.concatenator',name:'Concatenator',system:'system.concatenation',state:'integrated',canonicalPath:'terraformer://concatenation/concatenator/',capabilities:Object.freeze(['receive-sequence','prepare-concatenation','validate-order','report-result']),authorityInherited:false,rule:'Concatenator prepares representational concatenation and cannot execute resulting content.'});

function describe(){return TERRAFORMER_CONCATENATOR_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.concatenator'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_CONCATENATOR_AGENT,describe,selfTest});

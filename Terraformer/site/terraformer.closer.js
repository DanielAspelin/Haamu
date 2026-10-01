'use strict';
const TERRAFORMER_CLOSER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.closer',name:'Closer',system:'system.closing',state:'integrated',canonicalPath:'terraformer://closing/closer/',capabilities:Object.freeze(['receive-close-request','prepare-transition','verify-completion','report-result']),authorityInherited:false,rule:'Closer cannot destroy state or terminate external resources without separate authority.'});

function describe(){return TERRAFORMER_CLOSER_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.closer'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_CLOSER_AGENT,describe,selfTest});

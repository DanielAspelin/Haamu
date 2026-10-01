'use strict';
const TERRAFORMER_OPENER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.opener',name:'Opener',system:'system.opening',state:'integrated',canonicalPath:'terraformer://opening/opener/',capabilities:Object.freeze(['receive-open-request','validate-admission','prepare-transition','report-result']),authorityInherited:false,rule:'Opener cannot bypass locks, grant access, or open external resources without separate authority.'});

function describe(){return TERRAFORMER_OPENER_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.opener'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_OPENER_AGENT,describe,selfTest});

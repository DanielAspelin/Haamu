'use strict';
const TERRAFORMER_BANKER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.banker',name:'Banker',system:'system.banking',state:'integrated',canonicalPath:'terraformer://banking/banker/',capabilities:Object.freeze(['receive-banking-request','inspect-reference','prepare-transaction-intent','report-evidence']),authority:Object.freeze({fundMovement:false,accountAccess:false,approval:false,settlement:false,credentialAccess:false}),rule:'Banker is a bounded banking-system agent and receives no independent financial or account authority.'});

function describe(){return TERRAFORMER_BANKER_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.banker'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_BANKER_AGENT,describe,selfTest});

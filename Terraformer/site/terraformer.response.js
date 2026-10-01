'use strict';
const TERRAFORMER_RESPONSE_SYSTEM=Object.freeze({schema:'TERRAFORMER-RESPONSE-SYSTEM/1',id:'system.response',name:'Response System',family:'interaction',type:'response-system',state:'integrated',canonicalPath:'terraformer://response/',dependsOn:Object.freeze(['system.request', 'system.action']),governs:Object.freeze(['response', 'identity', 'state', 'relation', 'evidence']),rule:'Response System represents bounded outcomes and replies correlated to requests/actions without manufacturing success or external completion.'});

module.exports=Object.freeze({TERRAFORMER_RESPONSE_SYSTEM});

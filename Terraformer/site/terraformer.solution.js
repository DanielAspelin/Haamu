'use strict';
const TERRAFORMER_SOLUTION_SYSTEM=Object.freeze({schema:'TERRAFORMER-SOLUTION-SYSTEM/1',id:'system.solution',name:'Solution System',family:'business',type:'solution-system',state:'integrated',canonicalPath:'terraformer://solution/',dependsOn:Object.freeze(['system.product', 'system.service']),governs:Object.freeze(['solution', 'identity', 'state', 'relation', 'evidence']),rule:'Solution System composes admitted product and service references against requirements without guaranteeing fitness, outcome, or contractual commitment.'});

module.exports=Object.freeze({TERRAFORMER_SOLUTION_SYSTEM});

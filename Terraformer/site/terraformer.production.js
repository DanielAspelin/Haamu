'use strict';
const TERRAFORMER_PRODUCTION_SYSTEM=Object.freeze({schema:'TERRAFORMER-PRODUCTION-SYSTEM/1',id:'system.production',name:'Production System',family:'production',type:'production-system',state:'integrated',canonicalPath:'terraformer://production/',dependsOn:Object.freeze(['system.work', 'system.resource']),governs:Object.freeze(['production', 'input', 'process-reference', 'output', 'capacity', 'quality-reference']),rule:'Production System models admitted production plans and observations; representation does not start machinery, consume resources, or release products.'});

module.exports=Object.freeze({TERRAFORMER_PRODUCTION_SYSTEM});

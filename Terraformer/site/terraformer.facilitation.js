'use strict';
const TERRAFORMER_FACILITATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-FACILITATION-SYSTEM/1',id:'system.facilitation',name:'Facilitation System',family:'facility',type:'facilitation-system',state:'integrated',canonicalPath:'terraformer://facilitation/',dependsOn:Object.freeze(['system.facility', 'system.work']),governs:Object.freeze(['facilitation', 'request', 'resource-reference', 'coordination', 'support', 'status']),rule:'Facilitation System coordinates admitted support relationships without granting facility, resource, organizational, or external authority.'});

module.exports=Object.freeze({TERRAFORMER_FACILITATION_SYSTEM});

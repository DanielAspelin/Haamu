'use strict';
const TERRAFORMER_CAPSULE_SYSTEM=Object.freeze({schema:'TERRAFORMER-CAPSULE-SYSTEM/1',id:'system.capsule',name:'Capsule System',family:'containment',type:'capsule-system',state:'integrated',canonicalPath:'terraformer://capsule/',dependsOn:Object.freeze(['system.container']),governs:Object.freeze(['capsule', 'payload-reference', 'boundary', 'metadata', 'lifecycle']),rule:'Capsule System models compact bounded payload containment without execution, unpacking, persistence, or transport authority.'});

module.exports=Object.freeze({TERRAFORMER_CAPSULE_SYSTEM});

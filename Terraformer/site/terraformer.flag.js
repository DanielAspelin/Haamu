'use strict';
const TERRAFORMER_FLAG_SYSTEM=Object.freeze({schema:'TERRAFORMER-FLAG-SYSTEM/1',id:'system.flag',name:'Flag System',family:'state',type:'flag-system',state:'integrated',canonicalPath:'terraformer://flag/',dependsOn:Object.freeze(['system.state']),governs:Object.freeze(['flag', 'identity', 'state', 'relation', 'evidence']),rule:'Flag System represents named bounded flags and values; setting a representation does not itself change external system state or authority.'});

module.exports=Object.freeze({TERRAFORMER_FLAG_SYSTEM});

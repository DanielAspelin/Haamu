'use strict';
const TERRAFORMER_WARE_SYSTEM=Object.freeze({schema:'TERRAFORMER-WARE-SYSTEM/1',id:'system.ware',name:'Ware System',family:'technology',type:'ware-system',state:'integrated',canonicalPath:'terraformer://ware/',dependsOn:Object.freeze(['system.hardware', 'system.software', 'system.firmware']),governs:Object.freeze(['ware', 'identity', 'state', 'relation', 'evidence']),rule:'Ware System classifies admitted hardware, firmware, software, and related technology artifacts without collapsing their authority boundaries.'});

module.exports=Object.freeze({TERRAFORMER_WARE_SYSTEM});

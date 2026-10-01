'use strict';
const TERRAFORMER_UEFI_SYSTEM=Object.freeze({schema:'TERRAFORMER-UEFI-SYSTEM/1',id:'system.uefi',name:'UEFI System',family:'firmware',type:'uefi-system',state:'integrated',canonicalPath:'terraformer://firmware/uefi/',dependsOn:Object.freeze(['system.firmware', 'system.boot']),governs:Object.freeze(['uefi', 'identity', 'state', 'relation', 'evidence']),rule:'UEFI System models UEFI configuration and boot-interface references without firmware write, Secure Boot key, credential, or boot-policy authority.'});

module.exports=Object.freeze({TERRAFORMER_UEFI_SYSTEM});

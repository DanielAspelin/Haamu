'use strict';
const TERRAFORMER_BIOS_SYSTEM=Object.freeze({schema:'TERRAFORMER-BIOS-SYSTEM/1',id:'system.bios',name:'BIOS System',family:'firmware',type:'bios-system',state:'integrated',canonicalPath:'terraformer://firmware/bios/',dependsOn:Object.freeze(['system.firmware', 'system.boot']),governs:Object.freeze(['bios', 'identity', 'state', 'relation', 'evidence']),rule:'BIOS System models BIOS configuration and boot-interface references without firmware write, credential, security-control, or boot-policy authority.'});

module.exports=Object.freeze({TERRAFORMER_BIOS_SYSTEM});

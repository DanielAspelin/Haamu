'use strict';
const TERRAFORMER_BOOT_SYSTEM=Object.freeze({schema:'TERRAFORMER-BOOT-SYSTEM/1',id:'system.boot',name:'Boot System',family:'boot',type:'boot-system',state:'integrated',canonicalPath:'terraformer://boot/',dependsOn:Object.freeze(['system.firmware', 'system.operating']),governs:Object.freeze(['boot', 'identity', 'state', 'relation', 'evidence']),rule:'Boot System models admitted startup and boot relationships; it does not independently alter firmware, boot order, disks, operating systems, or network boot state.'});

module.exports=Object.freeze({TERRAFORMER_BOOT_SYSTEM});

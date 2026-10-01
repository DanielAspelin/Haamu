'use strict';
const TERRAFORMER_BLOCK_DEVICE_SYSTEM=Object.freeze({schema:'TERRAFORMER-BLOCK-DEVICE-SYSTEM/1',id:'system.blockdevice',name:'Block Device System',family:'storage',type:'block-device-system',state:'integrated-contract',canonicalPath:'terraformer://storage/blockdevice/',dependsOn:Object.freeze(['system.storage','system.platform']),rule:'Block Device System represents host-exposed block devices; raw block access is not implied and destructive operations remain authorization boundaries.'});

module.exports=Object.freeze({TERRAFORMER_BLOCK_DEVICE_SYSTEM});

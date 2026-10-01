'use strict';
const TERRAFORMER_PSU_SYSTEM=Object.freeze({schema:'TERRAFORMER-PSU-SYSTEM/1',id:'system.psu',name:'PSU System',family:'hardware',type:'psu-system',state:'integrated',canonicalPath:'terraformer://power/psu/',dependsOn:Object.freeze(['system.power', 'system.hardware']),governs:Object.freeze(['psu', 'identity', 'state', 'relation', 'evidence']),rule:'PSU System represents power-supply-unit capabilities and telemetry references without electrical control, servicing, or physical access authority.'});

module.exports=Object.freeze({TERRAFORMER_PSU_SYSTEM});

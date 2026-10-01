'use strict';
const TERRAFORMER_MAINBOARD_SYSTEM=Object.freeze({schema:'TERRAFORMER-MAINBOARD-SYSTEM/1',id:'system.mainboard',name:'Mainboard System',family:'hardware',type:'mainboard-system',state:'integrated',canonicalPath:'terraformer://hardware/mainboard/',dependsOn:Object.freeze(['system.chassis', 'system.device']),governs:Object.freeze(['mainboard', 'socket', 'bus', 'slot', 'component-reference']),rule:'Mainboard System models admitted board topology without firmware, electrical, or physical modification authority.'});

module.exports=Object.freeze({TERRAFORMER_MAINBOARD_SYSTEM});

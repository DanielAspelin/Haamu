'use strict';
const TERRAFORMER_CHASSIS_SYSTEM=Object.freeze({schema:'TERRAFORMER-CHASSIS-SYSTEM/1',id:'system.chassis',name:'Chassis System',family:'hardware',type:'chassis-system',state:'integrated',canonicalPath:'terraformer://hardware/chassis/',dependsOn:Object.freeze(['system.device']),governs:Object.freeze(['chassis', 'slot', 'mount-reference', 'enclosure', 'component-relation']),rule:'Chassis System represents hardware enclosure and component placement; representation does not authorize physical access or modification.'});

module.exports=Object.freeze({TERRAFORMER_CHASSIS_SYSTEM});

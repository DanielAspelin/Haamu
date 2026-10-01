'use strict';
const TERRAFORMER_CONFERENCE_SYSTEM=Object.freeze({schema:'TERRAFORMER-CONFERENCE-SYSTEM/1',id:'system.conference',name:'Conference System',family:'communication',type:'system',state:'integrated-contract',canonicalPath:'terraformer://communication/conference/',dependsOn:Object.freeze(['system.communication','system.conversation']),governs:Object.freeze(['conference','participant','room','session','voice','speech','media']),rule:'Conference System models multi-participant admitted sessions; registration does not assert live conferencing infrastructure or provider authority.'});

module.exports=Object.freeze({TERRAFORMER_CONFERENCE_SYSTEM});

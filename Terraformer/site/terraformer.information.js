"use strict";
const TERRAFORMER_INFORMATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-INFORMATION-SYSTEM/1',id:'system.information',name:'Information System',family:'information',type:'information-system',state:'integrated',canonicalPath:'terraformer://information/',dependsOn:Object.freeze(['system.knowledge','system.data']),governs:Object.freeze(['information','source-reference','context','content','provenance','state','delivery-reference']),rule:'Information System represents admitted information with context and provenance; information does not automatically become knowledge, instruction, authorization, evidence, or truth.'});
function tfInformationInstructionNotification(kind,payload={}){const k=String(kind||'').toLowerCase(),map={information:TERRAFORMER_INFORMATION_SYSTEM,instruction:TERRAFORMER_INSTRUCTION_SYSTEM,notification:TERRAFORMER_NOTIFICATION_SYSTEM},x=map[k];if(!x)return null;return Object.freeze({schema:'TERRAFORMER-IIN-DESCRIPTOR/1',kind:k,system:x.id,payload:Object.freeze({...payload}),authorized:false,delivered:false,acknowledged:false,persisted:false})}
module.exports=Object.freeze({TERRAFORMER_INFORMATION_SYSTEM,tfInformationInstructionNotification});

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const INFORMATION_OBJECT_SCHEMA='TERRAFORMER-INFORMATION-OBJECT/1';
const INFORMATION_FLOW_SCHEMA='TERRAFORMER-INFORMATION-FLOW/1';

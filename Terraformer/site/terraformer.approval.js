'use strict';
const TERRAFORMER_APPROVAL_SYSTEM=Object.freeze({schema:'TERRAFORMER-APPROVAL-SYSTEM/1',id:'system.approval',name:'Approval System',family:'governance',type:'approval-system',state:'integrated',canonicalPath:'terraformer://approval/',dependsOn:Object.freeze(['system.authorization','system.condition']),governs:Object.freeze(['request','approver-reference','scope','decision','evidence','status']),rule:'Approval System records bounded approval decisions from an authorized approver; approval is not qualification and cannot manufacture the approver authority it requires.'});

module.exports=Object.freeze({TERRAFORMER_APPROVAL_SYSTEM});

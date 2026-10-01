'use strict';
const TERRAFORMER_BUSINESS_SYSTEM=Object.freeze({schema:'TERRAFORMER-BUSINESS-SYSTEM/1',id:'system.business',name:'Business System',family:'organization',type:'business-system',state:'integrated',canonicalPath:'terraformer://business/',dependsOn:Object.freeze(['system.resource','system.contract']),governs:Object.freeze(['business','organization','service','product','operation','resource','relationship']),rule:'Business System models business structures and operations without creating corporate, financial, contractual, or regulatory authority.'});

module.exports=Object.freeze({TERRAFORMER_BUSINESS_SYSTEM});

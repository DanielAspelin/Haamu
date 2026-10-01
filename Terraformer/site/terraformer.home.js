'use strict';
const TERRAFORMER_HOME_SYSTEM=Object.freeze({schema:'TERRAFORMER-HOME-SYSTEM/1',id:'system.home',name:'Home System',family:'workspace',type:'home-system',state:'integrated-reconciliation',canonicalPath:'terraformer://home/',dependsOn:Object.freeze(['system.resource']),governs:Object.freeze(['home','local-resource','personal-workspace','awareness','navigation']),rule:'Home System reconciles existing Home Awareness as a local personal-resource context; awareness does not grant file-content, execution, mutation, or external authority.'});

module.exports=Object.freeze({TERRAFORMER_HOME_SYSTEM});

'use strict';
const TERRAFORMER_SCHEDULING_SYSTEM=Object.freeze({schema:'TERRAFORMER-SCHEDULING-SYSTEM/1',id:'system.scheduling',name:'Scheduling System',family:'computation',type:'scheduling-system',state:'integrated',canonicalPath:'terraformer://scheduling/',dependsOn:Object.freeze(['system.resource']),rule:'Scheduling System orders admitted work against bounded resources and does not guarantee host scheduling control.'});

module.exports=Object.freeze({TERRAFORMER_SCHEDULING_SYSTEM});

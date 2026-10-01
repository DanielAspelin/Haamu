'use strict';
const TERRAFORMER_TASK_SYSTEM=Object.freeze({schema:'TERRAFORMER-TASK-SYSTEM/1',id:'system.task',name:'Task System',family:'computation',type:'task-system',state:'integrated',canonicalPath:'terraformer://task/',dependsOn:Object.freeze(['system.operations','system.scheduling']),rule:'Task System packages admitted work units and remains subject to scheduling, resource, and effect boundaries.'});

module.exports=Object.freeze({TERRAFORMER_TASK_SYSTEM});

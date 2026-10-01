'use strict';
const TERRAFORMER_TRAINING_SYSTEM=Object.freeze({schema:'TERRAFORMER-TRAINING-SYSTEM/1',id:'system.training',name:'Training System',family:'education',type:'training-system',state:'integrated',canonicalPath:'terraformer://training/',dependsOn:Object.freeze(['system.learning']),governs:Object.freeze(['training','exercise','objective','practice','assessment-reference','progress']),rule:'Training System organizes admitted practice and training activities; completion does not automatically establish competence, certification, or authorization.'});

module.exports=Object.freeze({TERRAFORMER_TRAINING_SYSTEM});

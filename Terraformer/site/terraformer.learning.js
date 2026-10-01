"use strict";
const SYSTEM=Object.freeze({id:"system.learning",concept:"Learning",type:"learning-system",automaticExecution:false,persistencePerformed:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_LEARNING_SYSTEM=Object.freeze({schema:'TERRAFORMER-LEARNING-SYSTEM/1',id:'system.learning',name:'Learning System',family:'education',type:'learning-system',state:'integrated',canonicalPath:'terraformer://learning/',dependsOn:Object.freeze(['system.knowledge']),governs:Object.freeze(['learning','material','activity','observation','feedback','progress']),rule:'Learning System represents learning processes and evidence without manufacturing knowledge, competence, credentials, or authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_LEARNING_SYSTEM});

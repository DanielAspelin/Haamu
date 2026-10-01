'use strict';
const TERRAFORMER_SCIENCE_SYSTEM=Object.freeze({schema:'TERRAFORMER-SCIENCE-SYSTEM/1',id:'system.science',name:'Science System',family:'science',type:'science-system',state:'integrated',canonicalPath:'terraformer://science/',dependsOn:Object.freeze(['system.knowledge']),governs:Object.freeze(['science', 'discipline', 'hypothesis', 'evidence', 'method', 'observation']),rule:'Science System organizes evidence-bearing scientific representations and preserves uncertainty; it does not manufacture observations or scientific validity.'});

module.exports=Object.freeze({TERRAFORMER_SCIENCE_SYSTEM});

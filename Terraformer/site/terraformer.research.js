'use strict';
const TERRAFORMER_RESEARCH_SYSTEM=Object.freeze({schema:'TERRAFORMER-RESEARCH-SYSTEM/1',id:'system.research',name:'Research System',family:'science',type:'research-system',state:'integrated',canonicalPath:'terraformer://research/',dependsOn:Object.freeze(['system.science', 'system.knowledge']),governs:Object.freeze(['research', 'question', 'method', 'evidence', 'result', 'qualification']),rule:'Research System represents admitted research processes; results remain evidence subject to qualification and do not become truth by registration.'});

module.exports=Object.freeze({TERRAFORMER_RESEARCH_SYSTEM});

'use strict';
const TERRAFORMER_TERM_SYSTEM=Object.freeze({schema:'TERRAFORMER-TERM-SYSTEM/1',id:'system.term',name:'Term System',family:'language',type:'term-system',state:'integrated',canonicalPath:'terraformer://term/',dependsOn:Object.freeze(['system.language']),governs:Object.freeze(['term','definition','meaning','scope','reference','relation']),rule:'Term System represents scoped terminology and definitions without silently changing the meaning of established contracts or external standards.'});

module.exports=Object.freeze({TERRAFORMER_TERM_SYSTEM});

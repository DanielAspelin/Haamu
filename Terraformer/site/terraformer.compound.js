'use strict';
const TERRAFORMER_COMPOUND_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMPOUND-SYSTEM/1',id:'system.compound',name:'Compound System',family:'science',type:'compound-system',state:'integrated',canonicalPath:'terraformer://science/chemistry/compound/',dependsOn:Object.freeze(['system.chemistry']),governs:Object.freeze(['compound', 'composition', 'property', 'identifier-reference', 'evidence']),rule:'Compound System represents admitted compound information and does not constitute handling, synthesis, or safety instructions.'});

module.exports=Object.freeze({TERRAFORMER_COMPOUND_SYSTEM});

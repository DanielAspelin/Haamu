'use strict';
const TERRAFORMER_CHEMISTRY_SYSTEM=Object.freeze({schema:'TERRAFORMER-CHEMISTRY-SYSTEM/1',id:'system.chemistry',name:'Chemistry System',family:'science',type:'chemistry-system',state:'integrated',canonicalPath:'terraformer://science/chemistry/',dependsOn:Object.freeze(['system.science']),governs:Object.freeze(['chemistry', 'element-reference', 'compound-reference', 'molecule-reference', 'property', 'observation']),rule:'Chemistry System is representational and evidence-oriented; it does not authorize synthesis, hazardous handling, reaction execution, or laboratory operation.'});

module.exports=Object.freeze({TERRAFORMER_CHEMISTRY_SYSTEM});

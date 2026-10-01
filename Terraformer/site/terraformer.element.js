'use strict';
const TERRAFORMER_ELEMENT_SYSTEM=Object.freeze({schema:'TERRAFORMER-ELEMENT-SYSTEM/1',id:'system.element',name:'Element System',family:'science',type:'element-system',state:'integrated',canonicalPath:'terraformer://science/chemistry/element/',dependsOn:Object.freeze(['system.chemistry']),governs:Object.freeze(['element', 'identity', 'state', 'relation', 'evidence']),rule:'Element System represents chemical-element information and evidence without handling, synthesis, or laboratory authority.'});

module.exports=Object.freeze({TERRAFORMER_ELEMENT_SYSTEM});

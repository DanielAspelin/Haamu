'use strict';
const TERRAFORMER_MARKUP_SYSTEM=Object.freeze({schema:'TERRAFORMER-MARKUP-SYSTEM/1',id:'system.markup',name:'Markup System',family:'document',type:'markup-system',state:'integrated',canonicalPath:'terraformer://markup/',dependsOn:Object.freeze(['system.language','system.document']),governs:Object.freeze(['markup','element','attribute','structure','parse','serialize','validate']),rule:'Markup System represents and processes admitted structured markup; parsing or serialization does not authorize execution, publication, filesystem mutation, or external effects.'});

module.exports=Object.freeze({TERRAFORMER_MARKUP_SYSTEM});

'use strict';
const TERRAFORMER_MOLECULE_SYSTEM=Object.freeze({schema:'TERRAFORMER-MOLECULE-SYSTEM/1',id:'system.molecule',name:'Molecule System',family:'science',type:'molecule-system',state:'integrated',canonicalPath:'terraformer://science/chemistry/molecule/',dependsOn:Object.freeze(['system.chemistry']),governs:Object.freeze(['molecule', 'atom-reference', 'bond-reference', 'structure', 'property', 'evidence']),rule:'Molecule System represents molecular structures and evidence without physical manipulation or synthesis authority.'});

module.exports=Object.freeze({TERRAFORMER_MOLECULE_SYSTEM});

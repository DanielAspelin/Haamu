'use strict';
const TERRAFORMER_SUBSTANCE_SYSTEM=Object.freeze({schema:'TERRAFORMER-SUBSTANCE-SYSTEM/1',id:'system.substance',name:'Substance System',family:'science',type:'substance-system',state:'integrated',canonicalPath:'terraformer://science/chemistry/substance/',dependsOn:Object.freeze(['system.chemistry']),governs:Object.freeze(['substance', 'identity', 'state', 'relation', 'evidence']),rule:'Substance System represents admitted substance identity, composition, properties, and evidence without physical handling or safety authority.'});

module.exports=Object.freeze({TERRAFORMER_SUBSTANCE_SYSTEM});

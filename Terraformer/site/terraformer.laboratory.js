'use strict';
const TERRAFORMER_LABORATORY_SYSTEM=Object.freeze({schema:'TERRAFORMER-LABORATORY-SYSTEM/1',id:'system.laboratory',name:'Laboratory System',family:'science',type:'laboratory-system',state:'integrated',canonicalPath:'terraformer://science/laboratory/',dependsOn:Object.freeze(['system.science', 'system.research', 'system.facility']),governs:Object.freeze(['laboratory', 'experiment-reference', 'instrument-reference', 'sample-reference', 'observation']),rule:'Laboratory System represents laboratory contexts and evidence only; it does not authorize physical experiments, hazardous materials, equipment operation, or synthesis.'});

module.exports=Object.freeze({TERRAFORMER_LABORATORY_SYSTEM});

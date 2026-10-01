'use strict';
const TERRAFORMER_PCB_SYSTEM=Object.freeze({schema:'TERRAFORMER-PCB-SYSTEM/1',id:'system.pcb',name:'PCB System',family:'hardware',type:'pcb-system',state:'integrated',canonicalPath:'terraformer://hardware/pcb/',dependsOn:Object.freeze(['system.hardware']),governs:Object.freeze(['pcb', 'identity', 'state', 'relation', 'evidence']),rule:'PCB System represents printed-circuit-board topology and component relations without fabrication, electrical, soldering, or physical modification authority.'});

module.exports=Object.freeze({TERRAFORMER_PCB_SYSTEM});

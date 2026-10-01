'use strict';
const TERRAFORMER_CHIPSET_SYSTEM=Object.freeze({schema:'TERRAFORMER-CHIPSET-SYSTEM/1',id:'system.chipset',name:'Chipset System',family:'hardware',type:'chipset-system',state:'integrated',canonicalPath:'terraformer://hardware/chipset/',dependsOn:Object.freeze(['system.mainboard','system.pcb']),governs:Object.freeze(['chipset', 'controller-reference', 'bus-reference', 'capability', 'component-relation']),rule:'Chipset System represents chipset capabilities and relations without hardware control or firmware authority.'});

module.exports=Object.freeze({TERRAFORMER_CHIPSET_SYSTEM});

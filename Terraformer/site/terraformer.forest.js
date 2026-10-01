'use strict';
const TERRAFORMER_FOREST_SYSTEM=Object.freeze({schema:'TERRAFORMER-FOREST-SYSTEM/1',id:'system.forest',name:'Forest System',family:'structure',type:'forest-system',state:'integrated',canonicalPath:'terraformer://forest/',dependsOn:Object.freeze(['system.tree']),governs:Object.freeze(['forest', 'tree-reference', 'grove', 'branch-relation', 'root-relation']),rule:'Forest System composes multiple admitted Tree structures without granting authority through structural ancestry.'});

module.exports=Object.freeze({TERRAFORMER_FOREST_SYSTEM});

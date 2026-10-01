'use strict';
const TERRAFORMER_MAP_SYSTEM=Object.freeze({schema:'TERRAFORMER-MAP-SYSTEM/1',id:'system.map',name:'Map System',family:'representation',type:'system',state:'integrated',canonicalPath:'terraformer://representation/map/',governs:Object.freeze(['node','edge','position','region','projection','relationship']),rule:'Map System projects admitted structures and relationships without changing source authority.'});

const TERRAFORMER_MIND_MAP_SYSTEM=Object.freeze({schema:'TERRAFORMER-MIND-MAP-SYSTEM/1',id:'system.mind.map',name:'Mind Map System',parent:'system.mind',family:'cognitive-representation',type:'system',state:'integrated',canonicalPath:'terraformer://cognitive/mind/map/',dependsOn:Object.freeze(['system.mind','system.map']),governs:Object.freeze(['concept','branch','relationship','projection','navigation']),rule:'Mind Map System is a semantic relationship projection over Mind System state using Map System representation; it does not create facts or authority.'});

module.exports=Object.freeze({TERRAFORMER_MAP_SYSTEM,TERRAFORMER_MIND_MAP_SYSTEM});

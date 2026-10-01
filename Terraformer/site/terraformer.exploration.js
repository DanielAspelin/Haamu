"use strict";
const TERRAFORMER_EXPLORATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.exploration',name:'Exploration System',family:'knowledge',type:'exploration-system',state:'integrated',canonicalPath:'terraformer://exploration/',dependsOn:Object.freeze(['system.discovery']),integratesWith:Object.freeze(['system.observation']),governs:Object.freeze(['target-reference','scope','inspection-path','observation','finding','boundary','provenance']),rule:'Exploration examines admitted discovered targets and relationships without mutation, execution, privilege expansion, qualification inheritance, or external effects.'});
function bindExplorationV04674(){return Object.freeze({TERRAFORMER_EXPLORATION_SYSTEM});}
module.exports=Object.freeze({bindExplorationV04674});

'use strict';
const TERRAFORMER_VISUALIZATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-PRESENTATION-SYSTEM/1',id:'system.visualization',name:'Visualization System',parent:'system.customization',family:'presentation',input:'admitted data/model projection',output:'visual projection',capabilities:Object.freeze(['vector','diagram','tree','mind-map','telemetry','state-projection']),authority:'representation-only; source model remains authoritative'});

module.exports=Object.freeze({TERRAFORMER_VISUALIZATION_SYSTEM});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfVisualizationSystemV4013(id){
 const d=TF_VISUALIZATION_SYSTEMS_V4013.find(x=>x.id===id);if(!d)throw new RangeError("unknown visualization system");
 return Object.freeze({...d,controller:id+"::controller",adapter:id+"::adapter",bridge:id+"::bridge",sandbox:id+"::sandbox",
  policy:"system.policy",viewport:"system.viewport",sizing:"system.sizing",resizing:"system.resizing",
  autoSizing:"system.auto-sizing",validation:"system.validation",qualification:"system.qualification",
  monitoring:"system.monitoring",logging:"system.logging",recovery:"system.recovery",
  version:"0.40.13",transversion:"tv0.40.13",selfAuthorizing:false});
}

function tfVisualizationFabricV4013(){
 return Object.freeze({version:"0.40.13",systems:Object.freeze(TF_VISUALIZATION_SYSTEMS_V4013.map(x=>tfVisualizationSystemV4013(x.id))),
  rules:TF_VISUALIZATION_RULES_V4013,tiers:TF_RENDER_TIERS_V4013,
  composition:Object.freeze({gui:"system.gui",threeD:"system.3d-ui",vector:"system.vector-graphics",
   wasm:"system.webassembly",gpu:"system.webgpu",viewport:"system.viewport",mobile:"system.mobile"}),
  fallbackChain:Object.freeze(["webgpu-3d","vector-3d","vector-2d","html-css-gui"]),
  generatedBy:"terraformer.js"});
}


"use strict";
const SYSTEM=Object.freeze({id:"system.window",concept:"Window",authorityGranted:false,scaffold:true});
function bindWindowV04515(){return Object.freeze({SYSTEM});}
function bindSystemWindowV04672(deps={}){
 const getSystemRegistry=()=>deps.getSystemRegistry();
const TERRAFORMER_SYSTEM_WINDOW_CONTROLS=Object.freeze({left:Object.freeze(['configuration','settings','properties','preferences','attributes']),right:Object.freeze(['minimize','maximize/restore','close']),rule:'Left controls configure or inspect only the owning system window; right controls affect only that window. Neither side grants cross-system authority.'});
function tfSystemWindow(systemId){const d=deps.tfSystemDiscovery(systemId);if(!d)return null;return Object.freeze({schema:'TERRAFORMER-SYSTEM-WINDOW/1',id:`window.${d.id}`,system:d.id,title:d.name,canonicalPath:d.canonicalPath,oneWindowPerSystem:true,search:Object.freeze({mode:'system-local',boundary:d.id,global:false,search:(query,options)=>deps.tfSystemLocalSearch(d.id,query,options)}),upperBar:TERRAFORMER_SYSTEM_WINDOW_CONTROLS,discovery:d,authorityInherited:false})}
function tfSystemWindowInventory(){return Object.freeze(Object.values(getSystemRegistry()).map(x=>tfSystemWindow(x.id)))}
 return Object.freeze({TERRAFORMER_SYSTEM_WINDOW_CONTROLS,tfSystemWindow,tfSystemWindowInventory});
}
const TERRAFORMER_WINDOW_MORPH_SYSTEM=Object.freeze({schema:'TERRAFORMER-WINDOW-MORPH/1',id:'system.presentation.window.morph',name:'Window Morph System',parent:'system.presentation.window',family:'presentation-navigation',state:'integrated',canonicalPath:'terraformer://presentation/window/morph/',preserves:Object.freeze(['window-id','scope','ownership','geometry','snap','z-order','restore-geometry']),replaces:Object.freeze(['uri','presentation','document-view','route-context']),rule:'Morphing changes the presentation loaded by an existing window while preserving the window identity and desktop placement.'});

function bindWindowAdjustmentV04744(deps={}){
 const adjustment=deps.adjustment||require('./terraformer.adjustment.js');
 const sizing=deps.sizing||require('./terraformer.sizing.js');
 const resizing=deps.resizing||require('./terraformer.resizing.js');
 const FEATURES=Object.freeze(['geometry','width','height','position','layout','snap','scaling','content-area','bars','panels']);
 function adjustableFeatures(){return FEATURES;}
 function size(value,unit='logical'){return sizing.size(value,unit);}
 function resize(previous,value,unit='logical'){return resizing.resize(previous,value,unit);}
 function transition(defaults,customized,target){return adjustment.restore(defaults,customized,target);}
 return Object.freeze({adjustableFeatures,size,resize,transition,authorityGranted:false,automaticPersistence:false});
}

module.exports=Object.freeze({bindWindowV04515,bindSystemWindowV04672,TERRAFORMER_WINDOW_MORPH_SYSTEM,bindWindowAdjustmentV04744});

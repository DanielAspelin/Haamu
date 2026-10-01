"use strict";
const SYSTEM=Object.freeze({id:"system.layer",concept:"Layer",type:"logical-layer-system",logical:true,volatile:true,processIsolation:false,persistencePerformed:false,automaticExecution:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_LAYER_SYSTEM=Object.freeze({schema:'TERRAFORMER-LAYER-SYSTEM/1',id:'system.layer',name:'Layer System',family:'presentation',type:'system',state:'integrated',canonicalPath:'terraformer://presentation/layer/',governs:Object.freeze(['layer','stack','zorder','visibility','composition','ownership'])});

const FOREGROUND_LAYERS=Object.freeze({owner:"system.foreground",planes:Object.freeze(["BACKGROUND_LAYOUT_LAYER","FOREGROUND_LAYOUT_LAYER"]),mayCreateNestedLayers:true,compositing:true,visualOnly:true});
module.exports=Object.freeze({FOREGROUND_LAYERS,SYSTEM,TERRAFORMER_LAYER_SYSTEM});

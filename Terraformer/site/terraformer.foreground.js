"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-PROCESSING-CONTEXT/1",id:"system.foreground",concept:"Foreground",type:"processing-context-system",
responsibility:"User-visible or latency-sensitive admitted processing context.",supports:Object.freeze(["system.parallelism","system.concurrency"]),
adaptsWith:"system.background",connection:"system.connection",sustainment:"system.sustainment",
directConnectionPreference:true,directMeansShortestAdmittedPath:true,bypassGranted:false,schedulerAuthority:false,
hardwarePlacementGuaranteed:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function describe(){return SYSTEM;}

const FOREGROUND_GRAPHICS=Object.freeze({
 orientation:"VISUAL_GRAPHICS",defaultRepresentation:"system.vector",fallbackRepresentation:"system.raster",
 graphics:"system.graphics",visual:"system.visual",capabilityDrivenFallback:true,
 lowCapabilityCompatibilityGoal:true,automaticHardwareClassification:false,automaticDowngrade:false
});

const VISUAL_OWNERSHIP=Object.freeze({
 ownsPresentationComposition:Object.freeze(["system.graphics","system.visualization","system.layout","system.layer","system.html","system.css","system.cad"]),
 excludes:Object.freeze(["background-computation","scheduler-authority","hardware-placement"]),
 orientation:"COMPLETELY_VISUAL",presentationOnly:true
});
const LAYOUT_PLANES=Object.freeze({
 background:Object.freeze({layout:"system.layout",layer:"system.layer",role:"BACKGROUND_LAYOUT_LAYER",usedBy:"system.foreground"}),
 foreground:Object.freeze({layout:"system.layout",layer:"system.layer",role:"FOREGROUND_LAYOUT_LAYER",usedBy:"system.foreground"}),
 nestedLayersAllowed:true,compositingAllowed:true,surrealCompositionAllowed:true,
 authorityGranted:false,executionGranted:false
});

const WEB_PRESENTATION=Object.freeze({
 html:"system.html",css:"system.css",scope:"VISUAL_PRESENTATION",
 htmlRole:"STRUCTURE",cssRole:"STYLE_LAYOUT",domIntegration:true,
 scriptingOwnership:false,networkOwnership:false,authorityGranted:false
});

const CAD_PRESENTATION=Object.freeze({cad:"system.cad",scope:"VISUAL_PRESENTATION",graphics:"system.graphics",visualization:"system.visualization",authorityGranted:false});
module.exports=Object.freeze({SYSTEM,FOREGROUND_GRAPHICS,VISUAL_OWNERSHIP,LAYOUT_PLANES,WEB_PRESENTATION,CAD_PRESENTATION,describe});

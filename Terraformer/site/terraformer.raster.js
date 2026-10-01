"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-RASTER-GRAPHICS/1",id:"system.raster",concept:"Raster",type:"graphics-rendering-system",
 responsibility:"Compatibility rendering representation for foreground graphics when vector-oriented capability is unavailable or unsuitable.",
 role:"FALLBACK",preferredByDefault:false,capabilityDriven:true,automaticDowngrade:false,
 authorityGranted:false,hardwareInference:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

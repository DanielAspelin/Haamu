"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CAD-SYSTEM/1",id:"system.cad",concept:"CAD",typeOf:"system.graphics",
 responsibility:"Computer-aided visual design representation and interaction within the Foreground presentation boundary.",
 ownerProjection:"system.foreground",qualification:"UNDER_CONDITIONAL_EXPERIMENT",canonicalResponsibility:true,
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
const FOREGROUND_PRESENTATION=Object.freeze({owner:"system.foreground",scope:"VISUAL_PRESENTATION",graphics:"system.graphics",visualization:"system.visualization",identityPreserved:true,authorityGranted:false});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,FOREGROUND_PRESENTATION,describe});

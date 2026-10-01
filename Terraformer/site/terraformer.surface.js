"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.surface",concept:"Surface",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfSurfaceV413(kind,orientation=""){
 const key=String(kind||"").toUpperCase(),d=TF_SURFACES_V413.surfaces[key];if(!d)throw Error("unknown surface");
 return Object.freeze({...d,orientation:String(orientation||d.defaultOrientation).toUpperCase(),adaptive:true,authority:false});
}

function tfResolveSurfaceV413(x={}){
 const explicit=String(x.surface||"").toUpperCase();if(explicit)return tfSurfaceV413(explicit,x.orientation);
 const device=String(x.deviceClass||"").toUpperCase();
 if(device==="PHONE"||device==="SMARTPHONE"||device==="MOBILE")return tfSurfaceV413("MOBILE",x.orientation);
 if(device==="TABLET")return tfSurfaceV413("TABLET",x.orientation);
 return tfSurfaceV413("DESKTOP",x.orientation);
}


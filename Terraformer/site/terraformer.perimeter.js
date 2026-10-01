"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-PERIMETER-SYSTEM/1",id:"system.perimeter",concept:"Perimeter",typeOf:"system.system",
 responsibility:"Maintains one canonical reportable perimeter line across launch transition projections.",
 qualification:"UNDER_CONDITIONAL_EXPERIMENT",canonicalResponsibility:true,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
const LAUNCH_PROJECTIONS=Object.freeze({
 lineIdentity:"perimeter.launch",ordered:Object.freeze(["PRE_LAUNCH","POST_LAUNCH"]),
 preLaunch:Object.freeze({phase:"PRE_LAUNCH",sameLine:true}),
 postLaunch:Object.freeze({phase:"POST_LAUNCH",sameLine:true}),
 reporting:"system.reporting",identityPreservedAcrossLaunch:true
});
function project(phase){if(!LAUNCH_PROJECTIONS.ordered.includes(phase)) throw new RangeError("unsupported perimeter launch phase"); return Object.freeze({lineIdentity:LAUNCH_PROJECTIONS.lineIdentity,phase,sameLine:true});}
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,LAUNCH_PROJECTIONS,project,describe});

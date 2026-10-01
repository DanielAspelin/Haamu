"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-PROCESSING-CONTEXT/1",id:"system.background",concept:"Background",type:"processing-context-system",
responsibility:"Non-foreground admitted processing context operating within resource and scheduling boundaries.",supports:Object.freeze(["system.parallelism","system.concurrency"]),
adaptsWith:"system.foreground",connection:"system.connection",sustainment:"system.sustainment",
directConnectionPreference:true,directMeansShortestAdmittedPath:true,bypassGranted:false,schedulerAuthority:false,
hardwarePlacementGuaranteed:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

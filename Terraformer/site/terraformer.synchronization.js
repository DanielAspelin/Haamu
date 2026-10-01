"use strict";
const SYNCHRONIZATION=Object.freeze({schema:"TERRAFORMER-SYNCHRONIZATION/1",id:"system.synchronization",concept:"Synchronization",typeOf:"System",
 responsibility:"Govern bounded convergence between an admitted source distribution and a target repository/site projection, with single-flight execution and fail-closed validation.",registry:"terraformer.synchronizations.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=SYNCHRONIZATION){return !!x&&x.id==="system.synchronization"&&x.authorityGranted===false;}
module.exports=Object.freeze({SYNCHRONIZATION,describe:()=>SYNCHRONIZATION,validate});

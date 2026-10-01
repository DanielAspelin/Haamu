"use strict";
function bindCycleV04472(deps={}){
 const stronglyConnectedComponents=deps.tfStronglyConnectedComponentsV36241;
 if(typeof stronglyConnectedComponents!=="function")throw new Error("cycle analysis required");
 return Object.freeze({CYCLE_SYSTEM:Object.freeze({id:"system.cycle",mode:"governed-cycle-analysis",authorityGranted:false,automaticMutation:false}),stronglyConnectedComponents});
}
module.exports={bindCycleV04472};

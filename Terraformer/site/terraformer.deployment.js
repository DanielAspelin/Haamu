"use strict";
const DEPLOYMENT=Object.freeze({schema:"TERRAFORMER-DEPLOYMENT/1",id:"system.deployment",concept:"Deployment",typeOf:"System",
 responsibility:"Govern an admitted transition from a qualified distribution to a target delivery surface; deployment does not make the target canonical source.",registry:"terraformer.deployments.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=DEPLOYMENT){return !!x&&x.id==="system.deployment"&&x.authorityGranted===false;}
module.exports=Object.freeze({DEPLOYMENT,describe:()=>DEPLOYMENT,validate});

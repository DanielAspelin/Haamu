"use strict";
const DISTRIBUTION=Object.freeze({schema:"TERRAFORMER-DISTRIBUTION/1",id:"system.distribution",concept:"Distribution",typeOf:"System",
 responsibility:"Govern packaging and delivery-ready composition of Terraformer artifacts without granting publication authority.",registry:"terraformer.distributions.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=DISTRIBUTION){return !!x&&x.id==="system.distribution"&&x.authorityGranted===false;}
module.exports=Object.freeze({DISTRIBUTION,describe:()=>DISTRIBUTION,validate});

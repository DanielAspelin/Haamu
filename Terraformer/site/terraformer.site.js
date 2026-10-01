"use strict";
const SITE=Object.freeze({schema:"TERRAFORMER-SITE/1",id:"system.site",concept:"Site",typeOf:"System",
 responsibility:"Represent a bounded web delivery/presentation surface for Terraformer. A Site projection does not own canonical Terraformer identity.",registry:"terraformer.sites.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=SITE){return !!x&&x.id==="system.site"&&x.authorityGranted===false;}
module.exports=Object.freeze({SITE,describe:()=>SITE,validate});

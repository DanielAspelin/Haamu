"use strict";
const CROSSLINK=Object.freeze({schema:"TERRAFORMER-CROSSLINK/1",id:"system.crosslink",concept:"Crosslink",typeOf:"System",
 responsibility:"Cross-reference existing Token, physical-owner, Entity, type, and relationship evidence without promoting or manufacturing semantics.",
 registry:"terraformer.crosslinks.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=CROSSLINK){return !!x&&x.id==="system.crosslink"&&x.registry==="terraformer.crosslinks.json"&&x.authorityGranted===false;}
module.exports=Object.freeze({CROSSLINK,describe:()=>CROSSLINK,validate});

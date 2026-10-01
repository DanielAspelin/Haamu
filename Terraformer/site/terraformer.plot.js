"use strict";
const PLOT=Object.freeze({schema:"TERRAFORMER-PLOT/1",id:"system.plot",concept:"Plot",typeOf:"System",
 responsibility:"Represent a governed plot specification or result produced from admitted data, including graph-derived data, without manufacturing source evidence or authority.",
 registry:"terraformer.plots.json",authorityGranted:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=PLOT){return !!x&&x.id==="system.plot"&&x.authorityGranted===false;}
module.exports=Object.freeze({PLOT,describe:()=>PLOT,validate});

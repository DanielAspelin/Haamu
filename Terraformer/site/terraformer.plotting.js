"use strict";
const PLOTTING=Object.freeze({schema:"TERRAFORMER-PLOTTING/1",id:"system.plotting",concept:"Plotting",typeOf:"System",
 responsibility:"Govern transformation of admitted graph/data representations into Plot specifications while preserving provenance and without asserting truth, connectivity, execution, or authority.",
 consumes:["system.graph"],produces:["system.plot"],actor:"application.plotter",authorityGranted:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=PLOTTING){return !!x&&x.id==="system.plotting"&&x.produces.includes("system.plot")&&x.authorityGranted===false;}
module.exports=Object.freeze({PLOTTING,describe:()=>PLOTTING,validate});

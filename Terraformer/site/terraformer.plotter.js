"use strict";
const PLOTTER=Object.freeze({schema:"TERRAFORMER-PLOTTER/1",id:"application.plotter",concept:"Plotter",typeOf:"Application",
 responsibility:"Provide the application-level actor/interface that invokes admitted Plotting operations over admitted Graph or data context and returns governed Plot results.",
 uses:["system.plotting","system.graph","system.plot"],authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=PLOTTER){return !!x&&x.id==="application.plotter"&&x.typeOf==="Application"&&x.authorityGranted===false;}
module.exports=Object.freeze({PLOTTER,describe:()=>PLOTTER,validate});

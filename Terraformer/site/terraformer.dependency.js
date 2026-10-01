"use strict";
function bindDependencyV04472(deps={}){
 const analysis=deps.tfDependencyCycleAnalysisV36241;
 if(typeof analysis!=="function")throw new Error("dependency analysis required");
 return Object.freeze({DEPENDENCY_SYSTEM:Object.freeze({id:"system.dependency",mode:"governed-dependency-analysis",authorityGranted:false,automaticMutation:false}),analyze:analysis});
}
module.exports={bindDependencyV04472};

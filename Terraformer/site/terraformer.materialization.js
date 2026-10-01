"use strict";
/* Reverse-naturalized minimal owner from established terraformer.temporary.js definition. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-MATERIALIZATION-SYSTEM/1",id:"system.materialization",concept:"Materialization",
 typeOf:"system.system",family:"system",establishedType:"realization-lifecycle-system",origin:"terraformer.temporary.js",
 transition:"REVERSE_NATURALIZATION",qualification:"UNDER_CONDITIONAL_EXPERIMENT",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.3: bridge-covered cross-owner migration. */
function tfIONativeMergeMaterializationV4046(){
 const edges=tfIONativeGraphEdgesV4046();
 const targets=edges.filter(e=>e.type==="depends-on").map(e=>e.to);
 const duplicates=targets.filter((x,i,a)=>a.indexOf(x)!==i);
 return Object.freeze({root:"system.io",semanticTargets:Object.freeze(targets),edges,
  semanticTargetCount:targets.length,duplicateTargets:Object.freeze([...new Set(duplicates)]),
  parallelAuthorities:0,materialized:true,externalOriginPreserved:true});
}

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_MATERIALIZATION_REQUIRED_GATES_V36444=Object.freeze(["preparation","permission","guard","health","audit","qualification","finalization"]);

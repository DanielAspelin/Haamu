"use strict";
function bindTaxonomyV04442(deps={}){
 const source=deps.TERRAFORMER_TAXONOMY;
 if(!source||typeof source!=="object") throw new Error("taxonomy: canonical descriptor required");
 const descriptor=Object.freeze({...source,registry:"terraformer.taxonomys.json",authorityGranted:false});
 function describe(){return descriptor;}
 function validate(candidate=descriptor){return !!candidate&&candidate.id===source.id&&candidate.schema===source.schema&&candidate.authorityGranted!==true;}
 function selfTest(){return Object.freeze({schema:"TERRAFORMER-TAXONOMY-SELF-TEST/1",pass:validate(),id:descriptor.id,authorityGranted:false});}
 return Object.freeze({descriptor,describe,validate,selfTest});
}
module.exports={bindTaxonomyV04442};

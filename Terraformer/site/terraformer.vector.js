"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-VECTOR-GRAPHICS/1",id:"system.vector",concept:"Vector",typeOf:"system.graphics",
 origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",state:"integrated",
 responsibility:"Preferred scalable graphics representation for the Terraformer foreground visual/graphics boundary.",
 qualification:"UNDER_CONDITIONAL_EXPERIMENT",canonicalResponsibility:true,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
const VECTOR_PROCESSING=Object.freeze({
 processingType:"VECTOR_GRAPHICS",preferredProcessor:"system.gpu",fallbackProcessor:"system.cpu",
 affinity:"system.affinity",conformity:"system.conformity",placementGuaranteed:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,VECTOR_PROCESSING,describe});

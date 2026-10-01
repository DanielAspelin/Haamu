"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.visual",concept:"Visual",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
const VISUAL_PROCESSING=Object.freeze({processingType:"VISUAL",preferredProcessor:"system.gpu",fallbackProcessor:"system.cpu",vector:"system.vector",graphics:"system.graphics",placementGuaranteed:false});

module.exports=Object.freeze({VISUAL_PROCESSING,SYSTEM,describe});

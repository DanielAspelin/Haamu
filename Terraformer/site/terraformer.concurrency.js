"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.concurrency",concept:"Concurrency",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
const PROCESSING_CONCURRENCY=Object.freeze({coordinatesWith:"system.parallelism",visualPreference:"system.gpu",backgroundPreference:"system.cpu",schedulerAuthority:false,hardwarePlacementGuaranteed:false});

module.exports=Object.freeze({PROCESSING_CONCURRENCY,SYSTEM,describe});

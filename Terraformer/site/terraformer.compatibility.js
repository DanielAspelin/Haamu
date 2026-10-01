"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.compatibility",concept:"Compatibility",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TERRAFORMER_TOOL_COMPATIBILITY=Object.freeze({nodejs:'system.tool.nodejs',git:'system.tool.git',bash:'system.tool.bash',browser:'system.tool.browser',archive:'tool.class.archive',network:'tool.class.network'});

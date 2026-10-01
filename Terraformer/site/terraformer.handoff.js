"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.handoff",concept:"Handoff",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const RESTART_HANDOFF_SCHEMA='TERRAFORMER-VOLATILE-RESTART-HANDOFF/1';

/* Terraformer v0.48.9: qualified isolated declaration migration. */
const UPDATE_HANDOFF_SCHEMA='terraformer.self-update.handoff.v1';

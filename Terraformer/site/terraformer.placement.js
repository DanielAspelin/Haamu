"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.placement",concept:"Placement",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.2: cross-owner implementation migrated after bridge qualification. */
function tfSelfPlacementStatus(){const source=path.resolve(__filename),target=path.resolve(tfCanonicalSelfPath());return {schema:'TERRAFORMER-SELF-PLACEMENT-STATUS/2',source,target,atCanonicalLocation:source===target,home:path.resolve(os.homedir()),reconciliation:source===target?null:tfReconcileSelfPlacement(),authorizedScope:'copy/verify/launch Terraformer monolith at user profile root only',persistence:true};}


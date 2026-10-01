"use strict";
/* Candidate physicalization of an already-evidenced identity; not yet canonical responsibility ownership. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.sha256",concept:"Sha256",
 typeOf:"system.candidate",origin:"terraformer.foundation.js",
 establishedType:null,establishedFamily:null,
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfSha256File(p){return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}


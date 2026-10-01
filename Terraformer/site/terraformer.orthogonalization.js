"use strict";
/* Terraformer v0.47.41 — Orthogonalization System.
 * Distinction is non-authoritative: orthogonality does not imply isolation,
 * incompatibility, ownership, privilege, execution, persistence, or qualification.
 */
function bindOrthogonalizationV04741(deps={}){
  const registry=deps.registry||null;
  const descriptor=Object.freeze({
    schema:"TERRAFORMER-ORTHOGONALIZATION/1",
    id:"system.terraformer.orthogonalization",
    registry:"terraformer.orthogonals.json",
    crossings:"terraformer.orthogonalcrossings.json",
    canonicalization:"terraformer.canonicalization.js",
    authorityGranted:false
  });
  function normalizePair(a,b){
    if(typeof a!=="string"||!a||typeof b!=="string"||!b) throw new TypeError("orthogonalization: two identities required");
    if(a===b) throw new Error("orthogonalization: identity cannot be orthogonal to itself");
    return Object.freeze(a<b?[a,b]:[b,a]);
  }
  function isOrthogonal(a,b,candidate=registry){
    if(!candidate||!Array.isArray(candidate.relationships)) return false;
    const pair=normalizePair(a,b);
    return candidate.relationships.some(r=>Array.isArray(r.members)&&r.members.length===2&&
      normalizePair(r.members[0],r.members[1]).every((v,i)=>v===pair[i]));
  }
  function inverse(a,b,candidate=registry){ return isOrthogonal(a,b,candidate)&&isOrthogonal(b,a,candidate); }
  function roundTripVerify(a,b,candidate=registry){
    return Object.freeze({schema:"TERRAFORMER-ORTHOGONAL-ROUND-TRIP/1",a,b,pass:inverse(a,b,candidate),authorityGranted:false});
  }
  function selfTest(){
    return Object.freeze({schema:"TERRAFORMER-ORTHOGONALIZATION-SELF-TEST/1",
      pass:descriptor.authorityGranted===false,authorityGranted:false});
  }
  return Object.freeze({descriptor,normalizePair,isOrthogonal,inverse,roundTripVerify,selfTest});
}
module.exports=Object.freeze({bindOrthogonalizationV04741});

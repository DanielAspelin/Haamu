"use strict";
/* Candidate physicalization of an already-evidenced identity; not yet canonical responsibility ownership. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.unification",concept:"Unification",
 typeOf:"system.candidate",origin:"terraformer.temporary.js",
 establishedType:"classification-relationship-system",establishedFamily:null,
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfUnificationDescriptorV36440(owner,descriptor={}){const id=String(owner?.id??owner??"");if(!id)throw new Error("[TF:system.unification:invalid-input] System identity required.");const d={type:descriptor.type??"system",mode:descriptor.mode??null,condition:descriptor.condition??null,state:descriptor.state??null};const order=["type","mode","condition","state"];const basis=order.find(k=>d[k]!=null&&String(d[k]).length)||"condition";const value=basis==="condition"&&d[basis]==null?"unclassified":String(d[basis]);return Object.freeze({id:id+"::unification",owner:id,system:"system.unification",unifier:"system.unifier",descriptors:Object.freeze(d),primaryBasis:basis,primaryAuthority:"system."+basis,primaryValue:value,unified:true,merged:false,...TF_UNIFICATION_BOUNDARY_V36440});}

function tfUniversalUnificationFabricV36440(sourceText){const ids=tfCanonicalSystemIdsV36196(sourceText),records=ids.map(id=>tfUnificationDescriptorV36440(id));return Object.freeze({version:"0.36.440",systems:ids.length,records:Object.freeze(records),everySystemUnified:records.length===ids.length&&records.every(x=>x.unified&&x.primaryBasis&&x.primaryValue),identityPreserved:records.every(x=>!x.merged&&!x.canonicalIdentityMerge&&!x.canonicalIdentityReplacement),basisOrder:Object.freeze(["type","mode","condition","state"]),boundary:TF_UNIFICATION_BOUNDARY_V36440});}

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_UNIFICATION_BOUNDARY_V36440=Object.freeze({canonicalIdentityMerge:false,canonicalIdentityReplacement:false,automaticAlias:false,automaticNormalization:false,automaticMutation:false,automaticPersistence:false,automaticExecution:false,automaticExternalEffect:false,authorityAmplification:false});

"use strict";
function bindCanonicalizationV04442(deps={}){
 const source=deps.TERRAFORMER_CANONICALIZATION;
 if(!source||typeof source!=="object") throw new Error("canonicalization: canonical descriptor required");
 const descriptor=Object.freeze({...source,registry:"terraformer.canonicalizations.json",authorityGranted:false});
 function describe(){return descriptor;}
 function validate(candidate=descriptor){return !!candidate&&candidate.id===source.id&&candidate.schema===source.schema&&candidate.authorityGranted!==true;}
 function selfTest(){return Object.freeze({schema:"TERRAFORMER-CANONICALIZATION-SELF-TEST/1",pass:validate(),id:descriptor.id,authorityGranted:false});}
 return Object.freeze({descriptor,describe,validate,selfTest});
}


function bindContextualCanonicalizationV04489(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 const TF_CONTEXTUAL_CANONICALIZATION_V36257=Object.freeze({
 id:"canonicalization.contextual.v36257",mode:"non-destructive-mapping-first",state:"naturalized",
 principles:Object.freeze([
  "canonical object elements are atomic one-word semantic tokens where practicable",
  "shared atomic concept does not imply duplicate contextual occurrence",
  "naturalization does not automatically deduplicate contextual identities",
  "concept identity, contextual identity, topology path, and semantic relationship are separate dimensions",
  "existing canonical identities remain valid until an explicit qualified migration supersedes them"
 ]),
 dimensions:Object.freeze(["canonicalization","ontology","taxonomy","topology","semantics","context"]),
 relationTypes:Object.freeze(["is-a","part-of","contains","context-of","routes-through","bridges","switches","resolves","delegates-to","references","coordinates-with","implements","secures"]),
 destructiveRename:false,automaticDeduplication:false,implicitAliasCollapse:false
});
 const TF_CONTEXTUAL_OBJECT_MODEL_V36257=Object.freeze({
 concepts:Object.freeze(["System","Network","LAN","WAN","NAT","Router","Switch","Bridge","National","International","Internet","DNS","Root","Zone","Server","TLD","Resolver","Nameserver","DNSSEC","ICANN","IANA","IETF"]),
 contexts:Object.freeze({
  lanRouter:Object.freeze({concept:"Router",path:Object.freeze(["System","Network","LAN","Router"]),legacy:"system.lan-router"}),
  wanRouter:Object.freeze({concept:"Router",path:Object.freeze(["System","Network","WAN","Router"]),legacy:"system.wan-router"}),
  natRouter:Object.freeze({concept:"Router",path:Object.freeze(["System","Network","NAT","Router"]),legacy:"system.nat-router"}),
  lanSwitch:Object.freeze({concept:"Switch",path:Object.freeze(["System","Network","LAN","Switch"]),legacy:"system.lan-switch"}),
  wanSwitch:Object.freeze({concept:"Switch",path:Object.freeze(["System","Network","WAN","Switch"]),legacy:"system.wan-switch"}),
  natSwitch:Object.freeze({concept:"Switch",path:Object.freeze(["System","Network","NAT","Switch"]),legacy:"system.nat-switch"}),
  natBridge:Object.freeze({concept:"Bridge",path:Object.freeze(["System","Network","NAT","Bridge"]),legacy:"system.nat-bridge"}),
  national:Object.freeze({concept:"National",path:Object.freeze(["System","Network","National"]),canonical:"system.network.national"}),
  international:Object.freeze({concept:"International",path:Object.freeze(["System","Network","International"]),canonical:"system.network.international"}),
  rootServer:Object.freeze({concept:"Server",path:Object.freeze(["System","Network","Internet","DNS","Root","Server"]),legacy:"system.root-server"}),
  rootZone:Object.freeze({concept:"Zone",path:Object.freeze(["System","Network","Internet","DNS","Root","Zone"]),legacy:"system.root-zone"})
 })
});
 function tfAtomicTokenV36257(x){return /^[A-Za-z0-9]+$/.test(String(x));}
 function tfContextualIdentityV36257(spec={}){
 const concept=String(spec.concept||"").trim(),path=[...(spec.path||[])].map(x=>String(x).trim()).filter(Boolean);
 if(!concept||!tfAtomicTokenV36257(concept))throw new Error("concept must be one atomic token");
 if(!path.length||path.some(x=>!tfAtomicTokenV36257(x)))throw new Error("path elements must be atomic tokens");
 if(path.at(-1)!==concept)throw new Error("context path must terminate in concept");
 const semanticKey=path.join(".");
 return Object.freeze({concept,path:Object.freeze(path),semanticKey,contextKey:path.slice(0,-1).join("."),sameConceptMayHaveOtherContexts:true,
  duplicateByConceptAlone:false,deduplicate:false,alias:false,canonicalMigration:"deferred-until-qualified"});
}
 function tfContextualNaturalizationMapV36257(){
 const out=[];for(const [name,c] of Object.entries(TF_CONTEXTUAL_OBJECT_MODEL_V36257.contexts)){
  const identity=tfContextualIdentityV36257({concept:c.concept,path:c.path});
  out.push(Object.freeze({name,...identity,sourceIdentity:c.canonical||c.legacy||null,classification:c.canonical?"canonical-current":"contextual-predecessor-identity"}));
 }return Object.freeze(out);
}
 function tfContextualCanonicalizationSelfTestV36257(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],map=tfContextualNaturalizationMapV36257();
 for(const row of map)if(row.sourceIdentity&&!ids.has(row.sourceIdentity))missing.push(row.sourceIdentity);
 const routers=map.filter(x=>x.concept==="Router"),switches=map.filter(x=>x.concept==="Switch");
 if(new Set(routers.map(x=>x.semanticKey)).size!==3||new Set(switches.map(x=>x.semanticKey)).size!==3)missing.push("context-collapse");
 if(routers.some(x=>x.duplicateByConceptAlone||x.deduplicate)||switches.some(x=>x.duplicateByConceptAlone||x.deduplicate))missing.push("deduplication");
 if(!map.every(x=>x.path.every(tfAtomicTokenV36257)))missing.push("non-atomic-path");
 if(TF_CONTEXTUAL_CANONICALIZATION_V36257.destructiveRename||TF_CONTEXTUAL_CANONICALIZATION_V36257.automaticDeduplication||TF_CONTEXTUAL_CANONICALIZATION_V36257.implicitAliasCollapse)missing.push("destructive-policy");
 if(missing.length)throw new Error("contextual canonicalization qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,mappedContexts:map.length,atomicElements:true,contextPreserved:true,routerContexts:routers.length,switchContexts:switches.length,
  sameConceptDifferentContext:true,automaticDeduplication:false,destructiveRename:false,implicitAliasCollapse:false,migrationDeferred:true,missing:0});
}
 return Object.freeze({TF_CONTEXTUAL_CANONICALIZATION_V36257,TF_CONTEXTUAL_OBJECT_MODEL_V36257,tfAtomicTokenV36257,tfContextualIdentityV36257,tfContextualNaturalizationMapV36257,tfContextualCanonicalizationSelfTestV36257});
}
module.exports={bindCanonicalizationV04442,bindContextualCanonicalizationV04489};

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TERRAFORMER_CANONICALIZATION=Object.freeze({schema:'TERRAFORMER-CANONICALIZATION/2',id:'system.terraformer.canonicalization',name:'Terraformer Canonicalization',aliases:Object.freeze(['Terraformer Canonicalism']),status:'official',authority:'canonical-representation',visibility:'internal-governing',governs:Object.freeze(['canonical-form','canonical-name','canonical-uri','canonical-identity','equivalence','normalization','alias','version','installation','executable','representation']),invariants:Object.freeze(['one authoritative representation per equivalent set','canonical identity is deterministic','aliases remain subordinate','version and executable identity are reconciled','canonicalization does not grant operation authority']),rule:'Canonicalization selects deterministic authoritative Terraformer representations while preserving compatible aliases.'});

/* Terraformer v0.48.14: promoted dependency-closed declaration migration. */
const TF_CANONICALIZATION_MODULE_V04442=require('./terraformer.canonicalization.js').bindCanonicalizationV04442({TERRAFORMER_CANONICALIZATION});

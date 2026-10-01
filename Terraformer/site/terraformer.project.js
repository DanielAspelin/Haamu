"use strict";
const SYSTEM=Object.freeze({id:"system.project",concept:"Project",authorityGranted:false,scaffold:true});
function bindProjectV04509(){return Object.freeze({SYSTEM});}
function bindLinguistProjectV04679(){
 const TERRAFORMER_LINGUIST_PROJECT=Object.freeze({schema:"TERRAFORMER-PROJECT/1",id:"project.linguist",name:"Linguist",program:"program.linguist",role:"provenance-lineage",authorityGranted:false,automaticExecution:false,qualificationInheritance:false});
 return Object.freeze({TERRAFORMER_LINGUIST_PROJECT});
}

module.exports=Object.freeze({bindLinguistProjectV04679,bindProjectV04509});

/* Terraformer v0.48.2: cross-owner implementation migrated after bridge qualification. */
function tfUriProjectionAudit(){const x=tfUriProjectionInventory(),mappedSystems=new Set(x.entries.filter(e=>e.kind==='system').map(e=>e.id)),mappedWorkers=new Set(x.entries.filter(e=>e.kind==='worker').map(e=>e.id)),missingSystems=x.systems.filter(v=>!mappedSystems.has(v.id)).map(v=>({id:v.id,name:v.name||v.id,reason:String(v.id).startsWith('system.terraformer.')?'internal-governing':'unclassified'})),missingWorkers=x.workers.filter(v=>!mappedWorkers.has(v.id)).map(v=>({id:v.id,name:v.name||v.id,reason:'unclassified'})),badSegments=x.entries.filter(e=>{const u=new URL(e.path);return ![u.hostname,...u.pathname.split('/').filter(Boolean)].every(tfUriWord)}),coverage={systems:{total:x.systems.length,mapped:mappedSystems.size,missing:missingSystems.length},workers:{total:x.workers.length,mapped:mappedWorkers.size,missing:missingWorkers.length}};return {schema:'TERRAFORMER-URI-PROJECTION-AUDIT/1',ok:x.collisions.length===0&&badSegments.length===0,coverage,collisions:x.collisions,badSegments,missingSystems,missingWorkers,principles:{topology:'path ancestry',ontology:'registered identity',taxonomy:'one-word hierarchy',canonicalization:'single deterministic path',orthogonality:'classification remains non-authorizing',semantics:'identity meaning preserved'}}}

function tfUriProjectionFind(input){let u;try{u=new URL(String(input||''))}catch{return null}if(u.protocol!=='terraformer:')return null;const path='terraformer://'+String(u.hostname||'').toLowerCase()+'/'+u.pathname.split('/').filter(Boolean).map(x=>decodeURIComponent(x).toLowerCase()).join('/')+(u.pathname.split('/').filter(Boolean).length?'/':'');const inv=tfUriProjectionInventory(),hits=inv.entries.filter(e=>e.path===path);if(hits.length!==1)return null;return hits[0]}


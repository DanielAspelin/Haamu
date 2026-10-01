"use strict";
function bindClassificationV04475(deps={}){
 const {tfCanonicalSystemIdsV36196,TF_PHYLUM_SYSTEM_V36243,TF_ORDER_SYSTEM_V36243}=deps;
/* === Terraformer v0.36.243: Classification, Phylum & Order Systems === */
const TF_CLASSIFICATION_SYSTEM_V36243=Object.freeze({
 id:"system.classification",name:"Classification System",family:"knowledge-structure",type:"classification-system",mode:"evidence-bounded-hierarchical",
 condition:Object.freeze(["subject-identified","scheme-defined","class-defined","evidence-admitted","placement-validated"]),state:"naturalized",
 integrates:Object.freeze(["system.node","system.tree","system.mind.map","system.parent","system.child","system.sibling","system.data-mining","system.indexing","system.search","system.validation","system.verification"]),
 governs:Object.freeze(["classification-scheme","class","rank","placement","evidence","confidence","provenance","candidate-classification"]),
 biologicalByDefault:false,inferenceIsFact:false,mutatesSubject:false,grantsAuthority:false,persists:false,intrinsic:true
});


function tfClassificationSchemeV36243(spec={}){
 const id=String(spec.id||"classification.default"),ranks=Object.freeze([...(spec.ranks||["classification","phylum","order"]).map(String)]),biological=spec.biological===true;
 if(new Set(ranks).size!==ranks.length)throw new Error("duplicate classification rank");
 return Object.freeze({system:"system.classification",id,name:String(spec.name||id),ranks,biological,evidenceRequired:true,inferenceIsFact:false,subjectMutation:false,authorityGranted:false,persisted:false});
}
function tfClassificationPlacementV36243(scheme,spec={}){
 if(!scheme||scheme.system!=="system.classification")throw new Error("classification scheme required");const rank=String(spec.rank||"classification");
 if(!scheme.ranks.includes(rank))throw new Error("rank not admitted by classification scheme");if(spec.subject==null||spec.value==null)throw new Error("classification subject and value required");
 const inferred=spec.inferred===true,confidence=Number.isFinite(Number(spec.confidence))?Math.max(0,Math.min(1,Number(spec.confidence))):null;
 return Object.freeze({scheme:scheme.id,subject:String(spec.subject),rank,value:String(spec.value),parent:spec.parent==null?null:String(spec.parent),classification:inferred?"inferred-candidate":"observed-placement",
  fact:!inferred,evidence:spec.evidence??null,confidence,biological:scheme.biological,subjectMutation:false,authorityGranted:false,persisted:false});
}
function tfTaxonomyNavigationV36243(placements,subject){
 const p=(placements||[]).find(x=>x.subject===String(subject));if(!p)return null;const siblings=(placements||[]).filter(x=>x.parent===p.parent&&x.subject!==p.subject&&x.rank===p.rank).map(x=>x.subject).sort();
 const children=(placements||[]).filter(x=>x.parent===p.value).map(x=>x.subject).sort();return Object.freeze({subject:p.subject,rank:p.rank,value:p.value,parent:p.parent,children:Object.freeze(children),siblings:Object.freeze(siblings),
  parentSystem:"system.parent",childSystem:"system.child",siblingSystem:"system.sibling",sourceMutation:false,authorityGranted:false});
}
const TF_CLASSIFICATION_KIT_V36243=Object.freeze({id:"kit.classification",name:"Classification Kit",type:"intrinsic-kit",mode:"naturalized",
 members:Object.freeze(["system.classification","system.phylum","system.order","system.node","system.tree","system.mind.map","system.parent","system.child","system.sibling","system.data-mining","system.indexing","system.search","system.validation","system.verification"]),
 intrinsic:true,plugin:false,module:false,grantsAuthority:false});
function tfClassificationSelfTestV36243(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of TF_CLASSIFICATION_KIT_V36243.members)if(!ids.has(id))missing.push(id);
 const scheme=tfClassificationSchemeV36243({id:"test",ranks:["classification","phylum","order"]}),placements=[
  tfClassificationPlacementV36243(scheme,{subject:"p1",rank:"phylum",value:"alpha",parent:"root",evidence:{source:"test"}}),
  tfClassificationPlacementV36243(scheme,{subject:"p2",rank:"phylum",value:"beta",parent:"root",evidence:{source:"test"}}),
  tfClassificationPlacementV36243(scheme,{subject:"o1",rank:"order",value:"one",parent:"alpha",inferred:true,confidence:.8,evidence:{source:"mining"}})];
 const nav=tfTaxonomyNavigationV36243(placements,"p1");if(nav.siblings[0]!=="p2"||nav.children[0]!=="o1")missing.push("taxonomy-navigation");
 if(placements[2].fact!==false||placements[2].classification!=="inferred-candidate")missing.push("inference-boundary");
 if(scheme.biological||TF_CLASSIFICATION_SYSTEM_V36243.biologicalByDefault||TF_PHYLUM_SYSTEM_V36243.biologicalByDefault||TF_ORDER_SYSTEM_V36243.biologicalByDefault)missing.push("biological-default");
 if([TF_CLASSIFICATION_SYSTEM_V36243,TF_PHYLUM_SYSTEM_V36243,TF_ORDER_SYSTEM_V36243].some(x=>x.grantsAuthority||x.mutatesSubject||x.persists))missing.push("boundary");
 if(missing.length)throw new Error("classification qualification failure "+missing.join(","));
 return Object.freeze({pass:true,classificationSystem:true,phylumSystem:true,orderSystem:true,node:true,tree:true,mindMap:true,parentChildSibling:true,dataMining:true,indexing:true,search:true,
  hierarchicalRanks:true,inferredCandidateSeparated:true,biologicalByDefault:false,subjectMutation:false,persistence:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.243 === */


 return Object.freeze({TF_CLASSIFICATION_SYSTEM_V36243,TF_PHYLUM_SYSTEM_V36243,TF_ORDER_SYSTEM_V36243,tfClassificationSchemeV36243,tfClassificationPlacementV36243,tfTaxonomyNavigationV36243,TF_CLASSIFICATION_KIT_V36243,tfClassificationSelfTestV36243});
}


function bindCorpusCanonicalClassificationV04490(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 function tfCorpusCanonicalClassificationV36258(sourceText){
 const ids=[...new Set(tfCanonicalSystemIdsV36196(sourceText))].sort(), rows=[];
 const contextualHints=new Set(["lan-router","wan-router","nat-router","lan-switch","wan-switch","nat-switch","nat-bridge","root-server","root-zone"]);
 for(const id of ids){
  const local=id.slice("system.".length), parts=local.split(/[._-]+/).filter(Boolean);
  let classification="atomic";
  if(local.includes(".")||local.includes("-"))classification="composite-candidate";
  if(contextualHints.has(local))classification="contextual-composition";
  if(id==="system.network.national"||id==="system.network.international")classification="contextual-canonical";
  rows.push(Object.freeze({id,parts:Object.freeze(parts),elementCount:parts.length,classification,
    destructiveAction:false,deduplicate:false,migration:"none",reviewRequired:classification==="composite-candidate"}));
 }
 const counts={};for(const r of rows)counts[r.classification]=(counts[r.classification]||0)+1;
 return Object.freeze({systems:ids.length,rows:Object.freeze(rows),counts:Object.freeze(counts),destructiveAction:false,automaticDeduplication:false});
}
 function tfCorpusCanonicalClassificationSelfTestV36258(sourceText){
 const r=tfCorpusCanonicalClassificationV36258(sourceText),missing=[];
 if(!r.systems||r.rows.length!==r.systems)missing.push("coverage");
 const seen=new Set(r.rows.map(x=>x.id));if(seen.size!==r.systems)missing.push("identity");
 if(r.rows.some(x=>x.destructiveAction||x.deduplicate||x.migration!=="none"))missing.push("non-destructive");
 for(const id of ["system.lan-router","system.wan-router","system.nat-router","system.root-server","system.root-zone"])
  if(r.rows.find(x=>x.id===id)?.classification!=="contextual-composition")missing.push(id);
 for(const id of ["system.network.national","system.network.international"])
  if(r.rows.find(x=>x.id===id)?.classification!=="contextual-canonical")missing.push(id);
 if(missing.length)throw new Error("corpus canonical classification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,systems:r.systems,classified:r.rows.length,counts:r.counts,identityPreserved:true,automaticDeduplication:false,destructiveRename:false,migrationPerformed:false,missing:0});
}
 return Object.freeze({tfCorpusCanonicalClassificationV36258,tfCorpusCanonicalClassificationSelfTestV36258});
}


function bindCompositeSemanticTriageV04494(deps={}){
 const {tfCanonicalSystemIdsV36196,tfCorpusCanonicalClassificationV36258}=deps;
 /* === Terraformer v0.36.262: Composite Candidate Semantic Triage === */
const TF_ESTABLISHED_TECHNICAL_ATOMS_V36262=Object.freeze(new Set(["tcpip","dnssec","webassembly","webgpu","localhost","filesystem","javascript","typescript","postgresql","sqlite","telegram","whatsapp"]));
const TF_CONTEXTUAL_SUFFIXES_V36262=Object.freeze(new Set(["router","switch","bridge","scanner","mapper","server","client","manager","worker","generator","automator","processor","controller","adapter"]));
function tfCompositeSemanticTriageV36262(sourceText){
 const base=tfCorpusCanonicalClassificationV36258(sourceText),rows=[];
 for(const r of base.rows){
  let semanticClass=r.classification,reason="inherited";
  const local=r.id.slice(7),compact=local.replace(/[._-]/g,"").toLowerCase(),parts=local.split(/[._-]+/).filter(Boolean);
  if(r.classification==="composite-candidate"){
   if(TF_ESTABLISHED_TECHNICAL_ATOMS_V36262.has(compact)){semanticClass="established-technical-atom";reason="established technical identity retained atomically";}
   else if(parts.length>1&&TF_CONTEXTUAL_SUFFIXES_V36262.has(parts.at(-1).toLowerCase())){semanticClass="contextual-composition-candidate";reason="terminal role/object under contextual prefix";}
   else {semanticClass="semantic-review-candidate";reason="compound spelling alone is insufficient evidence for splitting";}
  }
  rows.push(Object.freeze({...r,semanticClass,reason,automaticSplit:false,automaticMerge:false}));
 }
 const counts={};for(const r of rows)counts[r.semanticClass]=(counts[r.semanticClass]||0)+1;
 return Object.freeze({systems:rows.length,rows:Object.freeze(rows),counts:Object.freeze(counts),automaticSplit:false,automaticMerge:false,destructiveRename:false});
}
function tfCompositeSemanticTriageSelfTestV36262(sourceText){
 const t=tfCompositeSemanticTriageV36262(sourceText),missing=[];
 if(t.rows.length!==tfCanonicalSystemIdsV36196(sourceText).length)missing.push("coverage");
 for(const id of ["system.network.scanner","system.network.mapper"]){const x=t.rows.find(r=>r.id===id);if(!x||x.semanticClass!=="contextual-composition-candidate")missing.push(id)}
 if(t.rows.some(x=>x.automaticSplit||x.automaticMerge)||t.destructiveRename)missing.push("automatic-mutation");
 if(missing.length)throw new Error("semantic triage qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,systems:t.systems,counts:t.counts,scannerMapperContextual:true,automaticSplit:false,automaticMerge:false,destructiveRename:false,reviewPreserved:true,missing:0});
}
 return Object.freeze({TF_ESTABLISHED_TECHNICAL_ATOMS_V36262,TF_CONTEXTUAL_SUFFIXES_V36262,tfCompositeSemanticTriageV36262,tfCompositeSemanticTriageSelfTestV36262});
}


function bindSemanticPrimitiveOwnershipV04503(deps={}){
 const {tfCanonicalSystemIdsV36196,tfCodeOwnershipAuditV36270,tfTopLevelExecutableDeclarationsV36267}=deps;
 /* === Terraformer v0.36.271: Semantic Primitive Ownership & Function System Coverage === */
const TF_SEMANTIC_PRIMITIVE_OWNERSHIP_V36271=Object.freeze({
 primitiveOwners:Object.freeze({
  function:"system.function",class:"system.class",constant:"system.constant",variable:"system.variable",
  array:"system.array",symbol:"system.symbol",symbolic:"system.symbolic"
 }),
 rule:"Primitive type ownership and semantic/operational ownership are orthogonal: Function System classifies functions while each function retains its canonical operational System owner.",
 physicalMigration:false
});
function tfSemanticPrimitiveInventoryV36271(sourceText){
 const functionRows=tfTopLevelExecutableDeclarationsV36267(sourceText).filter(x=>x.kind==="function").map(x=>Object.freeze({...x,primitiveOwner:"system.function"}));
 const classRows=tfTopLevelExecutableDeclarationsV36267(sourceText).filter(x=>x.kind==="class").map(x=>Object.freeze({...x,primitiveOwner:"system.class"}));
 const declarations=[];
 const rx=/^(const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?:=\s*([^;\n]+))?/gm;let m;
 while((m=rx.exec(sourceText))){
  const kind=m[1]==="const"?"constant":"variable",init=String(m[3]||"").trim(),array=/^(?:Object\.freeze\()?\s*\[/.test(init);
  declarations.push(Object.freeze({name:m[2],kind,primitiveOwner:TF_SEMANTIC_PRIMITIVE_OWNERSHIP_V36271.primitiveOwners[kind],array,arrayOwner:array?"system.array":null,offset:m.index}));
 }
 return Object.freeze({functions:Object.freeze(functionRows),classes:Object.freeze(classRows),declarations:Object.freeze(declarations),
  counts:Object.freeze({functions:functionRows.length,classes:classRows.length,constants:declarations.filter(x=>x.kind==="constant").length,
   variables:declarations.filter(x=>x.kind==="variable").length,arrays:declarations.filter(x=>x.array).length})});
}
function tfFunctionSystemCoverageV36271(sourceText){
 const systems=new Set(tfCanonicalSystemIdsV36196(sourceText)),inv=tfSemanticPrimitiveInventoryV36271(sourceText),op=tfCodeOwnershipAuditV36270(sourceText);
 const opByName=new Map(op.rows.map(x=>[x.name,x]));const rows=inv.functions.map(f=>Object.freeze({...f,operationalOwner:opByName.get(f.name)?.owner||null,
  operationalClassification:opByName.get(f.name)?.classification||"ORPHAN"}));
 return Object.freeze({system:"system.function",canonical:systems.has("system.function"),functions:rows.length,rows:Object.freeze(rows),
  primitiveCoverage:rows.every(x=>x.primitiveOwner==="system.function"),operationalCoverage:rows.every(x=>x.operationalClassification!=="ORPHAN")});
}
function tfSemanticPrimitiveIntegrityGateV36271(sourceText){
 const systems=new Set(tfCanonicalSystemIdsV36196(sourceText)),inv=tfSemanticPrimitiveInventoryV36271(sourceText),fn=tfFunctionSystemCoverageV36271(sourceText),failures=[];
 for(const owner of Object.values(TF_SEMANTIC_PRIMITIVE_OWNERSHIP_V36271.primitiveOwners))if(!systems.has(owner))failures.push("missing-primitive-owner:"+owner);
 if(!fn.primitiveCoverage)failures.push("function-primitive-coverage");if(!fn.operationalCoverage)failures.push("function-operational-coverage");
 if(inv.classes.some(x=>x.primitiveOwner!=="system.class"))failures.push("class-coverage");
 if(inv.declarations.some(x=>!x.primitiveOwner))failures.push("declaration-coverage");
 if(inv.declarations.some(x=>x.array&&!x.arrayOwner))failures.push("array-coverage");
 return Object.freeze({pass:failures.length===0,inventory:inv,functionSystem:fn,failures:Object.freeze(failures),physicalMigration:false});
}
function tfSemanticPrimitiveSelfTestV36271(sourceText){
 const g=tfSemanticPrimitiveIntegrityGateV36271(sourceText);if(!g.pass)throw new Error("semantic primitive integrity failure "+g.failures.join(","));
 return Object.freeze({pass:true,...g.inventory.counts,functionSystemCanonical:g.functionSystem.canonical,functionPrimitiveCoverage:g.functionSystem.primitiveCoverage,
  functionOperationalCoverage:g.functionSystem.operationalCoverage,classSystem:true,constantSystem:true,variableSystem:true,arraySystem:true,
  symbolSystem:true,symbolicSystem:true,physicalMigration:false,missing:0});
}
 return Object.freeze({TF_SEMANTIC_PRIMITIVE_OWNERSHIP_V36271,tfSemanticPrimitiveInventoryV36271,tfFunctionSystemCoverageV36271,tfSemanticPrimitiveIntegrityGateV36271,tfSemanticPrimitiveSelfTestV36271});
}
module.exports={bindClassificationV04475,bindCorpusCanonicalClassificationV04490,bindCompositeSemanticTriageV04494,bindSemanticPrimitiveOwnershipV04503};

const TERRAFORMER_URI_CLASSIFICATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-URI-CLASSIFICATION/1',id:'system.uri-classification',name:'URI Classification System',canonical:'logical-one-word-hierarchy',rule:'Canonical Terraformer URI paths use one-word segments and logical Terraformer-owned subclassification; implementation suffixes are not canonical route segments and legacy roots may remain compatibility aliases.'});

Object.assign(module.exports,{TERRAFORMER_URI_CLASSIFICATION_SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfCanonicalClassificationSlug(value){return String(value||'').toLowerCase().replace(/-(?:system|language|tool|worker)$/,'').replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'')}

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const CLASSIFICATION_LEVELS=Object.freeze(['PUBLIC','INTERNAL','RESTRICTED','CONFIDENTIAL','CLASSIFIED']);

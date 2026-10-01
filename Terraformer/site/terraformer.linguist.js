"use strict";
function bindLinguistProgramV04679(deps={}){
const TERRAFORMER_LINGUIST_LANGUAGE_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.linguist.language',name:'Linguist Language System',family:'language',type:'imported-language-domain',state:'integrated',canonicalPath:'terraformer://language/linguist/',dependsOn:Object.freeze(['system.language','system.import']),governs:Object.freeze(['language-reference','grammar-reference','syntax-reference','semantics-reference','lexical-reference','human-language-reference','machine-language-reference','translation-reference','speech-language-reference']),rule:'Linguist Language System owns imported linguistic semantics and language-domain structure; it does not execute tools or inherit Terraformer authority.'});
const TERRAFORMER_LINGUIST_TOOL_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.linguist.tool',name:'Linguist Tool System',family:'tool',type:'imported-tool-domain',state:'integrated',canonicalPath:'terraformer://tool/linguist/',dependsOn:Object.freeze(['system.tool','system.import','system.linguist.language']),governs:Object.freeze(['tool-reference','parser-tool-reference','generator-tool-reference','processor-tool-reference','validator-tool-reference','adapter-reference','invocation-reference']),rule:'Linguist Tool System owns imported invocable and processing facilities; registration does not execute a tool, establish host availability, or grant invocation authority.'});
const TERRAFORMER_LINGUIST_NATURALIZATION=Object.freeze({schema:'TERRAFORMER-LINGUIST-NATURALIZATION/1',project:'Linguist',mode:'canonical-terraformer-naturalization',languageRoot:'system.language',toolRoot:'system.tool',provenanceOnlyProjectNamespace:true,duplicateAuthority:false,automaticExecution:false,qualificationInheritance:false,rule:'Imported Linguist capabilities naturalize into canonical Terraformer Language or Tool systems. Linguist remains provenance and lineage, never a parallel runtime authority.'});
const TERRAFORMER_LINGUIST_IMPORT=Object.freeze({schema:'TERRAFORMER-EXTERNAL-PROJECT-IMPORT/1',project:'Linguist',version:'0.36.1',ownership:'external-owned',sourceSha256:'42c2a60eaf29ee6fbf8d1a49b49824bddfcb0e21ba22fafa76beb79cd4547867',archiveBytes:1136082,artifactCount:1172,javascriptCount:617,archiveEncoding:'base64',manifestEncoding:'base64-json',get archiveBase64(){return deps.tfCanonicalPayloadV36202('p4')},get manifestBase64(){return deps.tfCanonicalPayloadV36202('p5')},execution:'not-automatic',authorityTransfer:false,qualificationInheritance:false});
function tfLinguistManifest(){return JSON.parse(Buffer.from(TERRAFORMER_LINGUIST_IMPORT.manifestBase64,'base64').toString('utf8'))}
function tfLinguistArchive(){const b=Buffer.from(TERRAFORMER_LINGUIST_IMPORT.archiveBase64,'base64'),h=require('crypto').createHash('sha256').update(b).digest('hex');return Object.freeze({ok:h===TERRAFORMER_LINGUIST_IMPORT.sourceSha256,bytes:b,sha256:h})}
function tfLinguistCanonicalOwner(path){
 const p=String(path).toLowerCase(),lang=[
 ['grammar','system.language.grammar'],['syntax','system.language.syntax'],['semantic','system.language.semantics'],['morpholog','system.language.morphology'],['phonolog','system.language.phonology'],['phonetic','system.language.phonetics'],['orthograph','system.language.orthography'],['vocab','system.language.vocabulary'],['lex','system.language.lexicon'],['dictionary','system.language.dictionary'],['terminolog','system.language.terminology'],['etymolog','system.language.etymology'],['translation','system.language.translation'],['transliter','system.language.transliteration'],['localization','system.language.localization'],['token','system.language.token'],['parser','system.language.parser'],['serialization','system.language.serialization'],['normalization','system.language.normalization'],['collation','system.language.collation'],['pragmatic','system.language.pragmatics'],['speech','system.language.speech-language'],['language','system.language']
 ];
 if(/(^|[\/._-])ir([\/._-]|$)|intermediate[-_ ]representation/.test(p))return 'system.language.ir';
 for(const [needle,id] of lang)if(p.includes(needle))return id;
 if(/tool|generator|processor|validator|compiler|assembler|linker|runtime|cli|command|adapter|worker|invok|build|test|audit|qualification|dependency|auth|login|security|key|chat|conversation|prompt|response|interaction/.test(p))return 'system.tool';
 return 'system.tool';
}
function tfImportClassify(path){
 const owner=tfLinguistCanonicalOwner(path),domain=owner.startsWith('system.language')?'language':'tool';
 return Object.freeze({owner,primary:domain,provenance:'Linguist v0.36.1',naturalized:true,duplicateAuthority:false});
}
function tfLinguistNaturalizationMap(){const m=tfLinguistManifest(),groups={};for(const x of m){const c=tfImportClassify(x.path);(groups[c.owner]||(groups[c.owner]=[])).push(Object.freeze({path:x.path,sha256:x.sha256,size:x.size,kind:x.kind}));}return Object.freeze(Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,Object.freeze(v)])))}
function tfImportReconciliation(){const m=tfLinguistManifest(),classes=m.map(x=>({path:x.path,...tfImportClassify(x.path)})),counts={};for(const x of classes)counts[x.owner]=(counts[x.owner]||0)+1;const planes={language:classes.filter(x=>x.primary==='language').length,tool:classes.filter(x=>x.primary==='tool').length};return Object.freeze({schema:'TERRAFORMER-IMPORT-RECONCILIATION/3',source:'Linguist v0.36.1',artifacts:m.length,order:deps.TERRAFORMER_IMPORT_ORDER,canonicalOwnershipCounts:Object.freeze(counts),planes:Object.freeze(planes),naturalization:TERRAFORMER_LINGUIST_NATURALIZATION,collisionsResolved:true,duplicateAuthority:false,automaticExecution:false,qualificationInheritance:false});}
 return Object.freeze({TERRAFORMER_LINGUIST_LANGUAGE_SYSTEM,TERRAFORMER_LINGUIST_TOOL_SYSTEM,TERRAFORMER_LINGUIST_NATURALIZATION,TERRAFORMER_LINGUIST_IMPORT,tfLinguistManifest,tfLinguistArchive,tfLinguistCanonicalOwner,tfImportClassify,tfLinguistNaturalizationMap,tfImportReconciliation});
}
const TERRAFORMER_LINGUIST_PROGRAM=Object.freeze({
 schema:"TERRAFORMER-PROGRAM/1",id:"program.linguist",name:"Linguist",type:"program",
 mode:"transition",state:"admitted",projectLineage:"project.linguist",
 capabilityRoots:Object.freeze(["system.language","system.tool"]),
 authorityGranted:false,automaticExecution:false,qualificationInheritance:false,persistenceGranted:false,
 rule:"Linguist is an admitted Program identity in mode transition. Program identity composes canonical Language and Tool capabilities while Project retains provenance; identity alone grants no runtime authority, execution, persistence, or qualification."
});
function describeLinguistProgramV04679(){return TERRAFORMER_LINGUIST_PROGRAM}
module.exports=Object.freeze({bindLinguistProgramV04679,TERRAFORMER_LINGUIST_PROGRAM,describeLinguistProgramV04679});

const LINGUIST_TOKEN_DISCOVERY_V04783=Object.freeze({schema:'TERRAFORMER-LINGUIST-TOKEN-DISCOVERY/1',version:'0.47.83',interactionLayer:'system.program',applicationLayer:'system.application',implementationLayer:'system.system',developmentOrder:Object.freeze(['system.system','system.application','system.program']),projectionOrder:Object.freeze(['system.program','system.application','system.system']),morphology:Object.freeze([{suffix:'ion',candidate:'system'},{suffix:'ing',candidate:'system'},{suffix:'r',candidate:'worker'}]),rule:'Morphology discovers candidates only; context, identity, overlap, responsibility and qualification govern canonical naturalization.',authorityGranted:false,automaticNaturalization:false});
module.exports=Object.freeze({...module.exports,LINGUIST_TOKEN_DISCOVERY_V04783});

/* Terraformer v0.48.3: bridge-covered cross-owner migration. */
function tfLinguistNaturalizedSuccessorV4055(){
 const q=tfLinguistRepeatedQualificationV4055(),a=tfLinguistClosureAuditV4055();
 return Object.freeze({subject:"Linguist",successor:"system.language",version:"0.40.55",
  historicalArtifacts:a.artifacts,dispositionCoverage:a.coverage,unresolved:a.unresolved,
  normalized:q.pass,naturalized:q.pass,qualificationPasses:q.passes.length,
  qualificationState:q.pass?"Naturalized":"Under Conditional Experiment",
  linguistIndependentAuthority:false,provenancePreserved:true,
  byteIdenticalHistoricalArtifactRecovery:false,
  runtimeClaim:"structural-and-ledger-closure-only"});
}


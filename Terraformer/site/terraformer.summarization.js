"use strict";
function bindBookSummaryV04599(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353}=deps;
 /* === Terraformer v0.36.358: Book / Handbook / Active Per-System Summary Fabric === */
const TF_BOOK_SUMMARY_SYSTEMS_V36358=Object.freeze([{"id":"system.book","concept":"Book","type":"document-content-system"},{"id":"system.handbook","concept":"Handbook","type":"reference-document-system"},{"id":"system.summary","concept":"Summary","type":"derived-content-system"},{"id":"system.summarization","concept":"Summarization","type":"content-process-system"}]);

const TF_BOOK_SUMMARY_RELATIONSHIPS_V36358=Object.freeze([
 Object.freeze({from:"system.book",relation:"uses",to:"system.document"}),
 Object.freeze({from:"system.handbook",relation:"uses",to:"system.book"}),
 Object.freeze({from:"system.handbook",relation:"may-use",to:"system.documentation"}),
 Object.freeze({from:"system.summarizer",relation:"part-of",to:"system.summarization"}),
 Object.freeze({from:"system.summarization",relation:"produces-plan-for",to:"system.summary"}),
 Object.freeze({from:"system.summary",relation:"may-use",to:"system.reporting"})
]);
const TF_ACTIVE_SUMMARY_SCHEMA_V36358=Object.freeze({schema:"TERRAFORMER-ACTIVE-SUMMARY/1",derived:true,volatile:true,
 refresh:"on-observed-source-revision-or-explicit-read",backgroundTimer:false,externalEffect:false,persistence:false});
const TF_ACTIVE_SUMMARY_CACHE_V36358=new Map();
function tfSystemSummaryFingerprintV36358(system){
 const x=system&&typeof system==="object"?system:{id:String(system??"")};
 return JSON.stringify([x.id??null,x.name??x.concept??null,x.type??null,x.mode??null,x.condition??null,x.state??null,x.version??null,x.generation??null,x.revision??null]);
}
function tfActiveSystemSummaryV36358(system){
 const x=system&&typeof system==="object"?system:{id:String(system??"")},id=String(x.id??"");
 if(!id)throw new Error("[TF:system.summary:invalid-input] System identity required.");
 const fp=tfSystemSummaryFingerprintV36358(x),prior=TF_ACTIVE_SUMMARY_CACHE_V36358.get(id);
 if(prior&&prior.fingerprint===fp)return prior.summary;
 const summary=Object.freeze({system:"system.summary",summarizer:"system.summarizer",owner:id,
  text:[x.name??x.concept??id,x.type?("type="+x.type):null,x.mode?("mode="+x.mode):null,x.condition?("condition="+x.condition):null,x.state?("state="+x.state):null].filter(Boolean).join("; "),
  sourceFingerprint:fp,active:true,derived:true,volatile:true,updatedOnRead:true,backgroundTimer:false,
  externalEffect:false,persistencePerformed:false,authorityGranted:false});
 TF_ACTIVE_SUMMARY_CACHE_V36358.set(id,Object.freeze({fingerprint:fp,summary}));
 return summary;
}
function tfUniversalActiveSummaryFabricV36358(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({system:"system.summarization",systemsCovered:ids.length,summaries:Object.freeze(ids.map(id=>tfActiveSystemSummaryV36358({id,state:"canonical"}))),
  autoUpdateMode:"revision-sensitive-read-through",backgroundTimer:false,volatile:true});
}
function tfBookSummarySelfTestV36358(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.book","system.handbook","system.summary","system.summarizer","system.summarization","system.document","system.documentation","system.reporting","system.state","system.version","system.event"])if(!ids.has(id))missing.push(id);
 const a=tfActiveSystemSummaryV36358({id:"system.summary",state:"one",revision:1}),b=tfActiveSystemSummaryV36358({id:"system.summary",state:"two",revision:2});
 if(a.sourceFingerprint===b.sourceFingerprint||a.text===b.text)missing.push("refresh");
 const u=tfUniversalActiveSummaryFabricV36358(sourceText);
 if(u.systemsCovered!==ids.size||u.summaries.length!==ids.size)missing.push("universal-coverage");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.book","system.handbook","system.summary","system.summarization"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Book / Summary qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:4,summarizerReused:true,book:true,handbook:true,summary:true,summarization:true,
  systemsCovered:u.systemsCovered,everySystemActiveSummary:true,revisionSensitiveRefresh:true,backgroundTimer:false,
  volatile:true,persistencePerformed:false,authorityAmplification:false,missing:0});
}
globalThis.TF_BOOK_SUMMARY_SYSTEMS_V36358=TF_BOOK_SUMMARY_SYSTEMS_V36358;
globalThis.TF_BOOK_SUMMARY_RELATIONSHIPS_V36358=TF_BOOK_SUMMARY_RELATIONSHIPS_V36358;
globalThis.TF_ACTIVE_SUMMARY_SCHEMA_V36358=TF_ACTIVE_SUMMARY_SCHEMA_V36358;
globalThis.tfActiveSystemSummaryV36358=tfActiveSystemSummaryV36358;
globalThis.tfUniversalActiveSummaryFabricV36358=tfUniversalActiveSummaryFabricV36358;
 return Object.freeze({TF_BOOK_SUMMARY_SYSTEMS_V36358,TF_BOOK_SUMMARY_RELATIONSHIPS_V36358,TF_ACTIVE_SUMMARY_SCHEMA_V36358,tfActiveSystemSummaryV36358,tfUniversalActiveSummaryFabricV36358,tfBookSummarySelfTestV36358});
}
module.exports=Object.freeze({bindBookSummaryV04599});

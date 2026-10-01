"use strict";
function bindViewReviewPreviewV04615(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.371: Viewing / Reviewing / Previewing Actor Fabric === */
const TF_VIEW_REVIEW_PREVIEW_SYSTEMS_V36371=Object.freeze([{"id":"system.viewing","concept":"Viewing","type":"observation-presentation-process-system"},{"id":"system.viewer","concept":"Viewer","type":"viewing-actor-system"},{"id":"system.reviewing","concept":"Reviewing","type":"assessment-inspection-process-system"},{"id":"system.reviewer","concept":"Reviewer","type":"reviewing-actor-system"},{"id":"system.previewing","concept":"Previewing","type":"preliminary-view-process-system"},{"id":"system.previewer","concept":"Previewer","type":"previewing-actor-system"}]);

const TF_VIEW_REVIEW_PREVIEW_RELATIONSHIPS_V36371=Object.freeze([
 Object.freeze({from:"system.viewing",relation:"may-use",to:"system.presentation"}),
 Object.freeze({from:"system.viewing",relation:"may-use",to:"system.interface"}),
 Object.freeze({from:"system.viewer",relation:"part-of",to:"system.viewing"}),
 Object.freeze({from:"system.reviewing",relation:"may-use",to:"system.viewing"}),
 Object.freeze({from:"system.reviewer",relation:"part-of",to:"system.reviewing"}),
 Object.freeze({from:"system.previewing",relation:"may-use",to:"system.viewing"}),
 Object.freeze({from:"system.previewer",relation:"part-of",to:"system.previewing"}),
 Object.freeze({from:"system.reviewing",relation:"distinct-from",to:"system.viewing"}),
 Object.freeze({from:"system.previewing",relation:"distinct-from",to:"system.reviewing"})
]);
function tfViewReviewPreviewPlanV36371(kind,spec={}){
 const map={viewing:"system.viewing",viewer:"system.viewer",reviewing:"system.reviewing",reviewer:"system.reviewer",previewing:"system.previewing",previewer:"system.previewer"},id=map[String(kind??"").toLowerCase()];
 if(!id)throw new Error("[TF:system.presentation:invalid-input] Viewing, Viewer, Reviewing, Reviewer, Previewing, or Previewer required.");
 return Object.freeze({system:id,subject:spec.subject??null,planOnly:true,contentMutated:false,approvalGranted:false,publicationPerformed:false,
  interfaceMutated:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfViewReviewPreviewSelfTestV36371(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_VIEW_REVIEW_PREVIEW_SYSTEMS_V36371.map(x=>x.id);
 for(const id of [...added,"system.presentation","system.interface","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["viewing","viewer","reviewing","reviewer","previewing","previewer"]){const p=tfViewReviewPreviewPlanV36371(k,{subject:"fixture"});if(!p.planOnly||p.contentMutated||p.approvalGranted||p.publicationPerformed||p.interfaceMutated||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Viewing / Reviewing / Previewing qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:6,viewing:true,viewer:true,reviewing:true,reviewer:true,previewing:true,previewer:true,
  viewingDistinctFromReviewing:true,previewingDistinctFromReviewing:true,systemsWithEngines:6,systemsWithServices:6,systemsInCompactSeed:6,systemsWithActiveSummaries:6,
  contentMutation:false,approvalGranted:false,publicationPerformed:false,authorityAmplification:false,missing:0});
}
globalThis.TF_VIEW_REVIEW_PREVIEW_SYSTEMS_V36371=TF_VIEW_REVIEW_PREVIEW_SYSTEMS_V36371;
globalThis.TF_VIEW_REVIEW_PREVIEW_RELATIONSHIPS_V36371=TF_VIEW_REVIEW_PREVIEW_RELATIONSHIPS_V36371;
globalThis.tfViewReviewPreviewPlanV36371=tfViewReviewPreviewPlanV36371;
 return Object.freeze({TF_VIEW_REVIEW_PREVIEW_SYSTEMS_V36371,TF_VIEW_REVIEW_PREVIEW_RELATIONSHIPS_V36371,tfViewReviewPreviewPlanV36371,tfViewReviewPreviewSelfTestV36371});
}
module.exports=Object.freeze({bindViewReviewPreviewV04615});

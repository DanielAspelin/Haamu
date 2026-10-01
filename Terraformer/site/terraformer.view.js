"use strict";
function bindUniversalVisualV04616(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.372: Universal View / Review / Preview / Active Thumbnail Fabric === */
const TF_VIEW_THUMBNAIL_SYSTEMS_V36372=Object.freeze([{"id":"system.view","concept":"View","type":"system-view-representation-system"},{"id":"system.review","concept":"Review","type":"system-review-representation-system"},{"id":"system.preview","concept":"Preview","type":"system-preview-representation-system"},{"id":"system.thumbnail","concept":"Thumbnail","type":"compact-visual-representation-system"},{"id":"system.thumbnailing","concept":"Thumbnailing","type":"thumbnail-generation-process-system"},{"id":"system.thumbnailer","concept":"Thumbnailer","type":"thumbnail-generation-actor-system"}]);

const TF_VIEW_THUMBNAIL_RELATIONSHIPS_V36372=Object.freeze([
 Object.freeze({from:"system.viewing",relation:"produces",to:"system.view"}),
 Object.freeze({from:"system.reviewing",relation:"produces",to:"system.review"}),
 Object.freeze({from:"system.previewing",relation:"produces",to:"system.preview"}),
 Object.freeze({from:"system.thumbnailing",relation:"produces",to:"system.thumbnail"}),
 Object.freeze({from:"system.thumbnailer",relation:"part-of",to:"system.thumbnailing"}),
 Object.freeze({from:"system.thumbnail",relation:"may-use",to:"system.image"}),
 Object.freeze({from:"system.thumbnail",relation:"may-represent",to:"system.preview"}),
 Object.freeze({from:"system.menu",relation:"uses",to:"system.icon"}),
 Object.freeze({from:"system.icon",relation:"may-use",to:"system.thumbnail"})
]);
const TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372=Object.freeze({schema:"TERRAFORMER-ACTIVE-SYSTEM-VISUAL/1",derived:true,active:true,
 revisionSensitive:true,readThrough:true,volatile:true,backgroundTimer:false,privateByDefault:true,inertByDefault:true,
 contentMutation:false,publication:false,persistence:false,externalEffect:false,authorityAmplification:false});
function tfSystemVisualFingerprintV36372(id,sourceText){return id+"|"+String(sourceText.length)+"|v0.36.372";}
function tfSystemViewReviewPreviewThumbnailV36372(owner,sourceText){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.viewing:invalid-input] System owner identity required.");
 const fp=tfSystemVisualFingerprintV36372(id,sourceText),leaf=id.replace(/^system\./,"");
 return Object.freeze({owner:id,fingerprint:fp,
  view:Object.freeze({id:id+"::view",system:"system.view",subject:id,...TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372}),
  review:Object.freeze({id:id+"::review",system:"system.review",subject:id,reviewable:true,...TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372}),
  preview:Object.freeze({id:id+"::preview",system:"system.preview",subject:id,...TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372}),
  thumbnail:Object.freeze({id:id+"::thumbnail",system:"system.thumbnail",subject:id,source:id+"::preview",iconFor:id+"::menu-item",label:leaf,...TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372}),
  menuItem:Object.freeze({id:id+"::menu-item",menu:"system.menu",subject:id,icon:id+"::thumbnail",activeThumbnail:true})
 });
}
function tfUniversalSystemVisualFabricV36372(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(id=>tfSystemViewReviewPreviewThumbnailV36372(id,sourceText));
 return Object.freeze({system:"system.viewing",systemsCovered:ids.length,views:entries.length,reviews:entries.length,previews:entries.length,
  thumbnails:entries.length,menuItems:entries.length,entries:Object.freeze(entries),everySystemReviewable:true,everySystemHasView:true,
  everySystemHasPreview:true,everySystemHasActiveThumbnail:true,everySystemMenuItemUsesActiveThumbnail:true});
}
function tfSystemVisualSelfTestV36372(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_VIEW_THUMBNAIL_SYSTEMS_V36372.map(x=>x.id),u=tfUniversalSystemVisualFabricV36372(sourceText);
 for(const id of [...added,"system.viewing","system.viewer","system.reviewing","system.reviewer","system.previewing","system.previewer","system.menu","system.sub-menu","system.icon","system.image","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 if([u.views,u.reviews,u.previews,u.thumbnails,u.menuItems].some(n=>n!==ids.size))missing.push("coverage");
 for(const e of u.entries){if(!e.review.reviewable||e.thumbnail.source!==e.preview.id||e.menuItem.icon!==e.thumbnail.id||!e.menuItem.activeThumbnail||!e.thumbnail.active||e.thumbnail.backgroundTimer||e.thumbnail.persistence||e.thumbnail.authorityAmplification)missing.push("entry:"+e.owner);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal visual fabric failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:6,systemsCovered:u.systemsCovered,views:u.views,reviews:u.reviews,previews:u.previews,thumbnails:u.thumbnails,menuItems:u.menuItems,
  everySystemReviewable:true,everySystemHasView:true,everySystemHasPreview:true,everySystemHasActiveThumbnail:true,everySystemMenuItemUsesActiveThumbnail:true,
  revisionSensitive:true,backgroundTimer:false,persistence:false,authorityAmplification:false,missing:0});
}
globalThis.TF_VIEW_THUMBNAIL_SYSTEMS_V36372=TF_VIEW_THUMBNAIL_SYSTEMS_V36372;
globalThis.TF_VIEW_THUMBNAIL_RELATIONSHIPS_V36372=TF_VIEW_THUMBNAIL_RELATIONSHIPS_V36372;
globalThis.TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372=TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372;
globalThis.tfSystemViewReviewPreviewThumbnailV36372=tfSystemViewReviewPreviewThumbnailV36372;
globalThis.tfUniversalSystemVisualFabricV36372=tfUniversalSystemVisualFabricV36372;
 return Object.freeze({TF_VIEW_THUMBNAIL_SYSTEMS_V36372,TF_VIEW_THUMBNAIL_RELATIONSHIPS_V36372,TF_ACTIVE_SYSTEM_VISUAL_SCHEMA_V36372,tfSystemVisualFingerprintV36372,tfSystemViewReviewPreviewThumbnailV36372,tfUniversalSystemVisualFabricV36372,tfSystemVisualSelfTestV36372});
}
module.exports=Object.freeze({bindUniversalVisualV04616});

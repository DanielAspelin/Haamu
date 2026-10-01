"use strict";
const SYSTEM=Object.freeze({id:"system.renderer",concept:"Renderer",type:"rendering-actor-system",partOf:"system.rendering",automaticExecution:false,automaticRender:false,deviceAccess:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
function bindRendererTypeV04655(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36404}=deps;
 /* === Terraformer v0.36.405: Renderer Type + Predecessor Naturalization Closure Audit === */
const TF_RENDERER_TYPE_SYSTEMS_V36405=Object.freeze([
 Object.freeze({id:"system.renderer-type",concept:"Renderer Type",type:"classification-system",mode:"descriptive",condition:"renderer-classification-admitted",state:"ready"})
]);
const TF_RENDERER_TYPE_RELATIONSHIPS_V36405=Object.freeze([
 Object.freeze({from:"system.renderer",relation:"part-of",to:"system.rendering"}),
 Object.freeze({from:"system.renderer-type",relation:"classifies",to:"system.renderer"}),
 Object.freeze({from:"system.audio-renderer",relation:"has-type",to:"system.renderer-type"}),
 Object.freeze({from:"system.photo-renderer",relation:"has-type",to:"system.renderer-type"}),
 Object.freeze({from:"system.video-renderer",relation:"has-type",to:"system.renderer-type"}),
 Object.freeze({from:"system.audio-renderer",relation:"is-a",to:"system.renderer"}),
 Object.freeze({from:"system.photo-renderer",relation:"is-a",to:"system.renderer"}),
 Object.freeze({from:"system.video-renderer",relation:"is-a",to:"system.renderer"})
]);
const TF_RENDERER_TYPES_V36405=Object.freeze({
 audio:Object.freeze({id:"renderer-type.audio",renderer:"system.audio-renderer",media:"system.audio"}),
 photo:Object.freeze({id:"renderer-type.photo",renderer:"system.photo-renderer",media:"system.photo",compatibleMedia:"system.image"}),
 video:Object.freeze({id:"renderer-type.video",renderer:"system.video-renderer",media:"system.video"})
});
function tfRendererTypeV36405(kind){
 const k=String(kind),x=TF_RENDERER_TYPES_V36405[k];
 if(!x)throw new Error("[TF:system.renderer-type:invalid-type] audio, photo, or video required.");
 return Object.freeze({...x,rendering:"system.rendering",renderer:"system.renderer",rendererType:"system.renderer-type",logical:true,automaticExecution:false,automaticRender:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});
}
function tfPredecessorNaturalizationClosureAuditV36405(sourceText){
 const s=String(sourceText||"");
 const count=(re)=>{const m=s.match(re);return m?m.length:0;};
 return Object.freeze({
  ix:Object.freeze({canonicalResidue:count(/['"]system\.ix['"]/g),classification:"compatibility-or-provenance-review",activeAuthority:false}),
  ox:Object.freeze({canonicalResidue:count(/['"]system\.ox['"]/g),classification:"historical-provenance",activeAuthority:false}),
  openAudio:Object.freeze({canonicalResidue:count(/['"]system\.open-audio['"]/g),classification:"historical-provenance",activeAuthority:false}),
  rule:"Predecessor names may remain for provenance or compatibility but do not supersede native Terraformer Systems.",
  destructiveRemovalPerformed:false
 });
}
function tfRendererTypeSelfTestV36405(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.rendering","system.renderer","system.renderer-type","system.audio-renderer","system.photo-renderer","system.video-renderer","system.audio","system.photo","system.image","system.video"])if(!ids.has(id))missing.push(id);
 for(const k of ["audio","photo","video"]){const x=tfRendererTypeV36405(k);if(x.rendererType!=="system.renderer-type"||x.automaticExecution||x.automaticRender||x.automaticPersistence||x.externalEffect||x.authorityAmplification)missing.push("renderer-type:"+k);}
 const n=ids.size;
 if(tfUniversalEngineFabricV36349(sourceText).engines.length!==n||tfCompactSystemSeedV36353(sourceText).entries.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");
 const closure=tfPredecessorNaturalizationClosureAuditV36405(sourceText);
 if(closure.ox.activeAuthority||closure.openAudio.activeAuthority||closure.ix.activeAuthority)missing.push("predecessor-authority");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Renderer Type / naturalization closure failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:1,systemsCovered:n,rendering:true,renderer:true,rendererType:true,rendererTypes:Object.freeze(Object.keys(TF_RENDERER_TYPES_V36405)),audioRenderer:true,photoRenderer:true,videoRenderer:true,predecessorClosure:closure,automaticExecution:false,automaticRender:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false,missing:0});
}
function tfTerraformerHandbookV36405(sourceText){
 const prior=tfTerraformerHandbookV36404(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText),chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));
 return Object.freeze({...prior,id:"terraformer::handbook::v0.36.405",version:"0.36.405",systemsCovered:ids.length,canonicalSystems:ids.length,chapters:Object.freeze(chapters),completeCanonicalSystemCoverage:chapters.length===ids.length,includesRendererType:true,rendererType:Object.freeze({system:"system.renderer-type",types:TF_RENDERER_TYPES_V36405,relationships:TF_RENDERER_TYPE_RELATIONSHIPS_V36405}),predecessorNaturalizationClosure:tfPredecessorNaturalizationClosureAuditV36405(sourceText)});
}
globalThis.TF_RENDERER_TYPE_SYSTEMS_V36405=TF_RENDERER_TYPE_SYSTEMS_V36405;globalThis.TF_RENDERER_TYPE_RELATIONSHIPS_V36405=TF_RENDERER_TYPE_RELATIONSHIPS_V36405;globalThis.TF_RENDERER_TYPES_V36405=TF_RENDERER_TYPES_V36405;
globalThis.tfRendererTypeV36405=tfRendererTypeV36405;globalThis.tfPredecessorNaturalizationClosureAuditV36405=tfPredecessorNaturalizationClosureAuditV36405;globalThis.tfRendererTypeSelfTestV36405=tfRendererTypeSelfTestV36405;
 return Object.freeze({TF_RENDERER_TYPE_SYSTEMS_V36405,TF_RENDERER_TYPE_RELATIONSHIPS_V36405,TF_RENDERER_TYPES_V36405,tfRendererTypeV36405,tfPredecessorNaturalizationClosureAuditV36405,tfRendererTypeSelfTestV36405,tfTerraformerHandbookV36405});
}
function bindRendererRelationshipsV04656(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36405}=deps;
 /* === Terraformer v0.36.406: Reconstructible Renderer Relationship Rules === */
const TF_RENDERER_RELATIONSHIP_RULES_V36406=Object.freeze([
 Object.freeze({id:"rule.renderer.audio",type:"renderer-relationship-rule",rendererType:"renderer-type.audio",rendering:"system.rendering",renderer:"system.audio-renderer",media:"system.audio",editing:"system.audio-editing",program:"system.audio-program",context:"system.audio-context",processor:"system.processor",engine:"system.audio-renderer::engine",service:"system.audio-renderer::service"}),
 Object.freeze({id:"rule.renderer.photo",type:"renderer-relationship-rule",rendererType:"renderer-type.photo",rendering:"system.rendering",renderer:"system.photo-renderer",media:"system.photo",compatibleMedia:"system.image",editing:"system.photo-editing",program:null,context:null,processor:"system.processor",engine:"system.photo-renderer::engine",service:"system.photo-renderer::service"}),
 Object.freeze({id:"rule.renderer.video",type:"renderer-relationship-rule",rendererType:"renderer-type.video",rendering:"system.rendering",renderer:"system.video-renderer",media:"system.video",editing:"system.video-editing",program:null,context:null,processor:"system.processor",engine:"system.video-renderer::engine",service:"system.video-renderer::service"})
]);
function tfRendererRelationshipRuleV36406(kind){
 const k=String(kind),x=TF_RENDERER_RELATIONSHIP_RULES_V36406.find(r=>r.rendererType==="renderer-type."+k);
 if(!x)throw new Error("[TF:system.rule:invalid-renderer-rule] audio, photo, or video required.");
 return x;
}
function tfReconstructRendererRelationshipsV36406(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText));
 return Object.freeze(TF_RENDERER_RELATIONSHIP_RULES_V36406.map(rule=>{
  const endpoints=[rule.rendering,rule.renderer,rule.media,rule.editing,rule.processor].concat(rule.program?[rule.program]:[],rule.context?[rule.context]:[],rule.compatibleMedia?[rule.compatibleMedia]:[]);
  const missing=endpoints.filter(id=>!ids.has(id));
  return Object.freeze({rule:rule.id,rendererType:rule.rendererType,renderer:rule.renderer,relationships:Object.freeze([
   Object.freeze({from:rule.renderer,relation:"is-a",to:"system.renderer"}),
   Object.freeze({from:rule.renderer,relation:"has-type",to:"system.renderer-type"}),
   Object.freeze({from:rule.renderer,relation:"renders",to:rule.media}),
   Object.freeze({from:rule.renderer,relation:"uses",to:rule.editing}),
   Object.freeze({from:rule.renderer,relation:"uses",to:rule.processor}),
   Object.freeze({from:rule.renderer,relation:"has-engine",to:rule.engine}),
   Object.freeze({from:rule.renderer,relation:"has-service",to:rule.service}),
   ...(rule.program?[Object.freeze({from:rule.renderer,relation:"may-serve-program",to:rule.program})]:[]),
   ...(rule.context?[Object.freeze({from:rule.renderer,relation:"uses-context",to:rule.context})]:[]),
   ...(rule.compatibleMedia?[Object.freeze({from:rule.renderer,relation:"compatible-with",to:rule.compatibleMedia})]:[])
  ]),missing:Object.freeze(missing),logical:true,automaticExecution:false,automaticRender:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});
 }));
}
function tfRendererRelationshipSelfTestV36406(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.rule","system.relationship","system.rendering","system.renderer","system.renderer-type","system.audio-renderer","system.photo-renderer","system.video-renderer","system.audio-editing","system.photo-editing","system.video-editing","system.processor"])if(!ids.has(id))missing.push(id);
 const reconstructed=tfReconstructRendererRelationshipsV36406(sourceText);
 for(const x of reconstructed){if(x.missing.length)missing.push(...x.missing);if(x.automaticExecution||x.automaticRender||x.automaticPersistence||x.externalEffect||x.authorityAmplification)missing.push("boundary:"+x.renderer);if(!x.relationships.some(r=>r.relation==="has-engine")||!x.relationships.some(r=>r.relation==="has-service")||!x.relationships.some(r=>r.relation==="uses"&&r.to==="system.processor"))missing.push("relationship:"+x.renderer);}
 const n=ids.size;
 if(tfUniversalEngineFabricV36349(sourceText).engines.length!==n||tfCompactSystemSeedV36353(sourceText).entries.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Renderer relationship reconstruction failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:0,systemsCovered:n,rules:TF_RENDERER_RELATIONSHIP_RULES_V36406.length,reconstructibleRendererRelationships:true,audioProgramBound:true,photoProgramDeferred:true,videoProgramDeferred:true,processorBound:true,engineBound:true,serviceBound:true,automaticExecution:false,automaticRender:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false,missing:0});
}
function tfTerraformerHandbookV36406(sourceText){
 const prior=tfTerraformerHandbookV36405(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText),chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));
 return Object.freeze({...prior,id:"terraformer::handbook::v0.36.406",version:"0.36.406",systemsCovered:ids.length,canonicalSystems:ids.length,chapters:Object.freeze(chapters),completeCanonicalSystemCoverage:chapters.length===ids.length,includesReconstructibleRendererRelationships:true,rendererRelationshipRules:TF_RENDERER_RELATIONSHIP_RULES_V36406});
}
globalThis.TF_RENDERER_RELATIONSHIP_RULES_V36406=TF_RENDERER_RELATIONSHIP_RULES_V36406;globalThis.tfRendererRelationshipRuleV36406=tfRendererRelationshipRuleV36406;globalThis.tfReconstructRendererRelationshipsV36406=tfReconstructRendererRelationshipsV36406;globalThis.tfRendererRelationshipSelfTestV36406=tfRendererRelationshipSelfTestV36406;
 return Object.freeze({TF_RENDERER_RELATIONSHIP_RULES_V36406,tfRendererRelationshipRuleV36406,tfReconstructRendererRelationshipsV36406,tfRendererRelationshipSelfTestV36406,tfTerraformerHandbookV36406});
}
module.exports=Object.freeze({SYSTEM,bindRendererTypeV04655,bindRendererRelationshipsV04656});

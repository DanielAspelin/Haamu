"use strict";
const SYSTEM=Object.freeze({id:"system.rendering",concept:"Rendering",type:"process-system",automaticExecution:false,automaticRender:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
function bindEditingRenderingV04654(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36403}=deps;
 /* === Terraformer v0.36.404: Text/Code Editing + Media Rendering Fabric === */
const TF_EDITING_RENDERING_SYSTEMS_V36404=Object.freeze([
 Object.freeze({id:"system.text-editing",concept:"Text Editing",type:"editing-specialization-system",mode:"non-destructive-by-default",condition:"text-context-admitted",state:"ready"}),
 Object.freeze({id:"system.code-editing",concept:"Code Editing",type:"editing-specialization-system",mode:"non-destructive-by-default",condition:"code-context-admitted",state:"ready"}),
 Object.freeze({id:"system.rendering",concept:"Rendering",type:"process-system",mode:"logical-by-default",condition:"admission-required",state:"ready"}),
 Object.freeze({id:"system.renderer",concept:"Renderer",type:"actor-system",mode:"inert-by-default",condition:"render-context-admitted",state:"ready"}),
 Object.freeze({id:"system.video-renderer",concept:"Video Renderer",type:"renderer-specialization-system",mode:"inert-by-default",condition:"video-context-admitted",state:"ready"}),
 Object.freeze({id:"system.photo-renderer",concept:"Photo Renderer",type:"renderer-specialization-system",mode:"inert-by-default",condition:"photo-context-admitted",state:"ready"}),
 Object.freeze({id:"system.audio-renderer",concept:"Audio Renderer",type:"renderer-specialization-system",mode:"inert-by-default",condition:"audio-context-admitted",state:"ready"})
]);
const TF_EDITING_RENDERING_RELATIONSHIPS_V36404=Object.freeze([
 Object.freeze({from:"system.text-editing",relation:"is-a",to:"system.editing"}),Object.freeze({from:"system.text-editing",relation:"uses",to:"system.text"}),Object.freeze({from:"system.text-editing",relation:"performed-by",to:"system.editor"}),
 Object.freeze({from:"system.code-editing",relation:"is-a",to:"system.editing"}),Object.freeze({from:"system.code-editing",relation:"uses",to:"system.code"}),Object.freeze({from:"system.code-editing",relation:"performed-by",to:"system.editor"}),
 Object.freeze({from:"system.renderer",relation:"part-of",to:"system.rendering"}),
 Object.freeze({from:"system.video-renderer",relation:"is-a",to:"system.renderer"}),Object.freeze({from:"system.video-renderer",relation:"renders",to:"system.video"}),
 Object.freeze({from:"system.photo-renderer",relation:"is-a",to:"system.renderer"}),Object.freeze({from:"system.photo-renderer",relation:"renders",to:"system.photo"}),Object.freeze({from:"system.photo-renderer",relation:"may-render",to:"system.image"}),
 Object.freeze({from:"system.audio-renderer",relation:"is-a",to:"system.renderer"}),Object.freeze({from:"system.audio-renderer",relation:"renders",to:"system.audio"})
]);
const TF_TEXT_CODE_EDITING_CAPABILITIES_V36404=Object.freeze({
 text:Object.freeze(["insert","delete","replace","select","copy","move","format","find","replace-all","undo","redo","spell-check","structure","preview","export"]),
 code:Object.freeze(["insert","delete","replace","select","indent","outdent","comment","uncomment","find","replace-all","syntax","format","refactor-plan","diagnostic","preview","export"])
});
const TF_RENDERER_CAPABILITIES_V36404=Object.freeze({
 video:Object.freeze(["frame-compose","timeline-compose","transition-compose","effect-compose","color-compose","audio-compose","caption-compose","preview-render","final-render","export"]),
 photo:Object.freeze(["pixel-compose","layer-compose","mask-compose","transform-compose","color-compose","effect-compose","preview-render","final-render","export"]),
 audio:Object.freeze(["sample-compose","channel-compose","mix-compose","effect-compose","automation-compose","resample","preview-render","final-render","export"])
});
function tfTextCodeEditingContextV36404(kind,options={}){
 const k=String(kind),map=Object.freeze({text:Object.freeze({system:"system.text-editing",media:"system.text"}),code:Object.freeze({system:"system.code-editing",media:"system.code"})}),x=map[k];
 if(!x)throw new Error("[TF:system.editing:invalid-text-code-type] text or code required.");
 return Object.freeze({id:x.system+"::context",editing:"system.editing",editor:"system.editor",type:k,system:x.system,media:x.media,mode:String(options.mode||"non-destructive"),condition:String(options.condition||"admitted"),state:String(options.state||"idle"),capabilities:TF_TEXT_CODE_EDITING_CAPABILITIES_V36404[k],logical:true,sourceMutation:false,automaticExecution:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});
}
function tfRendererContextV36404(kind,options={}){
 const k=String(kind),map=Object.freeze({video:Object.freeze({system:"system.video-renderer",media:"system.video"}),photo:Object.freeze({system:"system.photo-renderer",media:"system.photo",compatibleMedia:"system.image"}),audio:Object.freeze({system:"system.audio-renderer",media:"system.audio"})}),x=map[k];
 if(!x)throw new Error("[TF:system.renderer:invalid-media-type] video, photo, or audio required.");
 return Object.freeze({id:x.system+"::context",rendering:"system.rendering",renderer:"system.renderer",type:k,system:x.system,media:x.media,compatibleMedia:x.compatibleMedia||null,mode:String(options.mode||"preview"),condition:String(options.condition||"admitted"),state:String(options.state||"idle"),capabilities:TF_RENDERER_CAPABILITIES_V36404[k],logical:true,sourceMutation:false,automaticExecution:false,automaticRender:false,automaticPersistence:false,deviceAccess:false,externalEffect:false,authorityAmplification:false});
}
function tfEditingRenderingSelfTestV36404(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.editing","system.editor","system.text","system.code","system.text-editing","system.code-editing","system.rendering","system.renderer","system.video-renderer","system.photo-renderer","system.audio-renderer","system.video","system.photo","system.image","system.audio"])if(!ids.has(id))missing.push(id);
 for(const k of ["text","code"]){const c=tfTextCodeEditingContextV36404(k);if(c.sourceMutation||c.automaticExecution||c.automaticPersistence||c.externalEffect||c.authorityAmplification||!c.capabilities.length)missing.push("editing-boundary:"+k);}
 for(const k of ["video","photo","audio"]){const c=tfRendererContextV36404(k);if(c.sourceMutation||c.automaticExecution||c.automaticRender||c.automaticPersistence||c.deviceAccess||c.externalEffect||c.authorityAmplification||!c.capabilities.length)missing.push("renderer-boundary:"+k);}
 const n=ids.size,engines=tfUniversalEngineFabricV36349(sourceText).engines,seed=tfCompactSystemSeedV36353(sourceText).entries;
 if(engines.length!==n||seed.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Editing/rendering specialization failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:7,systemsCovered:n,textEditing:true,codeEditing:true,rendering:true,renderer:true,videoRenderer:true,photoRenderer:true,pictureTerminologyNormalizedToPhotoAndImage:true,audioRenderer:true,sourceMutation:false,automaticExecution:false,automaticRender:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false,missing:0});
}
function tfTerraformerHandbookV36404(sourceText){
 const prior=tfTerraformerHandbookV36403(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText),chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));
 return Object.freeze({...prior,id:"terraformer::handbook::v0.36.404",version:"0.36.404",systemsCovered:ids.length,canonicalSystems:ids.length,chapters:Object.freeze(chapters),completeCanonicalSystemCoverage:chapters.length===ids.length,includesTextCodeEditing:true,includesMediaRendering:true,editingRendering:Object.freeze({systems:Object.freeze(TF_EDITING_RENDERING_SYSTEMS_V36404.map(x=>x.id)),relationships:TF_EDITING_RENDERING_RELATIONSHIPS_V36404,textCodeCapabilities:TF_TEXT_CODE_EDITING_CAPABILITIES_V36404,rendererCapabilities:TF_RENDERER_CAPABILITIES_V36404})});
}
globalThis.TF_EDITING_RENDERING_SYSTEMS_V36404=TF_EDITING_RENDERING_SYSTEMS_V36404;globalThis.TF_EDITING_RENDERING_RELATIONSHIPS_V36404=TF_EDITING_RENDERING_RELATIONSHIPS_V36404;globalThis.TF_TEXT_CODE_EDITING_CAPABILITIES_V36404=TF_TEXT_CODE_EDITING_CAPABILITIES_V36404;globalThis.TF_RENDERER_CAPABILITIES_V36404=TF_RENDERER_CAPABILITIES_V36404;
globalThis.tfTextCodeEditingContextV36404=tfTextCodeEditingContextV36404;globalThis.tfRendererContextV36404=tfRendererContextV36404;globalThis.tfEditingRenderingSelfTestV36404=tfEditingRenderingSelfTestV36404;
 return Object.freeze({TF_EDITING_RENDERING_SYSTEMS_V36404,TF_EDITING_RENDERING_RELATIONSHIPS_V36404,TF_TEXT_CODE_EDITING_CAPABILITIES_V36404,TF_RENDERER_CAPABILITIES_V36404,tfTextCodeEditingContextV36404,tfRendererContextV36404,tfEditingRenderingSelfTestV36404,tfTerraformerHandbookV36404});
}
module.exports=Object.freeze({SYSTEM,bindEditingRenderingV04654});

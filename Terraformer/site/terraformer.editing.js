"use strict";
const SYSTEM=Object.freeze({id:"system.editing",concept:"Editing",authorityGranted:false,scaffold:true});
function bindEditingV04508(){return Object.freeze({SYSTEM});}
function bindMediaEditingV04653(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalAllocationSystemizationFabricV36398,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36402}=deps;
 /* === Terraformer v0.36.403: Media Editing Specialization Fabric === */
const TF_MEDIA_EDITING_SYSTEMS_V36403=Object.freeze([
 Object.freeze({id:"system.photo-editing",concept:"Photo Editing",type:"editing-specialization-system",mode:"non-destructive-by-default",condition:"photo-context-admitted",state:"ready"}),
 Object.freeze({id:"system.audio-editing",concept:"Audio Editing",type:"editing-specialization-system",mode:"non-destructive-by-default",condition:"audio-context-admitted",state:"ready"}),
 Object.freeze({id:"system.video-editing",concept:"Video Editing",type:"editing-specialization-system",mode:"non-destructive-by-default",condition:"video-context-admitted",state:"ready"})
]);
const TF_MEDIA_EDITING_RELATIONSHIPS_V36403=Object.freeze([
 Object.freeze({from:"system.editor",relation:"part-of",to:"system.editing"}),
 Object.freeze({from:"system.photo-editing",relation:"is-a",to:"system.editing"}),Object.freeze({from:"system.photo-editing",relation:"uses",to:"system.photo"}),Object.freeze({from:"system.photo-editing",relation:"may-use",to:"system.image"}),Object.freeze({from:"system.photo-editing",relation:"performed-by",to:"system.editor"}),
 Object.freeze({from:"system.audio-editing",relation:"is-a",to:"system.editing"}),Object.freeze({from:"system.audio-editing",relation:"uses",to:"system.audio"}),Object.freeze({from:"system.audio-editing",relation:"may-use",to:"system.audio-context"}),Object.freeze({from:"system.audio-editing",relation:"performed-by",to:"system.editor"}),
 Object.freeze({from:"system.video-editing",relation:"is-a",to:"system.editing"}),Object.freeze({from:"system.video-editing",relation:"uses",to:"system.video"}),Object.freeze({from:"system.video-editing",relation:"performed-by",to:"system.editor"})
]);
const TF_MEDIA_EDITING_CAPABILITIES_V36403=Object.freeze({
 photo:Object.freeze(["crop","resize","rotate","flip","exposure","contrast","color","levels","curves","layers","masking","retouch","filter","metadata","export"]),
 audio:Object.freeze(["cut","trim","split","join","fade","gain","normalize","pan","mix","effect","automation","sample-edit","time-edit","render","export"]),
 video:Object.freeze(["cut","trim","split","join","timeline","transition","speed","transform","crop","color","audio-track","caption","effect","render","export"])
});
const TF_MEDIA_EDITING_DIMENSIONS_V36403=Object.freeze({
 types:Object.freeze(["photo","audio","video"]),
 modes:Object.freeze(["non-destructive","destructive","preview","batch","timeline","live-preview"]),
 conditions:Object.freeze(["admitted","source-ready","source-missing","read-only","resource-constrained","render-required"]),
 states:Object.freeze(["idle","loaded","editing","previewing","rendering","exporting","completed","failed","paused","halted"])
});
function tfMediaEditingContextV36403(kind,options={}){
 const k=String(kind), map=Object.freeze({photo:Object.freeze({system:"system.photo-editing",media:"system.photo"}),audio:Object.freeze({system:"system.audio-editing",media:"system.audio"}),video:Object.freeze({system:"system.video-editing",media:"system.video"})});
 const x=map[k];if(!x)throw new Error("[TF:system.editing:invalid-media-type] photo, audio, or video required.");
 const mode=String(options.mode||"non-destructive");const condition=String(options.condition||"admitted");const state=String(options.state||"idle");
 if(!TF_MEDIA_EDITING_DIMENSIONS_V36403.modes.includes(mode))throw new Error("[TF:system.editing:invalid-mode] unsupported editing mode.");
 if(!TF_MEDIA_EDITING_DIMENSIONS_V36403.conditions.includes(condition))throw new Error("[TF:system.editing:invalid-condition] unsupported editing condition.");
 if(!TF_MEDIA_EDITING_DIMENSIONS_V36403.states.includes(state))throw new Error("[TF:system.editing:invalid-state] unsupported editing state.");
 return Object.freeze({id:x.system+"::context",editing:"system.editing",editor:"system.editor",type:k,system:x.system,media:x.media,mode,condition,state,capabilities:TF_MEDIA_EDITING_CAPABILITIES_V36403[k],logical:true,sourceMutation:false,automaticExecution:false,automaticRender:false,automaticPersistence:false,deviceAccess:false,externalEffect:false,authorityAmplification:false});
}
function tfMediaEditingSelfTestV36403(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.editing","system.editor","system.photo","system.image","system.audio","system.video","system.photo-editing","system.audio-editing","system.video-editing"])if(!ids.has(id))missing.push(id);
 for(const k of TF_MEDIA_EDITING_DIMENSIONS_V36403.types){const c=tfMediaEditingContextV36403(k);if(c.type!==k||c.sourceMutation||c.automaticExecution||c.automaticRender||c.automaticPersistence||c.externalEffect||c.authorityAmplification)missing.push("boundary:"+k);if(!c.capabilities.length)missing.push("capabilities:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_MEDIA_EDITING_SYSTEMS_V36403){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 const n=ids.size;const fabrics=[tfUniversalSystemLayerFabricV36389(sourceText).layers,tfUniversalSystemDefaultsFabricV36388(sourceText).defaults,tfUniversalSpecificationFabricV36397(sourceText).specifications,tfUniversalAllocationSystemizationFabricV36398(sourceText).allocators,tfUniversalReferenceFabricV36396(sourceText).references,tfUniversalProcessCycleFabricV36395(sourceText).processes];
 if(fabrics.some(x=>x!==n))missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Media editing specialization failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:3,editingReused:true,editorReused:true,systemsCovered:n,types:TF_MEDIA_EDITING_DIMENSIONS_V36403.types,modes:TF_MEDIA_EDITING_DIMENSIONS_V36403.modes,conditions:TF_MEDIA_EDITING_DIMENSIONS_V36403.conditions,states:TF_MEDIA_EDITING_DIMENSIONS_V36403.states,photoEditing:true,audioEditing:true,videoEditing:true,sourceMutation:false,automaticExecution:false,automaticRender:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false,missing:0});
}
function tfTerraformerHandbookV36403(sourceText){
 const prior=tfTerraformerHandbookV36402(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({...prior,id:"terraformer::handbook::v0.36.403",version:"0.36.403",systemsCovered:ids.length,canonicalSystems:ids.length,completeCanonicalSystemCoverage:prior.chapters.length===ids.length,includesMediaEditing:true,mediaEditing:Object.freeze({editing:"system.editing",editor:"system.editor",specializations:Object.freeze(TF_MEDIA_EDITING_SYSTEMS_V36403.map(x=>x.id)),dimensions:TF_MEDIA_EDITING_DIMENSIONS_V36403,capabilities:TF_MEDIA_EDITING_CAPABILITIES_V36403})});
}
globalThis.TF_MEDIA_EDITING_SYSTEMS_V36403=TF_MEDIA_EDITING_SYSTEMS_V36403;globalThis.TF_MEDIA_EDITING_RELATIONSHIPS_V36403=TF_MEDIA_EDITING_RELATIONSHIPS_V36403;globalThis.TF_MEDIA_EDITING_CAPABILITIES_V36403=TF_MEDIA_EDITING_CAPABILITIES_V36403;globalThis.TF_MEDIA_EDITING_DIMENSIONS_V36403=TF_MEDIA_EDITING_DIMENSIONS_V36403;
globalThis.tfMediaEditingContextV36403=tfMediaEditingContextV36403;globalThis.tfMediaEditingSelfTestV36403=tfMediaEditingSelfTestV36403;
 return Object.freeze({TF_MEDIA_EDITING_SYSTEMS_V36403,TF_MEDIA_EDITING_RELATIONSHIPS_V36403,TF_MEDIA_EDITING_CAPABILITIES_V36403,TF_MEDIA_EDITING_DIMENSIONS_V36403,tfMediaEditingContextV36403,tfMediaEditingSelfTestV36403,tfTerraformerHandbookV36403});
}
function bindSystemEditingV04666(deps={}){
 const getSystemRegistry=()=>typeof deps.getSystemRegistry==='function'?deps.getSystemRegistry():(deps.SYSTEM_REGISTRY||{});
const TF_SYSTEM_EDIT_STATE=new Map();
const TF_SYSTEM_RUNTIME_OVERLAYS=new Map();
const TF_SYSTEM_EDIT_FIELD_POLICY=Object.freeze({protected:Object.freeze(['id','canonicalPath','authority','dependsOn','parent','schema','qualification','qualified','implementationEvidence','provenance','security','credential','token','key']),editable:Object.freeze(['name','description','rule','state','family','type','governs','capabilities','functions','integratesWith','preferences','settings','properties','attributes','configuration']),rule:'Protected identity, dependency, authority, security, provenance, implementation-evidence and qualification fields require a separate governed transition; ordinary descriptive, functional and presentation fields may be edited in the volatile workspace.'});
function tfBaseSystem(systemId){return Object.values(getSystemRegistry()).find(x=>x.id===String(systemId))||null}
function tfEffectiveSystem(systemId){const id=typeof systemId==='string'?systemId:systemId&&systemId.id;return TF_SYSTEM_RUNTIME_OVERLAYS.get(String(id))||tfBaseSystem(id)}
function tfEffectiveSystemInventory(){return Object.freeze(Object.values(getSystemRegistry()).map(x=>tfEffectiveSystem(x.id)))}
function tfSystemEditBegin(systemId){const base=tfBaseSystem(systemId);if(!base)return Object.freeze({ok:false,reason:'unknown-system'});const current=TF_SYSTEM_EDIT_STATE.get(base.id),generation=current?current.generation+1:1,effective=tfEffectiveSystem(base.id),draft=JSON.parse(JSON.stringify(effective));TF_SYSTEM_EDIT_STATE.set(base.id,{generation,base,draft,state:'EDITING',validation:null,reloads:0});return Object.freeze({ok:true,system:base.id,generation,state:'EDITING',volatile:true,effectiveSource:TF_SYSTEM_RUNTIME_OVERLAYS.has(base.id)?'runtime-overlay':'base-registry'})}
function tfSystemEditApply(systemId,patch){const x=TF_SYSTEM_EDIT_STATE.get(String(systemId));if(!x)return Object.freeze({ok:false,reason:'edit-not-open'});if(!patch||typeof patch!=='object'||Array.isArray(patch))return Object.freeze({ok:false,reason:'invalid-patch'});for(const k of Object.keys(patch))if(TF_SYSTEM_EDIT_FIELD_POLICY.protected.includes(k))return Object.freeze({ok:false,reason:'protected-field',field:k});Object.assign(x.draft,JSON.parse(JSON.stringify(patch)));x.state='MODIFIED';x.validation=null;return Object.freeze({ok:true,system:String(systemId),generation:x.generation,state:x.state,volatile:true})}
function tfSystemEditValidate(systemId){const x=TF_SYSTEM_EDIT_STATE.get(String(systemId));if(!x)return Object.freeze({ok:false,reason:'edit-not-open'});const protectedPreserved=TF_SYSTEM_EDIT_FIELD_POLICY.protected.every(k=>JSON.stringify(x.draft[k])===JSON.stringify(x.base[k])),ok=protectedPreserved&&x.draft.id===x.base.id&&x.draft.canonicalPath===x.base.canonicalPath&&typeof x.draft.name==='string'&&x.draft.name.length>0;x.validation=Object.freeze({ok,syntaxSystem:'system.language.syntax',protectedPreserved,identityPreserved:x.draft.id===x.base.id,canonicalPathPreserved:x.draft.canonicalPath===x.base.canonicalPath});x.state=ok?'VALIDATED':'INVALID';return x.validation}
function tfSystemEditReload(systemId){const id=String(systemId),x=TF_SYSTEM_EDIT_STATE.get(id);if(!x)return Object.freeze({ok:false,reason:'edit-not-open'});if(!x.validation||!x.validation.ok)return Object.freeze({ok:false,reason:'validation-required'});const overlay=Object.freeze(JSON.parse(JSON.stringify(x.draft)));TF_SYSTEM_RUNTIME_OVERLAYS.set(id,overlay);x.reloads++;x.state='RELOADED';return Object.freeze({ok:true,system:id,generation:x.generation,reloads:x.reloads,state:x.state,volatile:true,runtimeOverlayApplied:true,effectiveName:tfEffectiveSystem(id).name,persistentSourceChanged:false,qualificationInherited:false})}
function tfSystemEditRevert(systemId){const id=String(systemId),x=TF_SYSTEM_EDIT_STATE.get(id);if(!x)return Object.freeze({ok:false,reason:'edit-not-open'});TF_SYSTEM_RUNTIME_OVERLAYS.delete(id);x.draft=JSON.parse(JSON.stringify(x.base));x.validation=null;x.state='REVERTED';return Object.freeze({ok:true,system:id,generation:x.generation,state:x.state,volatile:true,runtimeOverlayRemoved:true,effectiveName:tfEffectiveSystem(id).name})}
function tfSystemEditStatus(systemId){const id=String(systemId),x=TF_SYSTEM_EDIT_STATE.get(id);return Object.freeze({system:id,editing:!!x,state:x?x.state:'BASE',generation:x?x.generation:0,runtimeOverlay:TF_SYSTEM_RUNTIME_OVERLAYS.has(id),effective:tfEffectiveSystem(id)})}
 return Object.freeze({TF_SYSTEM_EDIT_STATE,TF_SYSTEM_RUNTIME_OVERLAYS,TF_SYSTEM_EDIT_FIELD_POLICY,tfBaseSystem,tfEffectiveSystem,tfEffectiveSystemInventory,tfSystemEditBegin,tfSystemEditApply,tfSystemEditValidate,tfSystemEditReload,tfSystemEditRevert,tfSystemEditStatus});
}
module.exports=Object.freeze({bindEditingV04508,bindMediaEditingV04653,bindSystemEditingV04666});

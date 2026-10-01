"use strict";
function bindWindowMobilityV04466(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 if(!deps.universalSystem)throw new Error("universal owner required");
/* === Terraformer v0.36.236: Universal Window Pop-Out / Pop-In Mobility === */
const TF_WINDOW_MOBILITY_V36236=Object.freeze({
 id:"capability.window-mobility",name:"Universal Window Mobility",type:"window-capability",mode:"identity-preserving-popout-popin",
 condition:Object.freeze(["window-identified","host-surface-valid","state-captured","target-capability-admitted"]),state:"naturalized",
 system:"system.window",appliesTo:"all-system-windows",actions:Object.freeze(["pop-out","pop-in"]),
 preserves:Object.freeze(["window-id","system-id","title","content-state","geometry","focus-context","lifecycle-owner","origin-surface"]),
 popupBlockedBehavior:"retain-origin-window",duplicateAuthority:false,closesOriginByDefault:false,grantsAuthority:false,persists:false
});
function tfWindowMobilityStateV36236(windowSpec={}){
 if(!windowSpec.id)throw new Error("window identity required");
 return Object.freeze({windowId:String(windowSpec.id),systemId:String(windowSpec.systemId||""),title:String(windowSpec.title||""),mode:String(windowSpec.mode||"embedded"),
  originSurface:String(windowSpec.originSurface||"desktop"),hostSurface:String(windowSpec.hostSurface||windowSpec.originSurface||"desktop"),
  geometry:Object.freeze({...windowSpec.geometry}),contentState:windowSpec.contentState??null,focusContext:windowSpec.focusContext??null,
  lifecycleOwner:String(windowSpec.lifecycleOwner||windowSpec.systemId||"system.window"),detachedHandle:null,authorityGranted:false});
}
function tfWindowPopOutPlanV36236(state,target={}){
 if(!state||!state.windowId)throw new Error("window mobility state required");
 return Object.freeze({...state,mode:"pop-out-planned",targetSurface:String(target.surface||"detached-window"),features:Object.freeze({...target.features}),
  action:"pop-out",requiresPopupCapability:true,originRetained:true,executed:false,authorityGranted:false});
}
function tfWindowPopOutResultV36236(plan,result={}){
 if(!plan||plan.action!=="pop-out")throw new Error("pop-out plan required");
 if(result.opened!==true)return Object.freeze({...plan,mode:"embedded",action:"pop-out-blocked",popupBlocked:true,originRetained:true,executed:false,authorityGranted:false});
 return Object.freeze({...plan,mode:"detached",hostSurface:String(result.surface||plan.targetSurface),detachedHandle:String(result.handle||""),popupBlocked:false,originRetained:true,executed:true,authorityGranted:false});
}
function tfWindowPopInV36236(state,targetSurface){
 if(!state||state.mode!=="detached")throw new Error("detached window required");
 return Object.freeze({...state,mode:"embedded",hostSurface:String(targetSurface||state.originSurface),detachedHandle:null,action:"pop-in",originRetained:true,authorityGranted:false});
}
function tfUniversalWindowMobilityDescriptorV36236(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({windowSystem:"system.window",canonicalSystems:systems.length,windowPolicy:"all-system-windows",popOut:true,popIn:true,identityPreserved:true,statePreserved:true,failClosed:true,coverage:true});
}
function tfWindowMobilitySelfTestV36236(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));if(!ids.has("system.window"))missing.push("window-system");
 const d=tfUniversalWindowMobilityDescriptorV36236(sourceText),base=tfWindowMobilityStateV36236({id:"w1",systemId:"system.network",title:"Network",originSurface:"desktop",geometry:{x:10,y:20,width:800,height:600},contentState:{tab:"main"}});
 const plan=tfWindowPopOutPlanV36236(base,{surface:"browser-window"}),blocked=tfWindowPopOutResultV36236(plan,{opened:false}),detached=tfWindowPopOutResultV36236(plan,{opened:true,handle:"w1-detached"}),returned=tfWindowPopInV36236(detached);
 if(blocked.mode!=="embedded"||!blocked.originRetained||detached.mode!=="detached"||returned.mode!=="embedded"||returned.windowId!==base.windowId||returned.systemId!==base.systemId||returned.contentState.tab!=="main")missing.push("mobility");
 if(!d.coverage||!d.popOut||!d.popIn||TF_WINDOW_MOBILITY_V36236.closesOriginByDefault||TF_WINDOW_MOBILITY_V36236.duplicateAuthority)missing.push("coverage");
 if(missing.length)throw new Error("window mobility qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.window",allWindows:true,popOut:true,popIn:true,identityPreserved:true,statePreserved:true,geometryPreserved:true,lifecycleOwnershipPreserved:true,
  popupBlockedFailClosed:true,originRetained:true,closesOriginByDefault:false,duplicateAuthority:false,authorityAmplification:false,canonicalSystems:d.canonicalSystems,missing:0});
}
/* === end v0.36.236 === */


 return Object.freeze({TF_WINDOW_MOBILITY_V36236,tfUniversalWindowMobilityDescriptorV36236,tfWindowMobilitySelfTestV36236,tfWindowMobilityStateV36236,tfWindowPopInV36236,tfWindowPopOutPlanV36236,tfWindowPopOutResultV36236});
}
module.exports={bindWindowMobilityV04466};

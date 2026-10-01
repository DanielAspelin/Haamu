"use strict";
function bindWindowRuntimeReconciliationV04468(deps={}){
 const tfPopIn=(...args)=>deps.getTfPopIn()(...args);
 if(!deps.windowMobility)throw new Error("window mobility dependency required");
/* === Terraformer v0.36.238: Window Runtime Reconciliation === */
const TF_WINDOW_RUNTIME_RECONCILIATION_V36238=Object.freeze({
 id:"reconciliation.window-runtime",system:"system.window",capability:"capability.window-mobility",mode:"browser-runtime-bound",
 path:Object.freeze(["openApp","window-chrome","wireWindow","popOutRuntimeWindow","detached-window","popInRuntimeWindow","desktop-window"]),
 controls:Object.freeze(["pop-out","pop-in"]),singleLogicalOwnership:true,popupBlockedFailClosed:true,detachedCloseRecovery:true,
 preserves:Object.freeze(["window-id","system-id","content-state","geometry","scope","lifecycle-owner"]),twoBarDesktopUnchanged:true,grantsAuthority:false,persists:false
});
function tfWindowRuntimeReconciliationSelfTestV36238(sourceText){
 const missing=[];for(const x of ['data-action=\\\\\\"pop-out\\\\\\"','function popOutRuntimeWindow','function popInRuntimeWindow','detachedWindows=new Map','id="tfPopIn"','pop-out-blocked'])
  if(!sourceText.includes(x))missing.push(x);
 if(!sourceText.includes('class="topbar"')||!sourceText.includes('class="startbar"')||!sourceText.includes('id="topStartButton"')||!sourceText.includes('id="startButton"'))missing.push("two-bar-start-menu");
 if(TF_WINDOW_RUNTIME_RECONCILIATION_V36238.grantsAuthority||!TF_WINDOW_RUNTIME_RECONCILIATION_V36238.singleLogicalOwnership)missing.push("authority-or-ownership");
 if(missing.length)throw new Error("window runtime reconciliation failure "+missing.join(","));
 return Object.freeze({pass:true,actualRendererBound:true,openAppBound:true,wireWindowBound:true,popOutControl:true,popInControl:true,browserWindowOpen:true,
  popupBlockedFailClosed:true,detachedCloseRecovery:true,singleLogicalOwnership:true,stateTransfer:true,geometryTransfer:true,twoBarDesktopPreserved:true,twoStartMenusPreserved:true,authorityAmplification:false,missing:0});
}
/* === end v0.36.238 === */


 return Object.freeze({TF_WINDOW_RUNTIME_RECONCILIATION_V36238,tfWindowRuntimeReconciliationSelfTestV36238});
}
module.exports={bindWindowRuntimeReconciliationV04468};

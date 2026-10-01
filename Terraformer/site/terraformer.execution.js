"use strict";
const SYSTEM=Object.freeze({id:"system.execution",concept:"Execution",authorityGranted:false,effectByDefault:false});
function bindExecutionV04506(){return Object.freeze({SYSTEM});}


function bindCrossContextExecutionV04558(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.317: Cross-Context Execution & External Application Invocation === */
const TF_CROSS_CONTEXT_SYSTEMS_V36317=Object.freeze([
 Object.freeze({id:"system.execution-router",concept:"Execution Router",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"}),
 Object.freeze({id:"system.browser-worker",concept:"Browser Worker",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"}),
 Object.freeze({id:"system.node-worker",concept:"Node Worker",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"}),
 Object.freeze({id:"system.cross-render",concept:"Cross Render",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"}),
 Object.freeze({id:"system.deep-link",concept:"Deep Link",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"}),
 Object.freeze({id:"system.external-application",concept:"External Application",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"}),
 Object.freeze({id:"system.origin",concept:"Origin",type:"cross-context-system",mode:"bounded",condition:"admitted-context",state:"ready"})
]);
const TF_CROSS_CONTEXT_RELATIONSHIPS_V36317=Object.freeze([
 Object.freeze({from:"system.browser-worker",relation:"uses",to:"system.bridge"}),
 Object.freeze({from:"system.node-worker",relation:"uses",to:"system.bridge"}),
 Object.freeze({from:"system.execution-router",relation:"uses",to:"system.request"}),
 Object.freeze({from:"system.execution-router",relation:"produces",to:"system.response"}),
 Object.freeze({from:"system.cross-render",relation:"uses",to:"system.response"}),
 Object.freeze({from:"system.external-application",relation:"uses",to:"system.deep-link"}),
 Object.freeze({from:"system.telegram",relation:"type-of",to:"system.external-application"}),
 Object.freeze({from:"system.whatsapp",relation:"type-of",to:"system.external-application"})
]);
function tfExecutionBridgeRequestV36317(spec={}){
 const operation=String(spec.operation??"").trim(),requestId=String(spec.requestId??"").trim(),origin=String(spec.origin??"").trim();
 if(!operation||!requestId||!origin)throw new Error("bridge request requires operation requestId origin");
 const allow=new Set(spec.allowlist||[]);
 return Object.freeze({system:"system.execution-router",requestId,origin,operation,admitted:allow.has(operation),
  sessionValidated:spec.sessionValidated===true,capabilityNegotiated:spec.capabilityNegotiated===true,
  arbitraryCode:false,sourceExecution:false,timeoutMs:Math.max(1,Math.min(Number(spec.timeoutMs)||5000,60000)),
  cancellable:true,authorityGranted:false});
}
function tfCrossRenderResultV36317(request,result){
 if(!request?.admitted||!request?.sessionValidated||!request?.capabilityNegotiated)throw new Error("cross-render request not admitted");
 return Object.freeze({system:"system.cross-render",requestId:request.requestId,result,
  renderOnly:true,nodeAuthorityTransferred:false,browserAuthorityAmplified:false});
}
function tfExternalApplicationPlanV36317(spec={}){
 const app=String(spec.app??"").toLowerCase(),text=String(spec.text??""),target=String(spec.target??"").trim();
 const enc=encodeURIComponent(text);let https=null,deepLink=null;
 if(app==="telegram"){
  if(target){const u=target.replace(/^@/,"").replace(/[^A-Za-z0-9_]/g,"");https=`https://t.me/${u}${text?`?text=${enc}`:""}`;deepLink=`tg://resolve?domain=${u}${text?`&text=${enc}`:""}`;}
  else https=`https://t.me/share/url?url=${encodeURIComponent(String(spec.url??""))}${text?`&text=${enc}`:""}`;
 }else if(app==="whatsapp"){
  const digits=target.replace(/\D/g,"");https=`https://wa.me/${digits}${text?`?text=${enc}`:""}`;
 }else if(app==="share"){https=null;}
 else throw new Error("unsupported external application");
 return Object.freeze({system:"system.external-application",app,https,deepLink,
  webShareEligible:true,userActivationRequired:true,userConfirmationExpected:true,
  automaticNavigation:false,automaticSend:false,installationAssumed:false,successAssumed:false,
  sandboxPreserved:true,authorityGranted:false});
}
function tfExternalApplicationInvokeV36317(plan,g={}){
 const nav=g.navigator||{},win=g.window||g;
 const active=nav.userActivation?.isActive===true;
 if(!active)return Object.freeze({invoked:false,reason:"user-activation-required"});
 if(plan.app==="share"&&typeof nav.share==="function")return Object.freeze({invoked:false,reason:"share-call-requires-explicit-runtime-action",admitted:true});
 return Object.freeze({invoked:false,reason:"navigation-requires-explicit-runtime-action",admitted:!!(plan.https||plan.deepLink),target:plan.https||plan.deepLink||null});
}
function tfCrossContextSelfTestV36317(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.execution-router","system.browser-worker","system.node-worker","system.cross-render","system.deep-link","system.external-application","system.origin","system.telegram","system.whatsapp","system.bridge","system.request","system.response","system.session","system.capability"])if(!ids.has(id))missing.push(id);
 const r=tfExecutionBridgeRequestV36317({operation:"read-status",requestId:"r1",origin:"https://local.test",allowlist:["read-status"],sessionValidated:true,capabilityNegotiated:true});
 const x=tfCrossRenderResultV36317(r,{ok:true}),t=tfExternalApplicationPlanV36317({app:"telegram",target:"example",text:"hello"}),w=tfExternalApplicationPlanV36317({app:"whatsapp",target:"+358 40 123 4567",text:"hello"});
 if(!r.admitted||r.arbitraryCode||r.sourceExecution||x.nodeAuthorityTransferred||t.automaticSend||w.automaticNavigation||!t.userActivationRequired||!w.https.startsWith("https://wa.me/358401234567"))missing.push("bridge-app-boundary");
 if(missing.length)throw new Error("cross context qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:7,reusedSystems:7,bridge:true,executionRouter:true,browserWorker:true,nodeWorker:true,crossRender:true,
  telegram:true,whatsapp:true,webShare:true,arbitraryCodeExecution:false,automaticSend:false,userActivationRequired:true,
  sandboxPreserved:true,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CROSS_CONTEXT_SYSTEMS_V36317,TF_CROSS_CONTEXT_RELATIONSHIPS_V36317,tfExecutionBridgeRequestV36317,tfCrossRenderResultV36317,tfExternalApplicationPlanV36317,tfExternalApplicationInvokeV36317,tfCrossContextSelfTestV36317});
}
module.exports=Object.freeze({bindExecutionV04506,bindCrossContextExecutionV04558});

/* Terraformer v0.48.9: qualified isolated declaration migration. */
const THREAD_EXECUTION_SCHEMA='TERRAFORMER-THREAD-EXECUTION/2';

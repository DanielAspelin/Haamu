"use strict";
function bindMobileBrowserInvocationV04554(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.314: Mobile / Browser Invocation Fabric === */
const TF_MOBILE_BROWSER_SYSTEMS_V36314=Object.freeze([
 Object.freeze({id:"system.mobile",concept:"Mobile",type:"environment-system",mode:"mobile-host",condition:"mobile-platform-identified",state:"ready"}),
 Object.freeze({id:"system.android",concept:"Android",type:"platform-system",mode:"mobile-platform",condition:"android-host-identified",state:"ready"}),
 Object.freeze({id:"system.ios",concept:"iOS",type:"platform-system",mode:"mobile-platform",condition:"ios-host-identified",state:"ready"}),
 Object.freeze({id:"system.pwa",concept:"PWA",type:"browser-application-system",mode:"installable-browser-surface",condition:"browser-capabilities-identified",state:"ready"}),
 Object.freeze({id:"system.webview",concept:"WebView",type:"embedded-browser-system",mode:"native-hosted-browser-surface",condition:"native-wrapper-and-webview-identified",state:"ready"})
]);
const TF_MOBILE_BROWSER_RELATIONSHIPS_V36314=Object.freeze([
 Object.freeze({from:"system.mobile",relation:"uses",to:"system.environment"}),
 Object.freeze({from:"system.android",relation:"type-of",to:"system.mobile"}),
 Object.freeze({from:"system.ios",relation:"type-of",to:"system.mobile"}),
 Object.freeze({from:"system.browser",relation:"uses",to:"system.invocation"}),
 Object.freeze({from:"system.pwa",relation:"uses",to:"system.browser"}),
 Object.freeze({from:"system.webview",relation:"uses",to:"system.browser"}),
 Object.freeze({from:"system.android",relation:"may-use",to:"system.browser"}),
 Object.freeze({from:"system.android",relation:"may-use",to:"system.server"}),
 Object.freeze({from:"system.ios",relation:"may-use",to:"system.browser"}),
 Object.freeze({from:"system.ios",relation:"may-use",to:"system.webview"})
]);
function tfExecutionSurfaceV36314(spec={}){
 const platform=String(spec.platform??"unknown").toLowerCase();
 const browser=spec.browser===true,node=spec.node===true,nativeWrapper=spec.nativeWrapper===true;
 const mobile=platform==="android"||platform==="ios";
 let surface=node?"node-hosted":browser?"browser":"unsupported";
 if(platform==="ios"&&nativeWrapper)surface="native-webview-hosted";
 return Object.freeze({system:"system.invocation",platform,mobile,browser,node,nativeWrapper,surface,
  sharedMonolith:true,sharedSystemFabric:true,thinAdapter:true,duplicateCodebase:false,
  nodeHostCapabilities:node,browserSandbox:browser&&!node,hostPrivilegeInherited:false,
  machineCredentialsRequested:false,elevationAttempted:false,authorityGranted:false});
}
function tfBrowserInvocationPlanV36314(spec={}){
 const e=tfExecutionSurfaceV36314(spec),port=Number.isInteger(spec.port)&&spec.port>0&&spec.port<65536?spec.port:null;
 const localhost=e.node&&port?`http://127.0.0.1:${port}/`:null;
 return Object.freeze({system:"system.browser",execution:e,
  strategy:e.node?"localhost-http":e.browser?(e.nativeWrapper?"native-webview":"browser-pwa"):"unsupported",
  localhost,serverStartPlanned:e.node,automaticExternalExposure:false,loopbackOnly:e.node,
  rawNodeApisInBrowser:false,persistenceImplied:false,executionPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfMobileBrowserInvocationSelfTestV36314(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.mobile","system.android","system.ios","system.pwa","system.webview","system.browser","system.invocation","system.environment","system.http","system.server","system.web","system.localhost"])if(!ids.has(id))missing.push(id);
 const a=tfBrowserInvocationPlanV36314({platform:"android",node:true,browser:true,port:8080});
 const ib=tfBrowserInvocationPlanV36314({platform:"ios",browser:true});
 const iw=tfBrowserInvocationPlanV36314({platform:"ios",browser:true,nativeWrapper:true});
 if(a.strategy!=="localhost-http"||a.localhost!=="http://127.0.0.1:8080/"||!a.loopbackOnly||
    ib.strategy!=="browser-pwa"||iw.strategy!=="native-webview"||a.automaticExternalExposure||
    ib.rawNodeApisInBrowser||!ib.execution.sharedMonolith||ib.execution.duplicateCodebase)missing.push("mobile-browser-boundary");
 if(missing.length)throw new Error("mobile browser invocation qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:5,reusedSystems:7,android:true,ios:true,mobile:true,pwa:true,webview:true,
  singleMonolith:true,thinAdapters:true,nodeHostedAndroid:true,browserSandboxPreserved:true,iosBrowserPwa:true,iosNativeWebViewModel:true,
  loopbackOnlyForNodeHost:true,externalExposure:false,machineCredentialsNotRequested:true,authorityAmplification:false,
  executionPerformed:false,mutationPerformed:false,missing:0});
}
 return Object.freeze({TF_MOBILE_BROWSER_SYSTEMS_V36314,TF_MOBILE_BROWSER_RELATIONSHIPS_V36314,tfExecutionSurfaceV36314,tfBrowserInvocationPlanV36314,tfMobileBrowserInvocationSelfTestV36314});
}
module.exports=Object.freeze({bindMobileBrowserInvocationV04554});

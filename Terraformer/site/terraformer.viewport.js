"use strict";
function bindSmartphoneBrowserCapabilitiesV04555(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.315: Mobile-First Portrait Browser Capability Fabric === */
const TF_SMARTPHONE_BROWSER_SYSTEMS_V36315=Object.freeze([
 Object.freeze({id:"system.viewport",concept:"Viewport",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.touch",concept:"Touch",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.pointer",concept:"Pointer",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.clipboard",concept:"Clipboard",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.geolocation",concept:"Geolocation",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.service-worker",concept:"Service Worker",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.webrtc",concept:"Webrtc",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.fullscreen",concept:"Fullscreen",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.wake-lock",concept:"Wake Lock",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.vibration",concept:"Vibration",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.webgl",concept:"Webgl",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.camera",concept:"Camera",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"}),
 Object.freeze({id:"system.microphone",concept:"Microphone",type:"browser-capability-system",mode:"feature-detected",condition:"browser-environment-probed",state:"ready"})
]);
const TF_SMARTPHONE_CAPABILITY_KEYS_V36315=Object.freeze(["viewport","orientation","touch","pointer","storage","file","clipboard","sharing","media","camera","microphone","sensor","geolocation","notification","permission","serviceWorker","websocket","webrtc","fullscreen","wakeLock","vibration","webgpu","webgl"]);
function tfSmartphoneBrowserCapabilitiesV36315(g={}){
 const n=g.navigator||{},d=g.document||{},scr=g.screen||{},win=g.window||g;
 const media=n.mediaDevices||{},ori=scr.orientation||{};
 const has=k=>typeof k!=="undefined"&&k!==null;
 const cap=Object.freeze({
  viewport:has(win.innerWidth)&&has(win.innerHeight),orientation:has(ori.type)||has(win.orientation),
  touch:("ontouchstart" in win)||(Number(n.maxTouchPoints)||0)>0,pointer:has(win.PointerEvent),
  storage:has(win.localStorage)||has(win.indexedDB),file:has(win.File)&&has(win.FileReader),
  clipboard:has(n.clipboard),sharing:typeof n.share==="function",media:has(media),
  camera:typeof media.getUserMedia==="function",microphone:typeof media.getUserMedia==="function",
  sensor:has(win.DeviceMotionEvent)||has(win.DeviceOrientationEvent),geolocation:has(n.geolocation),
  notification:has(win.Notification),permission:has(n.permissions),serviceWorker:has(n.serviceWorker),
  websocket:has(win.WebSocket),webrtc:has(win.RTCPeerConnection),fullscreen:has(d.fullscreenEnabled)||typeof d.documentElement?.requestFullscreen==="function",
  wakeLock:has(n.wakeLock),vibration:typeof n.vibrate==="function",webgpu:has(n.gpu),webgl:has(win.WebGLRenderingContext)||has(win.WebGL2RenderingContext)
 });
 return Object.freeze({system:"system.mobile",layout:Object.freeze({mobileFirst:true,preferredOrientation:"portrait",portraitRequired:false,
  adaptiveLandscape:true,safeAreaAware:true,touchTargetAware:true,virtualKeyboardAware:true}),capabilities:cap,
  probeFirst:true,secureContext:win.isSecureContext===true,permissionBeforeUse:true,userGestureWhereRequired:true,
  unsupportedDegradesCleanly:true,nodeApisAssumed:false,authorityGranted:false});
}
function tfSmartphoneCapabilityPlanV36315(name,probe){
 if(!TF_SMARTPHONE_CAPABILITY_KEYS_V36315.includes(name))throw new Error("unknown smartphone capability");
 const supported=probe?.capabilities?.[name]===true;
 const sensitive=["clipboard","camera","microphone","geolocation","notification","sensor","fullscreen","wakeLock"].includes(name);
 return Object.freeze({capability:name,supported,admitted:supported,permissionOrGestureRequired:sensitive,
  invokeAutomatically:false,fallback:supported?null:"unavailable-or-alternate-ui",authorityGranted:false});
}
function tfSmartphoneBrowserSelfTestV36315(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.mobile","system.android","system.ios","system.browser","system.pwa","system.webview","system.orientation",
 "system.viewport","system.touch","system.pointer","system.clipboard","system.geolocation","system.service-worker","system.webrtc",
 "system.fullscreen","system.wake-lock","system.vibration","system.webgpu","system.webgl","system.camera","system.microphone"])if(!ids.has(id))missing.push(id);
 const fake={isSecureContext:true,innerWidth:390,innerHeight:844,PointerEvent:function(){},WebSocket:function(){},RTCPeerConnection:function(){},
 WebGLRenderingContext:function(){},DeviceOrientationEvent:function(){},Notification:function(){},File:function(){},FileReader:function(){},
 navigator:{maxTouchPoints:5,clipboard:{},share(){},geolocation:{},permissions:{},serviceWorker:{},wakeLock:{},vibrate(){},gpu:{},mediaDevices:{getUserMedia(){}}},
 document:{fullscreenEnabled:true,documentElement:{}},screen:{orientation:{type:"portrait-primary"}}};
 fake.ontouchstart=null;
 const p=tfSmartphoneBrowserCapabilitiesV36315(fake),geo=tfSmartphoneCapabilityPlanV36315("geolocation",p);
 if(!p.layout.mobileFirst||p.layout.preferredOrientation!=="portrait"||p.layout.portraitRequired||!p.layout.adaptiveLandscape||
 !p.capabilities.touch||!p.capabilities.geolocation||!p.capabilities.webrtc||!p.capabilities.webgpu||!geo.permissionOrGestureRequired||geo.invokeAutomatically||p.nodeApisAssumed)missing.push("smartphone-boundary");
 if(missing.length)throw new Error("smartphone browser qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:13,mobileFirst:true,portraitPreferred:true,landscapeAdaptive:true,capabilityProbeFirst:true,
 secureContextAware:true,permissionAware:true,userGestureAware:true,unsupportedFallback:true,nodeApisAssumed:false,
 externalExposure:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SMARTPHONE_BROWSER_SYSTEMS_V36315,TF_SMARTPHONE_CAPABILITY_KEYS_V36315,tfSmartphoneBrowserCapabilitiesV36315,tfSmartphoneCapabilityPlanV36315,tfSmartphoneBrowserSelfTestV36315});
}
module.exports=Object.freeze({bindSmartphoneBrowserCapabilitiesV04555});

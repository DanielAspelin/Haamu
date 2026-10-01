"use strict";
const SYSTEM=Object.freeze({id:"system.camera",browserCapability:true,featureDetected:true,permissionOrGestureBeforeUse:true,invokeAutomatically:false,authorityGranted:false,scaffold:false});
function bindWebMediaSupportV04569(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.328: Web Camera / Camera / Microphone / Web Audio Support Fabric === */
const TF_WEB_MEDIA_SYSTEM_V36328=Object.freeze({
 id:"system.web-camera",concept:"Web Camera",type:"browser-media-input-system",
 mode:"permission-mediated-video-capture",condition:"browser-media-capability-available",state:"ready"
});
const TF_WEB_MEDIA_RELATIONSHIPS_V36328=Object.freeze([
 Object.freeze({from:"system.web-camera",relation:"uses",to:"system.camera"}),
 Object.freeze({from:"system.web-camera",relation:"uses",to:"system.media"}),
 Object.freeze({from:"system.web-camera",relation:"may-use",to:"system.webrtc"}),
 Object.freeze({from:"system.microphone",relation:"supports",to:"system.web-audio"}),
 Object.freeze({from:"system.web-audio",relation:"supports",to:"system.microphone"}),
 Object.freeze({from:"system.camera",relation:"supports",to:"system.microphone"}),
 Object.freeze({from:"system.microphone",relation:"supports",to:"system.camera"}),
 Object.freeze({from:"system.web-camera",relation:"supports",to:"system.microphone"}),
 Object.freeze({from:"system.microphone",relation:"supports",to:"system.web-camera"}),
 Object.freeze({from:"system.camera",relation:"uses",to:"system.permission"}),
 Object.freeze({from:"system.microphone",relation:"uses",to:"system.permission"})
]);
function tfWebMediaSupportPlanV36328(spec={}){
 const video=spec.video!==false,audio=spec.audio!==false;
 return Object.freeze({systems:Object.freeze(["system.web-camera","system.camera","system.microphone","system.web-audio"]),
  videoRequested:video,audioRequested:audio,mediaConvention:"browser-media-devices-plus-web-audio",
  getUserMediaRequired:video||audio,audioContextRequired:audio,permissionRequired:video||audio,
  secureContextExpected:true,userMediationExpected:true,cameraMicrophoneMutualSupport:true,
  microphoneWebAudioMutualSupport:true,cameraAudioImplied:false,permissionBypass:false,
  captureStarted:false,audioGraphStarted:false,externalTransmission:false,persistencePerformed:false,authorityGranted:false});
}
function tfWebMediaSelfTestV36328(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.web-camera","system.camera","system.microphone","system.web-audio","system.audio","system.media","system.webrtc","system.permission"])if(!ids.has(id))missing.push(id);
 const p=tfWebMediaSupportPlanV36328({video:true,audio:true});
 if(!p.getUserMediaRequired||!p.audioContextRequired||!p.permissionRequired||!p.cameraMicrophoneMutualSupport||!p.microphoneWebAudioMutualSupport||p.cameraAudioImplied||p.permissionBypass||p.captureStarted||p.audioGraphStarted||p.externalTransmission||p.authorityGranted)missing.push("web-media-boundary");
 if(missing.length)throw new Error("web media qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:1,cameraReused:true,microphoneReused:true,webAudioReused:true,webCamera:true,
  cameraMicrophoneMutualSupport:true,microphoneWebAudioMutualSupport:true,permissionRequired:true,secureContextExpected:true,
  cameraAudioImplied:false,permissionBypass:false,captureStarted:false,audioGraphStarted:false,externalTransmission:false,
  authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_WEB_MEDIA_SYSTEM_V36328,TF_WEB_MEDIA_RELATIONSHIPS_V36328,tfWebMediaSupportPlanV36328,tfWebMediaSelfTestV36328});
}
module.exports=Object.freeze({SYSTEM,bindWebMediaSupportV04569});

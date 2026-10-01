"use strict";
function bindProgressiveMobileWebV04557(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.316: Progressive Mobile Web Capability Discovery === */
const TF_PROGRESSIVE_MOBILE_WEB_SYSTEMS_V36316=Object.freeze([
 Object.freeze({id:"system.bluetooth",concept:"Bluetooth",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.serial",concept:"Serial",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.nfc",concept:"Nfc",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.hid",concept:"Hid",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.contacts",concept:"Contacts",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.credentials",concept:"Credentials",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.battery",concept:"Battery",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.network-information",concept:"Network Information",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.badging",concept:"Badging",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.push",concept:"Push",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.payment",concept:"Payment",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.screen-capture",concept:"Screen Capture",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.web-authentication",concept:"Web Authentication",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.web-transport",concept:"Web Transport",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.web-codecs",concept:"Web Codecs",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.web-xr",concept:"Web Xr",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.virtual-keyboard",concept:"Virtual Keyboard",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.file-system",concept:"File System",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.media-session",concept:"Media Session",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"}),
 Object.freeze({id:"system.media-capabilities",concept:"Media Capabilities",type:"browser-capability-system",mode:"progressive-feature-detection",condition:"browser-api-exposed",state:"ready"})
]);
const TF_PROGRESSIVE_MOBILE_WEB_PROBES_V36316=Object.freeze({
 bluetooth:["navigator","bluetooth"],usb:["navigator","usb"],serial:["navigator","serial"],nfc:["window","NDEFReader"],hid:["navigator","hid"],
 contacts:["navigator","contacts"],credentials:["navigator","credentials"],battery:["navigator","getBattery"],networkInformation:["navigator","connection"],
 badging:["navigator","setAppBadge"],push:["window","PushManager"],payment:["window","PaymentRequest"],presentation:["navigator","presentation"],
 screenCapture:["navigator","mediaDevices","getDisplayMedia"],webAuthentication:["window","PublicKeyCredential"],webTransport:["window","WebTransport"],
 webCodecs:["window","VideoEncoder"],webXR:["navigator","xr"],virtualKeyboard:["navigator","virtualKeyboard"],fileSystem:["window","showOpenFilePicker"],
 mediaSession:["navigator","mediaSession"],mediaCapabilities:["navigator","mediaCapabilities"],locks:["navigator","locks"],storageManager:["navigator","storage"],
 broadcastChannel:["window","BroadcastChannel"],sharedWorker:["window","SharedWorker"],worker:["window","Worker"],wasm:["window","WebAssembly"],
 crypto:["window","crypto"],speechRecognition:["window","SpeechRecognition"],speechSynthesis:["window","speechSynthesis"],
 pictureInPicture:["document","pictureInPictureEnabled"],gamepad:["navigator","getGamepads"],deviceMemory:["navigator","deviceMemory"],
 hardwareConcurrency:["navigator","hardwareConcurrency"],connection:["navigator","connection"]
});
function tfResolveBrowserPathV36316(g,path){
 let o=path[0]==="navigator"?(g.navigator||{}):path[0]==="document"?(g.document||{}):(g.window||g);
 for(let i=1;i<path.length;i++){if(o==null||!(path[i] in Object(o)))return false;o=o[path[i]];}
 return o!==undefined&&o!==null;
}
function tfProgressiveMobileWebDiscoveryV36316(g={}){
 const exposed={};for(const [name,path] of Object.entries(TF_PROGRESSIVE_MOBILE_WEB_PROBES_V36316))exposed[name]=tfResolveBrowserPathV36316(g,path);
 const nav=g.navigator||{},win=g.window||g;
 const enumerable=Object.freeze({navigator:Object.freeze(Object.getOwnPropertyNames(Object.getPrototypeOf(nav)||{}).sort()),
  window:Object.freeze(Object.getOwnPropertyNames(win).filter(k=>/^(webkit|moz|ms|chrome|safari)/i.test(k)).sort())});
 return Object.freeze({system:"system.browser",platform:String(nav.userAgentData?.platform||nav.platform||"unknown"),
  secureContext:win.isSecureContext===true,exposed:Object.freeze(exposed),vendorSurface:enumerable,
  progressiveDiscovery:true,readOnlyDiscovery:true,invokeDuringDiscovery:false,permissionPromptDuringDiscovery:false,
  sandboxEscapeAttempted:false,nativePrivateApiAssumed:false,unsupportedIsCapability:false,authorityGranted:false});
}
function tfMobileWebAdmissionV36316(name,discovery){
 if(!(name in (discovery?.exposed||{})))throw new Error("unknown discovered capability");
 const exposed=discovery.exposed[name]===true;
 const powerful=["bluetooth","usb","serial","nfc","hid","contacts","credentials","push","payment","screenCapture","webAuthentication","webXR","fileSystem"].includes(name);
 return Object.freeze({name,exposed,admitted:exposed,secureContext:discovery.secureContext===true,powerful,
  userMediationRequired:powerful,automaticInvocation:false,sandboxPreserved:true,authorityGranted:false});
}
function tfProgressiveMobileWebSelfTestV36316(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of TF_PROGRESSIVE_MOBILE_WEB_SYSTEMS_V36316.map(x=>x.id))if(!ids.has(id))missing.push(id);
 const fake={isSecureContext:true,navigator:{platform:"Android",bluetooth:{},usb:{},serial:{},contacts:{},credentials:{},connection:{},mediaDevices:{getDisplayMedia(){}},xr:{},virtualKeyboard:{},storage:{},mediaSession:{},mediaCapabilities:{},locks:{},getBattery(){},setAppBadge(){},getGamepads(){}},window:null,document:{pictureInPictureEnabled:true}};fake.window=fake;
 fake.NDEFReader=function(){};fake.PublicKeyCredential=function(){};fake.WebTransport=function(){};fake.VideoEncoder=function(){};fake.PushManager=function(){};fake.PaymentRequest=function(){};fake.showOpenFilePicker=function(){};fake.Worker=function(){};fake.WebAssembly={};fake.crypto={};
 const d=tfProgressiveMobileWebDiscoveryV36316(fake),bt=tfMobileWebAdmissionV36316("bluetooth",d);
 if(!d.progressiveDiscovery||!d.readOnlyDiscovery||d.invokeDuringDiscovery||d.permissionPromptDuringDiscovery||d.sandboxEscapeAttempted||!d.exposed.bluetooth||!d.exposed.webTransport||!bt.userMediationRequired||bt.automaticInvocation)missing.push("progressive-boundary");
 if(missing.length)throw new Error("progressive mobile web qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:20,probeFamilies:Object.keys(TF_PROGRESSIVE_MOBILE_WEB_PROBES_V36316).length,
  progressiveDiscovery:true,vendorSurfaceDiscovery:true,readOnlyDiscovery:true,permissionPromptDuringDiscovery:false,
  invokeDuringDiscovery:false,sandboxPreserved:true,nativePrivateApiAssumed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_PROGRESSIVE_MOBILE_WEB_SYSTEMS_V36316,TF_PROGRESSIVE_MOBILE_WEB_PROBES_V36316,tfResolveBrowserPathV36316,tfProgressiveMobileWebDiscoveryV36316,tfMobileWebAdmissionV36316,tfProgressiveMobileWebSelfTestV36316});
}
module.exports=Object.freeze({bindProgressiveMobileWebV04557});

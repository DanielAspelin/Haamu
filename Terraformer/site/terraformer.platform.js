"use strict";
const SYSTEM=Object.freeze({id:"system.platform",concept:"Platform",type:"platform-system",authorityGranted:false});
function bindMetaVirtualPlatformV0462(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.361: Meta Platform / Virtual Platform Fabric === */
const TF_META_VIRTUAL_PLATFORM_SYSTEMS_V36361=Object.freeze([
 Object.freeze({id:"system.meta-platform",concept:"Meta Platform",type:"platform-coordination-meta-system",mode:"platform-about-platform",condition:"platform-context-admitted",state:"ready"}),
 Object.freeze({id:"system.virtual-platform",concept:"Virtual Platform",type:"virtualized-platform-abstraction-system",mode:"virtual-platform-representation",condition:"virtualization-context-admitted",state:"ready"})
]);
const TF_META_VIRTUAL_PLATFORM_RELATIONSHIPS_V36361=Object.freeze([
 Object.freeze({from:"system.meta-platform",relation:"uses",to:"system.platform"}),
 Object.freeze({from:"system.meta-platform",relation:"uses",to:"system.context"}),
 Object.freeze({from:"system.virtual-platform",relation:"uses",to:"system.platform"}),
 Object.freeze({from:"system.virtual-platform",relation:"may-use",to:"system.virtualization"}),
 Object.freeze({from:"system.virtual-platform",relation:"may-host-context-for",to:"system.virtual-machine"}),
 Object.freeze({from:"system.virtual-platform",relation:"distinct-from",to:"system.hypervisor"}),
 Object.freeze({from:"system.meta-platform",relation:"distinct-from",to:"system.virtual-platform"})
]);
function tfPlatformContextPlanV36361(kind,spec={}){
 const k=String(kind??"").toLowerCase(),id=k==="meta"||k==="meta-platform"?"system.meta-platform":k==="virtual"||k==="virtual-platform"?"system.virtual-platform":null;
 if(!id)throw new Error("[TF:system.platform:invalid-input] Meta Platform or Virtual Platform required.");
 return Object.freeze({system:id,platform:"system.platform",context:"system.context",subject:spec.subject??null,platforms:Object.freeze([...(spec.platforms||[])]),
  planOnly:true,hypervisorLaunch:false,virtualMachineLaunch:false,hostMutation:false,networkMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfMetaVirtualPlatformSelfTestV36361(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=["system.meta-platform","system.virtual-platform"];
 for(const id of [...added,"system.platform","system.virtualization","system.virtual-machine","system.hypervisor","system.context","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["meta-platform","virtual-platform"]){const p=tfPlatformContextPlanV36361(k,{platforms:["fixture"]});if(!p.planOnly||p.hypervisorLaunch||p.virtualMachineLaunch||p.hostMutation||p.networkMutation||p.persistencePerformed||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Meta / Virtual Platform qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,platformReused:true,virtualizationReused:true,virtualMachineReused:true,hypervisorReused:true,
  metaPlatform:true,virtualPlatform:true,distinct:true,systemsWithEngines:2,systemsWithServices:2,systemsInCompactSeed:2,systemsWithActiveSummaries:2,
  hypervisorLaunch:false,virtualMachineLaunch:false,hostMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_META_VIRTUAL_PLATFORM_SYSTEMS_V36361=TF_META_VIRTUAL_PLATFORM_SYSTEMS_V36361;
globalThis.TF_META_VIRTUAL_PLATFORM_RELATIONSHIPS_V36361=TF_META_VIRTUAL_PLATFORM_RELATIONSHIPS_V36361;
globalThis.tfPlatformContextPlanV36361=tfPlatformContextPlanV36361;
 return Object.freeze({SYSTEM,TF_META_VIRTUAL_PLATFORM_SYSTEMS_V36361,TF_META_VIRTUAL_PLATFORM_RELATIONSHIPS_V36361,tfPlatformContextPlanV36361,tfMetaVirtualPlatformSelfTestV36361});
}

const PLATFORM_TYPE_DENIED=Object.freeze(["shell","root","elevation","package-management","filesystem-mutation","device-access","persistence","deployment"]);
const PLATFORM_TYPES=Object.freeze({
 "windows":Object.freeze({id:"platform.windows",name:"windows",type:"desktop-operating-system",parent:null,physicalOwner:"terraformer.platform.js"}),
 "macos":Object.freeze({id:"platform.macos",name:"macos",type:"desktop-operating-system",parent:null,physicalOwner:"terraformer.platform.js"}),
 "ios":Object.freeze({id:"platform.ios",name:"ios",type:"smartphone-operating-system",parent:null,physicalOwner:"terraformer.platform.js"}),
 "android":Object.freeze({id:"platform.android",name:"android",type:"smartphone-operating-system",parent:null,physicalOwner:"terraformer.platform.js"}),
 "debian":Object.freeze({id:"platform.debian",name:"debian",type:"linux-distribution",parent:"linux",physicalOwner:"terraformer.platform.js"}),
 "fedora":Object.freeze({id:"platform.fedora",name:"fedora",type:"linux-distribution",parent:"linux",physicalOwner:"terraformer.platform.js"})
});
function platformType(name){return PLATFORM_TYPES[String(name||"").trim().toLowerCase()]||null;}
function describePlatformType(name,facts={}){const t=platformType(name);if(!t)return null;return Object.freeze({...t,release:String(facts.release||""),kernel:String(facts.kernel||""),authority:false});}
function admitPlatformType(name,facts={}){const descriptor=describePlatformType(name,facts);return Object.freeze(descriptor?{pass:true,descriptor,denied:PLATFORM_TYPE_DENIED}:{pass:false,reason:"UNKNOWN_PLATFORM_TYPE",denied:PLATFORM_TYPE_DENIED});}
function authorizePlatformType(){return Object.freeze({pass:false,reason:"PLATFORM_DETECTION_IS_NOT_OPERATIONAL_AUTHORITY"});}

const TERRAFORMER_WINDOWS_SYSTEM=Object.freeze({schema:'TERRAFORMER-HOST-PLATFORM-SYSTEM/1',id:'system.platform.windows',name:'Windows System',parent:'system.microsoft',common:'system.common',platform:'win32',family:'desktop-host',scope:'local',role:'client',native:Object.freeze(['UAC','PowerShell','Windows services','Win32 filesystem','URI shell']),packaging:Object.freeze(['executable','MSI/MSIX boundary']),authority:'Windows OS'});

const TERRAFORMER_MACOS_SYSTEM=Object.freeze({schema:'TERRAFORMER-HOST-PLATFORM-SYSTEM/1',id:'system.platform.macos',name:'macOS System',parent:'system.apple',common:'system.common',platform:'darwin',family:'desktop-host',scope:'local',role:'client',native:Object.freeze(['administrator authorization','AppleScript integration','launchd','POSIX filesystem','URI open']),packaging:Object.freeze(['app bundle','pkg/dmg boundary']),authority:'macOS'});

const TERRAFORMER_DEBIAN_SYSTEM=Object.freeze({schema:'TERRAFORMER-HOST-PLATFORM-SYSTEM/1',id:'system.platform.debian',name:'Debian System',parent:'system.linux',common:'system.common',platform:'linux',distribution:'debian',family:'desktop-host',scope:'local',role:'client',native:Object.freeze(['PolicyKit/pkexec','sudo','systemd','POSIX filesystem','xdg-open']),packaging:Object.freeze(['deb boundary']),authority:'Debian OS'});

const TERRAFORMER_FEDORA_SYSTEM=Object.freeze({schema:'TERRAFORMER-HOST-PLATFORM-SYSTEM/1',id:'system.platform.fedora',name:'Fedora System',parent:'system.linux',common:'system.common',platform:'linux',distribution:'fedora',family:'desktop-host',scope:'local',role:'client',native:Object.freeze(['PolicyKit/pkexec','sudo','systemd','POSIX filesystem','xdg-open']),packaging:Object.freeze(['rpm boundary']),authority:'Fedora OS'});

const TERRAFORMER_MOBILE_BROWSER_PLATFORM_SYSTEM=Object.freeze({schema:'TERRAFORMER-MOBILE-BROWSER-PLATFORM-SYSTEM/1',id:'system.mobile-browser-platform',name:'Mobile Browser Platform Detection System',family:'presentation-detection',type:'browser-platform-classification',state:'integrated',platforms:Object.freeze(['android','ios-ipados','other-mobile','non-mobile','unknown']),signals:Object.freeze(['navigator.userAgentData.mobile','navigator.userAgentData.platform','navigator.platform','navigator.userAgent','navigator.maxTouchPoints']),rule:'Platform detection identifies browser host platform only; viewport/media state independently determines page class and orientation.',authority:'classification-only'});

module.exports=Object.freeze({PLATFORM_TYPE_DENIED,PLATFORM_TYPES,platformType,describePlatformType,admitPlatformType,authorizePlatformType,SYSTEM,bindMetaVirtualPlatformV0462,TERRAFORMER_WINDOWS_SYSTEM,TERRAFORMER_MACOS_SYSTEM,TERRAFORMER_DEBIAN_SYSTEM,TERRAFORMER_FEDORA_SYSTEM,TERRAFORMER_MOBILE_BROWSER_PLATFORM_SYSTEM});

const PLATFORM_PROJECTION_V04784=Object.freeze({
 schema:"TERRAFORMER-PLATFORM-PROJECTION/1",version:"0.47.84",
 construction:Object.freeze({role:"private-internal-foundation",precedes:"system.system",privacy:"PRIVATE",publicity:"NOT_IMPLIED"}),
 delivery:Object.freeze({role:"explicit-target-platform",follows:"system.program",privacy:"ORTHOGONAL",publicity:"ORTHOGONAL"}),
 duplicatePlatformSystem:false,authorityGranted:false,automaticDelivery:false,automaticPublication:false
});
function planTargetDeliveryV04784(program,targetPlatform,classification={}){
 if(!program||!targetPlatform)throw Error("PROGRAM_AND_TARGET_PLATFORM_REQUIRED");
 return Object.freeze({program:String(program),targetPlatform:String(targetPlatform),
  privacy:classification.privacy??"UNRESOLVED",publicity:classification.publicity??"UNRESOLVED",
  explicitTarget:true,planOnly:true,deliveryPerformed:false,publicationPerformed:false,authorityGranted:false,
  requires:Object.freeze(["compatibility","security","privacy-publicity","qualification","release"])});
}
module.exports=Object.freeze({...module.exports,PLATFORM_PROJECTION_V04784,planTargetDeliveryV04784});

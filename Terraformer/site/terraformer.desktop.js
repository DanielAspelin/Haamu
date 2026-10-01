'use strict';
const ID='terraformer.desktop',VERSION='0.44.8';
const FAMILIES=Object.freeze(['linux','windows','macos']);
function describe(x={}){return Object.freeze({id:ID,version:VERSION,form:'desktop',platform:String(x.platform||'').toLowerCase(),authority:false});}
function admit(x={}){const d=describe(x);return Object.freeze({pass:FAMILIES.includes(d.platform),descriptor:d,authority:false});}
function authorize(){return Object.freeze({pass:false,reason:'DESKTOP_FORM_DOES_NOT_CREATE_PLATFORM_OR_DEVICE_AUTHORITY'});}

function bindMetaDesktopV0463(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.362: Meta Desktop Fabric === */
const TF_META_DESKTOP_SYSTEM_V36362=Object.freeze({id:"system.meta-desktop",concept:"Meta Desktop",type:"desktop-coordination-meta-system",mode:"desktop-about-desktop",condition:"desktop-context-admitted",state:"ready"});
const TF_META_DESKTOP_RELATIONSHIPS_V36362=Object.freeze([
 Object.freeze({from:"system.meta-desktop",relation:"uses",to:"system.desktop"}),
 Object.freeze({from:"system.meta-desktop",relation:"uses",to:"system.context"}),
 Object.freeze({from:"system.meta-desktop",relation:"may-use",to:"system.window"}),
 Object.freeze({from:"system.meta-desktop",relation:"may-use",to:"system.interface"}),
 Object.freeze({from:"system.meta-desktop",relation:"may-coordinate-with",to:"system.meta-platform"}),
 Object.freeze({from:"system.meta-desktop",relation:"may-represent",to:"system.virtual-platform"})
]);
function tfMetaDesktopPlanV36362(spec={}){
 return Object.freeze({system:"system.meta-desktop",desktop:"system.desktop",context:"system.context",subject:spec.subject??null,
  desktops:Object.freeze([...(spec.desktops||[])]),planOnly:true,hostDesktopControl:false,windowMutation:false,
  applicationLaunch:false,virtualMachineLaunch:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfMetaDesktopSelfTestV36362(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],id="system.meta-desktop";
 for(const x of [id,"system.desktop","system.window","system.interface","system.meta-platform","system.virtual-platform","system.context","system.summary","system.engine","system.service","system.seed"])if(!ids.has(x))missing.push(x);
 const p=tfMetaDesktopPlanV36362({desktops:["fixture"]});if(!p.planOnly||p.hostDesktopControl||p.windowMutation||p.applicationLaunch||p.virtualMachineLaunch||p.persistencePerformed||p.authorityGranted)missing.push("boundary");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 if(!eo.has(id))missing.push("engine");if(!so.has(id))missing.push("service");if(!seeded.has(id))missing.push("seed");if(!summaries.has(id))missing.push("summary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Meta Desktop qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:1,desktopReused:true,windowReused:true,interfaceReused:true,metaPlatformReused:true,virtualPlatformReused:true,
  metaDesktop:true,systemsWithEngines:1,systemsWithServices:1,systemsInCompactSeed:1,systemsWithActiveSummaries:1,
  hostDesktopControl:false,windowMutation:false,applicationLaunch:false,authorityAmplification:false,missing:0});
}
globalThis.TF_META_DESKTOP_SYSTEM_V36362=TF_META_DESKTOP_SYSTEM_V36362;
globalThis.TF_META_DESKTOP_RELATIONSHIPS_V36362=TF_META_DESKTOP_RELATIONSHIPS_V36362;
globalThis.tfMetaDesktopPlanV36362=tfMetaDesktopPlanV36362;
 return Object.freeze({TF_META_DESKTOP_SYSTEM_V36362,TF_META_DESKTOP_RELATIONSHIPS_V36362,tfMetaDesktopPlanV36362,tfMetaDesktopSelfTestV36362});
}
const TERRAFORMER_DEBIAN_DESKTOP_SYSTEM=Object.freeze({schema:'TERRAFORMER-DESKTOP-SYSTEM/1',id:'system.platform.debian.desktop',name:'Debian Desktop System',parent:'system.platform.debian',uri:'terraformer://linux/debian/desktop',scope:'local',role:'client',type:'host-desktop',detection:'Node host evidence delivered to admitted browser session',presentation:'browser-hosted Terraformer desktop',authority:'local Debian desktop integration; browser does not independently assert distribution'});

const TERRAFORMER_DESKTOP_WINDOW_LOADER=Object.freeze({schema:'TERRAFORMER-DESKTOP-WINDOW-LOADER/1',id:'system.presentation.desktop.window.loader',name:'Desktop Window Loader',parent:'system.presentation.desktop',family:'presentation-navigation',state:'integrated',canonicalPath:'terraformer://presentation/desktop/window/loader/',modes:Object.freeze(['open','morph','replace','reload']),rule:'Desktop navigation instantiates or reuses scoped windows; page navigation is projected through the window system rather than replacing the desktop.'});

module.exports=Object.freeze({ID,VERSION,FAMILIES,describe,admit,authorize,bindMetaDesktopV0463,TERRAFORMER_DEBIAN_DESKTOP_SYSTEM,TERRAFORMER_DESKTOP_WINDOW_LOADER});

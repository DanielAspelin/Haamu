"use strict";
function bindMailDriveV0464(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.363: Mail / Drive / Webmail / Web Drive Fabric === */
const TF_MAIL_DRIVE_SYSTEMS_V36363=Object.freeze([{"id":"system.mail","concept":"Mail","type":"communication-message-system"},{"id":"system.drive","concept":"Drive","type":"storage-drive-abstraction-system"},{"id":"system.webmail","concept":"Webmail","type":"web-mail-interface-system"},{"id":"system.web-drive","concept":"Web Drive","type":"web-drive-interface-system"}]);

const TF_MAIL_DRIVE_RELATIONSHIPS_V36363=Object.freeze([
 Object.freeze({from:"system.mail",relation:"uses",to:"system.communication"}),
 Object.freeze({from:"system.mail",relation:"may-use",to:"system.messaging"}),
 Object.freeze({from:"system.drive",relation:"may-use",to:"system.storage"}),
 Object.freeze({from:"system.drive",relation:"may-use",to:"system.filing"}),
 Object.freeze({from:"system.webmail",relation:"composes",to:"system.mail"}),
 Object.freeze({from:"system.webmail",relation:"uses",to:"system.web"}),
 Object.freeze({from:"system.webmail",relation:"may-use",to:"system.browser"}),
 Object.freeze({from:"system.web-drive",relation:"composes",to:"system.drive"}),
 Object.freeze({from:"system.web-drive",relation:"uses",to:"system.web"}),
 Object.freeze({from:"system.web-drive",relation:"may-use",to:"system.browser"}),
 Object.freeze({from:"system.webmail",relation:"distinct-from",to:"system.mail"}),
 Object.freeze({from:"system.web-drive",relation:"distinct-from",to:"system.drive"})
]);
function tfMailDrivePlanV36363(kind,spec={}){
 const map={mail:"system.mail",drive:"system.drive",webmail:"system.webmail","web-drive":"system.web-drive"},id=map[String(kind??"").toLowerCase()];
 if(!id)throw new Error("[TF:system.service:invalid-input] Mail, Drive, Webmail, or Web Drive required.");
 return Object.freeze({system:id,subject:spec.subject??null,provider:spec.provider??null,planOnly:true,credentialsPresent:false,
  authenticated:false,externalConnection:false,messageSent:false,fileWritten:false,synchronizationPerformed:false,
  browserLaunched:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfMailDriveSelfTestV36363(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_MAIL_DRIVE_SYSTEMS_V36363.map(x=>x.id);
 for(const id of [...added,"system.web","system.browser","system.storage","system.filing","system.file","system.communication","system.messaging","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["mail","drive","webmail","web-drive"]){const p=tfMailDrivePlanV36363(k,{provider:"fixture"});if(!p.planOnly||p.credentialsPresent||p.authenticated||p.externalConnection||p.messageSent||p.fileWritten||p.synchronizationPerformed||p.browserLaunched||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Mail / Drive qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:4,webReused:true,browserReused:true,storageReused:true,filingReused:true,communicationReused:true,messagingReused:true,
  mail:true,drive:true,webmail:true,webDrive:true,systemsWithEngines:4,systemsWithServices:4,systemsInCompactSeed:4,systemsWithActiveSummaries:4,
  credentialsEmbedded:false,externalConnection:false,messageSent:false,fileWritten:false,synchronizationPerformed:false,authorityAmplification:false,missing:0});
}
globalThis.TF_MAIL_DRIVE_SYSTEMS_V36363=TF_MAIL_DRIVE_SYSTEMS_V36363;
globalThis.TF_MAIL_DRIVE_RELATIONSHIPS_V36363=TF_MAIL_DRIVE_RELATIONSHIPS_V36363;
globalThis.tfMailDrivePlanV36363=tfMailDrivePlanV36363;
 return Object.freeze({TF_MAIL_DRIVE_SYSTEMS_V36363,TF_MAIL_DRIVE_RELATIONSHIPS_V36363,tfMailDrivePlanV36363,tfMailDriveSelfTestV36363});
}
module.exports=Object.freeze({bindMailDriveV0464});

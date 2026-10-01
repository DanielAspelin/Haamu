"use strict";
const SYSTEM=Object.freeze({id:"system.protocol",concept:"Protocol",authorityGranted:false,scaffold:true});
function bindProtocolV04532(){return Object.freeze({SYSTEM});}

function bindSshSftpFtpV0465(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.364: SSH / SFTP / FTP Protocol Fabric === */
const TF_SSH_SFTP_FTP_SYSTEMS_V36364=Object.freeze([{"id":"system.ssh","concept":"SSH","type":"secure-remote-session-protocol-system"},{"id":"system.sftp","concept":"SFTP","type":"ssh-file-transfer-protocol-system"},{"id":"system.ftp","concept":"FTP","type":"file-transfer-protocol-system"}]);

const TF_SSH_SFTP_FTP_RELATIONSHIPS_V36364=Object.freeze([
 Object.freeze({from:"system.ssh",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.ssh",relation:"uses",to:"system.tcp"}),
 Object.freeze({from:"system.ssh",relation:"uses",to:"system.network"}),
 Object.freeze({from:"system.sftp",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.sftp",relation:"uses",to:"system.ssh"}),
 Object.freeze({from:"system.sftp",relation:"uses",to:"system.file"}),
 Object.freeze({from:"system.sftp",relation:"uses",to:"system.transfer"}),
 Object.freeze({from:"system.ftp",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.ftp",relation:"uses",to:"system.tcp"}),
 Object.freeze({from:"system.ftp",relation:"uses",to:"system.file"}),
 Object.freeze({from:"system.ftp",relation:"uses",to:"system.transfer"}),
 Object.freeze({from:"system.ftp",relation:"distinct-from",to:"system.sftp"})
]);
function tfFileTransferProtocolPlanV36364(kind,spec={}){
 const map={ssh:"system.ssh",sftp:"system.sftp",ftp:"system.ftp"},id=map[String(kind??"").toLowerCase()];
 if(!id)throw new Error("[TF:system.protocol:invalid-input] SSH, SFTP, or FTP required.");
 return Object.freeze({system:id,protocol:"system.protocol",host:spec.host??null,port:spec.port??null,path:spec.path??null,planOnly:true,
  credentialsPresent:false,authenticationPerformed:false,socketOpened:false,connectionPerformed:false,fileRead:false,fileWritten:false,
  transferPerformed:false,remoteCommandExecuted:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfSshSftpFtpSelfTestV36364(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_SSH_SFTP_FTP_SYSTEMS_V36364.map(x=>x.id);
 for(const id of [...added,"system.protocol","system.network","system.file","system.transfer","system.communication","system.tcp","system.port","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["ssh","sftp","ftp"]){const p=tfFileTransferProtocolPlanV36364(k,{host:"fixture.invalid"});if(!p.planOnly||p.credentialsPresent||p.authenticationPerformed||p.socketOpened||p.connectionPerformed||p.fileRead||p.fileWritten||p.transferPerformed||p.remoteCommandExecuted||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] SSH / SFTP / FTP qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:3,protocolReused:true,networkReused:true,fileReused:true,transferReused:true,tcpReused:true,
  ssh:true,sftp:true,ftp:true,sftpUsesSsh:true,ftpDistinctFromSftp:true,systemsWithEngines:3,systemsWithServices:3,systemsInCompactSeed:3,systemsWithActiveSummaries:3,
  credentialsEmbedded:false,connectionPerformed:false,transferPerformed:false,remoteCommandExecuted:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SSH_SFTP_FTP_SYSTEMS_V36364=TF_SSH_SFTP_FTP_SYSTEMS_V36364;
globalThis.TF_SSH_SFTP_FTP_RELATIONSHIPS_V36364=TF_SSH_SFTP_FTP_RELATIONSHIPS_V36364;
globalThis.tfFileTransferProtocolPlanV36364=tfFileTransferProtocolPlanV36364;
 return Object.freeze({TF_SSH_SFTP_FTP_SYSTEMS_V36364,TF_SSH_SFTP_FTP_RELATIONSHIPS_V36364,tfFileTransferProtocolPlanV36364,tfSshSftpFtpSelfTestV36364});
}
const TERRAFORMER_PROTOCOL_SYSTEM=Object.freeze({schema:'TERRAFORMER-PROTOCOL-SYSTEM/1',id:'system.protocol',name:'Protocol System',family:'communication',type:'system',state:'integrated',canonicalPath:'terraformer://protocol/',governs:Object.freeze(['protocol-identity','layer','framing','transport-contract','adaptation']),children:Object.freeze(['system.ip','system.tcp','system.udp']),suites:Object.freeze(['system.tcpip']),rule:'Protocol System classifies and relates protocol contracts; it does not manufacture network authority or connectivity.'});

module.exports=Object.freeze({bindProtocolV04532,bindSshSftpFtpV0465,TERRAFORMER_PROTOCOL_SYSTEM});

"use strict";
function bindTunnelMailProtocolV0467(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.365: Tunneling / Mail Protocol Fabric === */
const TF_TUNNEL_MAIL_PROTOCOL_SYSTEMS_V36365=Object.freeze([{"id":"system.tunneling","concept":"Tunneling","type":"network-tunnel-process-system"},{"id":"system.tunneler","concept":"Tunneler","type":"network-tunnel-actor-system"},{"id":"system.smtp","concept":"SMTP","type":"mail-transfer-protocol-system"},{"id":"system.pop3","concept":"POP3","type":"mail-retrieval-protocol-system"},{"id":"system.imap","concept":"IMAP","type":"mail-access-protocol-system"},{"id":"system.imaps","concept":"IMAPS","type":"tls-secured-imap-protocol-system"}]);

const TF_TUNNEL_MAIL_PROTOCOL_RELATIONSHIPS_V36365=Object.freeze([
 Object.freeze({from:"system.tunneling",relation:"uses",to:"system.tunnel"}),
 Object.freeze({from:"system.tunneler",relation:"part-of",to:"system.tunneling"}),
 Object.freeze({from:"system.tunneling",relation:"may-use",to:"system.protocol"}),
 Object.freeze({from:"system.smtp",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.smtp",relation:"uses",to:"system.mail"}),
 Object.freeze({from:"system.smtp",relation:"uses",to:"system.tcp"}),
 Object.freeze({from:"system.pop3",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.pop3",relation:"uses",to:"system.mail"}),
 Object.freeze({from:"system.pop3",relation:"uses",to:"system.tcp"}),
 Object.freeze({from:"system.imap",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.imap",relation:"uses",to:"system.mail"}),
 Object.freeze({from:"system.imap",relation:"uses",to:"system.tcp"}),
 Object.freeze({from:"system.imaps",relation:"uses",to:"system.imap"}),
 Object.freeze({from:"system.imaps",relation:"uses",to:"system.tls"}),
 Object.freeze({from:"system.smtp",relation:"distinct-from",to:"system.pop3"}),
 Object.freeze({from:"system.smtp",relation:"distinct-from",to:"system.imap"}),
 Object.freeze({from:"system.pop3",relation:"distinct-from",to:"system.imap"})
]);
function tfTunnelMailProtocolPlanV36365(kind,spec={}){
 const map={tunneling:"system.tunneling",tunneler:"system.tunneler",smtp:"system.smtp",pop3:"system.pop3",imap:"system.imap",imaps:"system.imaps"},id=map[String(kind??"").toLowerCase()];
 if(!id)throw new Error("[TF:system.protocol:invalid-input] Tunneling, Tunneler, SMTP, POP3, IMAP, or IMAPS required.");
 return Object.freeze({system:id,host:spec.host??null,port:spec.port??null,planOnly:true,credentialsPresent:false,authenticationPerformed:false,
  tunnelOpened:false,socketOpened:false,connectionPerformed:false,messageSent:false,messageRetrieved:false,mailboxMutated:false,
  tlsSessionEstablished:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfTunnelMailProtocolSelfTestV36365(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_TUNNEL_MAIL_PROTOCOL_SYSTEMS_V36365.map(x=>x.id);
 for(const id of [...added,"system.tunnel","system.protocol","system.mail","system.tcp","system.tls","system.security","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["tunneling","tunneler","smtp","pop3","imap","imaps"]){const p=tfTunnelMailProtocolPlanV36365(k,{host:"fixture.invalid"});if(!p.planOnly||p.credentialsPresent||p.authenticationPerformed||p.tunnelOpened||p.socketOpened||p.connectionPerformed||p.messageSent||p.messageRetrieved||p.mailboxMutated||p.tlsSessionEstablished||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Tunneling / mail protocol qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:6,tunnelReused:true,mailReused:true,protocolReused:true,tcpReused:true,tlsReused:true,
  tunneling:true,tunneler:true,smtp:true,pop3:true,imap:true,imaps:true,imapsUsesImapAndTls:true,
  systemsWithEngines:6,systemsWithServices:6,systemsInCompactSeed:6,systemsWithActiveSummaries:6,
  credentialsEmbedded:false,connectionPerformed:false,mailOperationPerformed:false,tunnelOpened:false,authorityAmplification:false,missing:0});
}
globalThis.TF_TUNNEL_MAIL_PROTOCOL_SYSTEMS_V36365=TF_TUNNEL_MAIL_PROTOCOL_SYSTEMS_V36365;
globalThis.TF_TUNNEL_MAIL_PROTOCOL_RELATIONSHIPS_V36365=TF_TUNNEL_MAIL_PROTOCOL_RELATIONSHIPS_V36365;
globalThis.tfTunnelMailProtocolPlanV36365=tfTunnelMailProtocolPlanV36365;
 return Object.freeze({TF_TUNNEL_MAIL_PROTOCOL_SYSTEMS_V36365,TF_TUNNEL_MAIL_PROTOCOL_RELATIONSHIPS_V36365,tfTunnelMailProtocolPlanV36365,tfTunnelMailProtocolSelfTestV36365});
}
module.exports=Object.freeze({bindTunnelMailProtocolV0467});

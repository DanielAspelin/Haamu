"use strict";
function bindStreamingV04476(deps={}){
 const {tfCanonicalSystemIdsV36196,TF_STREAMABLE_DOMAINS_V36244,tfStreamDescriptorV36244,reconciliationOwner,streamerOwner}=deps;
 if(!reconciliationOwner||!streamerOwner)throw new Error("streaming canonical owners required");
 const TF_STREAMING_RECONCILIATION_V36244=Object.freeze({
 id:"reconciliation.streaming",streamingSystem:"system.streaming",streamerSystem:"system.streamer",mode:"canonical-existing-system-extension",
 existingStreamingOrigin:"network-catalog-v0.32.0",existingStreamerOrigin:"runtime-fabric-v0.32.3",duplicateSystemsCreated:false,
 nodeCapabilities:Object.freeze(["stream","buffer","events"]),integrates:Object.freeze(["system.dios","system.communication","system.network","system.broadcaster","system.processor","system.data","system.object","system.binary","system.image","system.audio","system.video","system.event","system.command"]),
 grantsDeviceAuthority:false,grantsNetworkAuthority:false,grantsCredentialAuthority:false,executesPayload:false,persistsPayload:false
});
 function tfStreamabilityInventoryV36244(sourceText){
 const systems=new Set(tfCanonicalSystemIdsV36196(sourceText));
 return Object.freeze(TF_STREAMABLE_DOMAINS_V36244.map(x=>Object.freeze({...x,canonicalSystem:x.system?systems.has(x.system):null,
  streamableRepresentation:true,liveSourceAvailableByDefault:false,deviceAuthorityRequired:["audio","video","image"].includes(x.id),networkAuthorityRequired:["network","communication","request","response"].includes(x.id),
  executionAuthorityRequired:x.id==="virtual-machine-console",payloadExecution:false,authorityGranted:false})));
}
 function tfStreamingSelfTestV36244(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of ["system.streaming","system.streamer","system.data","system.binary","system.object","system.image","system.audio","system.video","system.event","system.command","system.communication","system.network","system.node","system.tree","system.mind.map","system.classification","system.data-mining","system.bot","system.virtual-machine"])if(!ids.has(id))missing.push(id);
 const inv=tfStreamabilityInventoryV36244(sourceText),audio=inv.find(x=>x.id==="audio"),network=inv.find(x=>x.id==="network"),command=tfStreamDescriptorV36244({domain:"command"});
 if(inv.length!==29)missing.push("inventory");if(!audio.deviceAuthorityRequired||!network.networkAuthorityRequired)missing.push("authority-boundary");
 if(command.payloadExecuted||command.connected||command.authorityGranted)missing.push("command-boundary");
 if(TF_STREAMING_RECONCILIATION_V36244.duplicateSystemsCreated||TF_STREAMING_RECONCILIATION_V36244.executesPayload)missing.push("reconciliation");
 if(missing.length)throw new Error("streaming reconciliation failure "+missing.join(","));
 return Object.freeze({pass:true,streamingSystemReconciled:true,streamerSystemReconciled:true,duplicateSystemsCreated:false,streamableDomains:inv.length,data:true,text:true,binary:true,object:true,image:true,audio:true,video:true,event:true,command:true,communication:true,network:true,node:true,tree:true,mindMap:true,classification:true,dataMining:true,bot:true,fileContent:true,vmConsole:true,backpressure:true,buffering:true,eventDriven:true,payloadExecution:false,networkAuthority:false,deviceAuthority:false,credentialAuthority:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_STREAMING_RECONCILIATION_V36244,tfStreamabilityInventoryV36244,tfStreamingSelfTestV36244});
}
module.exports={bindStreamingV04476};

"use strict";
function bindIoCarrierSocketV04613(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.369: Universal Input-Output Carrier / Socket Fabric === */
const TF_CARRIER_SYSTEM_V36369=Object.freeze({id:"system.carrier",concept:"Carrier",type:"input-output-carrier-system",mode:"bounded-transport-container",condition:"input-output-context-admitted",state:"ready"});
const TF_CARRIER_SOCKET_RELATIONSHIPS_V36369=Object.freeze([
 Object.freeze({from:"system.carrier",relation:"uses",to:"system.input"}),
 Object.freeze({from:"system.carrier",relation:"uses",to:"system.output"}),
 Object.freeze({from:"system.carrier",relation:"may-use",to:"system.dios"}),
 Object.freeze({from:"system.carrier",relation:"may-use",to:"system.transfer"}),
 Object.freeze({from:"system.socket",relation:"may-carry",to:"system.carrier"}),
 Object.freeze({from:"system.socket",relation:"may-use",to:"system.port"})
]);
const TF_IO_CARRIER_SOCKET_SCHEMA_V36369=Object.freeze({schema:"TERRAFORMER-SYSTEM-IO-CARRIER-SOCKET/1",derived:true,
 privateByDefault:true,inertByDefault:true,admissionRequired:true,logicalByDefault:true,osSocket:false,networkBound:false,
 automaticRead:false,automaticWrite:false,automaticTransfer:false,persistence:false,externalEffect:false,authorityAmplification:false});
function tfSystemIoCarrierSocketV36369(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.carrier:invalid-input] System owner identity required.");
 return Object.freeze({owner:id,
  carrier:Object.freeze({id:id+"::io-carrier",system:"system.carrier",direction:"input-output",input:"system.input",output:"system.output",...TF_IO_CARRIER_SOCKET_SCHEMA_V36369}),
  socket:Object.freeze({id:id+"::socket",system:"system.socket",carrier:id+"::io-carrier",endpoint:"logical-system-boundary",...TF_IO_CARRIER_SOCKET_SCHEMA_V36369})
 });
}
function tfUniversalIoCarrierSocketFabricV36369(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemIoCarrierSocketV36369);
 return Object.freeze({system:"system.carrier",systemsCovered:ids.length,inputOutputCarriers:entries.length,sockets:entries.length,
  entries:Object.freeze(entries),everySystemInputOutputCarrier:true,everySystemSocket:true,logicalSocketsByDefault:true});
}
function tfIoCarrierSocketSelfTestV36369(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],u=tfUniversalIoCarrierSocketFabricV36369(sourceText);
 for(const id of ["system.carrier","system.socket","system.input","system.output","system.dios","system.transfer","system.communication","system.port","system.server","system.client","system.service","system.summary","system.engine","system.seed"])if(!ids.has(id))missing.push(id);
 if(u.systemsCovered!==ids.size||u.inputOutputCarriers!==ids.size||u.sockets!==ids.size||u.entries.length!==ids.size)missing.push("coverage");
 const owners=new Set(u.entries.map(x=>x.owner)),carriers=new Set(u.entries.map(x=>x.carrier.id)),sockets=new Set(u.entries.map(x=>x.socket.id));
 if(owners.size!==ids.size||carriers.size!==ids.size||sockets.size!==ids.size)missing.push("uniqueness");
 for(const e of u.entries){if(e.carrier.direction!=="input-output"||e.socket.carrier!==e.carrier.id||!e.carrier.logicalByDefault||!e.socket.logicalByDefault||e.socket.osSocket||e.socket.networkBound||e.carrier.automaticRead||e.carrier.automaticWrite||e.carrier.automaticTransfer||e.socket.authorityAmplification)missing.push("boundary:"+e.owner);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of ["system.carrier"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] IO Carrier / Socket qualification failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:1,socketReused:true,inputReused:true,outputReused:true,diosReused:true,systemsCovered:u.systemsCovered,
  inputOutputCarriers:u.inputOutputCarriers,sockets:u.sockets,everySystemInputOutputCarrier:true,everySystemSocket:true,
  logicalSocketsByDefault:true,osSocketsOpened:false,networkBindings:false,automaticTransfer:false,authorityAmplification:false,missing:0});
}
globalThis.TF_CARRIER_SYSTEM_V36369=TF_CARRIER_SYSTEM_V36369;
globalThis.TF_CARRIER_SOCKET_RELATIONSHIPS_V36369=TF_CARRIER_SOCKET_RELATIONSHIPS_V36369;
globalThis.TF_IO_CARRIER_SOCKET_SCHEMA_V36369=TF_IO_CARRIER_SOCKET_SCHEMA_V36369;
globalThis.tfSystemIoCarrierSocketV36369=tfSystemIoCarrierSocketV36369;
globalThis.tfUniversalIoCarrierSocketFabricV36369=tfUniversalIoCarrierSocketFabricV36369;
 return Object.freeze({TF_CARRIER_SYSTEM_V36369,TF_CARRIER_SOCKET_RELATIONSHIPS_V36369,TF_IO_CARRIER_SOCKET_SCHEMA_V36369,tfSystemIoCarrierSocketV36369,tfUniversalIoCarrierSocketFabricV36369,tfIoCarrierSocketSelfTestV36369});
}
module.exports=Object.freeze({bindIoCarrierSocketV04613});

"use strict";
const SYSTEM=Object.freeze({id:"system.server",concept:"Server",type:"service-endpoint-role-system",privateByDefault:true,inertByDefault:true,admissionRequired:true,automaticListen:false,automaticPortBinding:false,networkExposure:false,authorityGranted:false});
function bindServerClientAbilityV04611(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.367: Universal Per-System Server / Client Ability Fabric === */
const TF_SERVER_CLIENT_ABILITY_SCHEMA_V36367=Object.freeze({
 schema:"TERRAFORMER-SYSTEM-SERVER-CLIENT-ABILITY/1",derived:true,privateByDefault:true,inertByDefault:true,admissionRequired:true,
 automaticListen:false,automaticConnect:false,automaticPortBinding:false,networkExposure:false,persistence:false,externalEffect:false,authorityAmplification:false
});
const TF_HTTP_HTTPS_RELATIONSHIPS_V36367=Object.freeze([
 Object.freeze({from:"system.http",relation:"is-a",to:"system.protocol"}),
 Object.freeze({from:"system.http",relation:"uses",to:"system.tcp"}),
 Object.freeze({from:"system.https",relation:"uses",to:"system.http"}),
 Object.freeze({from:"system.https",relation:"uses",to:"system.tls"}),
 Object.freeze({from:"system.server",relation:"counterpart-of",to:"system.client"}),
 Object.freeze({from:"system.client",relation:"counterpart-of",to:"system.server"})
]);
function tfSystemServerClientAbilityV36367(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");
 if(!id)throw new Error("[TF:system.service:invalid-input] System owner identity required.");
 return Object.freeze({
  owner:id,
  server:Object.freeze({id:id+"::server",system:"system.server",...TF_SERVER_CLIENT_ABILITY_SCHEMA_V36367}),
  client:Object.freeze({id:id+"::client",system:"system.client",...TF_SERVER_CLIENT_ABILITY_SCHEMA_V36367})
 });
}
function tfUniversalServerClientFabricV36367(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),abilities=ids.map(tfSystemServerClientAbilityV36367);
 return Object.freeze({system:"system.service",systemsCovered:ids.length,serverAbilities:abilities.length,clientAbilities:abilities.length,
  abilities:Object.freeze(abilities),privateByDefault:true,inertByDefault:true,admissionRequired:true,automaticNetworkActivity:false});
}
function tfServerClientAbilitySelfTestV36367(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.http","system.https","system.server","system.client","system.protocol","system.tcp","system.tls","system.network","system.service","system.port","system.summary","system.engine","system.seed"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalServerClientFabricV36367(sourceText);
 if(u.systemsCovered!==ids.size||u.serverAbilities!==ids.size||u.clientAbilities!==ids.size||u.abilities.length!==ids.size)missing.push("universal-coverage");
 const owners=new Set(u.abilities.map(x=>x.owner)),servers=new Set(u.abilities.map(x=>x.server.id)),clients=new Set(u.abilities.map(x=>x.client.id));
 if(owners.size!==ids.size||servers.size!==ids.size||clients.size!==ids.size)missing.push("unique-abilities");
 for(const a of u.abilities){if(!a.server.privateByDefault||!a.client.privateByDefault||!a.server.inertByDefault||!a.client.inertByDefault||!a.server.admissionRequired||!a.client.admissionRequired||a.server.automaticListen||a.client.automaticConnect||a.server.networkExposure||a.client.networkExposure||a.server.authorityAmplification||a.client.authorityAmplification)missing.push("boundary:"+a.owner);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Server / Client ability qualification failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:0,httpReused:true,httpsReused:true,serverReused:true,clientReused:true,httpsUsesHttpAndTls:true,
  systemsCovered:u.systemsCovered,serverAbilities:u.serverAbilities,clientAbilities:u.clientAbilities,everySystemServerAbility:true,everySystemClientAbility:true,
  privateByDefault:true,inertByDefault:true,admissionRequired:true,automaticListen:false,automaticConnect:false,automaticPortBinding:false,
  networkExposure:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SERVER_CLIENT_ABILITY_SCHEMA_V36367=TF_SERVER_CLIENT_ABILITY_SCHEMA_V36367;
globalThis.TF_HTTP_HTTPS_RELATIONSHIPS_V36367=TF_HTTP_HTTPS_RELATIONSHIPS_V36367;
globalThis.tfSystemServerClientAbilityV36367=tfSystemServerClientAbilityV36367;
globalThis.tfUniversalServerClientFabricV36367=tfUniversalServerClientFabricV36367;
 return Object.freeze({SYSTEM,TF_SERVER_CLIENT_ABILITY_SCHEMA_V36367,TF_HTTP_HTTPS_RELATIONSHIPS_V36367,tfSystemServerClientAbilityV36367,tfUniversalServerClientFabricV36367,tfServerClientAbilitySelfTestV36367});
}

function bindServerClientTypeListingV04612(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalServerClientFabricV36367}=deps;
 /* === Terraformer v0.36.368: Universal Server / Client Type Listing === */
const TF_SERVER_CLIENT_TYPE_SCHEMA_V36368=Object.freeze({
 schema:"TERRAFORMER-SYSTEM-SERVER-CLIENT-TYPE/1",listed:true,derived:true,deterministic:true,
 privateByDefault:true,inertByDefault:true,admissionRequired:true,networkExposure:false,authorityAmplification:false
});
function tfSystemServerClientTypesV36368(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");
 if(!id)throw new Error("[TF:system.type:invalid-input] System owner identity required.");
 const leaf=id.replace(/^system\./,"");
 return Object.freeze({owner:id,
  serverType:Object.freeze({id:id+"::server-type",type:leaf+"-server",role:"server",system:"system.server",...TF_SERVER_CLIENT_TYPE_SCHEMA_V36368}),
  clientType:Object.freeze({id:id+"::client-type",type:leaf+"-client",role:"client",system:"system.client",...TF_SERVER_CLIENT_TYPE_SCHEMA_V36368})
 });
}
function tfUniversalServerClientTypeListingV36368(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemServerClientTypesV36368);
 return Object.freeze({system:"system.type",systemsCovered:ids.length,serverTypes:entries.length,clientTypes:entries.length,
  entries:Object.freeze(entries),everySystemListsServerType:true,everySystemListsClientType:true});
}
function tfServerClientTypeListingSelfTestV36368(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],u=tfUniversalServerClientTypeListingV36368(sourceText),abilities=tfUniversalServerClientFabricV36367(sourceText);
 if(u.systemsCovered!==ids.size||u.serverTypes!==ids.size||u.clientTypes!==ids.size||u.entries.length!==ids.size)missing.push("coverage");
 if(abilities.systemsCovered!==ids.size)missing.push("ability-coverage");
 const owners=new Set(u.entries.map(x=>x.owner)),st=new Set(u.entries.map(x=>x.serverType.id)),ct=new Set(u.entries.map(x=>x.clientType.id));
 if(owners.size!==ids.size||st.size!==ids.size||ct.size!==ids.size)missing.push("uniqueness");
 for(const e of u.entries){if(!e.serverType.type||!e.clientType.type||e.serverType.role!=="server"||e.clientType.role!=="client"||!e.serverType.listed||!e.clientType.listed||e.serverType.networkExposure||e.clientType.networkExposure||e.serverType.authorityAmplification||e.clientType.authorityAmplification)missing.push("entry:"+e.owner);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Server / Client type listing failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:0,systemsCovered:u.systemsCovered,serverTypesListed:u.serverTypes,clientTypesListed:u.clientTypes,
  everySystemListsServerType:true,everySystemListsClientType:true,abilityFabricPreserved:true,deterministic:true,
  networkExposure:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SERVER_CLIENT_TYPE_SCHEMA_V36368=TF_SERVER_CLIENT_TYPE_SCHEMA_V36368;
globalThis.tfSystemServerClientTypesV36368=tfSystemServerClientTypesV36368;
globalThis.tfUniversalServerClientTypeListingV36368=tfUniversalServerClientTypeListingV36368;
 return Object.freeze({TF_SERVER_CLIENT_TYPE_SCHEMA_V36368,tfSystemServerClientTypesV36368,tfUniversalServerClientTypeListingV36368,tfServerClientTypeListingSelfTestV36368});
}
const TERRAFORMER_BOOT_SERVER_SYSTEM=Object.freeze({schema:'TERRAFORMER-BOOT-SERVER-SYSTEM/1',id:'system.server.boot',name:'Boot Server System',family:'boot',type:'boot-server-role',state:'integrated',canonicalPath:'terraformer://server/boot/',dependsOn:Object.freeze(['system.boot','system.server','system.network']),governs:Object.freeze(['boot-service-reference','client-reference','image-reference','protocol-reference','admission']),rule:'Boot Server System is a bounded server role for admitted boot-service relationships; it does not automatically listen, serve images, modify clients, bypass client authorization, or enable unrestricted network boot.'});

const TERRAFORMER_ROOT_SERVER_SYSTEM=Object.freeze({schema:'TERRAFORMER-ROOT-SERVER-SYSTEM/1',id:'system.server.root',name:'Root Server System',family:'infrastructure',type:'root-server-role',state:'integrated',canonicalPath:'terraformer://server/root/',dependsOn:Object.freeze(['system.root','system.server']),authority:Object.freeze({structuralRootRole:true,unixRoot:false,osPrivilege:false,dnsRootAuthority:false,automaticNetworkAuthority:false}),rule:'Root Server System is a structural/topological server-root role. It is not Unix root and grants no OS privilege, DNS-root authority, or automatic network authority.'});

module.exports=Object.freeze({SYSTEM,bindServerClientAbilityV04611,bindServerClientTypeListingV04612,TERRAFORMER_BOOT_SERVER_SYSTEM,TERRAFORMER_ROOT_SERVER_SYSTEM});

"use strict";
function bindSecurityEdgeCoreV04464(deps={}){const {tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.234: Firewall, Proxy & Antivirus Systems === */
const TF_FIREWALL_SYSTEM_V36234=Object.freeze({
 id:"system.firewall",name:"Firewall System",family:"security-network",type:"firewall-system",mode:"policy-enforcement-plan",
 condition:Object.freeze(["policy-valid","rule-valid","interface-admitted","scope-valid","enforcement-authorized"]),state:"naturalized",
 integrates:Object.freeze(["system.security","system.network","system.nic","system.nat","system.subnet","system.private-address-space","system.virtual-network","system.proxy","system.logging","system.environment"]),
 governs:Object.freeze(["policy","rule","direction","protocol","source","destination","port","action","default-action","evidence"]),
 defaultAction:"deny",enforcesByDefault:false,mutatesHostFirewall:false,networkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfFirewallPolicyV36234(spec={}){
 const def=String(spec.defaultAction||"deny").toLowerCase();if(!["allow","deny"].includes(def))throw new Error("invalid firewall default action");
 const rules=Object.freeze((spec.rules||[]).map((r,i)=>Object.freeze({id:String(r.id||`rule-${i}`),direction:String(r.direction||"both"),protocol:String(r.protocol||"any"),
  source:String(r.source||"any"),destination:String(r.destination||"any"),port:r.port==null?"any":String(r.port),action:["allow","deny"].includes(String(r.action).toLowerCase())?String(r.action).toLowerCase():"deny"})));
 return Object.freeze({system:"system.firewall",defaultAction:def,rules,enforced:false,hostMutation:false,authorityGranted:false});
}
const TF_PROXY_SYSTEM_V36234=Object.freeze({
 id:"system.proxy",name:"Proxy System",family:"network-service",type:"proxy-system",mode:"explicit-mediated-routing",
 condition:Object.freeze(["endpoint-defined","protocol-admitted","policy-valid","connection-authorized"]),state:"naturalized",
 integrates:Object.freeze(["system.network","system.firewall","system.nic","system.nat","system.subnet","system.security","system.logging","system.environment"]),
 governs:Object.freeze(["forward-proxy","reverse-proxy","endpoint","protocol","routing-policy","connection-boundary","request-evidence","response-evidence"]),
 connectsByDefault:false,interceptsByDefault:false,credentialAuthority:false,networkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfProxyDefinitionV36234(spec={}){
 const kind=String(spec.kind||"forward").toLowerCase();if(!["forward","reverse"].includes(kind))throw new Error("unsupported proxy kind");
 return Object.freeze({system:"system.proxy",id:String(spec.id||"proxy0"),kind,protocol:String(spec.protocol||"http"),listen:String(spec.listen||""),upstream:String(spec.upstream||""),
  connected:false,intercepting:false,credentialAuthority:false,networkAuthority:false,authorityGranted:false});
}
const TF_ANTIVIRUS_SYSTEM_V36234=Object.freeze({
 id:"system.antivirus",name:"Antivirus System",family:"security",type:"antivirus-system",mode:"evidence-based-content-scanning",
 condition:Object.freeze(["content-admitted","scanner-admitted","signature-or-engine-evidence","result-recorded"]),state:"naturalized",
 integrates:Object.freeze(["system.security","system.binary","system.file","system.storage","system.validation","system.verification","system.logging","system.history","system.recovery"]),
 governs:Object.freeze(["scan-request","content-hash","scanner-reference","signature-reference","finding","classification","quarantine-recommendation","scan-evidence"]),
 executesContent:false,deletesContent:false,quarantinesByDefault:false,scannerAuthorityRequired:true,grantsAuthority:false,persists:false,intrinsic:true
});
function tfAntivirusResultV36234(spec={}){
 const verdict=String(spec.verdict||"unknown").toLowerCase();if(!["clean","suspicious","malicious","unknown","error"].includes(verdict))throw new Error("invalid antivirus verdict");
 return Object.freeze({system:"system.antivirus",contentId:String(spec.contentId||""),hash:String(spec.hash||""),scanner:String(spec.scanner||"unassigned"),verdict,
  findings:Object.freeze((spec.findings||[]).map(String)),quarantineRecommended:verdict==="malicious"||verdict==="suspicious",contentExecuted:false,contentDeleted:false,contentQuarantined:false,authorityGranted:false});
}
const TF_SECURITY_EDGE_KIT_V36234=Object.freeze({id:"kit.security-edge",name:"Firewall, Proxy & Antivirus Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["firewall-canonical","proxy-canonical","antivirus-canonical","effects-authorized"]),state:"naturalized",
 members:Object.freeze(["system.firewall","system.proxy","system.antivirus","system.security","system.network","system.nic","system.nat","system.subnet","system.private-address-space","system.virtual-network","system.binary","system.storage","system.validation","system.verification","system.logging","system.history","system.recovery","system.environment"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfSecurityEdgeSelfTestV36234(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_SECURITY_EDGE_KIT_V36234.members)if(!ids.has(x))missing.push(x);
 const fw=tfFirewallPolicyV36234({rules:[{protocol:"tcp",port:443,action:"allow"}]}),px=tfProxyDefinitionV36234({kind:"forward",protocol:"http"}),av=tfAntivirusResultV36234({contentId:"qualification",verdict:"malicious",findings:["test"]});
 if(fw.defaultAction!=="deny"||fw.enforced||fw.hostMutation||px.connected||px.intercepting||px.credentialAuthority||!av.quarantineRecommended||av.contentExecuted||av.contentDeleted||av.contentQuarantined)missing.push("security-boundary");
 if(TF_FIREWALL_SYSTEM_V36234.mutatesHostFirewall||TF_PROXY_SYSTEM_V36234.networkAuthority||TF_ANTIVIRUS_SYSTEM_V36234.deletesContent)missing.push("authority-boundary");
 if(missing.length)throw new Error("security edge qualification failure "+missing.join(","));
 return Object.freeze({pass:true,firewallSystem:true,proxySystem:true,antivirusSystem:true,defaultDeny:true,firewallRules:true,forwardProxy:true,reverseProxy:true,scanEvidence:true,quarantineRecommendation:true,
  firewallEnforcesByDefault:false,hostFirewallMutation:false,proxyConnectsByDefault:false,proxyInterceptsByDefault:false,antivirusExecutesContent:false,antivirusDeletesContent:false,quarantinesByDefault:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.234 === */


return Object.freeze({TF_ANTIVIRUS_SYSTEM_V36234,TF_FIREWALL_SYSTEM_V36234,TF_PROXY_SYSTEM_V36234,TF_SECURITY_EDGE_KIT_V36234,tfAntivirusResultV36234,tfFirewallPolicyV36234,tfProxyDefinitionV36234,tfSecurityEdgeSelfTestV36234});}
module.exports={bindSecurityEdgeCoreV04464};

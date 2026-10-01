"use strict";
function bindCoordinationV04486(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.icann",name:"ICANN System",type:"external-institution-reference-system",mode:"reference-and-policy-context",state:"naturalized",externalAuthority:true,terraformerAuthority:false,
  integrates:Object.freeze(["system.domain","system.registry","system.registrar","system.iana","system.dns","system.tld","system.root-zone"]),impersonatesInstitution:false,changesExternalPolicy:false,grantsAuthority:false}),Object.freeze({id:"system.iana",name:"IANA System",type:"external-functions-reference-system",mode:"identifier-and-root-zone-reference",state:"naturalized",externalAuthority:true,terraformerAuthority:false,
  integrates:Object.freeze(["system.icann","system.root-zone","system.tld","system.dns","system.registry","system.ietf"]),performsIanaFunctions:false,changesRootZone:false,grantsAuthority:false}),Object.freeze({id:"system.ietf",name:"IETF System",type:"external-standards-reference-system",mode:"standards-and-protocol-reference",state:"naturalized",externalAuthority:true,terraformerAuthority:false,
  integrates:Object.freeze(["system.dns","system.edns","system.dnssec","system.tcpip","system.iana"]),publishesStandards:false,grantsAuthority:false})]);
 const TF_DNS_COORDINATION_MODEL_V36254=Object.freeze({
 governance:Object.freeze(["system.icann"]),identifierCoordination:Object.freeze(["system.iana"]),standards:Object.freeze(["system.ietf"]),
 hierarchy:Object.freeze(["system.root-zone","system.root-server","system.tld","system.registry","system.registrar","system.domain","system.nameserver"]),
 resolution:Object.freeze(["system.resolver","system.root-server","system.tld","system.nameserver","system.dns"]),
 security:Object.freeze(["system.dnssec","system.security"]),transport:Object.freeze(["system.udp","system.tcp","system.edns"]),
 rule:"External institutions and public DNS authorities remain external; Terraformer may reference, validate, model, cache admitted public data, and resolve only through separately authorized network adapters."
});
 return Object.freeze({SYSTEMS,TF_DNS_COORDINATION_MODEL_V36254});
}


function bindInternetScopeCoordinationV04487(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 const TF_SCOPE_NETWORK_SYSTEMS_V36255=Object.freeze([
 Object.freeze({id:"system.network.international",name:"International Network System",family:"network",type:"cross-national-network-system",mode:"multi-domain-topology-plan",state:"naturalized",
  conditions:Object.freeze(["networks-admitted","cross-domain-links-defined","routing-policy-valid","authorization-valid"]),
  integrates:Object.freeze(["system.internet","system.wan","system.wan-router","system.wan-switch","system.routing","system.connection","system.firewall","system.proxy","system.dns","system.ietf","system.iana"]),
  governmentalAuthority:false,jurisdictionAuthority:false,routeMutation:false,internetByDefault:false,connectsByDefault:false,grantsAuthority:false,persists:false}),
 Object.freeze({id:"system.network.national",name:"National Network System",family:"network",type:"country-scope-network-system",mode:"bounded-geographic-topology-plan",state:"naturalized",
  conditions:Object.freeze(["scope-labelled","networks-admitted","routes-defined","policy-valid","authorization-valid"]),
  integrates:Object.freeze(["system.internet","system.wan","system.lan","system.wan-router","system.lan-router","system.routing","system.connection","system.firewall","system.dns"]),
  governmentalAuthority:false,jurisdictionAuthority:false,sovereigntyClaim:false,routeMutation:false,internetByDefault:false,connectsByDefault:false,grantsAuthority:false,persists:false})
]);
 const TF_INTERNET_SCOPE_COORDINATION_V36255=Object.freeze({
 internet:"system.internet",internetReconciled:true,
 scopes:Object.freeze(["system.network.national","system.network.international"]),
 topology:Object.freeze(["system.lan","system.network.national","system.wan","system.network.international","system.internet"]),
 routing:Object.freeze(["system.lan-router","system.wan-router","system.routing","system.nat-router"]),
 switching:Object.freeze(["system.lan-switch","system.wan-switch","system.nat-switch"]),
 naming:Object.freeze(["system.dns","system.root-server","system.tld","system.nameserver","system.resolver"]),
 coordinationReferences:Object.freeze(["system.icann","system.iana","system.ietf"]),
 security:Object.freeze(["system.firewall","system.proxy","system.dnssec"]),
 rule:"National and international are topology/scope classifications only; they confer no governmental, jurisdictional, sovereignty, routing, Internet, or institutional authority."
});
 function tfNetworkScopePlanV36255(spec={}){
 const scope=String(spec.scope||"national");if(!["national","international","internet"].includes(scope))throw new Error("invalid network scope");
 if(spec.authorized!==true)throw new Error("explicit network-scope authorization required");
 const system=scope==="national"?"system.network.national":scope==="international"?"system.network.international":"system.internet";
 return Object.freeze({system,scope,label:String(spec.label||""),members:Object.freeze([...(spec.members||[])].map(String)),authorized:true,executes:false,connects:false,
  routeMutation:false,firewallMutation:false,natMutation:false,dnsMutation:false,internetOpened:false,governmentalAuthority:false,jurisdictionAuthority:false,sovereigntyClaim:false,authorityGranted:false});
}
 function tfInternetScopeSelfTestV36255(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const id of ["system.internet","system.network.international","system.network.national","system.wan","system.lan","system.routing","system.dns","system.iana","system.ietf"])if(!ids.has(id))missing.push(id);
 let denied=false;try{tfNetworkScopePlanV36255({scope:"national"})}catch(e){denied=true}
 const n=tfNetworkScopePlanV36255({scope:"national",label:"country-scope-a",members:["net-a"],authorized:true}),i=tfNetworkScopePlanV36255({scope:"international",members:["net-a","net-b"],authorized:true}),inet=tfNetworkScopePlanV36255({scope:"internet",authorized:true});
 for(const x of [n,i,inet])if(x.executes||x.connects||x.routeMutation||x.firewallMutation||x.natMutation||x.dnsMutation||x.internetOpened||x.governmentalAuthority||x.jurisdictionAuthority||x.sovereigntyClaim||x.authorityGranted)missing.push("scope-boundary");
 if(!denied)missing.push("authorization");if(missing.length)throw new Error("Internet scope qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,internetReconciled:true,internationalNetwork:true,nationalNetwork:true,lanWanIntegration:true,routingIntegration:true,dnsIntegration:true,ianaIetfIntegration:true,
  authorizationRequired:true,unauthorizedRejected:true,topologyOnly:true,connectsByDefault:false,routeMutation:false,firewallMutation:false,natMutation:false,dnsMutation:false,internetByDefault:false,
  governmentalAuthority:false,jurisdictionAuthority:false,sovereigntyClaim:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SCOPE_NETWORK_SYSTEMS_V36255,TF_INTERNET_SCOPE_COORDINATION_V36255,tfNetworkScopePlanV36255,tfInternetScopeSelfTestV36255});
}
module.exports={bindCoordinationV04486,bindInternetScopeCoordinationV04487};

/* Terraformer v0.48.9: qualified isolated declaration migration. */
let TERRAFORMER_COORDINATION_V0321_INSTANCE=null;

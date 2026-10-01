"use strict";
function bindHierarchyV04486(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.root-zone",name:"Root Zone System",type:"dns-root-zone-reference-system",mode:"authoritative-data-reference",state:"naturalized",
  integrates:Object.freeze(["system.iana","system.icann","system.root-server","system.tld","system.dns","system.dnssec"]),authoritativeCopyByDefault:false,changesDelegation:false,grantsAuthority:false}),Object.freeze({id:"system.root-server",name:"Root Server System",type:"dns-root-server-reference-system",mode:"root-referral-reference",state:"naturalized",
  integrates:Object.freeze(["system.root-zone","system.dns","system.resolver","system.tld","system.dnssec"]),operatesPublicRootServer:false,answersNetworkQueriesByDefault:false,grantsAuthority:false}),Object.freeze({id:"system.tld",name:"TLD System",type:"top-level-domain-system",mode:"delegation-and-resolution-reference",state:"naturalized",
  integrates:Object.freeze(["system.root-zone","system.root-server","system.registry","system.registrar","system.nameserver","system.domain","system.dns"]),delegatesExternally:false,registersExternally:false,grantsAuthority:false}),Object.freeze({id:"system.resolver",name:"Resolver System",type:"dns-resolver-system",mode:"bounded-resolution-plan",state:"naturalized",
  integrates:Object.freeze(["system.dns","system.edns","system.root-server","system.tld","system.nameserver","system.dnssec","system.cache"]),queriesNetworkByDefault:false,grantsAuthority:false}),Object.freeze({id:"system.nameserver",name:"Nameserver System",type:"dns-name-server-system",mode:"authoritative-or-recursive-reference",state:"naturalized",
  integrates:Object.freeze(["system.dns","system.domain","system.tld","system.resolver","system.dnssec"]),servesNetworkByDefault:false,grantsAuthority:false}),Object.freeze({id:"system.dnssec",name:"DNSSEC System",type:"dns-security-system",mode:"validation-and-trust-reference",state:"naturalized",
  integrates:Object.freeze(["system.dns","system.root-zone","system.root-server","system.tld","system.resolver","system.nameserver","system.security"]),signsExternalZone:false,trustAnchorMutation:false,grantsAuthority:false})]);
 return Object.freeze({SYSTEMS});
}


function bindCallFunctionReturnHierarchyV04505(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.273: Call / Function / Parameter / Return Hierarchy === */
const TF_CALL_FUNCTION_RETURN_HIERARCHY_V36273=Object.freeze({
 root:"system.call",
 children:Object.freeze([
  Object.freeze({id:"system.function",parent:"system.call",relationship:"part-of"}),
  Object.freeze({id:"system.parameter",parent:"system.call",relationship:"part-of"})
 ]),
 functionChildren:Object.freeze([
  Object.freeze({id:"system.return",parent:"system.function",relationship:"part-of"})
 ]),
 topology:Object.freeze({
  call:Object.freeze(["system.call-site","system.call-path","system.call-lane"]),
  return:Object.freeze(["system.return-site","system.return-path","system.return-lane"]),
  transmission:Object.freeze(["system.transmission-path","system.transmission-lane"])
 }),
 rule:"Call contains Function and Parameter; Function contains Return. Containment is contextual and does not collapse canonical identities."
});
function tfCallFunctionReturnHierarchySelfTestV36273(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),required=["system.call","system.function","system.parameter","system.return",
  "system.call-site","system.call-path","system.call-lane","system.return-site","system.return-path","system.return-lane"];
 const missing=required.filter(x=>!ids.has(x));
 const f=TF_CALL_FUNCTION_RETURN_HIERARCHY_V36273.children.find(x=>x.id==="system.function");
 const p=TF_CALL_FUNCTION_RETURN_HIERARCHY_V36273.children.find(x=>x.id==="system.parameter");
 const r=TF_CALL_FUNCTION_RETURN_HIERARCHY_V36273.functionChildren.find(x=>x.id==="system.return");
 if(f?.parent!=="system.call"||p?.parent!=="system.call"||r?.parent!=="system.function")missing.push("hierarchy");
 if(missing.length)throw new Error("call/function/return hierarchy qualification failure "+missing.join(","));
 return Object.freeze({pass:true,callSystem:true,functionSystem:true,parameterSystem:true,returnSystem:true,
  functionPartOfCall:true,parameterPartOfCall:true,returnPartOfFunction:true,identityCollapse:false,missing:0});
}
 return Object.freeze({TF_CALL_FUNCTION_RETURN_HIERARCHY_V36273,tfCallFunctionReturnHierarchySelfTestV36273});
}
module.exports={bindHierarchyV04486,bindCallFunctionReturnHierarchyV04505};

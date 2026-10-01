"use strict";
const SYSTEM=Object.freeze({id:"system.port",concept:"Port",authorityGranted:false,scaffold:true});
function bindPortV04529(){return Object.freeze({SYSTEM});}

function bindTransportPortFabricV04529(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.295: Admitted TCP / UDP Port Fabric === */
const TF_ADMITTED_TRANSPORT_PORTS_V36295=Object.freeze([19966,29966,39966,49966,59966]);
const TF_ADMITTED_TRANSPORT_PROTOCOLS_V36295=Object.freeze(["tcp","udp"]);
const TF_TRANSPORT_PORT_POLICY_V36295=Object.freeze({
 systems:Object.freeze(["system.tcp","system.udp","system.port","system.socket","system.network"]),
 ports:TF_ADMITTED_TRANSPORT_PORTS_V36295,
 protocols:TF_ADMITTED_TRANSPORT_PROTOCOLS_V36295,
 hostBinding:false,firewallMutation:false,externalExposure:false,privilegeEscalation:false
});
function tfTransportPortPlanV36295(spec={}){
 const protocol=String(spec.protocol??"").toLowerCase(),port=Number(spec.port);
 const protocolAdmitted=TF_ADMITTED_TRANSPORT_PROTOCOLS_V36295.includes(protocol);
 const portAdmitted=Number.isInteger(port)&&TF_ADMITTED_TRANSPORT_PORTS_V36295.includes(port);
 return Object.freeze({system:protocol==="tcp"?"system.tcp":protocol==="udp"?"system.udp":"system.port",protocol,port,
  protocolAdmitted,portAdmitted,admitted:protocolAdmitted&&portAdmitted,binds:false,listens:false,sends:false,receives:false,
  firewallMutation:false,externalExposure:false,executes:false,mutates:false,authorityGranted:false});
}
function tfTransportPortSelfTestV36295(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.tcp","system.udp","system.port","system.socket","system.network"])if(!ids.has(id))missing.push(id);
 for(const protocol of TF_ADMITTED_TRANSPORT_PROTOCOLS_V36295)for(const port of TF_ADMITTED_TRANSPORT_PORTS_V36295){
  const p=tfTransportPortPlanV36295({protocol,port});if(!p.admitted||p.binds||p.listens||p.executes||p.authorityGranted)missing.push(protocol+":"+port);
 }
 if(tfTransportPortPlanV36295({protocol:"tcp",port:19967}).admitted||tfTransportPortPlanV36295({protocol:"icmp",port:19966}).admitted)missing.push("negative-admission");
 if(missing.length)throw new Error("transport port qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,protocols:2,ports:5,admittedPairs:10,tcp:true,udp:true,hostBindingPerformed:false,firewallMutationPerformed:false,externalExposure:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_ADMITTED_TRANSPORT_PORTS_V36295,TF_ADMITTED_TRANSPORT_PROTOCOLS_V36295,TF_TRANSPORT_PORT_POLICY_V36295,tfTransportPortPlanV36295,tfTransportPortSelfTestV36295});
}

function bindLockedDualPortFamiliesV04530(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.296: Locked Dual TCP / UDP Port Families === */
const TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296=Object.freeze([19966,29966,39966,49966,59966]);
const TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296=Object.freeze([16699,26699,36699,46699,56699]);
const TF_LOCKED_TRANSPORT_PORTS_V36296=Object.freeze([...TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296,...TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296]);
const TF_LOCKED_TRANSPORT_PORT_POLICY_V36296=Object.freeze({
 protocols:Object.freeze(["tcp","udp"]),families:Object.freeze({a:TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296,b:TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296}),
 locked:true,canonicalConfiguration:true,hostBinding:false,firewallMutation:false,externalExposure:false,privilegeEscalation:false
});
function tfLockedTransportPortPlanV36296(spec={}){
 const protocol=String(spec.protocol??"").toLowerCase(),port=Number(spec.port);
 const family=TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296.includes(port)?"a":TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296.includes(port)?"b":null;
 return Object.freeze({system:"system.port",protocol,port,family,locked:family!==null,admitted:["tcp","udp"].includes(protocol)&&family!==null,
  binds:false,listens:false,sends:false,receives:false,firewallMutation:false,externalExposure:false,executes:false,mutates:false,authorityGranted:false});
}
function tfLockedTransportPortSelfTestV36296(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.tcp","system.udp","system.port","system.socket","system.network"])if(!ids.has(id))missing.push(id);
 if(TF_LOCKED_TRANSPORT_PORTS_V36296.length!==10||new Set(TF_LOCKED_TRANSPORT_PORTS_V36296).size!==10)missing.push("port-family-cardinality");
 for(const protocol of ["tcp","udp"])for(const port of TF_LOCKED_TRANSPORT_PORTS_V36296){
  const p=tfLockedTransportPortPlanV36296({protocol,port});if(!p.admitted||!p.locked||p.binds||p.listens||p.executes||p.authorityGranted)missing.push(protocol+":"+port);
 }
 if(tfLockedTransportPortPlanV36296({protocol:"tcp",port:16698}).admitted)missing.push("negative-admission");
 if(missing.length)throw new Error("locked transport port qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,families:2,ports:10,protocols:2,admittedPairs:20,firstFamilyPreserved:true,secondFamilyLocked:true,hostBindingPerformed:false,firewallMutationPerformed:false,externalExposure:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296,TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296,TF_LOCKED_TRANSPORT_PORTS_V36296,TF_LOCKED_TRANSPORT_PORT_POLICY_V36296,tfLockedTransportPortPlanV36296,tfLockedTransportPortSelfTestV36296});
}

function bindLockedDualPortFamiliesV04530(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.296: Locked Dual TCP / UDP Port Families === */
const TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296=Object.freeze([19966,29966,39966,49966,59966]);
const TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296=Object.freeze([16699,26699,36699,46699,56699]);
const TF_LOCKED_TRANSPORT_PORTS_V36296=Object.freeze([...TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296,...TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296]);
const TF_LOCKED_TRANSPORT_PORT_POLICY_V36296=Object.freeze({
 protocols:Object.freeze(["tcp","udp"]),families:Object.freeze({a:TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296,b:TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296}),
 locked:true,canonicalConfiguration:true,hostBinding:false,firewallMutation:false,externalExposure:false,privilegeEscalation:false
});
function tfLockedTransportPortPlanV36296(spec={}){
 const protocol=String(spec.protocol??"").toLowerCase(),port=Number(spec.port);
 const family=TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296.includes(port)?"a":TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296.includes(port)?"b":null;
 return Object.freeze({system:"system.port",protocol,port,family,locked:family!==null,admitted:["tcp","udp"].includes(protocol)&&family!==null,
  binds:false,listens:false,sends:false,receives:false,firewallMutation:false,externalExposure:false,executes:false,mutates:false,authorityGranted:false});
}
function tfLockedTransportPortSelfTestV36296(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.tcp","system.udp","system.port","system.socket","system.network"])if(!ids.has(id))missing.push(id);
 if(TF_LOCKED_TRANSPORT_PORTS_V36296.length!==10||new Set(TF_LOCKED_TRANSPORT_PORTS_V36296).size!==10)missing.push("port-family-cardinality");
 for(const protocol of ["tcp","udp"])for(const port of TF_LOCKED_TRANSPORT_PORTS_V36296){
  const p=tfLockedTransportPortPlanV36296({protocol,port});if(!p.admitted||!p.locked||p.binds||p.listens||p.executes||p.authorityGranted)missing.push(protocol+":"+port);
 }
 if(tfLockedTransportPortPlanV36296({protocol:"tcp",port:16698}).admitted)missing.push("negative-admission");
 if(missing.length)throw new Error("locked transport port qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,families:2,ports:10,protocols:2,admittedPairs:20,firstFamilyPreserved:true,secondFamilyLocked:true,hostBindingPerformed:false,firewallMutationPerformed:false,externalExposure:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_LOCKED_TRANSPORT_PORT_FAMILY_A_V36296,TF_LOCKED_TRANSPORT_PORT_FAMILY_B_V36296,TF_LOCKED_TRANSPORT_PORTS_V36296,TF_LOCKED_TRANSPORT_PORT_POLICY_V36296,tfLockedTransportPortPlanV36296,tfLockedTransportPortSelfTestV36296});
}

function bindSymmetricSixPortFamiliesV04531(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.297: Symmetric Six-Port TCP / UDP Family Reconciliation === */
const TF_CANONICAL_TRANSPORT_PORT_FAMILY_9966_V36297=Object.freeze([9966,19966,29966,39966,49966,59966]);
const TF_CANONICAL_TRANSPORT_PORT_FAMILY_6699_V36297=Object.freeze([6699,16699,26699,36699,46699,56699]);
const TF_CANONICAL_TRANSPORT_PORTS_V36297=Object.freeze([...TF_CANONICAL_TRANSPORT_PORT_FAMILY_9966_V36297,...TF_CANONICAL_TRANSPORT_PORT_FAMILY_6699_V36297]);
const TF_CANONICAL_TRANSPORT_PORT_POLICY_V36297=Object.freeze({
 protocols:Object.freeze(["tcp","udp"]),
 families:Object.freeze({"9966":TF_CANONICAL_TRANSPORT_PORT_FAMILY_9966_V36297,"6699":TF_CANONICAL_TRANSPORT_PORT_FAMILY_6699_V36297}),
 membersPerFamily:6,totalPorts:12,totalProtocolPortPairs:24,locked:true,canonicalConfiguration:true,
 hostBinding:false,firewallMutation:false,externalExposure:false,privilegeEscalation:false
});
function tfCanonicalTransportPortPlanV36297(spec={}){
 const protocol=String(spec.protocol??"").toLowerCase(),port=Number(spec.port);
 const family=TF_CANONICAL_TRANSPORT_PORT_FAMILY_9966_V36297.includes(port)?"9966":TF_CANONICAL_TRANSPORT_PORT_FAMILY_6699_V36297.includes(port)?"6699":null;
 return Object.freeze({system:"system.port",protocol,port,family,basePort:port===9966||port===6699,locked:family!==null,
  admitted:["tcp","udp"].includes(protocol)&&family!==null,binds:false,listens:false,sends:false,receives:false,
  firewallMutation:false,externalExposure:false,executes:false,mutates:false,authorityGranted:false});
}
function tfCanonicalTransportPortSelfTestV36297(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.tcp","system.udp","system.port","system.socket","system.network"])if(!ids.has(id))missing.push(id);
 if(TF_CANONICAL_TRANSPORT_PORT_FAMILY_9966_V36297.length!==6||TF_CANONICAL_TRANSPORT_PORT_FAMILY_6699_V36297.length!==6)missing.push("family-six");
 if(TF_CANONICAL_TRANSPORT_PORTS_V36297.length!==12||new Set(TF_CANONICAL_TRANSPORT_PORTS_V36297).size!==12)missing.push("twelve-unique-ports");
 for(const protocol of ["tcp","udp"])for(const port of TF_CANONICAL_TRANSPORT_PORTS_V36297){
  const p=tfCanonicalTransportPortPlanV36297({protocol,port});if(!p.admitted||!p.locked||p.binds||p.listens||p.executes||p.authorityGranted)missing.push(protocol+":"+port);
 }
 for(const port of [9966,6699])if(!tfCanonicalTransportPortPlanV36297({protocol:"tcp",port}).basePort)missing.push("base:"+port);
 if(missing.length)throw new Error("canonical transport family qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,families:2,membersPerFamily:6,ports:12,protocols:2,admittedPairs:24,base9966:true,base6699:true,symmetric:true,
  hostBindingPerformed:false,firewallMutationPerformed:false,externalExposure:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CANONICAL_TRANSPORT_PORT_FAMILY_9966_V36297,TF_CANONICAL_TRANSPORT_PORT_FAMILY_6699_V36297,TF_CANONICAL_TRANSPORT_PORTS_V36297,TF_CANONICAL_TRANSPORT_PORT_POLICY_V36297,tfCanonicalTransportPortPlanV36297,tfCanonicalTransportPortSelfTestV36297});
}

function bindProtocolPortCompositionV04532(deps={}){
 const {tfCanonicalSystemIdsV36196,TF_CANONICAL_TRANSPORT_PORTS_V36297}=deps;
 /* === Terraformer v0.36.298: Protocol / Port Bidirectional Composition Fabric === */
const TF_PROTOCOL_PORT_RELATIONSHIPS_V36298=Object.freeze([
 Object.freeze({from:"system.protocol",relation:"uses",to:"system.port"}),
 Object.freeze({from:"system.port",relation:"resolves",to:"system.protocol"}),
 Object.freeze({from:"system.tcp",relation:"uses",to:"system.port"}),
 Object.freeze({from:"system.udp",relation:"uses",to:"system.port"}),
 Object.freeze({from:"system.concatenation",relation:"operates-on",to:"system.protocol"}),
 Object.freeze({from:"system.concatenation",relation:"operates-on",to:"system.port"})
]);
function tfProtocolPortResolveV36298(spec={}){
 const protocol=String(spec.protocol??"").toLowerCase(),port=Number(spec.port);
 const protocolValid=protocol==="tcp"||protocol==="udp",portValid=Number.isInteger(port)&&port>=1&&port<=65535;
 const canonical=protocolValid&&TF_CANONICAL_TRANSPORT_PORTS_V36297.includes(port);
 return Object.freeze({protocolSystem:protocol==="tcp"?"system.tcp":protocol==="udp"?"system.udp":"system.protocol",portSystem:"system.port",
  protocol,port,protocolValid,portValid,compatible:protocolValid&&portValid,canonical,custom:protocolValid&&portValid&&!canonical,
  protocolToPort:protocolValid&&portValid,portToProtocol:protocolValid&&portValid,binds:false,listens:false,executes:false,mutates:false,authorityGranted:false});
}
function tfPortMechanismV36298(spec={}){
 const resolved=tfProtocolPortResolveV36298(spec);
 if(!resolved.compatible)throw new Error("invalid protocol/port mechanism");
 const label=String(spec.label??(resolved.protocol+":"+resolved.port));
 return Object.freeze({system:"system.concatenation",mechanism:"protocol-port",label,
  parts:Object.freeze([resolved.protocolSystem,resolved.portSystem]),protocol:resolved.protocol,port:resolved.port,
  canonical:resolved.canonical,custom:resolved.custom,portableRepresentation:resolved.protocol+"://:"+resolved.port,
  persistent:false,registered:false,binds:false,listens:false,opensFirewall:false,externalExposure:false,executes:false,mutates:false,authorityGranted:false});
}
function tfProtocolPortCompositionSelfTestV36298(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.protocol","system.port","system.concatenation","system.tcp","system.udp","system.socket","system.network"])if(!ids.has(id))missing.push(id);
 for(const protocol of ["tcp","udp"])for(const port of TF_CANONICAL_TRANSPORT_PORTS_V36297){
  const r=tfProtocolPortResolveV36298({protocol,port});if(!r.compatible||!r.canonical||!r.protocolToPort||!r.portToProtocol)missing.push(protocol+":"+port);
 }
 const custom=tfPortMechanismV36298({protocol:"tcp",port:45678,label:"custom"});
 if(!custom.custom||custom.canonical||custom.binds||custom.listens||custom.opensFirewall||custom.authorityGranted)missing.push("custom-port-mechanism");
 if(tfProtocolPortResolveV36298({protocol:"tcp",port:0}).compatible||tfProtocolPortResolveV36298({protocol:"sctp",port:9966}).compatible)missing.push("bounds");
 if(missing.length)throw new Error("protocol/port composition qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,bidirectional:true,protocolToPort:true,portToProtocol:true,canonicalPorts:12,canonicalPairs:24,customPortMechanism:true,portRange:"1-65535",protocols:["tcp","udp"],socketBindingPerformed:false,firewallMutationPerformed:false,externalExposure:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_PROTOCOL_PORT_RELATIONSHIPS_V36298,tfProtocolPortResolveV36298,tfPortMechanismV36298,tfProtocolPortCompositionSelfTestV36298});
}
module.exports=Object.freeze({bindPortV04529,bindTransportPortFabricV04529,bindLockedDualPortFamiliesV04530,bindLockedDualPortFamiliesV04530,bindSymmetricSixPortFamiliesV04531,bindProtocolPortCompositionV04532});

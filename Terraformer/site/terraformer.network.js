'use strict';
const ID='terraformer.network',VERSION='0.44.4';
function describeTransport(x={}){const protocol=String(x.protocol||'').toUpperCase();if(!['TCP','UDP','LOCAL','UNSPECIFIED'].includes(protocol||'UNSPECIFIED'))throw Error('NETWORK_PROTOCOL_INVALID');const port=x.port==null?null:Number(x.port);if(port!==null&&(!Number.isInteger(port)||port<1||port>65535))throw Error('NETWORK_PORT_INVALID');return Object.freeze({protocol:protocol||'UNSPECIFIED',host:x.host==null?null:String(x.host),port,connected:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'transport descriptors; no connectivity implication',authority:'NO_CONNECTIVITY_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}

function bindNetworkFabricTopologyV04533(deps={}){
 const {tfCanonicalSystemIdsV36196,tfProtocolPortResolveV36298}=deps;
 /* === Terraformer v0.36.299: Network Fabric Topology Reconciliation === */
const TF_NETWORK_FABRIC_NODES_V36299=Object.freeze([
 "system.network","system.protocol","system.tcpip","system.tcp","system.udp","system.port","system.socket",
 "system.subnet","system.lan","system.wan","system.virtual-network",
 "system.bridge","system.router","system.switch","system.nat","system.firewall","system.proxy",
 "system.dns","system.dnssec","system.edns","system.communication","system.transmission"
]);
const TF_NETWORK_FABRIC_EDGES_V36299=Object.freeze([
 ["system.network","contains","system.protocol"],["system.protocol","supports","system.tcpip"],
 ["system.tcpip","supports","system.tcp"],["system.tcpip","supports","system.udp"],
 ["system.tcp","uses","system.port"],["system.udp","uses","system.port"],["system.port","resolves","system.protocol"],
 ["system.tcp","uses","system.socket"],["system.udp","uses","system.socket"],
 ["system.network","contains","system.subnet"],["system.network","contains","system.lan"],["system.network","contains","system.wan"],
 ["system.network","contains","system.virtual-network"],
 ["system.bridge","bridges","system.network"],["system.router","routes","system.network"],["system.switch","switches","system.network"],
 ["system.nat","translates","system.network"],["system.firewall","filters","system.network"],["system.proxy","proxies","system.network"],
 ["system.dns","resolves","system.network"],["system.dnssec","validates","system.dns"],["system.edns","extends","system.dns"],
 ["system.communication","uses","system.protocol"],["system.transmission","uses","system.protocol"]
].map(x=>Object.freeze({from:x[0],relation:x[1],to:x[2]})));
function tfNetworkFabricAdjacencyV36299(systemId){
 const id=String(systemId),out=[],incoming=[];
 for(const e of TF_NETWORK_FABRIC_EDGES_V36299){if(e.from===id)out.push(e);if(e.to===id)incoming.push(e);}
 return Object.freeze({system:id,out:Object.freeze(out),incoming:Object.freeze(incoming),bonded:out.length+incoming.length>0});
}
function tfNetworkFabricPathV36299(from,to){
 from=String(from);to=String(to);if(!TF_NETWORK_FABRIC_NODES_V36299.includes(from)||!TF_NETWORK_FABRIC_NODES_V36299.includes(to))return Object.freeze({connected:false,path:Object.freeze([])});
 const adj=new Map(TF_NETWORK_FABRIC_NODES_V36299.map(x=>[x,[]]));
 for(const e of TF_NETWORK_FABRIC_EDGES_V36299){adj.get(e.from)?.push(e.to);adj.get(e.to)?.push(e.from);}
 const q=[[from,[from]]],seen=new Set([from]);while(q.length){const [n,p]=q.shift();if(n===to)return Object.freeze({connected:true,path:Object.freeze(p)});for(const x of adj.get(n)||[])if(!seen.has(x)){seen.add(x);q.push([x,[...p,x]]);}}
 return Object.freeze({connected:false,path:Object.freeze([])});
}
function tfNetworkFabricSelfTestV36299(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of TF_NETWORK_FABRIC_NODES_V36299)if(!ids.has(id))missing.push(id);
 for(const id of TF_NETWORK_FABRIC_NODES_V36299)if(!tfNetworkFabricAdjacencyV36299(id).bonded)missing.push("unbonded:"+id);
 for(const id of TF_NETWORK_FABRIC_NODES_V36299)if(!tfNetworkFabricPathV36299("system.network",id).connected)missing.push("disconnected:"+id);
 const pp=tfProtocolPortResolveV36298({protocol:"tcp",port:9966});if(!pp.protocolToPort||!pp.portToProtocol)missing.push("protocol-port-bidirectional");
 if(missing.length)throw new Error("network fabric qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,nodes:TF_NETWORK_FABRIC_NODES_V36299.length,edges:TF_NETWORK_FABRIC_EDGES_V36299.length,allBonded:true,allReachableThroughTypedTopology:true,
  protocolPortBidirectional:true,directFullMesh:false,layerBoundariesPreserved:true,hostMutation:false,socketBindingPerformed:false,externalExposure:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_NETWORK_FABRIC_NODES_V36299,TF_NETWORK_FABRIC_EDGES_V36299,tfNetworkFabricAdjacencyV36299,tfNetworkFabricPathV36299,tfNetworkFabricSelfTestV36299});
}
module.exports=Object.freeze({ID,VERSION,descriptor,describeTransport,bindNetworkFabricTopologyV04533});

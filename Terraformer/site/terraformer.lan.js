"use strict";
function bindLanV04482(){
 /* === Terraformer v0.36.250: LAN Admission & Collision-Aware Binding === */
const TF_LAN_ADMISSION_V36250=Object.freeze({
 id:"admission.network.lan",mode:"read-only-discovery-and-plan",
 privatePools:Object.freeze(["10.0.0.0/8","192.168.0.0/16"]),authorizationRequired:true,
 discoversInterfaces:true,mutatesInterfaces:false,mutatesRoutes:false,mutatesFirewall:false,bindsSocket:false,
 claimsPrivateRanges:false,internetAuthority:false,credentialAuthority:false,deviceAuthority:false,grantsAuthority:false
});
function tfIpv4IntV36250(ip){const p=String(ip).split(".");if(p.length!==4)throw new Error("invalid IPv4");let n=0;for(const x of p){if(!/^\d+$/.test(x)||+x>255)throw new Error("invalid IPv4");n=(n*256)+(+x)}return n>>>0}
function tfCidrV36250(cidr){const [ip,ps]=String(cidr).split("/"),prefix=Number(ps);if(!Number.isInteger(prefix)||prefix<0||prefix>32)throw new Error("invalid CIDR");const x=tfIpv4IntV36250(ip),mask=prefix===0?0:(0xffffffff<<(32-prefix))>>>0,network=(x&mask)>>>0,broadcast=(network|(~mask>>>0))>>>0;return Object.freeze({cidr:String(cidr),prefix,network,broadcast})}
function tfCidrOverlapV36250(a,b){const x=tfCidrV36250(a),y=tfCidrV36250(b);return x.network<=y.broadcast&&y.network<=x.broadcast}
function tfPrivatePoolAdmissionV36250(cidr){const c=tfCidrV36250(cidr);return TF_LAN_ADMISSION_V36250.privatePools.some(p=>{const q=tfCidrV36250(p);return c.network>=q.network&&c.broadcast<=q.broadcast})}
function tfObservedLanInterfacesV36250(adapter=null){
 const os=adapter||require("node:os"),raw=os.networkInterfaces(),out=[];
 for(const [name,rows] of Object.entries(raw||{}))for(const r of rows||[]){const family=String(r.family);if(family!=="IPv4"&&family!=="4")continue;
  out.push(Object.freeze({name,address:String(r.address),netmask:String(r.netmask),cidr:r.cidr?String(r.cidr):null,internal:!!r.internal,mac:r.mac?String(r.mac):null}))}
 return Object.freeze(out);
}
function tfLanBindingPlanV36250(spec={}){
 const candidate=String(spec.cidr||""),authorized=spec.authorized===true,observed=Object.freeze([...(spec.observed||tfObservedLanInterfacesV36250())]);
 if(!tfPrivatePoolAdmissionV36250(candidate))throw new Error("candidate outside Terraformer private-pool policy");
 const collisions=observed.filter(x=>x.cidr&&!x.internal&&tfCidrOverlapV36250(candidate,x.cidr)).map(x=>Object.freeze({name:x.name,cidr:x.cidr,address:x.address}));
 const admitted=authorized&&collisions.length===0;
 return Object.freeze({candidate,authorized,admitted,collisions:Object.freeze(collisions),observedInterfaces:observed.length,planOnly:true,
  bindsSocket:false,mutatesInterfaces:false,mutatesRoutes:false,mutatesFirewall:false,claimsPrivateRange:false,internetAuthority:false,credentialAuthority:false,deviceAuthority:false,authorityGranted:false});
}
function tfLanAdmissionSelfTestV36250(){
 const fake={networkInterfaces(){return {lo:[{family:"IPv4",address:"127.0.0.1",netmask:"255.0.0.0",cidr:"127.0.0.1/8",internal:true,mac:"00:00:00:00:00:00"}],
  eth0:[{family:"IPv4",address:"192.168.1.20",netmask:"255.255.255.0",cidr:"192.168.1.20/24",internal:false,mac:"02:00:00:00:00:01"}]}}};
 const observed=tfObservedLanInterfacesV36250(fake),collision=tfLanBindingPlanV36250({cidr:"192.168.1.0/24",authorized:true,observed});
 const clean=tfLanBindingPlanV36250({cidr:"10.77.0.0/24",authorized:true,observed}),unauth=tfLanBindingPlanV36250({cidr:"10.78.0.0/24",authorized:false,observed});
 let publicRejected=false;try{tfLanBindingPlanV36250({cidr:"8.8.8.0/24",authorized:true,observed})}catch(e){publicRejected=true}
 const pass=observed.length===2&&collision.collisions.length===1&&!collision.admitted&&clean.admitted&&!unauth.admitted&&publicRejected&&
  !clean.bindsSocket&&!clean.mutatesInterfaces&&!clean.mutatesRoutes&&!clean.mutatesFirewall&&!clean.claimsPrivateRange&&!clean.authorityGranted;
 if(!pass)throw new Error("LAN admission qualification failure");
 return Object.freeze({pass:true,readOnlyDiscovery:true,privatePools:2,collisionDetected:true,collisionRejected:true,cleanCandidateAdmitted:true,authorizationRequired:true,unauthorizedRejected:true,publicRangeRejected:true,
  planOnly:true,socketBound:false,interfaceMutation:false,routeMutation:false,firewallMutation:false,privateRangeOwnershipClaim:false,internetAuthority:false,credentialAuthority:false,deviceAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.250 === */


 return Object.freeze({TF_LAN_ADMISSION_V36250,tfIpv4IntV36250,tfCidrV36250,tfCidrOverlapV36250,tfPrivatePoolAdmissionV36250,tfObservedLanInterfacesV36250,tfLanBindingPlanV36250,tfLanAdmissionSelfTestV36250});
}
const TF_LAN_BASE_EXPORTS={bindLanV04482};

function bindLanTransportV04483(deps={}){
 const {tfObservedLanInterfacesV36250,tfPrivatePoolAdmissionV36250}=deps;
 const TF_LAN_SYSTEM_V36251=Object.freeze({id:"system.lan",name:"LAN System",family:"network",type:"local-area-network-system",mode:"admission-controlled-local-network",
  conditions:Object.freeze(["interface-observed","address-private","subnet-admitted","collision-clear","authorization-valid"]),
  state:"naturalized",integrates:Object.freeze(["system.network","system.ip","system.subnet","system.nic","system.connection","system.connector","system.tcpip","system.tcp","system.firewall","system.dios","system.streaming"]),
  scope:"local-area",internetAuthority:false,routeMutation:false,firewallMutation:false,credentialAuthority:false,grantsAuthority:false,persists:false});
 const TF_LAN_TRANSPORT_EXECUTION_V36251=Object.freeze({
 id:"adapter.network.lan.authorized",system:"system.lan",protocol:"tcp",authorizationRequired:true,admissionRequired:true,
 bindObservedAddressOnly:true,ephemeralPortPreferred:true,mutatesInterface:false,mutatesRoute:false,mutatesFirewall:false,
 internetAuthority:false,wanAuthority:false,credentialAuthority:false,deviceAuthority:false,grantsAuthority:false
});
 function tfLanExecutionEndpointV36251(spec={}){
 const address=String(spec.address||""),port=Number(spec.port||0),observed=[...(spec.observed||tfObservedLanInterfacesV36250())];
 const row=observed.find(x=>!x.internal&&x.address===address&&x.cidr);
 if(!row)throw new Error("LAN address not observed on non-loopback interface");
 if(!tfPrivatePoolAdmissionV36250(row.cidr))throw new Error("observed LAN address outside private-pool policy");
 if(spec.authorized!==true)throw new Error("explicit LAN transport authorization required");
 if(!Number.isInteger(port)||port<0||port>65535)throw new Error("invalid LAN port");
 return Object.freeze({system:"system.lan",address,port,interfaceName:row.name,cidr:row.cidr,authorized:true,admitted:true,protocol:"tcp",
  mutatesInterface:false,mutatesRoute:false,mutatesFirewall:false,internetAuthority:false,wanAuthority:false,credentialAuthority:false,authorityGranted:false});
}
 async function tfLanTcpExchangeV36251(spec={}){
 const net=require("node:net"),ep=tfLanExecutionEndpointV36251(spec),chunks=[...(spec.chunks||[])].map(x=>Buffer.isBuffer(x)?Buffer.from(x):Buffer.from(String(x))),
 timeoutMs=Number.isSafeInteger(spec.timeoutMs)&&spec.timeoutMs>0?spec.timeoutMs:3000,maxBytes=Number.isSafeInteger(spec.maxBytes)&&spec.maxBytes>=0?spec.maxBytes:1048576;
 return await new Promise(resolve=>{let server,client,timer,settled=false,received=[],bytes=0;
  const finish=(state,error=null)=>{if(settled)return;settled=true;if(timer)clearTimeout(timer);try{client&&client.destroy()}catch{}try{server&&server.close()}catch{}
   resolve(Object.freeze({state,address:ep.address,interfaceName:ep.interfaceName,bytes,received:Buffer.concat(received),lanOpened:true,wanOpened:false,internetOpened:false,
    interfaceMutated:false,routeMutated:false,firewallMutated:false,payloadExecuted:false,persisted:false,credentialAuthority:false,authorityGranted:false,error:error?String(error.message||error):null}))};
  server=net.createServer(sock=>{sock.on("data",d=>{if(bytes+d.length>maxBytes){sock.destroy(new Error("LAN_BYTE_LIMIT"));return}bytes+=d.length;received.push(Buffer.from(d))});
   sock.on("end",()=>finish("COMPLETE"));sock.on("error",e=>finish(String(e.message)==="LAN_BYTE_LIMIT"?"LIMIT_EXCEEDED":"SERVER_FAILED",e))});
  server.on("error",e=>finish("LISTEN_FAILED",e));server.listen({host:ep.address,port:ep.port,exclusive:true},()=>{const a=server.address();client=net.createConnection({host:ep.address,port:a.port},()=>{for(const c of chunks)client.write(c);client.end()});client.on("error",e=>finish("CLIENT_FAILED",e))});
  timer=setTimeout(()=>finish("TIMED_OUT",new Error("LAN_TIMEOUT")),timeoutMs);
 });
}
 return Object.freeze({TF_LAN_SYSTEM_V36251,TF_LAN_TRANSPORT_EXECUTION_V36251,tfLanExecutionEndpointV36251,tfLanTcpExchangeV36251});
}
module.exports=Object.freeze({...TF_LAN_BASE_EXPORTS,bindLanTransportV04483});

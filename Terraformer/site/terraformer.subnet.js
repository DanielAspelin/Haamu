"use strict";
function bindSubnetV04463(deps={}){
 const {tfCanonicalSystemIdsV36196,tfIpv4InCidrV36232,tfIpv4IntV36232,tfTerraformerPrivateAddressV36232}=deps;
/* === Terraformer v0.36.233: Subnet System === */
const TF_SUBNET_SYSTEM_V36233=Object.freeze({
 id:"system.subnet",name:"Subnet System",family:"network",type:"subnet-system",mode:"bounded-cidr-allocation",
 condition:Object.freeze(["cidr-valid","parent-scope-valid","nonoverlapping-allocation","policy-valid"]),state:"naturalized",
 integrates:Object.freeze(["system.network","system.ip","system.private-address-space","system.nat","system.nic","system.virtual-network","system.bridge","system.security","system.environment"]),
 governs:Object.freeze(["cidr","network-address","broadcast-address","prefix-length","netmask","usable-host-range","parent-subnet","child-subnet","allocation","overlap"]),
 privatePools:Object.freeze(["10.0.0.0/8","192.168.0.0/16"]),mutatesHostRoutes:false,mutatesLan:false,externalNetworkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfIpv4StringV36233(n){n=Number(n)>>>0;return [n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join(".")}
function tfSubnetDefinitionV36233(cidr){
 const [ip,bitsS]=String(cidr).split("/"),bits=Number(bitsS);if(!Number.isInteger(bits)||bits<0||bits>32)throw new Error("invalid subnet prefix");
 const addr=tfIpv4IntV36232(ip),mask=bits===0?0:(0xffffffff<<(32-bits))>>>0,network=(addr&mask)>>>0,broadcast=(network|(~mask>>>0))>>>0;
 const total=2**(32-bits),usable=bits<=30?Math.max(0,total-2):total,first=bits<=30?network+1:network,last=bits<=30?broadcast-1:broadcast;
 return Object.freeze({system:"system.subnet",cidr:`${tfIpv4StringV36233(network)}/${bits}`,prefixLength:bits,netmask:tfIpv4StringV36233(mask),
  network:tfIpv4StringV36233(network),broadcast:tfIpv4StringV36233(broadcast),firstUsable:tfIpv4StringV36233(first),lastUsable:tfIpv4StringV36233(last),totalAddresses:total,usableAddresses:usable,
  terraformerPrivate:tfTerraformerPrivateAddressV36232(tfIpv4StringV36233(network)),allocated:false,hostRouteMutation:false,lanMutation:false,authorityGranted:false});
}
function tfSubnetContainsV36233(parent,child){const p=tfSubnetDefinitionV36233(parent),c=tfSubnetDefinitionV36233(child);return c.prefixLength>=p.prefixLength&&tfIpv4InCidrV36232(c.network,p.cidr)&&tfIpv4InCidrV36232(c.broadcast,p.cidr)}
function tfSubnetOverlapsV36233(a,b){const x=tfSubnetDefinitionV36233(a),y=tfSubnetDefinitionV36233(b);return tfIpv4InCidrV36232(x.network,y.cidr)||tfIpv4InCidrV36232(y.network,x.cidr)}
function tfSubnetAdmissionV36233(cidr,allocated=[]){
 const sub=tfSubnetDefinitionV36233(cidr);if(!sub.terraformerPrivate)throw new Error("subnet outside Terraformer private address pools");
 for(const x of allocated)if(tfSubnetOverlapsV36233(sub.cidr,String(x.cidr||x)))throw new Error("subnet allocation overlap");
 return Object.freeze({...sub,allocated:true,scope:"terraformer-private",authorityGranted:false});
}
const TF_SUBNET_KIT_V36233=Object.freeze({id:"kit.subnet",name:"Subnet Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["subnet-canonical","private-pool-bounded","overlap-controlled","host-routing-unchanged"]),state:"naturalized",
 members:Object.freeze(["system.subnet","system.private-address-space","system.network","system.ip","system.nat","system.nic","system.virtual-network","system.bridge","system.security","system.environment","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfSubnetSelfTestV36233(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_SUBNET_KIT_V36233.members)if(!ids.has(x))missing.push(x);
 const a=tfSubnetAdmissionV36233("10.20.30.44/24"),b=tfSubnetAdmissionV36233("192.168.50.3/24");
 if(a.network!=="10.20.30.0"||a.broadcast!=="10.20.30.255"||a.firstUsable!=="10.20.30.1"||a.lastUsable!=="10.20.30.254"||a.usableAddresses!==254)missing.push("cidr-math");
 if(!tfSubnetContainsV36233("10.0.0.0/8","10.20.30.0/24")||tfSubnetContainsV36233("192.168.0.0/16","10.20.30.0/24"))missing.push("containment");
 let overlap=false,outside=false;try{tfSubnetAdmissionV36233("10.20.30.128/25",[a])}catch(e){overlap=true}try{tfSubnetAdmissionV36233("172.16.0.0/24")}catch(e){outside=true}
 if(!overlap||!outside||!b.terraformerPrivate)missing.push("allocation-policy");
 if(TF_SUBNET_SYSTEM_V36233.mutatesHostRoutes||TF_SUBNET_SYSTEM_V36233.mutatesLan||TF_SUBNET_SYSTEM_V36233.externalNetworkAuthority)missing.push("authority-boundary");
 if(missing.length)throw new Error("subnet qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.subnet",cidr:true,networkAddress:true,broadcastAddress:true,netmask:true,usableHostRange:true,parentChild:true,overlapControl:true,
  range10:true,range192168:true,outsidePrivateRejected:true,mutatesHostRoutes:false,mutatesLan:false,externalNetworkAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.233 === */


 return Object.freeze({TF_SUBNET_KIT_V36233,TF_SUBNET_SYSTEM_V36233,tfIpv4StringV36233,tfSubnetAdmissionV36233,tfSubnetContainsV36233,tfSubnetDefinitionV36233,tfSubnetOverlapsV36233,tfSubnetSelfTestV36233});
}
module.exports={bindSubnetV04463};

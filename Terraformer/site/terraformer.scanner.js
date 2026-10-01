"use strict";
function bindScannerV04493(deps={}){
 const {tfCidrV36250,tfPrivatePoolAdmissionV36250}=deps;const SYSTEM=Object.freeze({id:"system.network.scanner",concept:"Scanner",path:Object.freeze(["System","Network","Scanner"]),mode:"private-local-bounded",
  activeProbeByDefault:false,authorizationRequiredForActiveProbe:true,allowedPools:Object.freeze(["10.0.0.0/8","192.168.0.0/16"]),publicScan:false,internetScan:false});const LIMITS=Object.freeze({maxHostsPerPlan:4096,maxPortsPerHost:64,maxConcurrent:32,defaultTimeoutMs:500});
 function tfIpv4FromIntV36261(n){return [24,16,8,0].map(s=>(n>>>s)&255).join(".")}
 function tfLocalScanPlanV36261(spec={}){
 const cidr=String(spec.cidr||"");const c=tfCidrV36250(cidr);if(!tfPrivatePoolAdmissionV36250(cidr))throw new Error("scan range outside admitted private pools");
 const hosts=Math.max(0,(c.broadcast-c.network+1)-(c.prefix<=30?2:0));if(hosts>LIMITS.maxHostsPerPlan)throw new Error("scan plan exceeds host bound");
 const active=spec.active===true;if(active&&spec.authorized!==true)throw new Error("explicit authorization required for active probing");
 const first=c.network+(c.prefix<=30?1:0),last=c.broadcast-(c.prefix<=30?1:0),addresses=[];
 for(let n=first;n<=last&&addresses.length<hosts;n++)addresses.push(tfIpv4FromIntV36261(n>>>0));
 return Object.freeze({cidr,active,authorized:active?true:false,addresses:Object.freeze(addresses),hostCount:addresses.length,executes:false,opensSockets:false,
  publicScan:false,internetScan:false,routeMutation:false,firewallMutation:false,interfaceMutation:false,authorityGranted:false});
}
 return Object.freeze({SYSTEM,LIMITS,tfIpv4FromIntV36261,tfLocalScanPlanV36261});
}
module.exports={bindScannerV04493};

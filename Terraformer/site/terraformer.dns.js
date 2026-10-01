"use strict";
function bindDnsV04486(){
 function tfDnsResolutionPlanV36254(spec={}){
 const name=String(spec.name||"").trim().toLowerCase();if(!name||name.length>253||!name.includes("."))throw new Error("invalid DNS name");
 const labels=name.replace(/\.$/,"").split(".");if(labels.some(x=>!x||x.length>63))throw new Error("invalid DNS label");
 return Object.freeze({name,labels:Object.freeze(labels),tld:labels.at(-1),path:Object.freeze(["system.resolver","system.root-server","system.tld","system.nameserver","system.dns"]),
  standardsReference:"system.ietf",rootZoneReference:"system.iana",coordinationReference:"system.icann",dnssec:"system.dnssec",executes:false,queriesNetwork:false,
  changesRootZone:false,changesDelegation:false,registersDomain:false,publishesStandard:false,impersonatesExternalAuthority:false,authorityGranted:false});
}
 return Object.freeze({tfDnsResolutionPlanV36254});
}
module.exports={bindDnsV04486};

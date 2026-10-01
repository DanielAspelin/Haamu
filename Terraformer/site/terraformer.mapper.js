"use strict";
function bindMapperV04493(){
 const SYSTEM=Object.freeze({id:"system.network.mapper",concept:"Mapper",path:Object.freeze(["System","Network","Mapper"]),mode:"evidence-derived-topology",
  inventsHosts:false,activeProbeByDefault:false});
 function tfNetworkMapV36261(observations=[]){
 const nodes=[],links=[],seen=new Set();for(const o of observations){const address=String(o.address||"");if(!address)continue;if(seen.has(address))continue;seen.add(address);
  nodes.push(Object.freeze({address,observed:true,mac:o.mac?String(o.mac):null,name:o.name?String(o.name):null}));
  if(o.via)links.push(Object.freeze({from:String(o.via),to:address,evidence:"observed"}));
 }return Object.freeze({nodes:Object.freeze(nodes),links:Object.freeze(links),inventedHosts:0,evidenceOnly:true});
}
 return Object.freeze({SYSTEM,tfNetworkMapV36261});
}
module.exports={bindMapperV04493};

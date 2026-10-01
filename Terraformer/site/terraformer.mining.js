"use strict";
function bindDataMiningNetworkPlanV04470(deps={}){
 const {tfCanonicalSystemIdsV36196,tfFirewallPolicyV36234,tfIpv4InCidrV36232,tfPrivateAddressAllocationV36232,tfProxyDefinitionV36234,tfStableForensicValueV36239,tfSubnetDefinitionV36233,tfVirtualNetworkDefinitionV36229,tfVirtualNicDefinitionV36229}=deps;
 if(!deps.planningOwner)throw new Error("planning owner required");
/* === Terraformer v0.36.240: Data Mining & Unified Network Plan === */
const TF_DATA_MINING_SYSTEM_V36240=Object.freeze({
 id:"system.data-mining",name:"Data Mining System",family:"information-analysis",type:"data-mining-system",mode:"bounded-evidence-extraction",
 condition:Object.freeze(["data-admitted","scope-valid","provenance-retained","inference-labeled","output-validated"]),state:"naturalized",
 integrates:Object.freeze(["system.data","system.information","system.node","system.tree","system.mind.map","system.parent","system.child","system.sibling","system.relationship","system.indexing","system.search","system.validation","system.verification"]),
 governs:Object.freeze(["entity-extraction","relationship-extraction","pattern-detection","candidate-link","frequency","co-occurrence","provenance","confidence"]),
 observedFactsAreAuthoritative:false,inferredCandidatesAreFacts:false,mutatesSource:false,executesInput:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfMineDataV36240(records=[]){
 const entities=new Map(),edges=new Map(),patterns=new Map();
 for(const [ri,raw] of records.entries()){const r=raw&&typeof raw==="object"?raw:{value:raw},source=String(r.source||`record-${ri}`),items=Array.isArray(r.entities)?r.entities:[];
  for(const x of items){const id=String(typeof x==="object"?x.id:x);if(!id)continue;const e=entities.get(id)||{id,count:0,sources:new Set()};e.count++;e.sources.add(source);entities.set(id,e)}
  const rels=Array.isArray(r.relationships)?r.relationships:[];for(const x of rels){if(!x||x.from==null||x.to==null)continue;const type=String(x.type||"related"),key=String(x.from)+"|"+type+"|"+String(x.to),e=edges.get(key)||{from:String(x.from),to:String(x.to),type,count:0,sources:new Set()};e.count++;e.sources.add(source);edges.set(key,e)}
  const ids=items.map(x=>String(typeof x==="object"?x.id:x)).filter(Boolean).sort();for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const key=ids[i]+"|"+ids[j],p=patterns.get(key)||{entities:[ids[i],ids[j]],count:0,sources:new Set()};p.count++;p.sources.add(source);patterns.set(key,p)}
 }
 const norm=x=>Object.freeze({...x,sources:Object.freeze([...x.sources].sort())});
 const entityList=Object.freeze([...entities.values()].map(norm).sort((a,b)=>a.id.localeCompare(b.id))),edgeList=Object.freeze([...edges.values()].map(norm).sort((a,b)=>(a.from+a.type+a.to).localeCompare(b.from+b.type+b.to)));
 const candidates=Object.freeze([...patterns.values()].filter(p=>p.count>1).map(p=>Object.freeze({entities:Object.freeze(p.entities),count:p.count,sources:Object.freeze([...p.sources].sort()),classification:"inferred-candidate",fact:false,confidence:Math.min(.99,p.count/records.length||0)})));
 return Object.freeze({system:"system.data-mining",records:records.length,entities:entityList,observedRelationships:edgeList,candidateLinks:candidates,sourceMutation:false,inputExecuted:false,authorityGranted:false});
}
function tfMiningRelationshipNodesV36240(mined){
 const nodes=(mined.entities||[]).map(e=>({id:e.id,parent:null,evidence:{count:e.count,sources:e.sources},classification:"observed-entity"}));
 const links=[...(mined.observedRelationships||[]).map(e=>({from:e.from,to:e.to,type:e.type,classification:"observed-relationship",fact:true,evidence:{count:e.count,sources:e.sources}})),
 ...(mined.candidateLinks||[]).map(e=>({from:e.entities[0],to:e.entities[1],type:"candidate-association",classification:"inferred-candidate",fact:false,confidence:e.confidence,evidence:{count:e.count,sources:e.sources}}))];
 return Object.freeze({nodes:Object.freeze(nodes),links:Object.freeze(links),nodeSystem:"system.node",treeSystem:"system.tree",mindMapSystem:"system.mind.map",sourceMutation:false,authorityGranted:false});
}
const TF_DATA_MINING_KIT_V36240=Object.freeze({id:"kit.data-mining",name:"Data Mining Kit",type:"intrinsic-kit",mode:"naturalized",members:Object.freeze(["system.data-mining","system.data","system.information","system.node","system.tree","system.mind.map","system.parent","system.child","system.sibling","system.relationship","system.indexing","system.search","system.validation","system.verification"]),intrinsic:true,plugin:false,module:false,grantsAuthority:false});

const TF_UNIFIED_NETWORK_PLAN_SYSTEM_V36240=Object.freeze({
 id:"system.network-plan",name:"Unified Network Plan System",family:"network",type:"deterministic-network-topology-plan",mode:"validated-nonexecuting",
 condition:Object.freeze(["private-address-valid","subnet-valid","nic-defined","security-policy-valid","routing-mode-valid","virtual-network-defined","vm-reference-defined"]),state:"naturalized",
 path:Object.freeze(["system.private-address-space","system.subnet","system.nic","system.firewall","system.nat","system.proxy","system.bridge","system.virtual-network","system.virtual-machine"]),
 mutatesHost:false,mutatesLan:false,executes:false,connects:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfUnifiedNetworkPlanV36240(spec={}){
 const subnet=tfSubnetDefinitionV36233(spec.cidr||"10.0.0.0/24");if(!subnet.terraformerPrivate)throw new Error("network plan requires Terraformer private subnet");
 const address=String(spec.address||subnet.firstUsable),allocation=tfPrivateAddressAllocationV36232(address,spec.usedAddresses||[]);
 if(!tfIpv4InCidrV36232(address,subnet.cidr))throw new Error("address outside selected subnet");
 const nic=tfVirtualNicDefinitionV36229({id:spec.nicId||"nic0",model:spec.nicModel||"virtio-net",mac:spec.mac||""});
 const firewall=tfFirewallPolicyV36234(spec.firewall||{defaultAction:"deny",rules:[]}),mode=String(spec.mode||"isolated").toLowerCase();
 const network=tfVirtualNetworkDefinitionV36229({id:spec.networkId||"vnet0",mode,backend:spec.backend||"",bridge:spec.bridge||""});
 const proxy=spec.proxy?tfProxyDefinitionV36234(spec.proxy):null,vmId=String(spec.vmId||"vm0");
 const topology={privateAddress:allocation.address,subnet:subnet.cidr,nic:nic.id,firewall:firewall.defaultAction,routing:mode,proxy:proxy&&proxy.id,bridge:mode==="bridge"?network.bridge:null,virtualNetwork:network.id,vm:vmId};
 const hash=crypto.createHash("sha256").update(tfStableForensicValueV36239(topology)).digest("hex");
 return Object.freeze({system:"system.network-plan",id:String(spec.id||"network-plan"),topology:Object.freeze(topology),subnet,allocation,nic,firewall,proxy,network,vm:Object.freeze({id:vmId}),
  hash,deterministic:true,validated:true,executed:false,connected:false,hostMutation:false,lanMutation:false,authorityGranted:false});
}
const TF_NETWORK_PLAN_KIT_V36240=Object.freeze({id:"kit.network-plan",name:"Unified Network Plan Kit",type:"intrinsic-kit",mode:"naturalized",members:Object.freeze(["system.network-plan","system.private-address-space","system.subnet","system.nic","system.firewall","system.nat","system.proxy","system.bridge","system.virtual-network","system.virtual-machine","system.security","system.validation","system.verification"]),intrinsic:true,plugin:false,module:false,grantsAuthority:false});

function tfDataMiningNetworkPlanSelfTestV36240(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of [...TF_DATA_MINING_KIT_V36240.members,...TF_NETWORK_PLAN_KIT_V36240.members])if(!ids.has(id))missing.push(id);
 const mined=tfMineDataV36240([{source:"a",entities:["root","child"],relationships:[{from:"root",to:"child",type:"parent"}]},{source:"b",entities:["root","child"]}]),projection=tfMiningRelationshipNodesV36240(mined);
 if(mined.entities.length!==2||mined.observedRelationships.length!==1||mined.candidateLinks.length!==1||mined.candidateLinks[0].fact!==false||projection.nodes.length!==2)missing.push("data-mining");
 const a=tfUnifiedNetworkPlanV36240({id:"p",cidr:"10.44.0.0/24",address:"10.44.0.10",vmId:"vm-a",mode:"nat",mac:"02:00:00:00:00:10"}),b=tfUnifiedNetworkPlanV36240({id:"p",cidr:"10.44.0.0/24",address:"10.44.0.10",vmId:"vm-a",mode:"nat",mac:"02:00:00:00:00:10"});
 if(a.hash!==b.hash||a.topology.privateAddress!=="10.44.0.10"||a.topology.subnet!=="10.44.0.0/24"||a.topology.routing!=="nat")missing.push("network-plan");
 if(a.executed||a.connected||a.hostMutation||a.lanMutation||a.authorityGranted||TF_DATA_MINING_SYSTEM_V36240.inferredCandidatesAreFacts)missing.push("boundaries");
 if(missing.length)throw new Error("data mining/network plan qualification failure "+missing.join(","));
 return Object.freeze({pass:true,dataMiningSystem:true,nodeIntegration:true,treeIntegration:true,mindMapIntegration:true,parentChildSiblingIntegration:true,observedVsInferredSeparated:true,candidateLinks:true,sourceMutation:false,
  networkPlanSystem:true,privateAddress:true,subnet:true,nic:true,firewall:true,natProxyBridge:true,virtualNetwork:true,virtualMachine:true,deterministicHash:true,executes:false,hostMutation:false,lanMutation:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.240 === */


 return Object.freeze({TF_DATA_MINING_KIT_V36240,TF_DATA_MINING_SYSTEM_V36240,TF_NETWORK_PLAN_KIT_V36240,TF_UNIFIED_NETWORK_PLAN_SYSTEM_V36240,tfDataMiningNetworkPlanSelfTestV36240,tfMineDataV36240,tfMiningRelationshipNodesV36240,tfUnifiedNetworkPlanV36240});
}
module.exports={bindDataMiningNetworkPlanV04470};

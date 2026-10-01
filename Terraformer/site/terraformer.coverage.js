"use strict";
const SYSTEM=Object.freeze({id:"system.coverage",concept:"Coverage",scaffold:true,automaticExecution:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});

function analyzeSystemGraphV04677(graph){
 const ids=[...new Set((graph.nodes||[]).map(String))], known=new Set(ids), adj=new Map(ids.map(x=>[x,new Set()])), rev=new Map(ids.map(x=>[x,new Set()]));
 const edges=[];
 for(const e of graph.edges||[]){const a=String(e.from||""),b=String(e.to||"");if(a!==b&&known.has(a)&&known.has(b)&&!adj.get(a).has(b)){adj.get(a).add(b);rev.get(b).add(a);edges.push(Object.freeze({from:a,to:b}))}}
 let seq=0;const index=new Map(),low=new Map(),stack=[],on=new Set(),components=[];
 function visit(v){index.set(v,seq);low.set(v,seq++);stack.push(v);on.add(v);for(const w of adj.get(v)){if(!index.has(w)){visit(w);low.set(v,Math.min(low.get(v),low.get(w)))}else if(on.has(w))low.set(v,Math.min(low.get(v),index.get(w)))}if(low.get(v)===index.get(v)){const c=[];for(;;){const w=stack.pop();on.delete(w);c.push(w);if(w===v)break}components.push(Object.freeze(c.sort()))}}
 for(const v of ids)if(!index.has(v))visit(v);
 const roundTripComponents=components.filter(x=>x.length>1),roundTripNodes=new Set(roundTripComponents.flat()),linked=ids.filter(x=>adj.get(x).size||rev.get(x).size);
 return Object.freeze({schema:"TERRAFORMER-SYSTEM-GRAPH-COVERAGE/1",nodes:ids.length,edges:edges.length,linkedNodes:linked.length,isolatedNodes:ids.length-linked.length,stronglyConnectedComponents:components.length,roundTripComponents:roundTripComponents.length,roundTripNodes:roundTripNodes.size,largestRoundTripComponent:Math.max(0,...roundTripComponents.map(x=>x.length)),linkCoverage:ids.length?linked.length/ids.length:0,roundTripCoverage:ids.length?roundTripNodes.size/ids.length:0,authorityGranted:false,qualificationInheritance:false});
}

module.exports=Object.freeze({analyzeSystemGraphV04677,SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfCrossCoverage(system){const known=new Set(Object.values(SYSTEM_REGISTRY).map(x=>x.id)),deps=[...(system.dependsOn||[])],resolved=deps.filter(x=>known.has(x)),external=deps.filter(x=>!known.has(x));return Object.freeze({schema:'TERRAFORMER-CROSS-COVERAGE/1',system:system.id,dependencies:Object.freeze(deps),resolved:Object.freeze(resolved),externalReferences:Object.freeze(external),structurallyCovered:resolved.length+external.length===deps.length,connectedCount:resolved.length})}


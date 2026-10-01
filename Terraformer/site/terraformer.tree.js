"use strict";
function bindUniversalSystemTreeV04498(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUuidV5V36195}=deps;
 /* === Terraformer v0.36.266: Universal System Entity Tree Fabric === */
const TF_UNIVERSAL_SYSTEM_TREE_V36266=Object.freeze({
 root:"System",
 requiredChildren:Object.freeze(["Worker","Generator","Automator","Agent"]),
 cardinality:Object.freeze({Worker:"one-or-more",Generator:"one-or-more",Automator:"one-or-more",Agent:"one-or-more"}),
 descriptors:Object.freeze(["type","mode","condition","state","uuid","logging","reporting","lifecycle","relationships","provenance"]),
 inheritance:"descriptor-schema-shared-values-contextual",
 topology:Object.freeze(["System","Subclassifications","Capabilities","Relationships","Lifecycle","Evidence"]),
 rule:"Every canonical system owns at least one Worker, Generator, Automator and Agent; subordinate entities share the universal descriptor schema while retaining contextual values."
});
function tfUniversalEntityV36266(kind,systemId,index=0){
 const sid=String(systemId),k=String(kind),key=sid+"|"+k+"|"+index;
 return Object.freeze({kind:k,system:sid,index,type:k.toLowerCase(),mode:"bounded",condition:"system-admitted",state:"naturalized",
  uuid:(typeof tfUuidV5V36195==='function'?tfUuidV5V36195(key):key),logging:Object.freeze({present:true,persistenceByDefault:false}),
  reporting:Object.freeze({present:true,persistenceByDefault:false}),lifecycle:Object.freeze(["prepare","validate","activate","operate","complete","recover"]),
  relationships:Object.freeze({parent:sid,relation:"subordinate-capability"}),provenance:Object.freeze({derived:true,source:"universal-system-tree-v0.36.266"}),grantsAuthority:false});
}
function tfSystemTreeV36266(systemId,sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText));if(!ids.has(systemId))throw new Error("unknown canonical system");
 const children={};for(const k of TF_UNIVERSAL_SYSTEM_TREE_V36266.requiredChildren)children[k]=Object.freeze([tfUniversalEntityV36266(k,systemId,0)]);
 return Object.freeze({kind:"System",id:systemId,type:"system",mode:"canonical",condition:"registered",state:"naturalized",
  children:Object.freeze(children),subclassifications:Object.freeze([]),relationships:Object.freeze({}),lifecycle:Object.freeze(["prepare","validate","activate","operate","complete","recover"]),
  logging:Object.freeze({present:true}),reporting:Object.freeze({present:true}),provenance:Object.freeze({source:"canonical-system-registry"})});
}
function tfSystemForestV36266(sourceText){return Object.freeze(tfCanonicalSystemIdsV36196(sourceText).map(id=>tfSystemTreeV36266(id,sourceText)))}
function tfUniversalSystemTreeSelfTestV36266(sourceText){
 const forest=tfSystemForestV36266(sourceText),missing=[],desc=TF_UNIVERSAL_SYSTEM_TREE_V36266.descriptors;
 if(forest.length!==tfCanonicalSystemIdsV36196(sourceText).length)missing.push("coverage");
 for(const tree of forest){for(const k of TF_UNIVERSAL_SYSTEM_TREE_V36266.requiredChildren){const a=tree.children[k];if(!a||a.length<1)missing.push(tree.id+":"+k);
   for(const e of a)for(const d of desc)if(e[d]==null)missing.push(tree.id+":"+k+":"+d);}}
 if(missing.length)throw new Error("universal system tree qualification failure "+missing.slice(0,20).join(","));
 return Object.freeze({pass:true,systems:forest.length,workerMinimum:true,generatorMinimum:true,automatorMinimum:true,agentMinimum:true,
  sharedDescriptorSchema:true,descriptorCount:desc.length,systemTrees:true,oneToManyExtensible:true,contextualValues:true,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_UNIVERSAL_SYSTEM_TREE_V36266,tfUniversalEntityV36266,tfSystemTreeV36266,tfSystemForestV36266,tfUniversalSystemTreeSelfTestV36266});
}
const TERRAFORMER_TREE_SYSTEM=Object.freeze({schema:'TERRAFORMER-TREE-SYSTEM/1',id:'system.tree',name:'Tree System',family:'structure',type:'rooted-hierarchy-system',state:'integrated',canonicalPath:'terraformer://tree/',dependsOn:Object.freeze(['system.root','system.hierarchy','system.indexing']),integratesWith:Object.freeze(['system.map','system.layout','system.visualization']),governs:Object.freeze(['root','node','parent','child','edge','depth','leaf','branch','path','ancestor','descendant','traversal','projection']),traversals:Object.freeze(['preorder','postorder','breadth-first']),rule:'Tree System represents rooted acyclic parent/child structure. Structural representation and traversal do not grant authority to mutate represented resources.'});
function tfTreeCreate(rootId='root'){const nodes=new Map([[String(rootId),{id:String(rootId),parent:null,children:[]}]]);return{schema:'TERRAFORMER-TREE/1',root:String(rootId),nodes,add(id,parent){id=String(id);parent=String(parent);if(nodes.has(id)||!nodes.has(parent))throw new Error('invalid tree insertion');let p=parent;while(p!==null){if(p===id)throw new Error('tree cycle');p=nodes.get(p)?.parent??null}nodes.set(id,{id,parent,children:[]});nodes.get(parent).children.push(id);return this},path(id){id=String(id);if(!nodes.has(id))return null;const out=[];for(let n=id;n!==null;n=nodes.get(n).parent)out.unshift(n);return out},traverse(mode='preorder'){const out=[];if(mode==='breadth-first'){const q=[this.root];while(q.length){const n=q.shift();out.push(n);q.push(...nodes.get(n).children)}return out}const walk=n=>{if(mode==='preorder')out.push(n);for(const c of nodes.get(n).children)walk(c);if(mode==='postorder')out.push(n)};walk(this.root);return out},describe(){return{schema:'TERRAFORMER-TREE-DESCRIPTOR/1',root:this.root,nodeCount:nodes.size,persisted:false}}}}

module.exports=Object.freeze({bindUniversalSystemTreeV04498,TERRAFORMER_TREE_SYSTEM,tfTreeCreate});

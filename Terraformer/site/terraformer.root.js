'use strict';
const TERRAFORMER_ROOT_SYSTEM=Object.freeze({schema:'TERRAFORMER-ROOT-SYSTEM/1',id:'system.root',name:'Root System',family:'structure',type:'structural-root-system',state:'integrated',canonicalPath:'terraformer://root/',dependsOn:Object.freeze(['system.hierarchy','system.indexing']),integratesWith:Object.freeze(['system.tree','system.uri','system.terraformer']),governs:Object.freeze(['root','anchor','namespace-root','structural-root','resolve','attach','detach','project']),authority:Object.freeze({structural:true,unixRoot:false,osPrivilege:false,authentication:false,ownershipAmplification:false}),rule:'Root System establishes structural anchors and namespace roots only. It is not Unix root, does not grant OS privilege or authentication authority, and does not amplify descendant authority.'});
function tfRootRegistry(){const roots=new Map();return{schema:'TERRAFORMER-ROOT-REGISTRY/1',roots,register(id,target,kind='structural'){id=String(id);if(!id||roots.has(id))throw new Error('invalid or duplicate root');roots.set(id,Object.freeze({id,target:String(target),kind:String(kind),structural:true,authorityAmplification:false}));return this},resolve(id){return roots.get(String(id))||null},list(){return [...roots.values()]},describe(){return{schema:'TERRAFORMER-ROOT-REGISTRY-DESCRIPTOR/1',count:roots.size,persisted:false}}}}


const TERRAFORMER_ACCESS_ROOT=Object.freeze({schema:'TERRAFORMER-ACCESS-ROOT/1',id:'root.terraformer.access',owner:'system.root',entry:'terraformer.js',channels:Object.freeze(['node','http','https']),structural:true,osPrivilege:false,authentication:false,authorization:false,automaticListen:false});
function tfAccessRoot(){return TERRAFORMER_ACCESS_ROOT;}

const TERRAFORMER_ROOTING_RELATIONSHIPS=Object.freeze([
 Object.freeze({from:'system.rooting',relation:'operates-on',to:'system.root'}),
 Object.freeze({from:'worker.rooter',relation:'performs',to:'system.rooting'}),
 Object.freeze({from:'worker.rooter',relation:'delegates-structural-mutation-to',to:'system.root'})
]);
module.exports=Object.freeze({TERRAFORMER_ROOTING_RELATIONSHIPS,TERRAFORMER_ACCESS_ROOT,tfAccessRoot,TERRAFORMER_ROOT_SYSTEM,tfRootRegistry});

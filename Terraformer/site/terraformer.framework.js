'use strict';
const fs=require('fs'),path=require('path');
const ID='system.framework',VERSION='0.44.10',BOUNDARY='SYSTEM_BOUNDARY';
const REGISTRY='terraformer.frameworks.json',KIND='FRAMEWORK_REGISTRY';function load(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.kind!==KIND||x.authority!==false)throw Error(ID+': invalid registry');return Object.freeze(x);}function resolve(id){if(typeof id!=='string'||!id)throw Error(ID+': invalid id');const r=load(),items=r.items||[];const item=items.find(x=>x.id===id);if(!item)throw Error(ID+': unknown');return Object.freeze({...item,authority:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
const TERRAFORMER_FRAMEWORK_SYSTEM=Object.freeze({schema:'TERRAFORMER-FRAMEWORK-SYSTEM/1',id:'system.framework',name:'Framework System',family:'software',type:'framework-system',state:'integrated',canonicalPath:'terraformer://framework/',dependsOn:Object.freeze(['system.program','system.system']),governs:Object.freeze(['framework','contract','component','extension','adapter','lifecycle','composition']),rule:'Framework System provides reusable structural and runtime contracts while preserving component authority boundaries and avoiding implicit dependency authority.'});

module.exports=Object.freeze({ID,VERSION,BOUNDARY,descriptor,load,resolve,TERRAFORMER_FRAMEWORK_SYSTEM});

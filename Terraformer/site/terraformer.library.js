'use strict';
const fs=require('fs'),path=require('path');
const ID='system.library',VERSION='0.44.10',BOUNDARY='SYSTEM_BOUNDARY';
const REGISTRY='terraformer.libraries.json',KIND='LIBRARY_REGISTRY';function load(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.kind!==KIND||x.authority!==false)throw Error(ID+': invalid registry');return Object.freeze(x);}function resolve(id){if(typeof id!=='string'||!id)throw Error(ID+': invalid id');const r=load(),items=r.items||[];const item=items.find(x=>x.id===id);if(!item)throw Error(ID+': unknown');return Object.freeze({...item,authority:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,descriptor,load,resolve});

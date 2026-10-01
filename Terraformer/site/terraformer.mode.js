'use strict';
const fs=require('fs'),path=require('path');
const ID='system.mode',VERSION='0.44.15',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='MODE',REGISTRY_FILE='terraformer.modes.json';
const ALIASES=Object.freeze(['MODE']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='MODE_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase();}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown '+DIMENSION.toLowerCase());return Object.freeze({...e,authority:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind);const r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);if(!e.applicability.includes(kind))throw Error(ID+': value not applicable');return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,selectionModel:'DEFINE_CENTRALLY_SELECT_LOCALLY',controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const r=registry(),q=select({id:'qualification.sample',kind:'SYSTEM'},r.entries[0].id);return Object.freeze({pass:q.scoped&&q.authority===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}
const TERRAFORMER_MODE_SYSTEM=Object.freeze({schema:'TERRAFORMER-MODE-SYSTEM/1',id:'system.mode',name:'Mode System',family:'state',type:'mode-system',state:'integrated',canonicalPath:'terraformer://mode/',dependsOn:Object.freeze(['system.state']),governs:Object.freeze(['mode','transition','entry','exit','availability']),rule:'Mode System represents bounded operating modes; a mode transition must satisfy its governing admission and state conditions.'});

module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,TERRAFORMER_MODE_SYSTEM});

'use strict';
const fs=require('fs'),path=require('path');
const ID='system.accuracy',VERSION='0.47.17',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='ACCURACY',REGISTRY_FILE='terraformer.accuracies.json';
const ALIASES=Object.freeze(['ACCURACY']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='ACCURACY_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase().replace(/[ -]+/g,'_');}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown accuracy');return Object.freeze({...e,authority:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind),r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,position:Object.freeze({after:'CONSISTENCY',before:null}),worker:'system.accuracy',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const q=select({id:'accuracy.sample',kind:'SYSTEM'},'UNKNOWN');return Object.freeze({pass:q.scoped&&q.authority===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}
const SYSTEM=Object.freeze({schema:'TERRAFORMER-ACCURACY-SYSTEM/1',id:ID,name:'Accuracy System',family:'dimension',type:'accuracy-dimension',state:'integrated',canonicalPath:'terraformer://accuracy/',worker:'system.accuracy',rule:"Accuracy describes correctness or precision against an explicit applicable reference or tolerance. It does not grant authority, approval, or qualification."});
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,SYSTEM});

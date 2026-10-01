'use strict';
const fs=require('fs'),path=require('path');
const ID='system.validation',VERSION='0.47.17',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='VALIDATION',REGISTRY_FILE='terraformer.validations.json';
const ALIASES=Object.freeze(['VALIDATION']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='VALIDATION_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase().replace(/[ -]+/g,'_');}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown validation');return Object.freeze({...e,authority:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind),r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,position:Object.freeze({after:'CONDITION',before:'VERIFICATION'}),worker:'system.validator',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const q=select({id:'validation.sample',kind:'SYSTEM'},'UNVALIDATED');return Object.freeze({pass:q.scoped&&q.authority===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}
const SYSTEM=Object.freeze({schema:'TERRAFORMER-VALIDATION-SYSTEM/1',id:ID,name:'Validation System',family:'dimension',type:'validation-dimension',state:'integrated',canonicalPath:'terraformer://validation/',worker:'system.validator',rule:"Validation establishes conformity to applicable schemas, rules, and constraints. It precedes Verification and grants no approval, authority, execution, or qualification by itself."});
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,SYSTEM});

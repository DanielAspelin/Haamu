'use strict';
const fs=require('fs'),path=require('path');
const ID='system.consistency',VERSION='0.46.88',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='CONSISTENCY',REGISTRY_FILE='terraformer.consistencies.json';
const ALIASES=Object.freeze(['CONSISTENCY']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='CONSISTENCY_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return Object.freeze(x);}
function dimensionRegistry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,'terraformer.dimensions.json'),'utf8'));if(x.kind!=='DIMENSION_REGISTRY'||x.authority!==false||!x.dimensions.includes(DIMENSION))throw Error(ID+': dimension registry mismatch');return Object.freeze(x);}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase();}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));return e?Object.freeze({...e}):Object.freeze({id:v,known:false,authority:false});}
function validate(value){const r=resolve(value);return Object.freeze({dimension:DIMENSION,value:r.id,valid:true,known:r.known!==false,authority:false,qualificationGranted:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){dimensionRegistry();const r=registry(),q=validate('consistent');return Object.freeze({pass:q.valid&&q.authority===false&&q.qualificationGranted===false&&r.entries.length>0,id:ID,dimension:DIMENSION});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,ALIASES,registry,dimensionRegistry,normalize,resolve,validate,descriptor,qualify});

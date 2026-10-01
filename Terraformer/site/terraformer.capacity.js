'use strict';
const fs=require('fs'),path=require('path');
const ID='system.capacity',VERSION='0.47.74',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='CAPACITY',REGISTRY_FILE='terraformer.capacities.json';
const ALIASES=Object.freeze(['CAPACITY']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='CAPACITY_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return Object.freeze(x);}
function dimensionRegistry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,'terraformer.dimensions.json'),'utf8'));if(x.kind!=='DIMENSION_REGISTRY'||x.authority!==false||!x.dimensions.includes(DIMENSION))throw Error(ID+': dimension registry mismatch');return Object.freeze(x);}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase();}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));return e?Object.freeze({...e}):Object.freeze({id:v,known:false,authority:false});}
function validate(value){const r=resolve(value);return Object.freeze({dimension:DIMENSION,value:r.id,valid:true,known:r.known!==false,authority:false,qualificationGranted:false,allocationGranted:false,accessGranted:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}

function capacityType(id){const r=registry(),v=normalize(id),t=(r.types||[]).find(x=>x.id===v);return t?Object.freeze({...t}):null;}
function checkDistribution(bytes){if(!Number.isSafeInteger(bytes)||bytes<0)throw Error(ID+': invalid distribution bytes');const t=capacityType('DISTRIBUTION');if(!t)throw Error(ID+': DISTRIBUTION capacity type missing');return Object.freeze({type:t.id,bytes,limitBytes:t.hardLimitBytes,withinLimit:bytes<=t.hardLimitBytes,remainingBytes:Math.max(0,t.hardLimitBytes-bytes),authority:false});}
function qualify(){dimensionRegistry();const r=registry(),q=validate('available');return Object.freeze({pass:q.valid&&q.authority===false&&q.qualificationGranted===false&&q.allocationGranted===false&&q.accessGranted===false&&r.entries.length>0,id:ID,dimension:DIMENSION});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,ALIASES,registry,dimensionRegistry,normalize,resolve,validate,descriptor,capacityType,checkDistribution,qualify});

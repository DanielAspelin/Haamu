'use strict';
const fs=require('fs'),path=require('path');
const ID='system.criticality',VERSION='0.47.75',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='CRITICALITY',REGISTRY_FILE='terraformer.criticalities.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='CRITICALITY_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return Object.freeze(x);}
function normalize(v){if(typeof v!=='string'||!v.trim())throw Error(ID+': invalid value');return v.trim().toUpperCase().replace(/[ -]+/g,'_');}
function resolve(v){const n=normalize(v),e=registry().entries.find(x=>x.id===n||(x.aliases||[]).includes(n));if(!e)throw Error(ID+': unknown criticality');return Object.freeze({...e});}
function assess(declared,qualified){const d=resolve(declared),q=resolve(qualified);return Object.freeze({dimension:DIMENSION,declared:d.id,qualified:q.id,declarationIsQualification:false,authority:false,bypassGranted:false,emergencyPowersGranted:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,position:Object.freeze({after:'ACCURACY',before:null}),authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const x=assess('MISSION_CRITICAL','PRODUCTION');return Object.freeze({pass:x.declarationIsQualification===false&&x.authority===false&&x.bypassGranted===false&&x.emergencyPowersGranted===false,id:ID,dimension:DIMENSION});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,registry,normalize,resolve,assess,descriptor,qualify});

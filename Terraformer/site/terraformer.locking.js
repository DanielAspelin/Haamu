'use strict';
const fs=require('fs'),path=require('path');
const ID='system.locking',VERSION='0.47.21',DIMENSION='LOCKING',REGISTRY_FILE='terraformer.lockings.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='LOCKING_REGISTRY'||x.owner!==ID||x.locksAppliedByRegistry!==false)throw Error(ID+': registry mismatch');return x;}
function resolve(v){const x=String(v||'').trim().toUpperCase().replace(/[ -]+/g,'_'),e=registry().entries.find(y=>y.id===x);if(!e)throw Error(ID+': unknown locking value');return Object.freeze({...e});}
function select(consumer,v){if(!consumer||typeof consumer.id!=='string')throw Error(ID+': invalid consumer');const e=resolve(v);return Object.freeze({consumer:consumer.id,dimension:DIMENSION,value:e.id,descriptive:true,lockMechanism:'system.lock',lockOperationPerformed:false,authority:false});}
function describe(){return Object.freeze({id:ID,dimension:DIMENSION,position:Object.freeze({after:'MODE',before:'CONDITION'}),mechanism:'system.lock',values:Object.freeze(registry().entries.map(x=>x.id)),locksApplied:false,authority:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:'DIMENSION_BOUNDARY',dimension:DIMENSION,registry:REGISTRY_FILE,position:Object.freeze({after:'MODE',before:'CONDITION'}),authority:false});}
function qualify(){const x=select({id:'sample'},'UNLOCKED');return Object.freeze({pass:x.value==='UNLOCKED'&&!x.lockOperationPerformed&&!x.authority,id:ID});}
module.exports=Object.freeze({ID,VERSION,DIMENSION,REGISTRY_FILE,registry,resolve,select,describe,descriptor,qualify});

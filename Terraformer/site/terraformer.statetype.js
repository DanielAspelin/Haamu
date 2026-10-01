'use strict';
const fs=require('fs'),path=require('path');
const ID='system.statetype',VERSION='0.47.30',REGISTRY_FILE='terraformer.statetypes.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='STATE_TYPE_REGISTRY'||x.owner!==ID||x.isDimension!==false||x.isStateValue!==false||x.authority!==false)throw Error(ID+': registry mismatch');return x;}
function resolve(v){const n=String(v||'').trim().toUpperCase().replace(/[ -]+/g,'_'),e=registry().entries.find(x=>x.id===n);if(!e)throw Error(ID+': unknown state type');return Object.freeze({...e});}
function evaluate(v,condition){const e=resolve(v);if(e.id!=='CONDITIONAL')throw Error(ID+': unsupported evaluator');const satisfied=condition&&condition.satisfied===true;return Object.freeze({stateType:e.id,satisfied,conditionId:condition&&condition.id||null,automaticTransition:false,authority:false});}
function describe(){return Object.freeze({id:ID,classification:'STATE_TYPE',types:Object.freeze(registry().entries.map(x=>x.id)),isDimension:false,isStateValue:false,authority:false});}
function qualify(){const a=evaluate('CONDITIONAL',{id:'test',satisfied:true}),b=evaluate('CONDITIONAL',{id:'test',satisfied:false});return Object.freeze({pass:a.satisfied&&!b.satisfied&&!a.automaticTransition,id:ID,count:1});}
module.exports=Object.freeze({ID,VERSION,REGISTRY_FILE,registry,resolve,evaluate,describe,qualify});

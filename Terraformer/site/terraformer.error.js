'use strict';
const fs=require('fs'),path=require('path');
const ID='system.error',VERSION='0.44.13',BOUNDARY='SYSTEM_BOUNDARY',REGISTRY='terraformer.errors.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.kind!=='ERROR_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.errors))throw Error('ERROR_REGISTRY_INVALID');return Object.freeze(x)}
function normalize(e,context={}){if(!(e instanceof Error)&&(!e||typeof e!=='object'))throw Error('ERROR_EVIDENCE_INVALID');const name=String(e.name||'Error'),message=String(e.message||e.code||'UNKNOWN_ERROR'),code=String(e.code||name).toUpperCase();return Object.freeze({code,name,message,context:Object.freeze({...context}),original:Object.freeze({name,message,code:e.code??null}),status:'ERROR',success:false,authority:false})}
function propagate(record,stage){if(!record||record.status!=='ERROR'||record.success!==false)throw Error('ERROR_RECORD_INVALID');return Object.freeze({...record,propagation:Object.freeze([...(record.propagation||[]),String(stage)]),status:'ERROR',success:false,authority:false})}
function resolve(id){const x=registry(),v=x.errors.find(t=>t.id===id);if(!v)throw Error('ERROR_UNKNOWN:'+id);return Object.freeze({...v,authority:false})}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'})}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,REGISTRY,registry,normalize,propagate,resolve,descriptor});

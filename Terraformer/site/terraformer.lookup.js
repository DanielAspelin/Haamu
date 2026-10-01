'use strict';
const fs=require('fs'),path=require('path');
const ID='system.lookup',VERSION='0.47.18',REGISTRY_FILE='terraformer.lookups.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.owner!==ID||x.authority!==false)throw Error('lookup registry mismatch');return x;}
function describe(){return Object.freeze({schema:'TERRAFORMER-LOOKUP-SYSTEM/1',id:ID,name:'Lookup System',family:'information',type:'lookup-system',canonicalPath:'terraformer://lookup/',stateDimension:'system.state',activeState:'ACTIVE',authority:false,persistence:false,externalEffect:false,rule:'Lookup retrieves admitted information from registered sources. Active is a State of Lookup, not a separate System identity.'});}
function lookup(query='',source=[] ,options={}){const state=String(options.state||'ACTIVE').toUpperCase();if(state!=='ACTIVE')return Object.freeze({system:ID,state,active:false,query:String(query),results:Object.freeze([]),authority:false});const q=String(query).trim().toLowerCase(),items=Array.isArray(source)?source:[];const results=items.filter(x=>!q||JSON.stringify(x).toLowerCase().includes(q));return Object.freeze({system:ID,state:'ACTIVE',active:true,query:String(query),results:Object.freeze(results),authority:false,persisted:false,externalEffect:false});}
function selfTest(){const x=lookup('beta',[{id:'alpha'},{id:'beta'}]);return Object.freeze({pass:x.active&&x.state==='ACTIVE'&&x.results.length===1&&x.authority===false});}
module.exports=Object.freeze({ID,VERSION,REGISTRY_FILE,registry,describe,lookup,selfTest});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfHomeLookup(query='',options={}){const q=String(query).trim().toLowerCase(),kind=String(options.kind||'').trim().toLowerCase(),limit=Math.max(1,Math.min(5000,Number(options.limit||250)));const found=TF_HOME_DISCOVERY_STATE.entries.filter(e=>(!q||e.relativePath.toLowerCase().includes(q)||e.name.toLowerCase().includes(q)||e.serviceRelevance.toLowerCase().includes(q))&&(!kind||e.kind===kind)).slice(0,limit);return {schema:'TERRAFORMER-HOME-LOOKUP/1',state:TF_HOME_DISCOVERY_STATE.state,generation:TF_HOME_DISCOVERY_STATE.generation,query:q,kind:kind||null,totalIndexed:TF_HOME_DISCOVERY_STATE.entries.length,resultCount:found.length,results:found,volatile:true,contentRead:false};}


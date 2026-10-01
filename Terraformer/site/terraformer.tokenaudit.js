'use strict';
const fs=require('fs'),path=require('path');
const ID='system.tokenaudit',VERSION='0.47.79',REGISTRY='terraformer.tokenaudits.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.owner!==ID||x.authorityGranted!==false||!Array.isArray(x.records))throw Error(ID+': registry mismatch');return Object.freeze(x);}
function find(identity){if(typeof identity!=='string'||!identity.trim())throw Error(ID+': invalid identity');const r=registry().records.find(x=>x.identity===identity);return r?Object.freeze(r):null;}
function unresolved(identity){const r=find(identity);if(!r)return Object.freeze(['Token']);return Object.freeze(Object.entries(r.stages).filter(([,v])=>v==='UNRESOLVED'||v==='UNVERIFIED').map(([k])=>k));}
function surface(){const s=registry().summary;return Object.freeze({previous:s.previousUnresolvedSurface,current:s.currentUnresolvedSurface,reduction:s.unresolvedReduction,conceptFilesAdded:s.conceptFilesAdded});}
function coverage(){const r=registry();let observed=0,total=0;for(const x of r.records)for(const v of Object.values(x.stages)){total++;if(v==='OBSERVED')observed++;}return Object.freeze({tokens:r.records.length,observed,total,ratio:total?observed/total:0,semanticCompletenessClaimed:false,authority:false});}
function qualify(){const r=registry(),c=coverage();return Object.freeze({pass:r.records.length>0&&r.authorityGranted===false&&c.semanticCompletenessClaimed===false,id:ID,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,REGISTRY,registry,find,unresolved,surface,coverage,qualify});

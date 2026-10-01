'use strict';
const fs=require('fs'),path=require('path');
const ID='system.condition',VERSION='0.44.15',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='CONDITION',REGISTRY_FILE='terraformer.conditions.json';
const ALIASES=Object.freeze(['CONDITION']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='CONDITION_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase();}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown '+DIMENSION.toLowerCase());return Object.freeze({...e,authority:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind);const r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);if(!e.applicability.includes(kind))throw Error(ID+': value not applicable');return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,selectionModel:'DEFINE_CENTRALLY_SELECT_LOCALLY',controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const r=registry(),q=select({id:'qualification.sample',kind:'SYSTEM'},r.entries[0].id);return Object.freeze({pass:q.scoped&&q.authority===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}
const TERRAFORMER_CONDITION_SYSTEM=Object.freeze({schema:'TERRAFORMER-CONDITION-SYSTEM/1',id:'system.condition',name:'Condition System',family:'logic',type:'condition-system',state:'integrated',canonicalPath:'terraformer://condition/',governs:Object.freeze(['condition','predicate','evidence','satisfied','unsatisfied','unknown']),rule:'Condition System evaluates admitted predicates against available evidence and preserves unknown when evidence is insufficient.'});

module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,TERRAFORMER_CONDITION_SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfWakeCondition(id,reason='explicit-wake'){const k=String(id),r={id:k,reason:String(reason),admitted:true,createdAt:Date.now(),consumed:false};TF_LIFECYCLE_MECHANISMS.wakeConditions.set(k,r);return r;}


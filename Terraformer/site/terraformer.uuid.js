'use strict';
const crypto=require('crypto');
const SYSTEM=Object.freeze({id:'system.uuid',name:'UUID System',version:'0.44.29',authority:false,authentication:false,authorization:false,ownership:false});
const NAMESPACE_V36195='b3bb5e4e-59d8-5fcb-8b4d-12e7f24e6c95';
function bytesV36195(uuid){const h=String(uuid).replace(/-/g,'');if(!/^[0-9a-f]{32}$/i.test(h))throw new Error('invalid UUID');return Buffer.from(h,'hex');}
function formatV36195(b){const h=Buffer.from(b).toString('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`; }
function v5V36195(name,namespace=NAMESPACE_V36195){const ns=bytesV36195(namespace),digest=crypto.createHash('sha1').update(ns).update(String(name),'utf8').digest(),b=Buffer.from(digest.subarray(0,16));b[6]=(b[6]&0x0f)|0x50;b[8]=(b[8]&0x3f)|0x80;return formatV36195(b);}
function v4V36195(){return crypto.randomUUID();}
function validateV36195(v){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(v));}
function identityV36195(kind,id){return v5V36195(`${kind}:${String(id)}`);}
function generatorV36195(spec={}){if(spec.mode==='runtime'||spec.random===true)return v4V36195();if(spec.name===undefined)throw new TypeError('stable UUID name required');return v5V36195(String(spec.name),spec.namespace||NAMESPACE_V36195);}
function withUuidV36195(kind,entity,idHint){if(!entity||typeof entity!=='object')throw new TypeError('entity required');if(entity.uuid&&validateV36195(entity.uuid))return entity;const id=idHint??entity.id??entity.name??JSON.stringify(entity);return Object.assign({},entity,{uuid:identityV36195(kind,id)});}
function reconcileCollectionV36195(kind,items){if(!Array.isArray(items))return [];return items.map((x,i)=>withUuidV36195(kind,x,x?.id??x?.name??i));}
const LEGACY_SYSTEM_V36195=Object.freeze({id:'system.uuid',uuid:identityV36195('system','system.uuid'),name:'UUID System',versions:Object.freeze(['v4','v5']),stableArchitecture:'UUIDv5',runtimeInstances:'UUIDv4',capabilities:Object.freeze(['uuid.generate','uuid.derive','uuid.validate','uuid.assign','uuid.reconcile'])});
const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function generate(){return crypto.randomUUID();}
function validate(value){return UUID_RE.test(String(value||''));}
function record(subject,meta={}){const uuid=generate();return Object.freeze({uuid,subject:String(subject||'unresolved'),scheme:'UUID_V4',provenance:String(meta.provenance||'terraformer.uuid.generate'),status:'GENERATED',authority:false,authentication:false,authorization:false,ownership:false,qualificationGranted:false});}
function qualify(){const a=generate(),b=generate(),s1=generatorV36195({name:'system:test'}),s2=generatorV36195({name:'system:test'});return {pass:validate(a)&&validate(b)&&a!==b&&s1===s2&&validateV36195(s1),authorityGranted:false,authentication:false,authorization:false,stable:'UUIDv5',runtime:'UUIDv4'};}
module.exports=Object.freeze({SYSTEM,generate,validate,record,qualify,NAMESPACE_V36195,bytesV36195,formatV36195,v5V36195,v4V36195,validateV36195,identityV36195,generatorV36195,withUuidV36195,reconcileCollectionV36195,LEGACY_SYSTEM_V36195});

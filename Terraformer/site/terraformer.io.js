'use strict';
const ID='terraformer.io',VERSION='0.44.4';
function normalize(x){if(!x||typeof x!=='object'||Array.isArray(x))throw Error('IO_OPERATION_INVALID');return Object.freeze({type:String(x.type||'UNSPECIFIED'),authorized:x.authorized===true,validated:x.validated===true,qualified:x.qualified===true,payload:x.payload});}
function admit(x){const o=normalize(x);if(!(o.authorized&&o.validated&&o.qualified))throw Error('IO_OPERATION_NOT_ADMITTED');return Object.freeze({admitted:true,boundary:'IO_BOUNDARY',type:o.type,payload:o.payload});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:'IO_BOUNDARY',responsibility:'generic input/output normalization and admission',authority:'BOUNDARY_ONLY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function bindIONaturalizationV04664(deps={}){
 const systemRegistry=()=>typeof deps.getSystemRegistry==='function'?deps.getSystemRegistry():(deps.SYSTEM_REGISTRY||{});
const TERRAFORMER_IO_IMPORT=Object.freeze({schema:'TERRAFORMER-IO-IMPORT/1',source:'IO v0.128.0',archiveSha256:'ab932e2f9baca19f67880d58aad753f817a2b2fa1cc260773a9225b6b8a7ee49',archiveSize:2755261,artifactCount:2044,get archiveBase64(){return tfCanonicalPayloadV36202('p1')},get manifestBase64(){return tfCanonicalPayloadV36202('p2')},automaticExecution:false,qualificationInheritance:false,authorityTransfer:false});
function tfIOManifest(){return Object.freeze(JSON.parse(Buffer.from(TERRAFORMER_IO_IMPORT.manifestBase64,'base64').toString('utf8')).map(Object.freeze))}
function tfIOArchive(){const b=Buffer.from(TERRAFORMER_IO_IMPORT.archiveBase64,'base64'),sha=require('crypto').createHash('sha256').update(b).digest('hex');return Object.freeze({ok:sha===TERRAFORMER_IO_IMPORT.archiveSha256&&b.length===TERRAFORMER_IO_IMPORT.archiveSize,sha256:sha,size:b.length,artifacts:TERRAFORMER_IO_IMPORT.artifactCount})}
const TERRAFORMER_IO_NATIVE_BOUNDARY=Object.freeze({schema:'TERRAFORMER-IO-NATIVE-BOUNDARY/1',source:'IO v0.128.0',host:'terraformer.js',nativeLanguages:Object.freeze(['c','assembly','cpp']),role:'subordinate-native-implementation',abi:'narrow-admitted-adapter',automaticExecution:false,authorityTransfer:false,qualificationInheritance:false,rule:'IO native code remains native implementation evidence behind admitted Terraformer functions. Import does not execute, translate, promote, or grant authority to native artifacts.'});
function tfIOCanonicalOwner(path){
 const p=String(path).toLowerCase();
 const rules=[
  [/language_reference|language_structure|linguist|language/,'system.language'],
  [/tool_registry|tool_reconciliation|io-tool|tool/,'system.tool'],
  [/socket|tcp|udp|network|connection/,'system.network'],
  [/session/,'system.authorization'],
  [/transfer|transmission|handoff/,'system.communication'],
  [/allocat/,'system.allocator'],
  [/memory/,'system.memory'],
  [/storage|file|filesystem/,'system.storage'],
  [/process|dispatch|concurr|parallel|scheduler|clock/,'system.processing'],
  [/bridge|grid|mesh|matrix|ring|chain/,'system.relation'],
  [/build|makefile|compiler|linker|assembly|\.s$|\.c$|\.cpp$|\.h$/,'system.tool']
 ];
 for(const [rx,id] of rules)if(rx.test(p))return id;
 return 'system.integration';
}
function tfIONaturalizationMap(){const groups={};for(const x of tfIOManifest()){const owner=tfIOCanonicalOwner(x.path);(groups[owner]||(groups[owner]=[])).push(Object.freeze({path:x.path,sha256:x.sha256,size:x.size,kind:x.kind,native:['c-source','c-header','assembly-source','cpp-source','build-object'].includes(x.kind)}))}return Object.freeze(Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,Object.freeze(v)])))}
function tfIONaturalizationAudit(){const m=tfIOManifest(),map=tfIONaturalizationMap(),owners=new Set(Object.values(systemRegistry()).map(x=>x.id)),native=m.filter(x=>['c-source','c-header','assembly-source','cpp-source','build-object'].includes(x.kind)),mapped=Object.values(map).reduce((n,a)=>n+a.length,0),missing=Object.keys(map).filter(x=>!owners.has(x));return Object.freeze({schema:'TERRAFORMER-IO-NATURALIZATION-AUDIT/1',source:'IO v0.128.0',artifacts:m.length,mapped,canonicalOwners:Object.freeze(Object.fromEntries(Object.entries(map).map(([k,v])=>[k,v.length]))),missingOwners:Object.freeze(missing),nativeArtifacts:native.length,archive:tfIOArchive(),nativeBoundary:TERRAFORMER_IO_NATIVE_BOUNDARY,noParallelOntology:Object.keys(map).every(x=>!x.startsWith('system.io.')),automaticExecution:false,qualificationInheritance:false,authorityTransfer:false})}
 return Object.freeze({TERRAFORMER_IO_IMPORT,tfIOManifest,tfIOArchive,TERRAFORMER_IO_NATIVE_BOUNDARY,tfIOCanonicalOwner,tfIONaturalizationMap,tfIONaturalizationAudit});
}
module.exports=Object.freeze({ID,VERSION,descriptor,normalize,admit,bindIONaturalizationV04664});

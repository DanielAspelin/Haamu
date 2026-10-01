'use strict';
const ID='terraformer.core',VERSION='0.44.10';
const descriptor=Object.freeze({id:ID,version:VERSION,system:'system.terraformer',boundary:'CORE_BOUNDARY',authority:'GOVERNED_PROJECTION',authoritativeMonolith:'terraformer.js',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});
function describe(){return descriptor;}
function assertRoute(r){if(!r||r.authorized!==true||r.validated!==true)throw Error('CORE_ROUTE_NOT_ADMITTED');return true;}
function canonicalModuleDescriptor(m){if(!m)throw Error('CORE_MODULE_DESCRIPTOR_MISSING');const d=typeof m.descriptor==='function'?m.descriptor():m.descriptor;if(!d||typeof d!=='object'||Array.isArray(d))throw Error('CORE_MODULE_DESCRIPTOR_INVALID');return d;}
function validateModule(m,b){const d=canonicalModuleDescriptor(m);if(typeof b!=='string'||!b||d.boundary!==b)throw Error('CORE_MODULE_BOUNDARY_MISMATCH');return true;}
function loadStructuralRegistry(n){if(!['boundaries','dimensions'].includes(n))throw Error('unsupported structural registry');const x=JSON.parse(require('fs').readFileSync(require('path').join(__dirname,'terraformer.'+n+'.json'),'utf8'));if(x.authority!==false)throw Error('invalid structural registry');return Object.freeze(x);}
function validateBoundaryType(t){const r=loadStructuralRegistry('boundaries');if(typeof t!=='string'||!r.types.includes(t))throw Error('CORE_BOUNDARY_TYPE_INVALID');return true;}
function route(m,b,r){validateModule(m,b);assertRoute(r);return Object.freeze({pass:true,module:canonicalModuleDescriptor(m).id,boundary:b,authority:false});}
module.exports=Object.freeze({ID,VERSION,descriptor,describe,assertRoute,canonicalModuleDescriptor,validateModule,loadStructuralRegistry,validateBoundaryType,route});

/* v0.44.20 — qualified legacy modular-bootstrap ownership migration. */
function legacyModulesV0431(){
 const io=require('./terraformer.io.js'),nodejs=require('./terraformer.nodejs.js');
 validateModule(io,'IO_BOUNDARY'); validateModule(nodejs,'NODEJS_HOST_BOUNDARY');
 return Object.freeze({version:'0.43.1',core:module.exports,io,nodejs,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});
}
const TERRAFORMER_CORE_SYSTEM=Object.freeze({schema:'TERRAFORMER-CORE-SYSTEM/1',id:'system.core',name:'Core System',family:'terraformer',type:'foundational-integration-system',state:'integrated',canonicalPath:'terraformer://core/',parent:'system.terraformer',dependsOn:Object.freeze(['system.runtime','system.computation']),integratesWith:Object.freeze(['system.operating','system.root','system.event','system.history']),governs:Object.freeze(['identity','runtime','lifecycle','registry','computation','integration','admission','verification']),authority:'bounded-composition-only',rule:'Core System composes foundational admitted Terraformer capabilities. It is not a super-authority and cannot bypass system, security, operating-system, persistence, or external-effect boundaries.'});
function tfCoreDescribe(){return Object.freeze({schema:'TERRAFORMER-CORE-DESCRIPTOR/1',id:TERRAFORMER_CORE_SYSTEM.id,parent:TERRAFORMER_CORE_SYSTEM.parent,authority:TERRAFORMER_CORE_SYSTEM.authority,components:Object.freeze([...TERRAFORMER_CORE_SYSTEM.dependsOn,...TERRAFORMER_CORE_SYSTEM.integratesWith]),persisted:false})}

module.exports=Object.freeze({...module.exports,legacyModulesV0431,TERRAFORMER_CORE_SYSTEM,tfCoreDescribe});

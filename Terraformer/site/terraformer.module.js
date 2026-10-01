"use strict";
const SYSTEM=Object.freeze({id:"system.module",concept:"Module",authorityGranted:false,scaffold:true});
function bindModuleV04508(){return Object.freeze({SYSTEM});}
const TERRAFORMER_MODULE_SYSTEM=Object.freeze({schema:'TERRAFORMER-MODULE-SYSTEM/1',id:'system.terraformer.module',name:'Terraformer Module System',parent:'system.terraformer',family:'integration',type:'module-system',mode:'bounded-composition',condition:'integrated',state:'active-or-lifecycle-governed',canonicalPath:'terraformer://terraformer/module/',authority:'inherits-only-admitted-capabilities',governs:Object.freeze(['module','manifest','capability','adapter','binding','input','output','lifecycle','qualification']),rule:'A Terraformer module is a bounded integration unit around admitted Terraformer capabilities. Modules do not create authority and providers do not own Terraformer modules.'});

const TERRAFORMER_MODULE_REGISTRY=new Map();

function tfModuleRegister(spec={}){const key=String(spec.key||'').trim().toLowerCase();if(!/^[a-z][a-z0-9]*$/.test(key))return {ok:false,reason:'invalid-module-key'};if(TERRAFORMER_MODULE_REGISTRY.has(key))return {ok:false,reason:'module-exists'};const m=Object.freeze({schema:'TERRAFORMER-MODULE/1',id:'module.'+key,key,name:String(spec.name||key),parent:'system.terraformer.module',type:'terraformer-module',state:'registered',capabilities:Object.freeze([...(spec.capabilities||[])].map(String)),input:Object.freeze([...(spec.input||[])].map(String)),output:Object.freeze([...(spec.output||[])].map(String)),adapters:Object.freeze([...(spec.adapters||[])].map(String)),authority:'admitted-capabilities-only',canonicalPath:'terraformer://terraformer/module/'+key+'/'});TERRAFORMER_MODULE_REGISTRY.set(key,m);return {ok:true,module:m}}

function tfModuleGet(key){return TERRAFORMER_MODULE_REGISTRY.get(String(key||'').toLowerCase())||null}

function tfModuleList(){return [...TERRAFORMER_MODULE_REGISTRY.values()]}

module.exports=Object.freeze({bindModuleV04508,TERRAFORMER_MODULE_SYSTEM,TERRAFORMER_MODULE_REGISTRY,tfModuleRegister,tfModuleGet,tfModuleList});

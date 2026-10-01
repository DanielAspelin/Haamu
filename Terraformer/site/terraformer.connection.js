"use strict";
const CONNECTION_SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CONNECTION-SYSTEM/1",
 id:"system.connection",name:"Connection System",family:"infrastructure",
 type:"connection-system",state:"integrated",scope:"connection",
 physicalConnection:false,automaticConnect:false,automaticListen:false,
 transmission:false,externalExposure:false,authorityGranted:false
});
function describeConnection(spec={}){
 const source=String(spec.source??""),target=String(spec.target??"");
 return Object.freeze({system:"system.connection",source,target,endpointsIdentified:Boolean(source&&target),
  logical:Boolean(source&&target),connected:false,physicalConnection:false,automaticConnect:false,
  transmits:false,executes:false,mutates:false,authorityGranted:false});
}
function bindConnectionV04536(){return Object.freeze({CONNECTION_SYSTEM,describeConnection});}
module.exports=Object.freeze({bindConnectionV04536});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfConnection(kind,id,options={}){kind=String(kind||'wire').toLowerCase();const system=TF_CONNECTION_SYSTEM_BY_KIND[kind];if(!system)throw new Error('unsupported connection kind: '+kind);id=String(id||'').trim();if(!id)throw new Error('connection id required');return Object.freeze({schema:'TERRAFORMER-CONNECTION/1',system:system.id,kind,id,from:options.from==null?null:String(options.from),to:options.to==null?null:String(options.to),socket:options.socket==null?null:String(options.socket),plug:options.plug==null?null:String(options.plug),scope:options.scope==null?null:String(options.scope),capabilities:Object.freeze([...(options.capabilities||[])].map(String)),compatible:options.compatible!==false,connected:false,loaded:false,executed:false,persisted:false,authorityGranted:false});}

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TF_CONNECTION_KINDS=Object.freeze(['wiring','wire','socket','plug','plugin']);

/* Terraformer v0.48.14: promoted dependency-closed declaration migration. */
const TF_CONNECTION_SYSTEMS=Object.freeze(TF_CONNECTION_KINDS.map(kind=>Object.freeze({schema:'TERRAFORMER-CONNECTION-SYSTEM/1',id:'system.'+kind,name:(kind==='plugin'?'Plugin':kind[0].toUpperCase()+kind.slice(1))+' System',family:'infrastructure',type:'connection-system',state:'integrated',uri:'terraformer://system/'+kind,governs:Object.freeze(['connection-definition','endpoint-description','compatibility-check','scope-binding','capability-binding','connection-validation','connection-audit']),capabilities:Object.freeze(['define','describe','match','bind-scope','bind-capability','validate','audit']),dependsOn:Object.freeze(['system.scope','system.capability']),integratesWith:Object.freeze(['system.selection','system.boundary','system.context']),rule:'Connection metadata describes potential composition only; it does not open sockets, load plugins, execute code, persist changes, grant authority, or bypass capability and scope boundaries.'})));

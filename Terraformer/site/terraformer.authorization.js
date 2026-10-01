"use strict";
function bindAuthorizationV04481(){
 const SYSTEM=Object.freeze({id:"system.authorization",name:"Authorization System",type:"authorization-system",state:"naturalized",authorityGranted:false,automaticExecution:false,persistence:false});
 return Object.freeze({SYSTEM});
}
module.exports={bindAuthorizationV04481};

const TERRAFORMER_AUTHORIZATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-AUTHORIZATION-SYSTEM/1',id:'system.authorization',name:'Authorization System',family:'security',type:'authorization-system',state:'integrated',canonicalPath:'terraformer://authorization/',dependsOn:Object.freeze(['system.authentication']),governs:Object.freeze(['subject','action','resource','scope','policy','decision']),rule:'Authorization System decides whether an authenticated or otherwise admitted subject may perform a bounded action; it cannot self-authorize or exceed governing authority.'});

Object.assign(module.exports,{TERRAFORMER_AUTHORIZATION_SYSTEM});

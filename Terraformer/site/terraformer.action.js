"use strict";
const SYSTEM=Object.freeze({id:"system.action",concept:"Action",type:"action-system",executionImplied:false,externalActionImplied:false,mutationImplied:false,authorityGranted:false});
const TERRAFORMER_ACTION_SYSTEM=Object.freeze({schema:'TERRAFORMER-ACTION-SYSTEM/1',id:'system.action',name:'Action System',family:'interaction',type:'action-system',state:'integrated',canonicalPath:'terraformer://action/',dependsOn:Object.freeze(['system.request', 'system.authorization']),governs:Object.freeze(['action', 'identity', 'state', 'relation', 'evidence']),rule:'Action System represents admitted actions after governing checks; action representation alone does not execute an external effect.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_ACTION_SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfInteractionFlow(request={}){return Object.freeze({schema:'TERRAFORMER-INTERACTION-FLOW/1',request:Object.freeze({...request}),actionAuthorized:false,responseObserved:false,persisted:false})}


'use strict';
const TERRAFORMER_INFRASTRUCTURE_SYSTEM=Object.freeze({schema:'TERRAFORMER-INFRASTRUCTURE-SYSTEM/1',id:'system.infrastructure',name:'Infrastructure System',family:'infrastructure',type:'infrastructure-system',state:'integrated',canonicalPath:'terraformer://infrastructure/',dependsOn:Object.freeze(['system.resource','system.network','system.storage','system.platform']),integratesWith:Object.freeze(['system.datacenter','system.mainframe','system.server','system.client']),governs:Object.freeze(['infrastructure','composition','capacity','service','dependency','placement','reconciliation','qualification']),rule:'Infrastructure System composes admitted infrastructure capabilities and relationships without inheriting ownership, privilege, deployment, or external-effect authority.'});
const TERRAFORMER_INFRASTRUCTOR=Object.freeze({schema:'TERRAFORMER-INFRASTRUCTOR/1',id:'agent.infrastructor',name:'Infrastructor',family:'infrastructure',type:'infrastructure-agent',state:'integrated',canonicalPath:'terraformer://infrastructure/infrastructor/',system:'system.infrastructure',capabilities:Object.freeze(['inspect','plan','compose','reconcile','verify','qualify']),rule:'Infrastructor prepares and reconciles infrastructure plans within admitted boundaries; it cannot independently deploy, mutate, provision, or authorize infrastructure.'});

module.exports=Object.freeze({TERRAFORMER_INFRASTRUCTURE_SYSTEM,TERRAFORMER_INFRASTRUCTOR});

/* Terraformer v0.48.9: qualified isolated declaration migration. */
let TERRAFORMER_INFRASTRUCTURE_V0328_INSTANCE=null;

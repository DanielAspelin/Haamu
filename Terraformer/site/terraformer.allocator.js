"use strict";
const SYSTEM=Object.freeze({id:"system.allocator",concept:"Allocator",type:"allocation-actor-system",automaticHostAllocation:false,automaticGeneration:false,automaticSystemization:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_ALLOCATOR_SYSTEM=Object.freeze({schema:'TERRAFORMER-ALLOCATOR-SYSTEM/1',id:'system.allocator',name:'Allocator',family:'resource',type:'allocator-system',state:'integrated-reconciliation',canonicalPath:'terraformer://allocator/',dependsOn:Object.freeze(['system.resource','system.memory']),rule:'Allocator assigns admitted logical resource budgets; it cannot exceed Terraformer resource ceilings or claim unavailable host resources.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_ALLOCATOR_SYSTEM});

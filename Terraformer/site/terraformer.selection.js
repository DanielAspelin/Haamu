"use strict";
const SYSTEM=Object.freeze({id:"system.selection",concept:"Selection",type:"selection-system",planOnly:true,mutationPerformed:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_SELECTION_SYSTEM=Object.freeze({schema:'TERRAFORMER-SELECTION-SYSTEM/1',id:'system.selection',name:'Selection System',family:'information',type:'control-system',state:'integrated',uri:'terraformer://system/selection',governs:Object.freeze(['candidate-enumeration','criteria-filtering','deterministic-ranking','explicit-selection','selection-validation','selection-clear','selection-reset','selection-audit','selection-provenance']),capabilities:Object.freeze(['enumerate','filter','rank','select','validate','clear','reset','audit','provenance']),dependsOn:Object.freeze(['system.information','system.context','system.instruction']),integratesWith:Object.freeze(['system.capability','system.index','system.search']),rule:'Selection identifies a candidate but grants no execution, persistence, deployment, mutation, or authorization authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_SELECTION_SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfSelectionClear(){return Object.freeze({schema:TERRAFORMER_SELECTION_SCHEMA,system:TERRAFORMER_SELECTION_SYSTEM.id,state:'cleared',selected:null,authorityGranted:false,persisted:false,mutated:false})}


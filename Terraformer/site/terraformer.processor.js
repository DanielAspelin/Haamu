"use strict";
const SYSTEM=Object.freeze({id:"system.processor",concept:"Processor",type:"processing-actor-system",automaticOsProcess:false,automaticExecution:false,persistencePerformed:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_PROCESSOR_SYSTEM=Object.freeze({schema:'TERRAFORMER-PROCESSOR-SYSTEM/1',id:'system.processor',name:'Processor',family:'computation',type:'processor-system',state:'integrated-reconciliation',canonicalPath:'terraformer://processor/',dependsOn:Object.freeze(['system.processing']),integratesWith:Object.freeze(['system.computation']),rule:'Processor reconciles existing processor identities as the bounded execution actor; it does not imply exclusive CPU control.'});

const PROCESSOR_TYPES=Object.freeze({CPU:"system.cpu",GPU:"system.gpu"});
function processorType(name="CPU"){const k=String(name).toUpperCase();return Object.freeze({name:k,system:PROCESSOR_TYPES[k]||PROCESSOR_TYPES.CPU,exclusiveControl:false,placementGuaranteed:false});}

module.exports=Object.freeze({processorType,PROCESSOR_TYPES,SYSTEM,TERRAFORMER_PROCESSOR_SYSTEM});

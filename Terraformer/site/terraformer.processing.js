'use strict';
const ID='terraformer.processing', VERSION='0.44.2';
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'Validated deterministic processing dispatch',authority:'GOVERNED_BY_TERRAFORMER',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function dispatch(work, handlers={}){if(!work||typeof work!=='object'||typeof work.type!=='string'||!work.type.trim()) throw new TypeError('INVALID_WORK'); const fn=handlers[work.type]; if(typeof fn!=='function') throw new Error('UNHANDLED_WORK'); return fn(work.payload,work);}
function qualify(){let denied=false;try{dispatch(null,{})}catch{denied=true}return Object.freeze({pass:denied&&dispatch({type:'echo',payload:7},{echo:x=>x})===7,id:ID});}
function legacyRuntimeModules(){return Object.freeze({version:'0.44.2',processing:module.exports,allocation:require('./terraformer.allocation.js'),persistence:require('./terraformer.persistence.js'),governance:'ONE_GOVERNING_TERRAFORMER',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function legacyRuntimeQualification(){const m=legacyRuntimeModules(),q=[m.processing.qualify(),m.allocation.qualify(),m.persistence.qualify()];return Object.freeze({pass:q.every(x=>x.pass),version:'0.44.2',modules:q.map(x=>x.id)});}
const TERRAFORMER_PROCESSING_SYSTEM=Object.freeze({schema:'TERRAFORMER-PROCESSING-SYSTEM/1',id:'system.processing',name:'Processing System',family:'computation',type:'processing-system',state:'integrated',canonicalPath:'terraformer://processing/',dependsOn:Object.freeze(['system.resource']),integratesWith:Object.freeze(['system.computation','system.processor']),rule:'Processing System transforms admitted input to output within resource ceilings and effect boundaries.'});

const PROCESSING_TYPES=Object.freeze({BACKGROUND:"CPU_AFFINITY",VISUAL:"GPU_AFFINITY",VECTOR_GRAPHICS:"GPU_AFFINITY",GENERAL:"CPU_AFFINITY"});
function processingType(kind="GENERAL"){const k=String(kind).toUpperCase().replace(/[^A-Z0-9]+/g,"_");return Object.freeze({kind:k,preference:PROCESSING_TYPES[k]||PROCESSING_TYPES.GENERAL,placementGuaranteed:false});}

module.exports=Object.freeze({processingType,PROCESSING_TYPES,ID,VERSION,descriptor,dispatch,qualify,legacyRuntimeModules,legacyRuntimeQualification,TERRAFORMER_PROCESSING_SYSTEM});

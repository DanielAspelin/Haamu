'use strict';
/** Terraformer v0.43.1 — Node.js Host Boundary */
const descriptor=Object.freeze({id:'terraformer.nodejs',version:'0.43.1',system:'system.nodejs',boundary:'NODEJS_HOST_BOUNDARY',authority:'HOST_CAPABILITY_ONLY',authoritativeMonolith:'terraformer.js',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});
function describe(){return descriptor;}
function hostFacts(){return Object.freeze({runtime:'node',version:process.version,platform:process.platform,arch:process.arch,pid:process.pid});}
function capabilities(){return Object.freeze({buffer:typeof Buffer!=='undefined',commonjs:typeof module!=='undefined',versions:Object.freeze({...process.versions})});}
module.exports=Object.freeze({descriptor,describe,hostFacts,capabilities});

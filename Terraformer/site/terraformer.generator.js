'use strict';
const TERRAFORMER_GENERATOR=Object.freeze({schema:'TERRAFORMER-GENERATOR/1',id:'agent.generator',name:'Generator',family:'generation',type:'generation-agent',state:'integrated',canonicalPath:'terraformer://generation/generator/',system:'system.generation',capabilities:Object.freeze(['accept-specification','generate','validate','describe-output']),rule:'Generator produces bounded outputs under Generation System and cannot independently publish, execute, persist, deploy, or authorize generated output.'});

function describe(){return TERRAFORMER_GENERATOR;}
module.exports=Object.freeze({TERRAFORMER_GENERATOR,describe});

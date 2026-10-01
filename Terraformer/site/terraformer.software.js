"use strict";
const TERRAFORMER_SOFTWARE_SYSTEM=Object.freeze({schema:'TERRAFORMER-SOFTWARE-SYSTEM/1',id:'system.software',name:'Software System',family:'software',type:'software-system',state:'integrated',canonicalPath:'terraformer://software/',dependsOn:Object.freeze(['system.program', 'system.framework', 'system.application']),governs:Object.freeze(['software', 'identity', 'state', 'relation', 'evidence']),rule:'Software System is the parent composition boundary for programs, frameworks, applications, and software artifacts without execution, installation, deployment, or licensing authority.'});
function bindSoftwareV04687(){return Object.freeze({TERRAFORMER_SOFTWARE_SYSTEM});}
module.exports={TERRAFORMER_SOFTWARE_SYSTEM,bindSoftwareV04687};

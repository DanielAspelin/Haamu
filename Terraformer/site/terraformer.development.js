'use strict';
const TERRAFORMER_DEVELOPMENT_SYSTEM=Object.freeze({schema:'TERRAFORMER-DEVELOPMENT-SYSTEM/1',id:'system.development',name:'Development System',family:'development',type:'development-system',state:'integrated',canonicalPath:'terraformer://development/',dependsOn:Object.freeze(['system.work', 'system.program']),governs:Object.freeze(['development', 'requirement', 'design', 'implementation', 'build', 'test', 'qualification', 'version']),rule:'Development System models controlled development lifecycle and does not silently deploy, release, or replace qualified versions.'});

module.exports=Object.freeze({TERRAFORMER_DEVELOPMENT_SYSTEM});

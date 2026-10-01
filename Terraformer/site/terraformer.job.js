'use strict';
const TERRAFORMER_JOB_SYSTEM=Object.freeze({schema:'TERRAFORMER-JOB-SYSTEM/1',id:'system.job',name:'Job System',family:'work',type:'job-system',state:'integrated',canonicalPath:'terraformer://job/',dependsOn:Object.freeze(['system.work','system.contract']),governs:Object.freeze(['job','role','work-reference','term','condition','status']),rule:'Job System models job and role relationships; it does not by itself establish employment status, hiring, compensation, or contractual validity.'});

module.exports=Object.freeze({TERRAFORMER_JOB_SYSTEM});

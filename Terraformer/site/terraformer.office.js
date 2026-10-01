'use strict';
const TERRAFORMER_OFFICE_SYSTEM=Object.freeze({schema:'TERRAFORMER-OFFICE-SYSTEM/1',id:'system.office',name:'Office System',family:'workspace',type:'office-system',state:'integrated',canonicalPath:'terraformer://office/',dependsOn:Object.freeze(['system.work']),governs:Object.freeze(['office','workspace','document','communication','task','schedule']),rule:'Office System represents an organizational workspace context and does not inherit personal Home authority or external organizational authority.'});

module.exports=Object.freeze({TERRAFORMER_OFFICE_SYSTEM});

'use strict';
const TERRAFORMER_DASHBOARD_SYSTEM=Object.freeze({schema:'TERRAFORMER-DASHBOARD-SYSTEM/1',id:'system.dashboard',name:'Dashboard System',family:'presentation',type:'dashboard-system',state:'integrated',canonicalPath:'terraformer://presentation/dashboard/',dependsOn:Object.freeze(['system.presentation', 'system.visual']),governs:Object.freeze(['dashboard', 'identity', 'state', 'relation', 'evidence']),rule:'Dashboard System composes admitted information and controls for presentation; displayed controls do not create authority for their underlying actions.'});

module.exports=Object.freeze({TERRAFORMER_DASHBOARD_SYSTEM});

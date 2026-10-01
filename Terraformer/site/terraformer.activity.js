'use strict';
const TERRAFORMER_ACTIVITY_SYSTEM=Object.freeze({schema:'TERRAFORMER-ACTIVITY-SYSTEM/1',id:'system.activity',name:'Activity System',family:'temporal',type:'activity-system',state:'integrated',canonicalPath:'terraformer://activity/',dependsOn:Object.freeze(['system.event','system.time']),governs:Object.freeze(['activity','start','progress','event','state','completion','correlation']),rule:'Activity System represents bounded work or behavior as state plus related events; representation does not manufacture execution authority.'});

module.exports=Object.freeze({TERRAFORMER_ACTIVITY_SYSTEM});

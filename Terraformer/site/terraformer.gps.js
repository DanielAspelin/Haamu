'use strict';
const TERRAFORMER_GPS_SYSTEM=Object.freeze({schema:'TERRAFORMER-GPS-SYSTEM/1',id:'system.gps',name:'GPS System',family:'positioning',type:'system',state:'integrated-contract',canonicalPath:'terraformer://position/gps/',input:Object.freeze(['platform-location-source','gps-observation']),output:Object.freeze(['position-observation']),authority:'platform-and-user-permission-bound',rule:'GPS capability is observational and depends on available platform location facilities and applicable permission.'});

module.exports=Object.freeze({TERRAFORMER_GPS_SYSTEM});

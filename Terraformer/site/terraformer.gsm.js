'use strict';
const TERRAFORMER_GSM_SYSTEM=Object.freeze({schema:'TERRAFORMER-GSM-SYSTEM/1',id:'system.gsm',name:'GSM System',family:'communication',type:'system',state:'integrated-contract',canonicalPath:'terraformer://communication/gsm/',input:Object.freeze(['platform-cellular-source','network-event']),output:Object.freeze(['cellular-observation','communication-capability']),authority:'platform-carrier-and-user-permission-bound',rule:'GSM System represents cellular integration capability; registration, service and carrier authority remain external.'});

module.exports=Object.freeze({TERRAFORMER_GSM_SYSTEM});

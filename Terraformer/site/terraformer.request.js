'use strict';
const TERRAFORMER_REQUEST_SYSTEM=Object.freeze({schema:'TERRAFORMER-REQUEST-SYSTEM/1',id:'system.request',name:'Request System',family:'interaction',type:'request-system',state:'integrated',canonicalPath:'terraformer://request/',dependsOn:Object.freeze(['system.condition']),governs:Object.freeze(['request', 'identity', 'state', 'relation', 'evidence']),rule:'Request System represents bounded requests with subject, intent, scope, input, and evidence; a request is not authorization or approval.'});

module.exports=Object.freeze({TERRAFORMER_REQUEST_SYSTEM});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfBlockIORequestV417(device,x={}){
 const op=String(x.operation||"READ").toUpperCase();if(!TF_BLOCK_DEVICE_IO_V417.operations.includes(op))throw Error("operation not admitted");
 const off=Number(x.offset||0),len=Number(x.length||0),lbs=device.logicalBlockSize;
 if(!Number.isSafeInteger(off)||!Number.isSafeInteger(len)||off<0||len<0||off%lbs||len%lbs||off+len>device.capacityBytes)throw Error("unaligned/out-of-range io");
 const write=/WRITE|DISCARD|DEALLOCATE|ZEROES|ZONE_RESET/.test(op),destructive=TF_BLOCK_DEVICE_IO_V417.destructive.includes(op);
 return Object.freeze({operation:op,deviceId:device.id,offset:off,length:len,write,destructive,
  requiresExplicitDeviceAuthorization:write,requiresTransactionAdmission:write,requiresRecoveryCheckpoint:destructive,
  executable:false,admitted:false,authority:false});
}

function tfImageDeviceRequestsV418(plan,device){
 return Object.freeze(plan.map(p=>tfBlockIORequestV417(device,{operation:p.operation,offset:p.offset,length:p.length})));
}


'use strict';
const TERRAFORMER_RECORD_SYSTEM=Object.freeze({schema:'TERRAFORMER-RECORD-SYSTEM/1',id:'system.record',name:'Record System',family:'information',type:'record-system',state:'integrated',canonicalPath:'terraformer://record/',governs:Object.freeze(['record','metadata','media-reference','time-range','source','format','state','evidence']),persistence:'volatile-by-default',rule:'Record System represents bounded records and metadata; creating a record does not itself authorize capture or persistence.'});

module.exports=Object.freeze({TERRAFORMER_RECORD_SYSTEM});

/* Terraformer v0.47.99: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfIORecordV419(x={}){
 const requested=Number(x.requestedBytes||0),transferred=Number(x.transferredBytes||0),err=x.error?String(x.error).toUpperCase():"";
 if(requested<0||transferred<0||transferred>requested)throw Error("invalid io byte accounting");
 let state=String(x.state||"REQUESTED").toUpperCase();
 if(!err&&transferred>0&&transferred<requested)state="PARTIAL";
 if(err&&!TF_IO_RECORDS_V419.errorClasses.includes(err))throw Error("unknown error class");
 return Object.freeze({operation:String(x.operation||""),deviceId:String(x.deviceId||""),offset:Number(x.offset||0),
  requestedBytes:requested,transferredBytes:transferred,state,error:err||null,errno:x.errno?String(x.errno):null,
  retryable:x.retryable===true,transactionId:String(x.transactionId||""),generation:Number(x.generation||0),
  stableEvidence:String(x.stableEvidence||""),verificationEvidence:String(x.verificationEvidence||""),
  timestamp:String(x.timestamp||""),authority:false});
}

function tfStableIORecordV419(rec,device,evidence={}){
 if(rec.error||rec.transferredBytes!==rec.requestedBytes)throw Error("io not complete");
 const cache=device.volatileWriteCache===true,method=String(evidence.method||"").toUpperCase();
 const ok=!cache||method==="FUA"&&device.fuaSupported===true||method==="FLUSH"&&device.flushSupported===true||method==="QUALIFIED_EQUIVALENT";
 if(!ok)throw Error("CACHE_STABILITY_UNPROVEN");
 return tfIORecordV419({...rec,state:"STABLE",stableEvidence:method||"NO_VOLATILE_CACHE"});
}

function tfVerifiedIORecordV419(rec,evidence={}){
 if(rec.state!=="STABLE")throw Error("stability required");
 const method=String(evidence.method||"").toUpperCase();if(!["READBACK_SHA256","INTEGRITY_TAG","QUALIFIED_EQUIVALENT"].includes(method))throw Error("verification evidence required");
 return tfIORecordV419({...rec,state:"VERIFIED",verificationEvidence:method});
}


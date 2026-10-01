"use strict";
const SYSTEM=Object.freeze({id:"system.transfer",concept:"Transfer",type:"transfer-system",logicalByDefault:true,automaticRead:false,automaticWrite:false,automaticTransfer:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
module.exports=Object.freeze({SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfTransferRecord(id,options={}){id=String(id||'').trim();if(!id)throw new Error('transfer id required');return Object.freeze({schema:'TERRAFORMER-TRANSFER/1',id,source:options.source==null?null:String(options.source),destination:options.destination==null?null:String(options.destination),payload:options.payload==null?null:String(options.payload),session:options.session==null?null:String(options.session),state:'prepared',progress:0,authorized:false,carried:false,executed:false,persisted:false,networked:false,authorityGranted:false});}


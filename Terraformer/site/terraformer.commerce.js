'use strict';
const TERRAFORMER_COMMERCE_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMMERCE-SYSTEM/1',id:'system.commerce',name:'Commerce System',family:'commerce',type:'commerce-system',state:'integrated',canonicalPath:'terraformer://commerce/',dependsOn:Object.freeze(['system.business','system.market','system.contract','system.money','system.currency']),integratesWith:Object.freeze(['system.network','system.web']),governs:Object.freeze(['commerce','offer','order-reference','party-reference','contract-reference','money-reference','fulfilment-reference','transaction-intent']),rule:'Commerce System models commercial relationships and transaction intents; it cannot independently place orders, transfer funds, execute contracts, publish offers, or create financial or legal authority.'});

module.exports=Object.freeze({TERRAFORMER_COMMERCE_SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfCommerceRecord(systemId,id,options={}){const system=TF_COMMERCE_SYSTEM_BY_ID[String(systemId)];if(!system)throw new Error('unsupported commerce system: '+systemId);id=String(id||'').trim();if(!id)throw new Error('commerce record id required');return Object.freeze({schema:'TERRAFORMER-COMMERCE-RECORD/1',system:system.id,id,scope:options.scope==null?null:String(options.scope),references:Object.freeze([...(options.references||[])].map(String)),state:String(options.state||'DRAFT'),authorized:false,executed:false,persisted:false,transactionCommitted:false,externalCommunication:false,authorityGranted:false});}


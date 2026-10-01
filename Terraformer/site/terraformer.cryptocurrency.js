"use strict";
const SYSTEM=Object.freeze({id:"system.cryptocurrency",authorityGranted:false,scaffold:true});
const TERRAFORMER_CRYPTOCURRENCY_SYSTEM=Object.freeze({schema:'TERRAFORMER-CRYPTOCURRENCY-SYSTEM/1',id:'system.cryptocurrency',name:'Cryptocurrency System',family:'value',type:'cryptocurrency-system',state:'integrated-contract',canonicalPath:'terraformer://cryptocurrency/',dependsOn:Object.freeze(['system.currency','system.network']),governs:Object.freeze(['cryptocurrency','asset-reference','network-reference','address-reference','transaction-reference','ledger-reference']),rule:'Cryptocurrency System represents admitted cryptocurrency metadata and references; it does not custody keys, sign transactions, transfer assets, mine, stake, or imply financial authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_CRYPTOCURRENCY_SYSTEM});

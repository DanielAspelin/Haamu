'use strict';
const TERRAFORMER_AUTHENTICATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-AUTHENTICATION-SYSTEM/1',id:'system.authentication',name:'Authentication System',family:'security',type:'authentication-system',state:'integrated-reconciliation',canonicalPath:'terraformer://authentication/',governs:Object.freeze(['identity-claim','credential-proof','challenge','verification','authentication-result']),rule:'Authentication System verifies admitted identity claims using available mechanisms; authentication proves no authorization beyond the verified claim.'});

module.exports=Object.freeze({TERRAFORMER_AUTHENTICATION_SYSTEM});

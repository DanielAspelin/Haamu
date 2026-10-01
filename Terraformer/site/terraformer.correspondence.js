'use strict';
const TERRAFORMER_CORRESPONDENCE_SYSTEM=Object.freeze({schema:'TERRAFORMER-CORRESPONDENCE-SYSTEM/1',id:'system.correspondence',name:'Correspondence System',family:'communication',type:'system',state:'integrated',canonicalPath:'terraformer://communication/correspondence/',dependsOn:Object.freeze(['system.communication']),governs:Object.freeze(['message','thread','letter','document','attachment','delivery','reply']),rule:'Correspondence System coordinates asynchronous message/document exchange while preserving delivery, identity, and provider boundaries.'});

module.exports=Object.freeze({TERRAFORMER_CORRESPONDENCE_SYSTEM});

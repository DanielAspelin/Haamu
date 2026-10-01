'use strict';
const TERRAFORMER_CONVERSATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-CONVERSATION-SYSTEM/1',id:'system.conversation',name:'Conversation System',family:'communication',type:'system',state:'integrated',canonicalPath:'terraformer://communication/conversation/',dependsOn:Object.freeze(['system.communication']),governs:Object.freeze(['turn','participant','context','thread','session','state']),rule:'Conversation System coordinates conversational state and turns independently of transport or provider authority.'});

module.exports=Object.freeze({TERRAFORMER_CONVERSATION_SYSTEM});

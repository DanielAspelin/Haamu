"use strict";
const TERRAFORMER_INTEGRATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.integration',name:'Integration System',family:'integration',type:'integration-system',state:'integrated',canonicalPath:'terraformer://integration/',dependsOn:Object.freeze(['system.import','system.relation','system.binding']),governs:Object.freeze(['canonical-owner','alias','adapter','reference','dependency-order','collision','qualification-boundary']),rule:'Integration composes canonical systems in deterministic dependency order; duplicate concepts become aliases, adapters, or external-owned references rather than competing authorities.'});
function bindIntegrationSystemV04676(){return Object.freeze({TERRAFORMER_INTEGRATION_SYSTEM});}
const TERRAFORMER_CHAT_INTEGRATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-CHAT-INTEGRATION-SYSTEM/1',id:'system.chat.integration',name:'Chat Integration System',parent:'system.chat',family:'communication',type:'integration',state:'integrated',canonicalPath:'terraformer://communication/chat/integration/',integrates:Object.freeze(['system.communication','system.conversation','system.conference','system.correspondence','system.voice','system.speech']),rule:'Chat integrates these systems through bounded relationships; it does not absorb their independent authority or imply provider execution.'});

module.exports=Object.freeze({bindIntegrationSystemV04676,TERRAFORMER_CHAT_INTEGRATION_SYSTEM});

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const PROJECT_RUNTIME_INTEGRATION_SCHEMA='TERRAFORMER-PROJECT-RUNTIME-INTEGRATION/1';

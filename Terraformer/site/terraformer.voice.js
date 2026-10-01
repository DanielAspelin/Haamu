'use strict';
const TERRAFORMER_VOICE_SYSTEM=Object.freeze({schema:'TERRAFORMER-VOICE-SYSTEM/1',id:'system.voice',name:'Voice System',family:'voice',type:'system',state:'integrated-contract',canonicalPath:'terraformer://voice/',dependsOn:Object.freeze(['system.audio','system.web-audio']),governs:Object.freeze(['voice-input','voice-output','voice-stream','voice-selection','voice-state']),requirements:Object.freeze(['capability','permission','admission']),identityClaim:false,rule:'Voice System coordinates admitted voice-oriented input/output contracts; it does not infer speaker identity and does not imply microphone or speaker availability.'});

module.exports=Object.freeze({TERRAFORMER_VOICE_SYSTEM});

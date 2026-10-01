'use strict';
const ID="system.audio", VERSION="0.44.22";
const STATES=Object.freeze(['DECLARED','VALIDATED','ADMITTED','ACTIVE','RELEASED','FAILED']);
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:'SYSTEM_BOUNDARY',responsibility:"Audio representation, processing and governed media integration",integrations:Object.freeze(["system.io","system.runtime","system.error"]),authority:false,nativeAuthority:false,physicalAuthority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function validate(x={}){if(!x||typeof x!=='object')throw new TypeError('INVALID_AUDIO');if(typeof x.id!=='string'||!x.id.trim())throw new TypeError('INVALID_AUDIO_ID');return Object.freeze({valid:true,id:x.id,authority:false});}
function admit(x={}){validate(x);if(x.authorized!==true)return Object.freeze({admitted:false,state:'VALIDATED',reason:'AUTHORIZATION_REQUIRED',authority:false});return Object.freeze({admitted:true,state:'ADMITTED',id:x.id,authority:false});}
function transition(from,to){if(!STATES.includes(from)||!STATES.includes(to))throw new Error('INVALID_AUDIO_STATE');const allowed={DECLARED:['VALIDATED','FAILED'],VALIDATED:['ADMITTED','FAILED'],ADMITTED:['ACTIVE','RELEASED','FAILED'],ACTIVE:['RELEASED','FAILED'],RELEASED:[],FAILED:[]};if(!allowed[from].includes(to))throw new Error('INVALID_AUDIO_TRANSITION');return Object.freeze({from,to,authority:false});}
function qualify(){let denied=!admit({id:'q'}).admitted,bad=false;try{transition('RELEASED','ACTIVE')}catch{bad=true}return Object.freeze({id:ID,pass:denied&&bad&&admit({id:'q',authorized:true}).admitted,qualificationGranted:false});}
const TERRAFORMER_AUDIO_SYSTEM=Object.freeze({schema:'TERRAFORMER-AUDIO-SYSTEM/1',id:'system.audio',name:'Audio System',family:'audio',type:'system',state:'integrated',canonicalPath:'terraformer://audio/',governs:Object.freeze(['input','output','stream','format','device-capability','processing','routing']),rule:'Audio System is the general audio-domain boundary. Device access remains subject to host/browser capability, permission, and admitted operation authority.'});

const TERRAFORMER_WEB_AUDIO_SYSTEM=Object.freeze({schema:'TERRAFORMER-WEB-AUDIO-SYSTEM/1',id:'system.web-audio',name:'Web Audio System',family:'audio',type:'browser-api-boundary',dependsOn:Object.freeze(['system.audio','system.driverless']),state:'integrated-contract',canonicalPath:'terraformer://audio/web/',api:'Web Audio API',governs:Object.freeze(['audio-context','audio-node','audio-graph','source','destination','gain','analysis','processing']),requirements:Object.freeze(['browser-capability','user-permission-when-required','admitted-operation']),hardwareClaim:false,rule:'Web Audio System models browser Web Audio API integration. Registration does not assert browser support, audio-device availability, permission, or active capture/playback.'});
const {TERRAFORMER_VOICE_SYSTEM}=require('./terraformer.voice.js');
Object.assign(globalThis,{TERRAFORMER_VOICE_SYSTEM});
const {TERRAFORMER_SPEECH_SYSTEM,TERRAFORMER_TEXT_TO_SPEECH,TERRAFORMER_SPEECH_TO_TEXT,TERRAFORMER_SPEECH_TEXT_BRIDGE,tfSpeechTextConvert,TERRAFORMER_AUDIO_VOICE_SPEECH_RELATIONSHIPS}=require('./terraformer.speech.js');
Object.assign(globalThis,{TERRAFORMER_SPEECH_SYSTEM,TERRAFORMER_TEXT_TO_SPEECH,TERRAFORMER_SPEECH_TO_TEXT,TERRAFORMER_SPEECH_TEXT_BRIDGE,tfSpeechTextConvert,TERRAFORMER_AUDIO_VOICE_SPEECH_RELATIONSHIPS});
const {TERRAFORMER_AUDIT_SYSTEM}=require('./terraformer.audit.js');
Object.assign(globalThis,{TERRAFORMER_AUDIT_SYSTEM});
const {TERRAFORMER_GRAPHICS_SYSTEM}=require('./terraformer.graphics.js');
Object.assign(globalThis,{TERRAFORMER_GRAPHICS_SYSTEM});
const {TERRAFORMER_LAYOUT_SYSTEM}=require('./terraformer.layout.js');
Object.assign(globalThis,{TERRAFORMER_LAYOUT_SYSTEM});
const {TERRAFORMER_LAYER_SYSTEM}=require('./terraformer.layer.js');
Object.assign(globalThis,{TERRAFORMER_LAYER_SYSTEM});
const {TERRAFORMER_RUNTIME_SYSTEM,TF_AUDIT_STATE,tfAuditSanitize,tfAuditEvent,tfAuditVisual,TERRAFORMER_VISUAL_AUDIT_POLICY,tfVisualAction}=require('./terraformer.runtime.js');
Object.assign(globalThis,{TERRAFORMER_RUNTIME_SYSTEM,TF_AUDIT_STATE,tfAuditSanitize,tfAuditEvent,tfAuditVisual,TERRAFORMER_VISUAL_AUDIT_POLICY,tfVisualAction});
const {TERRAFORMER_NANO_SYSTEM}=require('./terraformer.nano.js');
Object.assign(globalThis,{TERRAFORMER_NANO_SYSTEM});
const {TERRAFORMER_MICRO_SYSTEM}=require('./terraformer.micro.js');
Object.assign(globalThis,{TERRAFORMER_MICRO_SYSTEM});
const {TERRAFORMER_CLOCK_SYSTEM}=require('./terraformer.clock.js');
Object.assign(globalThis,{TERRAFORMER_CLOCK_SYSTEM});
const {TERRAFORMER_TIME_SYSTEM}=require('./terraformer.time.js');
Object.assign(globalThis,{TERRAFORMER_TIME_SYSTEM});
const {TERRAFORMER_SPACE_SYSTEM,TERRAFORMER_SCALE_TIME_SPACE_RELATIONSHIPS}=require('./terraformer.space.js');
Object.assign(globalThis,{TERRAFORMER_SPACE_SYSTEM,TERRAFORMER_SCALE_TIME_SPACE_RELATIONSHIPS});
const {TERRAFORMER_MIND_SYSTEM}=require('./terraformer.mind.js');
Object.assign(globalThis,{TERRAFORMER_MIND_SYSTEM});
const {TERRAFORMER_BRAIN_SYSTEM}=require('./terraformer.brain.js');
Object.assign(globalThis,{TERRAFORMER_BRAIN_SYSTEM});
const {TERRAFORMER_LOBE_SYSTEM}=require('./terraformer.lobe.js');
Object.assign(globalThis,{TERRAFORMER_LOBE_SYSTEM});
const {TERRAFORMER_MAP_SYSTEM}=require('./terraformer.map.js');
Object.assign(globalThis,{TERRAFORMER_MAP_SYSTEM});

module.exports=Object.freeze({ID,VERSION,STATES,descriptor,validate,admit,transition,qualify,TERRAFORMER_AUDIO_SYSTEM,TERRAFORMER_WEB_AUDIO_SYSTEM});

'use strict';
const TERRAFORMER_MIND_SYSTEM=Object.freeze({schema:'TERRAFORMER-MIND-SYSTEM/1',id:'system.mind',name:'Mind System',family:'cognitive-technical',type:'system',state:'integrated',canonicalPath:'terraformer://cognitive/mind/',governs:Object.freeze(['model','context','attention','relationship','working-state']),biologicalClaim:false,consciousnessClaim:false,rule:'Mind System is a technical coordination and model-state abstraction only.'});

const TERRAFORMER_COGNITIVE_RELATIONSHIPS=Object.freeze({schema:'TERRAFORMER-COGNITIVE-RELATIONSHIPS/1',relations:Object.freeze([['system.brain','contains','system.lobe'],['system.mind','coordinates-with','system.brain'],['system.mind.map','depends-on','system.mind'],['system.mind.map','depends-on','system.map'],['system.map','projects','admitted-structure']])});
const {TERRAFORMER_PROTOCOL_SYSTEM}=require('./terraformer.protocol.js');
Object.assign(globalThis,{TERRAFORMER_PROTOCOL_SYSTEM});
const {TERRAFORMER_GPS_SYSTEM}=require('./terraformer.gps.js');
Object.assign(globalThis,{TERRAFORMER_GPS_SYSTEM});
const {TERRAFORMER_GSM_SYSTEM}=require('./terraformer.gsm.js');
Object.assign(globalThis,{TERRAFORMER_GSM_SYSTEM});
const {TERRAFORMER_RFID_SYSTEM,TERRAFORMER_CONNECTIVITY_RELATIONSHIPS}=require('./terraformer.rfid.js');
Object.assign(globalThis,{TERRAFORMER_RFID_SYSTEM,TERRAFORMER_CONNECTIVITY_RELATIONSHIPS});
const {TERRAFORMER_MODULE_SYSTEM}=require('./terraformer.module.js');
globalThis.TERRAFORMER_MODULE_SYSTEM=TERRAFORMER_MODULE_SYSTEM;
const {TERRAFORMER_MODULE_REGISTRY}=require('./terraformer.module.js');
globalThis.TERRAFORMER_MODULE_REGISTRY=TERRAFORMER_MODULE_REGISTRY;
const {tfModuleRegister}=require('./terraformer.module.js');
globalThis.tfModuleRegister=tfModuleRegister;
const {tfModuleGet}=require('./terraformer.module.js');
globalThis.tfModuleGet=tfModuleGet;
const {tfModuleList}=require('./terraformer.module.js');
globalThis.tfModuleList=tfModuleList;

module.exports=Object.freeze({TERRAFORMER_MIND_SYSTEM,TERRAFORMER_COGNITIVE_RELATIONSHIPS});

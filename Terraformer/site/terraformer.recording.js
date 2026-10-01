"use strict";
function bindRecordingTimeliningV04620(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.376: Recording / Timelining Fabric === */
const TF_RECORDING_TIMELINING_SYSTEMS_V36376=Object.freeze([{"id":"system.recorder","concept":"Recorder","type":"recording-actor-system"},{"id":"system.timelining","concept":"Timelining","type":"timeline-construction-process-system"},{"id":"system.timeliner","concept":"Timeliner","type":"timelining-actor-system"}]);

const TF_RECORDING_TIMELINING_RELATIONSHIPS_V36376=Object.freeze([
 Object.freeze({from:"system.recorder",relation:"part-of",to:"system.recording"}),
 Object.freeze({from:"system.timelining",relation:"produces",to:"system.timeline"}),
 Object.freeze({from:"system.timeliner",relation:"part-of",to:"system.timelining"}),
 Object.freeze({from:"system.recording",relation:"may-record",to:"system.timeline"}),
 Object.freeze({from:"system.timelining",relation:"may-use",to:"system.event"}),
 Object.freeze({from:"system.timelining",relation:"may-use",to:"system.history"}),
 Object.freeze({from:"system.recording",relation:"may-use",to:"system.logging"}),
 Object.freeze({from:"system.recording",relation:"may-use",to:"system.reporting"})
]);
function tfTimelineRecordV36376(events=[],spec={}){
 const normalized=(Array.isArray(events)?events:[]).map((e,i)=>Object.freeze({sequence:i,time:e?.time??null,event:e?.event??e??null,source:e?.source??null}));
 return Object.freeze({system:"system.timeline",process:"system.timelining",actor:"system.timeliner",recording:"system.recording",recorder:"system.recorder",
  id:spec.id??null,entries:Object.freeze(normalized),recordable:true,chronologyPreserved:true,planOnly:true,
  persistencePerformed:false,externalCapture:false,historyRewritten:false,authorityGranted:false});
}
function tfRecordingTimeliningSelfTestV36376(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_RECORDING_TIMELINING_SYSTEMS_V36376.map(x=>x.id);
 for(const id of [...added,"system.recording","system.timeline","system.history","system.event","system.logging","system.reporting","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 const t=tfTimelineRecordV36376([{time:1,event:"a",source:"fixture"},{time:2,event:"b",source:"fixture"}],{id:"fixture"});
 if(!t.recordable||!t.chronologyPreserved||t.entries.length!==2||t.entries[0].sequence!==0||t.entries[1].sequence!==1||t.persistencePerformed||t.externalCapture||t.historyRewritten||t.authorityGranted)missing.push("timeline-record");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Recording / Timelining qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:3,recordingReused:true,timelineReused:true,recorder:true,timelining:true,timeliner:true,
  recordingCanRecordTimeline:true,chronologyPreserved:true,systemsWithEngines:3,systemsWithServices:3,systemsInCompactSeed:3,systemsWithActiveSummaries:3,
  persistencePerformed:false,externalCapture:false,historyRewritten:false,authorityAmplification:false,missing:0});
}
globalThis.TF_RECORDING_TIMELINING_SYSTEMS_V36376=TF_RECORDING_TIMELINING_SYSTEMS_V36376;
globalThis.TF_RECORDING_TIMELINING_RELATIONSHIPS_V36376=TF_RECORDING_TIMELINING_RELATIONSHIPS_V36376;
globalThis.tfTimelineRecordV36376=tfTimelineRecordV36376;
 return Object.freeze({TF_RECORDING_TIMELINING_SYSTEMS_V36376,TF_RECORDING_TIMELINING_RELATIONSHIPS_V36376,tfTimelineRecordV36376,tfRecordingTimeliningSelfTestV36376});
}
const TERRAFORMER_RECORDING_SYSTEM=Object.freeze({schema:'TERRAFORMER-RECORDING-SYSTEM/1',id:'system.recording',name:'Recording System',family:'media',type:'recording-lifecycle-system',state:'integrated-contract',canonicalPath:'terraformer://recording/',dependsOn:Object.freeze(['system.record','system.event','system.time']),governs:Object.freeze(['prepare','start','pause','resume','stop','finalize','record-state']),states:Object.freeze(['IDLE','PREPARED','RECORDING','PAUSED','STOPPED','FINALIZED']),rule:'Recording requires explicit admitted start and capability/permission checks; it is volatile until persistence is separately authorized.'});

const TERRAFORMER_AUDIO_RECORDING_SYSTEM=Object.freeze({schema:'TERRAFORMER-AUDIO-RECORDING-SYSTEM/1',id:'system.recording.audio',name:'Audio Recording System',family:'audio',type:'recording-system',state:'integrated-contract',canonicalPath:'terraformer://recording/audio/',dependsOn:Object.freeze(['system.recording','system.audio','system.web-audio']),browserInterfaces:Object.freeze(['MediaRecorder','MediaStream','navigator.mediaDevices.getUserMedia']),input:'admitted audio MediaStream',output:'volatile audio record/chunks',requirements:Object.freeze(['audio-capability','user-permission','explicit-start','admission']),rule:'Audio Recording System records only admitted audio streams; microphone/device capture requires browser/host permission and explicit recording start.'});

const TERRAFORMER_SELF_RECORDING_SYSTEM=Object.freeze({schema:'TERRAFORMER-SELF-RECORDING-SYSTEM/1',id:'system.recording.terraformer',name:'Terraformer Recording System',family:'presentation',type:'self-recording-system',state:'integrated-contract',canonicalPath:'terraformer://recording/terraformer/',dependsOn:Object.freeze(['system.recording','system.terraformer','system.desktop','system.window','system.event']),scope:'terraformer-presentation-only',capture:Object.freeze({arbitraryDesktop:false,otherApplications:false,backgroundSurveillance:false,terraformerSurface:true}),strategies:Object.freeze(['terraformer-render-surface-capture-when-supported','terraformer-event-and-frame-reconstruction']),requirements:Object.freeze(['explicit-start','visible-recording-state','surface-capability','admission']),rule:'Terraformer self-recording is confined to Terraformer-owned presentation content and events. It must not silently capture the desktop, other applications, or unrelated screen content.'});

let TF_RECORDING_SEQUENCE=0;

function tfRecordCreate(kind,source,metadata={}){return Object.freeze({schema:'TERRAFORMER-RECORD/1',id:`record-${++TF_RECORDING_SEQUENCE}`,kind:String(kind||'generic'),source:String(source||'terraformer'),metadata:Object.freeze({...metadata}),created:new Date().toISOString(),state:'volatile',persisted:false})}

function tfRecordingSession(kind,scope){return {schema:'TERRAFORMER-RECORDING-SESSION/1',id:`recording-${++TF_RECORDING_SEQUENCE}`,kind:String(kind),scope:String(scope),state:'PREPARED',explicitStartRequired:true,visibleStateRequired:true,persisted:false,chunks:[]}}

function tfRecordingTransition(session,next){const allowed={PREPARED:['RECORDING','STOPPED'],RECORDING:['PAUSED','STOPPED'],PAUSED:['RECORDING','STOPPED'],STOPPED:['FINALIZED'],FINALIZED:[]};if(!session||!allowed[session.state]||!allowed[session.state].includes(next))throw new Error('invalid recording transition');session.state=next;return session}
const {TERRAFORMER_EVENT_SYSTEM}=require('./terraformer.event.js');
Object.assign(globalThis,{TERRAFORMER_EVENT_SYSTEM});
const {TERRAFORMER_ACTIVITY_SYSTEM}=require('./terraformer.activity.js');
Object.assign(globalThis,{TERRAFORMER_ACTIVITY_SYSTEM});
const {TERRAFORMER_TIMELINE_SYSTEM,TF_TEMPORAL_SEQUENCE,tfTemporalEvent,tfTemporalActivity,tfTimelineProject}=require('./terraformer.timeline.js');
Object.assign(globalThis,{TERRAFORMER_TIMELINE_SYSTEM,TF_TEMPORAL_SEQUENCE,tfTemporalEvent,tfTemporalActivity,tfTimelineProject});
const {TERRAFORMER_COMPRESSION_SYSTEM}=require('./terraformer.compression.js');
Object.assign(globalThis,{TERRAFORMER_COMPRESSION_SYSTEM});
const {TERRAFORMER_DECOMPRESSION_SYSTEM}=require('./terraformer.decompression.js');
Object.assign(globalThis,{TERRAFORMER_DECOMPRESSION_SYSTEM});
const {TERRAFORMER_ARCHIVE_SYSTEM}=require('./terraformer.archive.js');
Object.assign(globalThis,{TERRAFORMER_ARCHIVE_SYSTEM});
const {TERRAFORMER_ZIP_SYSTEM,tfCompressionTransform,TERRAFORMER_ARCHIVE_COMPRESSION_RELATIONSHIPS}=require('./terraformer.zip.js');
Object.assign(globalThis,{TERRAFORMER_ZIP_SYSTEM,tfCompressionTransform,TERRAFORMER_ARCHIVE_COMPRESSION_RELATIONSHIPS});
const {TERRAFORMER_AUDIO_SYSTEM}=require('./terraformer.audio.js');
Object.assign(globalThis,{TERRAFORMER_AUDIO_SYSTEM});
const {TERRAFORMER_DRIVERLESS_SYSTEM,tfDriverlessParse,tfDriverlessSeekHost,TERRAFORMER_DRIVERLESS_INTEGRATION}=require('./terraformer.driverless.js');
Object.assign(globalThis,{TERRAFORMER_DRIVERLESS_SYSTEM,tfDriverlessParse,tfDriverlessSeekHost,TERRAFORMER_DRIVERLESS_INTEGRATION});
const {TERRAFORMER_WEB_AUDIO_SYSTEM}=require('./terraformer.audio.js');
globalThis.TERRAFORMER_WEB_AUDIO_SYSTEM=TERRAFORMER_WEB_AUDIO_SYSTEM;
const {TERRAFORMER_MIND_MAP_SYSTEM}=require('./terraformer.map.js');
globalThis.TERRAFORMER_MIND_MAP_SYSTEM=TERRAFORMER_MIND_MAP_SYSTEM;

module.exports=Object.freeze({bindRecordingTimeliningV04620,TERRAFORMER_RECORDING_SYSTEM,TERRAFORMER_AUDIO_RECORDING_SYSTEM,TERRAFORMER_SELF_RECORDING_SYSTEM,TF_RECORDING_SEQUENCE,tfRecordCreate,tfRecordingSession,tfRecordingTransition});

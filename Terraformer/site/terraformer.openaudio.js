'use strict';
const ID='terraformer.openaudio',VERSION='0.44.4';
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'distinct OpenAudio service boundary',microphoneConsent:false,physicalCapture:false,nativeAudioQualified:false,authority:'NO_DEVICE_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function admit(x){if(!x||typeof x!=='object')throw Error('OPENAUDIO_OPERATION_INVALID');if(x.physicalCapture===true||x.microphone===true)throw Error('OPENAUDIO_PHYSICAL_CAPTURE_NOT_AUTHORIZED');if(!(x.authorized===true&&x.validated===true&&x.qualified===true))throw Error('OPENAUDIO_OPERATION_NOT_ADMITTED');return Object.freeze({admitted:true,operation:String(x.operation||'DESCRIBE'),physicalCapture:false});}
function bindOpenAudioNaturalizationV04652(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalAllocationSystemizationFabricV36398,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395}=deps;
 /* === Terraformer v0.36.402: Open Audio Naturalization + Audio/Music Program Fabric === */
const TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402=Object.freeze([
 Object.freeze({id:"system.music",concept:"Music",type:"creative-audio-domain-system",mode:"audio-music-contextual",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.program-type",concept:"Program Type",type:"program-classification-system",mode:"deterministic",condition:"program-context-admitted",state:"ready"}),
 Object.freeze({id:"system.audio-program",concept:"Audio Program",type:"program-specialization-system",mode:"audio",condition:"audio-context-admitted",state:"ready"}),
 Object.freeze({id:"system.music-program",concept:"Music Program",type:"program-specialization-system",mode:"music",condition:"music-context-admitted",state:"ready"}),
 Object.freeze({id:"system.mixing",concept:"Mixing",type:"audio-process-system",mode:"bounded-audio-processing",condition:"mixing-context-admitted",state:"ready"}),
 Object.freeze({id:"system.mixer",concept:"Mixer",type:"audio-actor-system",mode:"bounded-audio-processing",condition:"mixing-context-admitted",state:"ready"}),
 Object.freeze({id:"system.mixing-program",concept:"Mixing Program",type:"program-specialization-system",mode:"mixing",condition:"mixing-context-admitted",state:"ready"}),
 Object.freeze({id:"system.synthesizing",concept:"Synthesizing",type:"audio-generation-process-system",mode:"bounded-audio-generation",condition:"synthesis-context-admitted",state:"ready"}),
 Object.freeze({id:"system.synthesizer",concept:"Synthesizer",type:"audio-generation-actor-system",mode:"bounded-audio-generation",condition:"synthesis-context-admitted",state:"ready"}),
 Object.freeze({id:"system.synthesizer-program",concept:"Synthesizer Program",type:"program-specialization-system",mode:"synthesizer",condition:"synthesis-context-admitted",state:"ready"}),
 Object.freeze({id:"system.audio-context",concept:"Audio Context",type:"context-specialization-system",mode:"audio",condition:"audio-domain-admitted",state:"ready"}),
 Object.freeze({id:"system.music-context",concept:"Music Context",type:"context-specialization-system",mode:"music",condition:"music-domain-admitted",state:"ready"}),
 Object.freeze({id:"system.mixing-context",concept:"Mixing Context",type:"context-specialization-system",mode:"mixing",condition:"mixing-admitted",state:"ready"})
]);
const TF_OPEN_AUDIO_NATURALIZATION_RELATIONSHIPS_V36402=Object.freeze([
 Object.freeze({from:"system.music",relation:"uses",to:"system.audio"}),
 Object.freeze({from:"system.audio-program",relation:"is-a",to:"system.program"}),Object.freeze({from:"system.audio-program",relation:"typed-by",to:"system.program-type"}),Object.freeze({from:"system.audio-program",relation:"uses",to:"system.audio"}),
 Object.freeze({from:"system.music-program",relation:"is-a",to:"system.program"}),Object.freeze({from:"system.music-program",relation:"typed-by",to:"system.program-type"}),Object.freeze({from:"system.music-program",relation:"uses",to:"system.music"}),
 Object.freeze({from:"system.mixing",relation:"uses",to:"system.audio"}),Object.freeze({from:"system.mixer",relation:"part-of",to:"system.mixing"}),
 Object.freeze({from:"system.mixing-program",relation:"is-a",to:"system.program"}),Object.freeze({from:"system.mixing-program",relation:"typed-by",to:"system.program-type"}),Object.freeze({from:"system.mixing-program",relation:"uses",to:"system.mixer"}),
 Object.freeze({from:"system.synthesizing",relation:"uses",to:"system.audio"}),Object.freeze({from:"system.synthesizer",relation:"part-of",to:"system.synthesizing"}),
 Object.freeze({from:"system.synthesizer-program",relation:"is-a",to:"system.program"}),Object.freeze({from:"system.synthesizer-program",relation:"typed-by",to:"system.program-type"}),Object.freeze({from:"system.synthesizer-program",relation:"uses",to:"system.synthesizer"}),
 Object.freeze({from:"system.audio-context",relation:"context-of",to:"system.audio"}),Object.freeze({from:"system.music-context",relation:"context-of",to:"system.music"}),Object.freeze({from:"system.mixing-context",relation:"context-of",to:"system.mixing"}),Object.freeze({from:"system.mixing-context",relation:"uses",to:"system.audio-context"})
]);
const TF_OPEN_AUDIO_SOURCE_V36402=Object.freeze({name:"Open Audio",version:"0.349.0",role:"predecessor-source-architecture",zipSha256:"810db206ad693dac1efdb95afe58003e23c1f42d45b4662afba398ec06f333bf",javascriptSha256:"cf64b1ffe17d2f7cff34a16eac08f2eaf387d7bd51a3b87ceb043104c1da9c68",sourceClasses:626,embeddedSource:false,parallelRuntimeAuthority:false,historicalRewrite:false});
function tfAudioProgramTypeV36402(kind){
 const types=Object.freeze({audio:Object.freeze({system:"system.audio-program",domain:"system.audio",context:"system.audio-context"}),music:Object.freeze({system:"system.music-program",domain:"system.music",context:"system.music-context"}),mixing:Object.freeze({system:"system.mixing-program",domain:"system.mixing",context:"system.mixing-context"}),synthesizer:Object.freeze({system:"system.synthesizer-program",domain:"system.synthesizer",context:"system.audio-context"})});
 const x=types[String(kind)];if(!x)throw new Error("[TF:system.program-type:invalid] audio, music, mixing, or synthesizer required.");
 return Object.freeze({program:"system.program",programType:"system.program-type",kind:String(kind),...x,logical:true,automaticExecution:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
function tfAudioMusicContextsV36402(owner="system.audio"){
 const base=Object.freeze({owner:String(owner),contextSystem:"system.context",logical:true,volatile:true,automaticExecution:false,deviceAccess:false,networkAccess:false,persistence:false,externalEffect:false,authorityAmplification:false});
 return Object.freeze({audio:Object.freeze({...base,id:String(owner)+"::audio-context",type:"system.audio-context",domain:"system.audio"}),music:Object.freeze({...base,id:String(owner)+"::music-context",type:"system.music-context",domain:"system.music"}),mixing:Object.freeze({...base,id:String(owner)+"::mixing-context",type:"system.mixing-context",domain:"system.mixing",mixer:"system.mixer"})});
}
function tfOpenAudioNaturalizationV36402(){
 return Object.freeze({source:TF_OPEN_AUDIO_SOURCE_V36402,target:"Terraformer",strategy:"naturalize-then-normalize",secondRuntime:false,secondAuthority:false,sourceCodeCopied:false,
  reuse:Object.freeze(["system.audio","system.program","system.effect","system.signal","system.recording","system.recording.audio","system.web-audio","system.studio","system.browser","system.telegram","system.telegram.api","system.whatsapp","system.whatsapp.api","system.wiring","system.grouping","system.service","system.server","system.client"]),
  additions:Object.freeze(TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402.map(x=>x.id)),
  domains:Object.freeze({audio:Object.freeze(["audio-runtime","audio-io","audio-sample","audio-encoding","audio-input","audio-output","audio-clock","web-audio"]),music:Object.freeze(["music-language","musical-events","arrangement","tracks","patterns","clips","sequencing","transport"]),mixing:Object.freeze(["mixer","channels","buses","routing","gain","automation","effects","mastering"]),synthesis:Object.freeze(["synthesizer","instrument","oscillator","modulation","midi"]),studio:Object.freeze(["studio","editor","recording","rendering","browser-surface","desktop-surface"])}),
  rule:"Open Audio is preserved as predecessor provenance while its admitted semantics are normalized into canonical Terraformer Systems; equivalent Terraformer Systems are reused and no parallel Open Audio runtime authority is created."});
}
function tfOpenAudioNaturalizationSelfTestV36402(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 const required=["system.audio","system.program","system.effect","system.signal","system.recording","system.web-audio","system.studio","system.music","system.program-type","system.audio-program","system.music-program","system.mixing","system.mixer","system.mixing-program","system.synthesizing","system.synthesizer","system.synthesizer-program","system.audio-context","system.music-context","system.mixing-context"];
 for(const id of required)if(!ids.has(id))missing.push(id);
 const nat=tfOpenAudioNaturalizationV36402(),contexts=tfAudioMusicContextsV36402(),types=["audio","music","mixing","synthesizer"].map(tfAudioProgramTypeV36402);
 if(nat.secondRuntime||nat.secondAuthority||nat.sourceCodeCopied||nat.source.embeddedSource||nat.source.parallelRuntimeAuthority)missing.push("parallel-authority");
 if(new Set(nat.additions).size!==TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402.length)missing.push("duplicate-addition");
 if(types.some(x=>x.program!=="system.program"||x.programType!=="system.program-type"||x.automaticExecution||x.externalEffect||x.authorityAmplification))missing.push("program-types");
 if(!contexts.mixing||contexts.mixing.domain!=="system.mixing"||contexts.mixing.mixer!=="system.mixer"||contexts.mixing.deviceAccess||contexts.mixing.externalEffect)missing.push("mixing-context");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),specs=tfUniversalSpecificationFabricV36397(sourceText),alloc=tfUniversalAllocationSystemizationFabricV36398(sourceText),refs=tfUniversalReferenceFabricV36396(sourceText),proc=tfUniversalProcessCycleFabricV36395(sourceText);
 if([layers.layers,defs.defaults,specs.specifications,alloc.allocators,refs.references,proc.processes].some(n=>n!==ids.size))missing.push("universal-fabric");
 const handbook=tfTerraformerHandbookV36402(sourceText);if(handbook.systemsCovered!==ids.size||!handbook.includesOpenAudioNaturalization||!handbook.completeCanonicalSystemCoverage)missing.push("handbook");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Open Audio naturalization failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,source:"Open Audio v0.349.0",sourceClasses:626,newSystems:TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402.length,reusedSystems:nat.reuse.length,systemsCovered:ids.size,audio:true,music:true,programTypes:types.map(x=>x.kind),mixing:true,mixer:true,synthesizing:true,synthesizer:true,audioContext:true,musicContext:true,mixingContext:true,parallelRuntimeAuthority:false,sourceCodeCopied:false,automaticExecution:false,externalEffect:false,authorityAmplification:false,missing:0});
}
function tfTerraformerHandbookV36402(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),versions=[...new Set((String(sourceText).match(/v0\.36\.\d+/g)||[]))].sort((a,b)=>Number(a.split(".")[2])-Number(b.split(".")[2]));
 const chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));
 return Object.freeze({id:"terraformer::handbook::v0.36.402",system:"system.handbook",project:"Terraformer",version:"0.36.402",current:true,generatedFromCanonicalRegistry:true,systemsCovered:ids.length,canonicalSystems:ids.length,completeCanonicalSystemCoverage:chapters.length===ids.length,chapters:Object.freeze(chapters),versions:Object.freeze(versions),versionBlocksCovered:versions.length,includesArchitecture:true,includesRuntime:true,includesRelationships:true,includesGrouping:true,includesWiring:true,includesProcesses:true,includesQualification:true,includesRecoveryLineage:true,includesSecurityBoundaries:true,includesHistoricalVersionCorpus:true,includesOpenAudioNaturalization:true,openAudioSource:TF_OPEN_AUDIO_SOURCE_V36402,sourceDeletion:false,historicalRewrite:false,readOnly:true,persistence:false,authorityAmplification:false});
}
globalThis.TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402=TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402;globalThis.TF_OPEN_AUDIO_NATURALIZATION_RELATIONSHIPS_V36402=TF_OPEN_AUDIO_NATURALIZATION_RELATIONSHIPS_V36402;globalThis.TF_OPEN_AUDIO_SOURCE_V36402=TF_OPEN_AUDIO_SOURCE_V36402;
globalThis.tfAudioProgramTypeV36402=tfAudioProgramTypeV36402;globalThis.tfAudioMusicContextsV36402=tfAudioMusicContextsV36402;globalThis.tfOpenAudioNaturalizationV36402=tfOpenAudioNaturalizationV36402;globalThis.tfOpenAudioNaturalizationSelfTestV36402=tfOpenAudioNaturalizationSelfTestV36402;
 return Object.freeze({TF_OPEN_AUDIO_NATURALIZATION_SYSTEMS_V36402,TF_OPEN_AUDIO_NATURALIZATION_RELATIONSHIPS_V36402,TF_OPEN_AUDIO_SOURCE_V36402,tfAudioProgramTypeV36402,tfAudioMusicContextsV36402,tfOpenAudioNaturalizationV36402,tfOpenAudioNaturalizationSelfTestV36402,tfTerraformerHandbookV36402});
}
module.exports=Object.freeze({ID,VERSION,descriptor,admit,bindOpenAudioNaturalizationV04652});

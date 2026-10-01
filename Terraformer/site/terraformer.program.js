'use strict';
const fs=require('fs'),path=require('path');
const ID='terraformer.program',VERSION='0.47.83',REGISTRY='terraformer.programs.json',KIND='PROGRAM_REGISTRY';
function loadRegistry(){const p=path.join(__dirname,REGISTRY),x=JSON.parse(fs.readFileSync(p,'utf8'));if(x.version!==VERSION||x.kind!==KIND||x.authority!==false)throw Error(ID+': invalid registry');return Object.freeze(x);}
function descriptor(){return Object.freeze({id:ID,version:VERSION,registry:REGISTRY,authority:'GOVERNED_BY_TERRAFORMER'});}
function qualify(){const r=loadRegistry();return Object.freeze({pass:r.kind===KIND&&r.authority===false,id:ID,registry:REGISTRY});}

function bindProgramTypeRelationshipsV04657(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36406}=deps;
 /* === Terraformer v0.36.407: Reconstructible Program Type Relationship Rules === */
const TF_PROGRAM_TYPE_RULES_V36407=Object.freeze([
 Object.freeze({id:"rule.program-type.audio",type:"program-type-rule",programType:"program-type.audio",program:"system.audio-program",domain:"system.audio",context:"system.audio-context",editing:"system.audio-editing",renderer:"system.audio-renderer"}),
 Object.freeze({id:"rule.program-type.music",type:"program-type-rule",programType:"program-type.music",program:"system.music-program",domain:"system.music",context:"system.music-context",editing:null,renderer:null}),
 Object.freeze({id:"rule.program-type.mixing",type:"program-type-rule",programType:"program-type.mixing",program:"system.mixing-program",domain:"system.mixing",context:"system.mixing-context",editing:"system.audio-editing",specialist:"system.mixer"}),
 Object.freeze({id:"rule.program-type.synthesizer",type:"program-type-rule",programType:"program-type.synthesizer",program:"system.synthesizer-program",domain:"system.synthesizer",context:"system.audio-context",editing:null,specialist:"system.synthesizer"})
]);
function tfProgramTypeRuleV36407(kind){
 const k=String(kind),x=TF_PROGRAM_TYPE_RULES_V36407.find(r=>r.programType==="program-type."+k);
 if(!x)throw new Error("[TF:system.rule:invalid-program-type-rule] audio, music, mixing, or synthesizer required.");
 return x;
}
function tfReconstructProgramTypeRelationshipsV36407(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText));
 return Object.freeze(TF_PROGRAM_TYPE_RULES_V36407.map(rule=>{
  const endpoints=["system.program","system.program-type",rule.program,rule.domain,rule.context].concat(rule.editing?[rule.editing]:[],rule.renderer?[rule.renderer]:[],rule.specialist?[rule.specialist]:[]);
  const missing=endpoints.filter(id=>!ids.has(id));
  return Object.freeze({rule:rule.id,programType:rule.programType,program:rule.program,relationships:Object.freeze([
   Object.freeze({from:rule.program,relation:"is-a",to:"system.program"}),
   Object.freeze({from:rule.program,relation:"typed-by",to:"system.program-type"}),
   Object.freeze({from:rule.program,relation:"operates-on",to:rule.domain}),
   Object.freeze({from:rule.program,relation:"uses-context",to:rule.context}),
   ...(rule.editing?[Object.freeze({from:rule.program,relation:"may-use",to:rule.editing})]:[]),
   ...(rule.renderer?[Object.freeze({from:rule.program,relation:"may-use",to:rule.renderer})]:[]),
   ...(rule.specialist?[Object.freeze({from:rule.program,relation:"may-use",to:rule.specialist})]:[])
  ]),missing:Object.freeze(missing),logical:true,automaticExecution:false,automaticEditing:false,automaticRendering:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});
 }));
}
function tfProgramTypeRelationshipSelfTestV36407(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.rule","system.relationship","system.program","system.program-type","system.audio-program","system.music-program","system.mixing-program","system.synthesizer-program","system.audio","system.music","system.mixing","system.synthesizer","system.audio-context","system.music-context","system.mixing-context"])if(!ids.has(id))missing.push(id);
 const reconstructed=tfReconstructProgramTypeRelationshipsV36407(sourceText);
 for(const x of reconstructed){if(x.missing.length)missing.push(...x.missing);if(x.automaticExecution||x.automaticEditing||x.automaticRendering||x.automaticPersistence||x.externalEffect||x.authorityAmplification)missing.push("boundary:"+x.program);if(!x.relationships.some(r=>r.relation==="is-a"&&r.to==="system.program")||!x.relationships.some(r=>r.relation==="typed-by"&&r.to==="system.program-type")||!x.relationships.some(r=>r.relation==="uses-context"))missing.push("relationship:"+x.program);}
 const n=ids.size;
 if(tfUniversalEngineFabricV36349(sourceText).engines.length!==n||tfCompactSystemSeedV36353(sourceText).entries.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");
 if(ids.has("system."+"photo-program")||ids.has("system."+"video-program"))missing.push("unrequired-media-program");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Program Type relationship reconstruction failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:0,systemsCovered:n,rules:TF_PROGRAM_TYPE_RULES_V36407.length,reconstructibleProgramTypeRelationships:true,programTypes:Object.freeze(["audio","music","mixing","synthesizer"]),photoProgramDeferred:true,videoProgramDeferred:true,automaticExecution:false,automaticEditing:false,automaticRendering:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false,missing:0});
}
function tfTerraformerHandbookV36407(sourceText){
 const prior=tfTerraformerHandbookV36406(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText),chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));
 return Object.freeze({...prior,id:"terraformer::handbook::v0.36.407",version:"0.36.407",systemsCovered:ids.length,canonicalSystems:ids.length,chapters:Object.freeze(chapters),completeCanonicalSystemCoverage:chapters.length===ids.length,includesReconstructibleProgramTypeRelationships:true,programTypeRules:TF_PROGRAM_TYPE_RULES_V36407,photoProgramDeferred:true,videoProgramDeferred:true});
}
globalThis.TF_PROGRAM_TYPE_RULES_V36407=TF_PROGRAM_TYPE_RULES_V36407;globalThis.tfProgramTypeRuleV36407=tfProgramTypeRuleV36407;globalThis.tfReconstructProgramTypeRelationshipsV36407=tfReconstructProgramTypeRelationshipsV36407;globalThis.tfProgramTypeRelationshipSelfTestV36407=tfProgramTypeRelationshipSelfTestV36407;
 return Object.freeze({TF_PROGRAM_TYPE_RULES_V36407,tfProgramTypeRuleV36407,tfReconstructProgramTypeRelationshipsV36407,tfProgramTypeRelationshipSelfTestV36407,tfTerraformerHandbookV36407});
}
function bindProgramRelationshipClosureV04658(deps={}){
 const {tfCanonicalSystemIdsV36196,tfReconstructProgramTypeRelationshipsV36407,tfTerraformerHandbookV36407}=deps;
 /* === Terraformer v0.36.408: Program Relationship Closure Rules === */
const TF_PROGRAM_RELATIONSHIP_CLOSURE_V36408=Object.freeze({
 id:"rule.program.relationship-closure",type:"relationship-closure-rule",program:"system.program",programType:"system.program-type",
 ruleSource:"TF_PROGRAM_TYPE_RULES_V36407",requiresExplicitProgramRequirement:true,implicitProgramCreation:false,
 relationshipAuthority:"system.relationship",ruleAuthority:"system.rule",automaticExecution:false,automaticCreation:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false
});
function tfProgramRelationshipClosureV36408(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),r=tfReconstructProgramTypeRelationshipsV36407(sourceText),missing=[];
 for(const id of ["system.program","system.program-type","system.relationship","system.rule"])if(!ids.has(id))missing.push(id);
 for(const x of r)if(x.missing.length)missing.push(...x.missing);
 return Object.freeze({rule:TF_PROGRAM_RELATIONSHIP_CLOSURE_V36408,systemsCovered:ids.size,programRules:r.length,closed:missing.length===0,missing:Object.freeze([...new Set(missing)]),implicitProgramCreation:false,externalEffect:false,authorityAmplification:false});
}
function tfProgramRelationshipClosureSelfTestV36408(sourceText){const x=tfProgramRelationshipClosureV36408(sourceText);if(!x.closed||x.implicitProgramCreation||x.externalEffect||x.authorityAmplification)throw new Error("[TF:system.assurance:qualification-failed] Program relationship closure failed.");return Object.freeze({pass:true,newSystems:0,systemsCovered:x.systemsCovered,programRules:x.programRules,relationshipClosure:true,implicitProgramCreation:false,missing:0});}
function tfTerraformerHandbookV36408(sourceText){const prior=tfTerraformerHandbookV36407(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText);return Object.freeze({...prior,id:"terraformer::handbook::v0.36.408",version:"0.36.408",systemsCovered:ids.length,canonicalSystems:ids.length,completeCanonicalSystemCoverage:true,programRelationshipClosure:tfProgramRelationshipClosureV36408(sourceText)});}
globalThis.TF_PROGRAM_RELATIONSHIP_CLOSURE_V36408=TF_PROGRAM_RELATIONSHIP_CLOSURE_V36408;globalThis.tfProgramRelationshipClosureV36408=tfProgramRelationshipClosureV36408;globalThis.tfProgramRelationshipClosureSelfTestV36408=tfProgramRelationshipClosureSelfTestV36408;
 return Object.freeze({TF_PROGRAM_RELATIONSHIP_CLOSURE_V36408,tfProgramRelationshipClosureV36408,tfProgramRelationshipClosureSelfTestV36408,tfTerraformerHandbookV36408});
}
const TERRAFORMER_PROGRAM_SYSTEM=Object.freeze({schema:'TERRAFORMER-PROGRAM-SYSTEM/1',id:'system.program',name:'Program System',family:'software',type:'program-system',state:'integrated',canonicalPath:'terraformer://program/',dependsOn:Object.freeze(['system.computation','system.runtime']),governs:Object.freeze(['program','entrypoint','instruction','execution-plan','input','output','exit']),rule:'Program System represents executable program units and plans; representation does not itself execute a program or authorize its effects.'});

module.exports=Object.freeze({ID,VERSION,REGISTRY,loadRegistry,descriptor,qualify,bindProgramTypeRelationshipsV04657,bindProgramRelationshipClosureV04658,TERRAFORMER_PROGRAM_SYSTEM});

const PROGRAM_LAYER_V04783=Object.freeze({schema:'TERRAFORMER-PROGRAM-LAYER/1',version:'0.47.83',role:'usage-interaction-visualization-boundary',contains:'system.application',developmentOrder:Object.freeze(['system.system','system.application','system.program']),userProjection:Object.freeze(['system.program','system.application','system.system']),directSystemInteractionByDefault:false,authorityGranted:false});
module.exports=Object.freeze({...module.exports,PROGRAM_LAYER_V04783});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfProgramStateV4069(program="terraformer"){
 const p=TF_PROGRAM_REGISTRY_V4069[program]; if(!p) throw Error("unknown program");
 return Object.freeze({host:"terraformer",foregroundProgram:program,mode:program,program:p,semanticAuthority:"terraformer",authorityExpanded:false});
}

function tfSwitchProgramV4069(current,target,{admitted=false,authorized=false,qualified=false}={}){
 if(!TF_PROGRAM_REGISTRY_V4069[target]) return Object.freeze({ok:false,state:current,reason:"UNKNOWN_PROGRAM"});
 if(!(admitted&&authorized&&qualified)) return Object.freeze({ok:false,state:current,reason:"PROGRAM_SWITCH_GATE_DENIED"});
 return Object.freeze({ok:true,state:tfProgramStateV4069(target),morph:true,parallelForeground:false});
}


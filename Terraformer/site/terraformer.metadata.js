'use strict';
/* Terraformer v0.44.39 — Universal Entity Metadata extraction. */
function bindMetadataV04439(deps={}){
 const {tfCanonicalSystemIdsV36196,tfSystemGeneratorDescriptorV36196,tfSystemAutomatorDescriptorV36196,tfNativeObjectNaturalizationSelfTestV36205,tfCanonicalSemanticSelfTestV36204}=deps;
 if(typeof tfCanonicalSystemIdsV36196!=='function'||typeof tfSystemGeneratorDescriptorV36196!=='function'||typeof tfSystemAutomatorDescriptorV36196!=='function'||typeof tfNativeObjectNaturalizationSelfTestV36205!=='function'||typeof tfCanonicalSemanticSelfTestV36204!=='function') throw new Error('metadata dependency contract incomplete');
 const SYSTEM_REGISTRY=deps.SYSTEM_REGISTRY||{}; const LOCALHOST_V068_WORKERS=deps.LOCALHOST_V068_WORKERS||[]; const TELEGRAM_WORKERS=deps.TELEGRAM_WORKERS||[]; const TERRAFORMER_LANGUAGE_WORKERS=deps.TERRAFORMER_LANGUAGE_WORKERS||[]; const TERRAFORMER_TOOL_WORKERS=deps.TERRAFORMER_TOOL_WORKERS||[];
const TF_ENTITY_METADATA_SCHEMA_V36206=Object.freeze({
 schema:"TERRAFORMER-ENTITY-METADATA/1",
 kinds:Object.freeze(["system","worker","generator","automator"]),
 required:Object.freeze(["type","mode","condition","state"]),
 rule:"Every System, Worker, Generator and Automator resolves type, mode, condition and state without replacing specialized source metadata."
});
function tfEntityMetadataV36206(kind,entity){
 kind=String(kind||"").toLowerCase();entity=entity||{};if(!TF_ENTITY_METADATA_SCHEMA_V36206.kinds.includes(kind))throw new Error("unsupported entity kind");
 const policy=entity.policy||null;
 const type=String(entity.type||entity.family||kind);
 const mode=String(entity.mode||(kind==="automator"?(policy==="manual-only"?"manual":policy==="authorization-required"?"authorized":"bounded"):(kind==="worker"?"bounded-worker":kind==="generator"?"conditional-generation":"canonical")));
 const raw=entity.condition??entity.conditions??entity.preconditions??(kind==="system"?"registered-and-valid":"conditions-satisfied");
 const condition=Array.isArray(raw)?Object.freeze(raw.map(String)):String(raw);
 const state=String(entity.state||(kind==="automator"?(entity.enabledByDefault?"admissible":"gated"):(kind==="generator"?"registered":"registered")));
 return Object.freeze({type,mode,condition,state});
}
function tfEntityDescriptorV36206(kind,entity){return Object.freeze({...entity,...tfEntityMetadataV36206(kind,entity)})}
function tfSystemDescriptorsV36206(sourceText){return tfCanonicalSystemIdsV36196(sourceText).map(id=>{
 const source=(typeof SYSTEM_REGISTRY!=="undefined"&&Object.values(SYSTEM_REGISTRY).find(x=>x&&x.id===id))||{id};
 return tfEntityDescriptorV36206("system",source);
})}
function tfWorkerDescriptorsV36206(){
 const source=[...(typeof LOCALHOST_V068_WORKERS!=="undefined"?LOCALHOST_V068_WORKERS:[]),...(typeof TELEGRAM_WORKERS!=="undefined"?TELEGRAM_WORKERS:[]),...(typeof TERRAFORMER_LANGUAGE_WORKERS!=="undefined"?TERRAFORMER_LANGUAGE_WORKERS:[]),...(typeof TERRAFORMER_TOOL_WORKERS!=="undefined"?TERRAFORMER_TOOL_WORKERS:[])];
 const seen=new Set(),out=[];for(const w of source){const id=String(w.id||w.key||w.name||"");if(!id||seen.has(id))continue;seen.add(id);out.push(tfEntityDescriptorV36206("worker",w))}return out;
}
function tfGeneratorDescriptorsV36206(sourceText){return tfCanonicalSystemIdsV36196(sourceText).map(id=>tfEntityDescriptorV36206("generator",tfSystemGeneratorDescriptorV36196(id)))}
function tfAutomatorDescriptorsV36206(sourceText){return tfCanonicalSystemIdsV36196(sourceText).map(id=>tfEntityDescriptorV36206("automator",tfSystemAutomatorDescriptorV36196(id)))}
function tfUniversalEntityMetadataCoverageV36206(sourceText){
 const groups={systems:tfSystemDescriptorsV36206(sourceText),workers:tfWorkerDescriptorsV36206(),generators:tfGeneratorDescriptorsV36206(sourceText),automators:tfAutomatorDescriptorsV36206(sourceText)},missing=[];
 for(const [group,items] of Object.entries(groups))for(const x of items)for(const k of TF_ENTITY_METADATA_SCHEMA_V36206.required)if(x[k]===undefined||x[k]===null||x[k]==="")missing.push({group,id:x.id||x.key||x.name,key:k});
 return Object.freeze({groups:Object.freeze(groups),counts:Object.freeze(Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length]))),missing:Object.freeze(missing),pass:missing.length===0});
}
function tfNativeRuntimeIndependenceV36206(){
 const native=tfNativeObjectNaturalizationSelfTestV36205(),semantic=tfCanonicalSemanticSelfTestV36204();
 return Object.freeze({pass:native.pass&&semantic.pass&&native.unmapped===0&&!native.legacyRuntimeAuthority&&!semantic.activeLegacyProjectAuthority,nativeArtifacts:native.artifacts,semanticRecords:semantic.records,normalRuntimeSource:"native-prewritten-volatile-images",predecessorRuntimeRequired:false,predecessorRole:"lineage-evidence-only"});
}
function tfUniversalEntityMetadataSelfTestV36206(sourceText){
 const c=tfUniversalEntityMetadataCoverageV36206(sourceText),r=tfNativeRuntimeIndependenceV36206();
 if(!c.pass)throw new Error("universal entity metadata coverage failure");
 if(!r.pass||r.predecessorRuntimeRequired)throw new Error("native runtime independence failure");
 return Object.freeze({pass:true,...c.counts,required:Object.freeze([...TF_ENTITY_METADATA_SCHEMA_V36206.required]),missing:0,nativeRuntimeIndependent:true,predecessorRuntimeRequired:false});
}

 return Object.freeze({TF_ENTITY_METADATA_SCHEMA_V36206,tfEntityMetadataV36206,tfEntityDescriptorV36206,tfSystemDescriptorsV36206,tfWorkerDescriptorsV36206,tfGeneratorDescriptorsV36206,tfAutomatorDescriptorsV36206,tfUniversalEntityMetadataCoverageV36206,tfNativeRuntimeIndependenceV36206,tfUniversalEntityMetadataSelfTestV36206});
}
module.exports=Object.freeze({bindMetadataV04439});

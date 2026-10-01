"use strict";
const SYSTEM=Object.freeze({id:"system.linking",concept:"Linking",authorityGranted:false,scaffold:true});
function bindLinkingV04508(){return Object.freeze({SYSTEM});}
function bindLinkingFabricV04659(deps={}){
 const {tfCanonicalSystemIdsV36196,tfTerraformerHandbookV36408}=deps;
 /* === Terraformer v0.36.409: Linking / Linker / Link Fabric === */
const TF_LINKING_SYSTEMS_V36409=Object.freeze([
 Object.freeze({id:"system.link",concept:"Link",type:"association",mode:"logical",condition:"admitted",state:"available"})
]);
const TF_LINKING_RELATIONSHIPS_V36409=Object.freeze([
 Object.freeze({from:"system.linking",relation:"performed-by",to:"system.linker"}),
 Object.freeze({from:"system.linking",relation:"produces",to:"system.link"}),
 Object.freeze({from:"system.link",relation:"distinct-from",to:"system.wire"}),
 Object.freeze({from:"system.link",relation:"distinct-from",to:"system.relationship"}),
 Object.freeze({from:"system.link",relation:"distinct-from",to:"system.reference"})
]);
function tfLinkV36409(source,target,kind="logical"){
 if(source==null||target==null)throw new Error("[TF:system.linking:invalid-endpoint] source and target required.");
 return Object.freeze({type:"system.link",source:String(source),target:String(target),kind:String(kind),logical:true,automaticConnect:false,automaticInvoke:false,automaticResolve:false,automaticMutation:false,automaticNetwork:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});
}
function tfLinkingSelfTestV36409(sourceText){const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const id of ["system.linking","system.linker","system.link","system.wire","system.relationship","system.reference"])if(!ids.has(id))missing.push(id);const x=tfLinkV36409("a","b");if(x.automaticConnect||x.automaticInvoke||x.automaticResolve||x.automaticMutation||x.automaticNetwork||x.externalEffect||x.authorityAmplification)missing.push("boundary");if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Linking fabric failed: "+missing.join(","));return Object.freeze({pass:true,newSystems:1,systemsCovered:ids.size,linking:true,linker:true,link:true,logical:true,missing:0});}
function tfTerraformerHandbookV36409(sourceText){const prior=tfTerraformerHandbookV36408(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText);return Object.freeze({...prior,id:"terraformer::handbook::v0.36.409",version:"0.36.409",systemsCovered:ids.length,canonicalSystems:ids.length,completeCanonicalSystemCoverage:true,includesLinkingFabric:true,linkingRelationships:TF_LINKING_RELATIONSHIPS_V36409});}
globalThis.TF_LINKING_SYSTEMS_V36409=TF_LINKING_SYSTEMS_V36409;globalThis.TF_LINKING_RELATIONSHIPS_V36409=TF_LINKING_RELATIONSHIPS_V36409;globalThis.tfLinkV36409=tfLinkV36409;globalThis.tfLinkingSelfTestV36409=tfLinkingSelfTestV36409;
 return Object.freeze({TF_LINKING_SYSTEMS_V36409,TF_LINKING_RELATIONSHIPS_V36409,tfLinkV36409,tfLinkingSelfTestV36409,tfTerraformerHandbookV36409});
}
function bindLinkingReconstructionV04660(deps={}){
 const {tfCanonicalSystemIdsV36196,TF_LINKING_RELATIONSHIPS_V36409,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36409}=deps;
 /* === Terraformer v0.36.410: Reconstructible Linking Relationship Rules === */
const TF_LINKING_RULES_V36410=Object.freeze([
 Object.freeze({id:"rule.linking.canonical",type:"linking-rule",process:"system.linking",actor:"system.linker",result:"system.link",endpointPolicy:"explicit",logical:true}),
 Object.freeze({id:"rule.linking.boundary",type:"linking-boundary-rule",link:"system.link",wire:"system.wire",relationship:"system.relationship",reference:"system.reference",automaticConnect:false,automaticInvoke:false,automaticResolve:false,automaticMutation:false,automaticNetwork:false,authorityAmplification:false})
]);
function tfReconstructLinkingV36410(sourceText){const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),required=["system.linking","system.linker","system.link","system.wire","system.relationship","system.reference"],missing=required.filter(id=>!ids.has(id));return Object.freeze({rules:TF_LINKING_RULES_V36410,relationships:Object.freeze(TF_LINKING_RELATIONSHIPS_V36409),systemsCovered:ids.size,missing:Object.freeze(missing),reconstructible:missing.length===0,logical:true,automaticConnect:false,automaticInvoke:false,automaticResolve:false,automaticMutation:false,automaticNetwork:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});}
function tfLinkingReconstructionSelfTestV36410(sourceText){const x=tfReconstructLinkingV36410(sourceText),n=x.systemsCovered,missing=[...x.missing];if(!x.reconstructible||x.automaticConnect||x.automaticInvoke||x.automaticResolve||x.automaticMutation||x.automaticNetwork||x.externalEffect||x.authorityAmplification)missing.push("boundary");if(tfUniversalEngineFabricV36349(sourceText).engines.length!==n||tfCompactSystemSeedV36353(sourceText).entries.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Linking reconstruction failed: "+[...new Set(missing)].join(","));return Object.freeze({pass:true,newSystems:0,systemsCovered:n,reconstructibleLinking:true,rules:TF_LINKING_RULES_V36410.length,missing:0});}
function tfTerraformerHandbookV36410(sourceText){const prior=tfTerraformerHandbookV36409(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText);return Object.freeze({...prior,id:"terraformer::handbook::v0.36.410",version:"0.36.410",systemsCovered:ids.length,canonicalSystems:ids.length,completeCanonicalSystemCoverage:true,reconstructibleLinking:tfReconstructLinkingV36410(sourceText)});}
globalThis.TF_LINKING_RULES_V36410=TF_LINKING_RULES_V36410;globalThis.tfReconstructLinkingV36410=tfReconstructLinkingV36410;globalThis.tfLinkingReconstructionSelfTestV36410=tfLinkingReconstructionSelfTestV36410;
 return Object.freeze({TF_LINKING_RULES_V36410,tfReconstructLinkingV36410,tfLinkingReconstructionSelfTestV36410,tfTerraformerHandbookV36410});
}
module.exports=Object.freeze({bindLinkingV04508,bindLinkingFabricV04659,bindLinkingReconstructionV04660});

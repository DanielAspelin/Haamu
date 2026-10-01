"use strict";
function bindTargetDefinitionDescriptionV04643(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388}=deps;
 /* === Terraformer v0.36.394: Targeting / Pinpointing + Universal Resolver / Definition / Description Fabric === */
const TF_TARGET_DEFINITION_SYSTEMS_V36394=Object.freeze([{"id":"system.targeting","concept":"Targeting","type":"target-selection-process-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.targeter","concept":"Targeter","type":"targeting-actor-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.pinpointing","concept":"Pinpointing","type":"precise-location-process-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.pinpointer","concept":"Pinpointer","type":"pinpointing-actor-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.defining","concept":"Defining","type":"definition-process-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.definer","concept":"Definer","type":"defining-actor-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.description","concept":"Description","type":"descriptive-record-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.describing","concept":"Describing","type":"description-process-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"},{"id":"system.describer","concept":"Describer","type":"describing-actor-system","mode":"bounded-semantic-operation","condition":"context-admitted","state":"ready"}]);

const TF_TARGET_DEFINITION_RELATIONSHIPS_V36394=Object.freeze([
 Object.freeze({from:"system.targeter",relation:"part-of",to:"system.targeting"}),Object.freeze({from:"system.targeting",relation:"produces",to:"system.target"}),
 Object.freeze({from:"system.pinpointer",relation:"part-of",to:"system.pinpointing"}),Object.freeze({from:"system.pinpointing",relation:"may-refine",to:"system.target"}),
 Object.freeze({from:"system.definer",relation:"part-of",to:"system.defining"}),Object.freeze({from:"system.defining",relation:"produces",to:"system.definition"}),
 Object.freeze({from:"system.describer",relation:"part-of",to:"system.describing"}),Object.freeze({from:"system.describing",relation:"produces",to:"system.description"}),
 Object.freeze({from:"system.resolver",relation:"resolves",to:"system.system"})
]);
function tfSystemResolverV36394(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.resolver:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::resolver",owner,system:"system.resolver",canonicalReference:owner,readOnly:true,identityMutation:false,persistence:false,authorityAmplification:false});
}
function tfSystemDefinitionV36394(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.definition:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::definition",owner,system:"system.definition",definedBy:"system.definer",through:"system.defining",
  definition:"Canonical Terraformer System identified as "+owner+".",semanticIdentity:true,executable:false,persistence:false,authorityAmplification:false});
}
function tfSystemDescriptionV36394(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.description:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::description",owner,system:"system.description",describedBy:"system.describer",through:"system.describing",
  description:"Terraformer System "+owner+" with universal derived capabilities and governed runtime boundaries.",executable:false,persistence:false,authorityAmplification:false});
}
function tfUniversalResolverDefinitionDescriptionV36394(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),resolvers=ids.map(tfSystemResolverV36394),definitions=ids.map(tfSystemDefinitionV36394),descriptions=ids.map(tfSystemDescriptionV36394);
 return Object.freeze({systemsCovered:ids.length,resolvers:Object.freeze(resolvers),definitions:Object.freeze(definitions),descriptions:Object.freeze(descriptions),
  everySystemResolver:true,everySystemDefinition:true,everySystemDescription:true});
}
function tfTargetV36394(subject){return Object.freeze({system:"system.targeting",targeter:"system.targeter",target:"system.target",subject,selected:true,authorityAmplification:false});}
function tfPinpointV36394(target,locator){if(!target?.selected)throw new Error("[TF:system.pinpointing:invalid-target] Selected Target required.");return Object.freeze({system:"system.pinpointing",pinpointer:"system.pinpointer",target,locator:locator??null,precise:Boolean(locator),externalEffect:false,authorityAmplification:false});}
function tfTargetDefinitionSelfTestV36394(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.target","system.targeting","system.targeter","system.pinpointing","system.pinpointer","system.resolver","system.definition","system.defining","system.definer","system.description","system.describing","system.describer"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalResolverDefinitionDescriptionV36394(sourceText);
 if(u.resolvers.length!==ids.size||u.definitions.length!==ids.size||u.descriptions.length!==ids.size)missing.push("universal-coverage");
 if(new Set(u.resolvers.map(x=>x.id)).size!==ids.size||new Set(u.definitions.map(x=>x.id)).size!==ids.size||new Set(u.descriptions.map(x=>x.id)).size!==ids.size)missing.push("uniqueness");
 const p=tfPinpointV36394(tfTargetV36394("fixture"),"fixture-locator");if(!p.precise||p.externalEffect||p.authorityAmplification)missing.push("pinpoint");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_TARGET_DEFINITION_SYSTEMS_V36394){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText);if(layers.layers!==ids.size||defs.defaults!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Target/Definition/Description fabric failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:9,targetReused:true,resolverReused:true,definitionReused:true,systemsCovered:ids.size,resolvers:u.resolvers.length,
  definitions:u.definitions.length,descriptions:u.descriptions.length,everySystemResolver:true,everySystemDefinition:true,everySystemDescription:true,
  targeting:true,targeter:true,pinpointing:true,pinpointer:true,defining:true,definer:true,describing:true,describer:true,identityMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_TARGET_DEFINITION_SYSTEMS_V36394=TF_TARGET_DEFINITION_SYSTEMS_V36394;globalThis.TF_TARGET_DEFINITION_RELATIONSHIPS_V36394=TF_TARGET_DEFINITION_RELATIONSHIPS_V36394;
globalThis.tfSystemResolverV36394=tfSystemResolverV36394;globalThis.tfSystemDefinitionV36394=tfSystemDefinitionV36394;globalThis.tfSystemDescriptionV36394=tfSystemDescriptionV36394;
globalThis.tfUniversalResolverDefinitionDescriptionV36394=tfUniversalResolverDefinitionDescriptionV36394;globalThis.tfTargetV36394=tfTargetV36394;globalThis.tfPinpointV36394=tfPinpointV36394;
 return Object.freeze({TF_TARGET_DEFINITION_SYSTEMS_V36394,TF_TARGET_DEFINITION_RELATIONSHIPS_V36394,tfSystemResolverV36394,tfSystemDefinitionV36394,tfSystemDescriptionV36394,tfUniversalResolverDefinitionDescriptionV36394,tfTargetV36394,tfPinpointV36394,tfTargetDefinitionSelfTestV36394});
}
module.exports=Object.freeze({bindTargetDefinitionDescriptionV04643});

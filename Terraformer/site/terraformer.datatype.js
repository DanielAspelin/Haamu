"use strict";
const SYSTEM=Object.freeze({id:"system.type",concept:"Data Type Fabric",type:"canonical-type-catalogue",descriptiveOnly:true,authorityGranted:false});
function bindDataTypeV04598(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353}=deps;
 /* === Terraformer v0.36.357: Canonical Data-Type System Fabric === */
const TF_DATA_TYPE_SYSTEMS_V36357=Object.freeze([{"id":"system.character","concept":"Character","family":"scalar-text"},{"id":"system.integer","concept":"Integer","family":"scalar-numeric"},{"id":"system.boolean","concept":"Boolean","family":"scalar-logical"},{"id":"system.void","concept":"Void","family":"absence"},{"id":"system.string","concept":"String","family":"text"},{"id":"system.float","concept":"Float","family":"scalar-numeric"},{"id":"system.double","concept":"Double","family":"scalar-numeric"},{"id":"system.decimal","concept":"Decimal","family":"scalar-numeric"},{"id":"system.byte","concept":"Byte","family":"scalar-numeric"},{"id":"system.short","concept":"Short","family":"scalar-numeric"},{"id":"system.long","concept":"Long","family":"scalar-numeric"},{"id":"system.unsigned","concept":"Unsigned","family":"numeric-modifier"},{"id":"system.signed","concept":"Signed","family":"numeric-modifier"},{"id":"system.bigint","concept":"BigInt","family":"scalar-numeric"},{"id":"system.complex","concept":"Complex","family":"scalar-numeric"},{"id":"system.null","concept":"Null","family":"absence"},{"id":"system.undefined","concept":"Undefined","family":"absence"},{"id":"system.set","concept":"Set","family":"aggregate"},{"id":"system.enum","concept":"Enumeration Type","family":"aggregate"},{"id":"system.union","concept":"Union","family":"aggregate"},{"id":"system.struct","concept":"Structure","family":"aggregate"},{"id":"system.generic","concept":"Generic","family":"meta"},{"id":"system.any","concept":"Any","family":"meta"},{"id":"system.unknown","concept":"Unknown","family":"meta"},{"id":"system.never","concept":"Never","family":"absence"},{"id":"system.scalar","concept":"Scalar","family":"category"},{"id":"system.numeric","concept":"Numeric","family":"category"},{"id":"system.logical","concept":"Logical","family":"category"},{"id":"system.textual","concept":"Textual","family":"category"},{"id":"system.aggregate","concept":"Aggregate","family":"category"},{"id":"system.callable","concept":"Callable","family":"category"},{"id":"system.absence","concept":"Absence","family":"category"},{"id":"system.meta-type","concept":"Meta Type","family":"category"}]);

const TF_DATA_TYPE_REUSED_V36357=Object.freeze(["system.type","system.number","system.array","system.object","system.class","system.function","system.symbol","system.pointer","system.reference","system.tuple","system.record","system.map","system.interface"]);
const TF_DATA_TYPE_ALIASES_V36357=Object.freeze({char:"system.character",int:"system.integer",bool:"system.boolean",str:"system.string",uint:"system.unsigned",int8:"system.integer",int16:"system.integer",int32:"system.integer",int64:"system.integer",uint8:"system.unsigned",uint16:"system.unsigned",uint32:"system.unsigned",uint64:"system.unsigned",float32:"system.float",float64:"system.double",big_integer:"system.bigint"});
const TF_DATA_TYPE_CATEGORIES_V36357=Object.freeze({
 scalar:Object.freeze(["system.character","system.integer","system.boolean","system.float","system.double","system.decimal","system.byte","system.short","system.long","system.bigint","system.complex","system.number"]),
 textual:Object.freeze(["system.character","system.string"]),
 aggregate:Object.freeze(["system.array","system.object","system.tuple","system.record","system.map","system.set","system.enum","system.union","system.struct"]),
 reference:Object.freeze(["system.pointer","system.reference","system.object","system.interface","system.class"]),
 callable:Object.freeze(["system.function","system.callable"]),
 absence:Object.freeze(["system.void","system.null","system.undefined","system.never"]),
 meta:Object.freeze(["system.type","system.generic","system.any","system.unknown","system.meta-type"])
});
function tfDataTypeDescriptorV36357(name){
 const key=String(name??"").trim().toLowerCase().replace(/\s+/g,"-"),alias=TF_DATA_TYPE_ALIASES_V36357[key],id=alias||("system."+key);
 const known=new Set([...TF_DATA_TYPE_SYSTEMS_V36357.map(x=>x.id),...TF_DATA_TYPE_REUSED_V36357]);
 return Object.freeze({system:"system.type",id,known:known.has(id),alias:alias||null,languageSpecific:false,value:null,
  allocationPerformed:false,conversionPerformed:false,executionPerformed:false,persistencePerformed:false,authorityGranted:false});
}
function tfDataTypeSelfTestV36357(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 const all=[...TF_DATA_TYPE_SYSTEMS_V36357.map(x=>x.id),...TF_DATA_TYPE_REUSED_V36357];
 for(const id of all)if(!ids.has(id))missing.push(id);
 for(const [a,id] of Object.entries(TF_DATA_TYPE_ALIASES_V36357)){const d=tfDataTypeDescriptorV36357(a);if(d.id!==id||!d.known)missing.push("alias:"+a);}
 const required=["system.character","system.integer","system.boolean","system.void","system.string","system.float","system.double","system.decimal","system.byte","system.short","system.long","system.bigint","system.complex","system.null","system.undefined","system.set","system.enum","system.union","system.struct","system.generic","system.any","system.unknown","system.never"];
 for(const id of required)if(!ids.has(id))missing.push("required:"+id);
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of TF_DATA_TYPE_SYSTEMS_V36357.map(x=>x.id)){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Data-Type qualification failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:TF_DATA_TYPE_SYSTEMS_V36357.length,reusedSystems:TF_DATA_TYPE_REUSED_V36357.length,
  aliases:Object.keys(TF_DATA_TYPE_ALIASES_V36357).length,categories:Object.keys(TF_DATA_TYPE_CATEGORIES_V36357).length,
  character:true,integer:true,boolean:true,void:true,crossLanguageCanonical:true,languageSpecificAliasesSupported:true,
  allocationPerformed:false,conversionPerformed:false,executionPerformed:false,authorityAmplification:false,missing:0});
}
globalThis.TF_DATA_TYPE_SYSTEMS_V36357=TF_DATA_TYPE_SYSTEMS_V36357;
globalThis.TF_DATA_TYPE_REUSED_V36357=TF_DATA_TYPE_REUSED_V36357;
globalThis.TF_DATA_TYPE_ALIASES_V36357=TF_DATA_TYPE_ALIASES_V36357;
globalThis.TF_DATA_TYPE_CATEGORIES_V36357=TF_DATA_TYPE_CATEGORIES_V36357;
globalThis.tfDataTypeDescriptorV36357=tfDataTypeDescriptorV36357;
 return Object.freeze({SYSTEM,TF_DATA_TYPE_SYSTEMS_V36357,TF_DATA_TYPE_REUSED_V36357,TF_DATA_TYPE_ALIASES_V36357,TF_DATA_TYPE_CATEGORIES_V36357,tfDataTypeDescriptorV36357,tfDataTypeSelfTestV36357});
}
module.exports=Object.freeze({SYSTEM,bindDataTypeV04598});

"use strict";
function bindMenuCatalogV04614(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.370: Menu / Sub-menu / Catalog Reconciliation Fabric === */
const TF_MENU_SYSTEMS_V36370=Object.freeze([
 Object.freeze({id:"system.menu",concept:"Menu",type:"navigation-choice-structure-system",mode:"bounded-navigation",condition:"choice-context-admitted",state:"ready"}),
 Object.freeze({id:"system.sub-menu",concept:"Sub-menu",type:"nested-menu-structure-system",mode:"nested-navigation",condition:"parent-menu-context-admitted",state:"ready"})
]);
const TF_MENU_CATALOG_RELATIONSHIPS_V36370=Object.freeze([
 Object.freeze({from:"system.menu",relation:"uses",to:"system.navigation"}),
 Object.freeze({from:"system.menu",relation:"may-use",to:"system.selection"}),
 Object.freeze({from:"system.menu",relation:"may-use",to:"system.interface"}),
 Object.freeze({from:"system.sub-menu",relation:"is-a",to:"system.menu"}),
 Object.freeze({from:"system.sub-menu",relation:"part-of",to:"system.menu"}),
 Object.freeze({from:"system.catalog",relation:"may-use",to:"system.indexing"}),
 Object.freeze({from:"system.catalog",relation:"may-use",to:"system.registry"}),
 Object.freeze({from:"system.catalog",relation:"distinct-from",to:"system.menu"})
]);
function tfMenuCatalogPlanV36370(kind,spec={}){
 const k=String(kind??"").toLowerCase(),map={menu:"system.menu","sub-menu":"system.sub-menu",submenu:"system.sub-menu",catalog:"system.catalog"},id=map[k];
 if(!id)throw new Error("[TF:system.navigation:invalid-input] Menu, Sub-menu, or Catalog required.");
 return Object.freeze({system:id,parent:spec.parent??null,items:Array.isArray(spec.items)?Object.freeze([...spec.items]):Object.freeze([]),
  planOnly:true,selectionPerformed:false,navigationPerformed:false,interfaceMutated:false,registryMutated:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfMenuCatalogSelfTestV36370(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_MENU_SYSTEMS_V36370.map(x=>x.id);
 for(const id of [...added,"system.catalog","system.navigation","system.selection","system.indexing","system.registry","system.interface","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["menu","sub-menu","catalog"]){const p=tfMenuCatalogPlanV36370(k,{items:["fixture"]});if(!p.planOnly||p.selectionPerformed||p.navigationPerformed||p.interfaceMutated||p.registryMutated||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Menu / Sub-menu / Catalog qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,catalogReused:true,menu:true,subMenu:true,subMenuNestedUnderMenu:true,catalogDistinctFromMenu:true,
  systemsWithEngines:2,systemsWithServices:2,systemsInCompactSeed:2,systemsWithActiveSummaries:2,
  navigationPerformed:false,selectionPerformed:false,registryMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_MENU_SYSTEMS_V36370=TF_MENU_SYSTEMS_V36370;
globalThis.TF_MENU_CATALOG_RELATIONSHIPS_V36370=TF_MENU_CATALOG_RELATIONSHIPS_V36370;
globalThis.tfMenuCatalogPlanV36370=tfMenuCatalogPlanV36370;
 return Object.freeze({TF_MENU_SYSTEMS_V36370,TF_MENU_CATALOG_RELATIONSHIPS_V36370,tfMenuCatalogPlanV36370,tfMenuCatalogSelfTestV36370});
}
module.exports=Object.freeze({bindMenuCatalogV04614});

"use strict";
function bindDataOrganizationV04549(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.309: Tabular / Columnar Organization Systems === */
const TF_DATA_ORGANIZATION_SYSTEMS_V36309=Object.freeze([
 Object.freeze({id:"system.tabular",concept:"Tabular",type:"data-organization-system",mode:"row-and-column-organization",condition:"tabular-structure-identified",state:"ready"}),
 Object.freeze({id:"system.columnar",concept:"Columnar",type:"data-organization-system",mode:"column-oriented-organization",condition:"column-oriented-structure-identified",state:"ready"})
]);
const TF_DATA_ORGANIZATION_RELATIONSHIPS_V36309=Object.freeze([
 Object.freeze({from:"system.tabular",relation:"organizes",to:"system.data"}),
 Object.freeze({from:"system.tabular",relation:"uses",to:"system.table"}),
 Object.freeze({from:"system.tabular",relation:"uses",to:"system.row"}),
 Object.freeze({from:"system.tabular",relation:"uses",to:"system.column"}),
 Object.freeze({from:"system.tabular",relation:"uses",to:"system.cell"}),
 Object.freeze({from:"system.columnar",relation:"organizes",to:"system.data"}),
 Object.freeze({from:"system.columnar",relation:"uses",to:"system.column"}),
 Object.freeze({from:"system.columnar",relation:"may-use",to:"system.cell"}),
 Object.freeze({from:"system.database",relation:"may-use",to:"system.tabular"}),
 Object.freeze({from:"system.database",relation:"may-use",to:"system.columnar"}),
 Object.freeze({from:"system.context",relation:"contextualizes",to:"system.tabular"}),
 Object.freeze({from:"system.context",relation:"contextualizes",to:"system.columnar"})
]);
function tfDataOrganizationV36309(spec={}){
 const kind=String(spec.kind??"").toLowerCase();
 if(!["tabular","columnar"].includes(kind))throw new Error("organization must be tabular or columnar");
 return Object.freeze({system:"system."+kind,kind,organizes:"system.data",
  rowPrimary:kind==="tabular",columnPrimary:kind==="columnar",columnShared:true,
  tableRequired:kind==="tabular",tupleIdentityPreserved:true,storageLayoutImplied:false,
  persistenceImplied:false,executionPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfDataOrganizationSelfTestV36309(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.tabular","system.columnar","system.data","system.database","system.table","system.row","system.column","system.cell","system.tuple","system.context"])if(!ids.has(id))missing.push(id);
 const t=tfDataOrganizationV36309({kind:"tabular"}),c=tfDataOrganizationV36309({kind:"columnar"});
 if(!t.rowPrimary||t.columnPrimary||!c.columnPrimary||c.rowPrimary||!t.columnShared||!c.columnShared||c.tableRequired||t.storageLayoutImplied||c.persistenceImplied)missing.push("organization-boundary");
 if(missing.length)throw new Error("data organization qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:2,tabular:true,columnar:true,separateCanonicalSystems:true,columnShared:true,
  rowPrimaryOnlyForTabular:true,columnPrimaryForColumnar:true,tableNotRequiredForColumnar:true,storageLayoutNotImplied:true,
  persistenceSeparate:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_DATA_ORGANIZATION_SYSTEMS_V36309,TF_DATA_ORGANIZATION_RELATIONSHIPS_V36309,tfDataOrganizationV36309,tfDataOrganizationSelfTestV36309});
}
module.exports=Object.freeze({bindDataOrganizationV04549});

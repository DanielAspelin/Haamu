"use strict";
function bindOrganizationDimensionV04550(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.310: Organization / Dimension Structural Fabric === */
const TF_ORGANIZATION_DIMENSION_SYSTEMS_V36310=Object.freeze([
 Object.freeze({id:"system.organization",concept:"Organization",type:"structural-system",mode:"arrangement-and-coordination",condition:"subject-and-organizing-principle-identified",state:"ready"}),
 Object.freeze({id:"system.dimension",concept:"Dimension",type:"structural-descriptor-system",mode:"independent-axis-or-extent",condition:"subject-axis-and-domain-identified",state:"ready"})
]);
const TF_ORGANIZATION_DIMENSION_RELATIONSHIPS_V36310=Object.freeze([
 Object.freeze({from:"system.organization",relation:"organizes",to:"system.data"}),
 Object.freeze({from:"system.tabular",relation:"type-of",to:"system.organization"}),
 Object.freeze({from:"system.columnar",relation:"type-of",to:"system.organization"}),
 Object.freeze({from:"system.dimension",relation:"describes",to:"system.data"}),
 Object.freeze({from:"system.dimension",relation:"describes",to:"system.table"}),
 Object.freeze({from:"system.dimension",relation:"may-describe",to:"system.row"}),
 Object.freeze({from:"system.dimension",relation:"may-describe",to:"system.column"}),
 Object.freeze({from:"system.context",relation:"contextualizes",to:"system.organization"}),
 Object.freeze({from:"system.context",relation:"contextualizes",to:"system.dimension"})
]);
function tfOrganizationContextV36310(spec={}){
 const subject=String(spec.subject??"").trim();if(!subject)throw new Error("organization requires subject");
 return Object.freeze({system:"system.organization",subject,principle:String(spec.principle??"generic"),arrangement:true,
  hierarchyImplied:false,institutionImplied:false,authorityGranted:false,executionPerformed:false,mutationPerformed:false});
}
function tfDimensionContextV36310(spec={}){
 const subject=String(spec.subject??"").trim(),axis=String(spec.axis??"").trim();
 if(!subject||!axis)throw new Error("dimension requires subject and axis");
 return Object.freeze({system:"system.dimension",subject,axis,extent:spec.extent??null,unit:spec.unit??null,
  independentAxis:true,columnIdentity:false,rowIdentity:false,spatialOnly:false,storageLayoutImplied:false,
  authorityGranted:false,executionPerformed:false,mutationPerformed:false});
}
function tfOrganizationDimensionSelfTestV36310(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.organization","system.dimension","system.tabular","system.columnar","system.data","system.table","system.row","system.column","system.context"])if(!ids.has(id))missing.push(id);
 const o=tfOrganizationContextV36310({subject:"system.data",principle:"tabular"}),d=tfDimensionContextV36310({subject:"system.table",axis:"column"});
 if(!o.arrangement||o.hierarchyImplied||o.institutionImplied||!d.independentAxis||d.columnIdentity||d.rowIdentity||d.spatialOnly||d.storageLayoutImplied)missing.push("semantic-boundary");
 if(missing.length)throw new Error("organization dimension qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:2,organization:true,dimension:true,tabularAndColumnarOrganizational:true,
  dimensionDistinctFromColumn:true,dimensionDistinctFromRow:true,dimensionNotSpatialOnly:true,authorityAmplification:false,
  executionPerformed:false,mutationPerformed:false,missing:0});
}
 return Object.freeze({TF_ORGANIZATION_DIMENSION_SYSTEMS_V36310,TF_ORGANIZATION_DIMENSION_RELATIONSHIPS_V36310,tfOrganizationContextV36310,tfDimensionContextV36310,tfOrganizationDimensionSelfTestV36310});
}
module.exports=Object.freeze({bindOrganizationDimensionV04550});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfOrganizationalRecord(systemId,id,options={}){const system=TF_ORGANIZATIONAL_SYSTEM_BY_ID[systemId];if(!system)throw new Error('unknown organizational system');return Object.freeze({schema:'TERRAFORMER-ORGANIZATIONAL-RECORD/1',system:system.id,id:String(id),scope:options.scope==null?null:String(options.scope),project:options.project==null?null:String(options.project),membership:options.membership==null?null:String(options.membership),role:options.role==null?null:String(options.role),state:String(options.state||'described'),authorized:false,authenticated:false,executed:false,persisted:false,authorityGranted:false});}


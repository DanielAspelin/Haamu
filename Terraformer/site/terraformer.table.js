"use strict";
function bindTabularRelationalV04546(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.306: Tabular / Relational Structural Fabric === */
const TF_TABULAR_RELATIONAL_SYSTEMS_V36306=Object.freeze([
 Object.freeze({id:"system.column",concept:"Column",type:"tabular-structural-system",mode:"structural",condition:"data-context-and-structure-identified",state:"ready"}),
 Object.freeze({id:"system.row",concept:"Row",type:"tabular-structural-system",mode:"structural",condition:"data-context-and-structure-identified",state:"ready"}),
 Object.freeze({id:"system.cell",concept:"Cell",type:"tabular-structural-system",mode:"structural",condition:"data-context-and-structure-identified",state:"ready"}),
 Object.freeze({id:"system.tuple",concept:"Tuple",type:"tabular-structural-system",mode:"structural",condition:"data-context-and-structure-identified",state:"ready"}),
 Object.freeze({id:"system.table",concept:"Table",type:"tabular-structural-system",mode:"structural",condition:"data-context-and-structure-identified",state:"ready"}),
 Object.freeze({id:"system.sheet",concept:"Sheet",type:"tabular-structural-system",mode:"structural",condition:"data-context-and-structure-identified",state:"ready"})
]);
const TF_TABULAR_RELATIONSHIPS_V36306=Object.freeze([
 Object.freeze({from:"system.table",relation:"uses",to:"system.column"}),
 Object.freeze({from:"system.table",relation:"uses",to:"system.row"}),
 Object.freeze({from:"system.table",relation:"uses",to:"system.tuple"}),
 Object.freeze({from:"system.row",relation:"intersects",to:"system.column"}),
 Object.freeze({from:"system.cell",relation:"located-by",to:"system.row"}),
 Object.freeze({from:"system.cell",relation:"located-by",to:"system.column"}),
 Object.freeze({from:"system.tuple",relation:"represents",to:"system.data"}),
 Object.freeze({from:"system.database",relation:"uses",to:"system.table"}),
 Object.freeze({from:"system.sheet",relation:"uses",to:"system.row"}),
 Object.freeze({from:"system.sheet",relation:"uses",to:"system.column"}),
 Object.freeze({from:"system.sheet",relation:"uses",to:"system.cell"}),
 Object.freeze({from:"system.sheet",relation:"may-represent",to:"system.table"})
]);
function tfTabularStructureV36306(spec={}){
 const kind=String(spec.kind??"").toLowerCase();
 const allowed=new Set(["column","row","cell","tuple","table","sheet"]);
 if(!allowed.has(kind))throw new Error("unknown tabular structure");
 return Object.freeze({system:"system."+kind,kind,tableSemantics:kind==="table",sheetSemantics:kind==="sheet",
  tupleRelational:kind==="tuple",cellIntersection:kind==="cell",storageImplied:false,persistenceImplied:false,
  executionPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfTabularRelationalSelfTestV36306(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.column","system.row","system.cell","system.tuple","system.table","system.sheet","system.database","system.data","system.base"])if(!ids.has(id))missing.push(id);
 const tuple=tfTabularStructureV36306({kind:"tuple"}),table=tfTabularStructureV36306({kind:"table"}),sheet=tfTabularStructureV36306({kind:"sheet"}),cell=tfTabularStructureV36306({kind:"cell"});
 if(!tuple.tupleRelational||!table.tableSemantics||!sheet.sheetSemantics||!cell.cellIntersection||table.storageImplied||sheet.persistenceImplied)missing.push("semantic-boundary");
 if(missing.length)throw new Error("tabular relational qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:TF_TABULAR_RELATIONAL_SYSTEMS_V36306.length,column:true,row:true,cell:true,tuple:true,table:true,sheet:true,
  tupleDistinctFromRow:true,tableDistinctFromSheet:true,storageSeparate:true,persistenceSeparate:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_TABULAR_RELATIONAL_SYSTEMS_V36306,TF_TABULAR_RELATIONSHIPS_V36306,tfTabularStructureV36306,tfTabularRelationalSelfTestV36306});
}
module.exports=Object.freeze({bindTabularRelationalV04546});

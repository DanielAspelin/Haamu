"use strict";
function bindReusableStatementCatalogueV04628(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.382: Universal Reusable Statement Catalogue === */
const TF_STATEMENT_SYSTEMS_V36382=Object.freeze([{"id":"system.statement","concept":"Statement","type":"reusable-statement-system"},{"id":"system.stating","concept":"Stating","type":"statement-construction-process-system"},{"id":"system.stater","concept":"Stater","type":"statement-construction-actor-system"}]);
const TF_STATEMENT_FORMS_V36382=Object.freeze(["if","else-if","else","if-else","if-else-if-else","switch","case","default","for","for-in","for-of","while","do-while","break","continue","return","throw","try","catch","finally","try-catch","try-finally","try-catch-finally","expression","declaration","assignment","block","empty","label","debugger","import","export","with","yield","await"]);

const TF_STATEMENT_RELATIONSHIPS_V36382=Object.freeze([
 Object.freeze({from:"system.stating",relation:"produces",to:"system.statement"}),
 Object.freeze({from:"system.stater",relation:"part-of",to:"system.stating"}),
 Object.freeze({from:"system.statement",relation:"may-use",to:"system.condition"}),
 Object.freeze({from:"system.statement",relation:"uses",to:"system.number"}),
 Object.freeze({from:"system.statement",relation:"uses",to:"system.name"}),
 Object.freeze({from:"system.statement",relation:"may-use",to:"system.execution"})
]);
const TF_STATEMENT_SCHEMA_V36382=Object.freeze({schema:"TERRAFORMER-STATEMENT/1",reusable:true,template:true,finiteFormCatalogue:true,
 exhaustiveConcreteStatements:false,execution:false,automaticMutation:false,persistence:false,authorityAmplification:false});
function tfStatementCatalogueV36382(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText);let n=0;const entries=[];
 for(const owner of systems)for(const form of TF_STATEMENT_FORMS_V36382){n++;entries.push(Object.freeze({owner,system:"system.statement",form,
  number:Object.freeze({value:n,issuedBy:"system.numbering"}),name:Object.freeze({value:owner+"::statement::"+form,label:form,issuedBy:"system.naming"}),
  stater:"system.stater",stating:"system.stating",...TF_STATEMENT_SCHEMA_V36382}));}
 return Object.freeze({systemsCovered:systems.length,formsPerSystem:TF_STATEMENT_FORMS_V36382.length,statements:entries.length,entries:Object.freeze(entries),
  everySystemStatementCatalogue:true,exhaustiveConcreteStatements:false});
}
function tfReusableStatementV36382(catalogue,owner,form){
 const e=catalogue.entries.find(x=>x.owner===owner&&x.form===form);if(!e)throw new Error("[TF:system.statement:not-found] Reusable statement not found.");
 return e;
}
function tfStatementSelfTestV36382(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_STATEMENT_SYSTEMS_V36382.map(x=>x.id);
 for(const id of [...added,"system.condition","system.execution","system.numbering","system.number","system.naming","system.name"])if(!ids.has(id))missing.push(id);
 const c=tfStatementCatalogueV36382(sourceText),expected=ids.size*TF_STATEMENT_FORMS_V36382.length;
 if(c.systemsCovered!==ids.size||c.statements!==expected||c.entries.length!==expected)missing.push("coverage");
 for(const f of ["if","else-if","else","if-else","if-else-if-else"])if(!TF_STATEMENT_FORMS_V36382.includes(f))missing.push("conditional:"+f);
 if(new Set(c.entries.map(x=>x.number.value)).size!==expected||new Set(c.entries.map(x=>x.name.value)).size!==expected)missing.push("identity");
 if(c.entries.some(x=>x.number.issuedBy!=="system.numbering"||x.name.issuedBy!=="system.naming"||!x.reusable||x.execution||x.authorityAmplification))missing.push("boundary");
 const first=[...ids][0];if(tfReusableStatementV36382(c,first,"if").owner!==first)missing.push("reuse");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Statement catalogue failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:3,systemsCovered:c.systemsCovered,statementForms:c.formsPerSystem,statements:c.statements,
  everySystemStatementCatalogue:true,conditionalFormsPresent:true,everyStatementNumbered:true,everyStatementNamed:true,reusable:true,
  exhaustiveConcreteStatements:false,automaticExecution:false,authorityAmplification:false,missing:0});
}
globalThis.TF_STATEMENT_SYSTEMS_V36382=TF_STATEMENT_SYSTEMS_V36382;
globalThis.TF_STATEMENT_FORMS_V36382=TF_STATEMENT_FORMS_V36382;
globalThis.TF_STATEMENT_RELATIONSHIPS_V36382=TF_STATEMENT_RELATIONSHIPS_V36382;
globalThis.TF_STATEMENT_SCHEMA_V36382=TF_STATEMENT_SCHEMA_V36382;
globalThis.tfStatementCatalogueV36382=tfStatementCatalogueV36382;
globalThis.tfReusableStatementV36382=tfReusableStatementV36382;
 return Object.freeze({TF_STATEMENT_SYSTEMS_V36382,TF_STATEMENT_FORMS_V36382,TF_STATEMENT_RELATIONSHIPS_V36382,TF_STATEMENT_SCHEMA_V36382,tfStatementCatalogueV36382,tfReusableStatementV36382,tfStatementSelfTestV36382});
}
module.exports=Object.freeze({bindReusableStatementCatalogueV04628});

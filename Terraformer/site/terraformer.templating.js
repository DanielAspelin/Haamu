"use strict";
function bindTemplatePrototypeBlueprintV04593(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351}=deps;
 /* === Terraformer v0.36.352: Template / Prototype / Blueprint Construction Fabric === */
const TF_TEMPLATE_PROTOTYPE_BLUEPRINT_SYSTEMS_V36352=Object.freeze([
 Object.freeze({id:"system.template",concept:"Template",type:"reusable-structural-pattern-system",mode:"pattern-reference",condition:"template-context-admitted",state:"ready"}),
 Object.freeze({id:"system.templating",concept:"Templating",type:"construction-process-system",mode:"template-construction",condition:"templating-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.templator",concept:"Templator",type:"process-actor-system",mode:"templating-actor",condition:"templating-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.templatizing",concept:"Templatizing",type:"transformation-process-system",mode:"subject-to-template-transformation",condition:"templatizing-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.templatizer",concept:"Templatizer",type:"process-actor-system",mode:"templatizing-actor",condition:"templatizing-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.prototype",concept:"Prototype",type:"experimental-representation-system",mode:"prototype-reference",condition:"prototype-context-admitted",state:"ready"}),
 Object.freeze({id:"system.prototyping",concept:"Prototyping",type:"construction-process-system",mode:"prototype-construction",condition:"prototyping-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.prototyper",concept:"Prototyper",type:"process-actor-system",mode:"prototyping-actor",condition:"prototyping-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.blueprint",concept:"Blueprint",type:"design-specification-system",mode:"blueprint-reference",condition:"blueprint-context-admitted",state:"ready"}),
 Object.freeze({id:"system.blueprinting",concept:"Blueprinting",type:"construction-process-system",mode:"blueprint-construction",condition:"blueprinting-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.blueprinter",concept:"Blueprinter",type:"process-actor-system",mode:"blueprinting-actor",condition:"blueprinting-operation-admitted",state:"ready"})
]);
const TF_TEMPLATE_PROTOTYPE_BLUEPRINT_RELATIONSHIPS_V36352=Object.freeze([
 Object.freeze({from:"system.templator",relation:"part-of",to:"system.templating"}),
 Object.freeze({from:"system.templating",relation:"produces-plan-for",to:"system.template"}),
 Object.freeze({from:"system.templatizer",relation:"part-of",to:"system.templatizing"}),
 Object.freeze({from:"system.templatizing",relation:"produces-plan-for",to:"system.template"}),
 Object.freeze({from:"system.templatizing",relation:"distinct-from",to:"system.templating"}),
 Object.freeze({from:"system.prototyper",relation:"part-of",to:"system.prototyping"}),
 Object.freeze({from:"system.prototyping",relation:"produces-plan-for",to:"system.prototype"}),
 Object.freeze({from:"system.blueprinter",relation:"part-of",to:"system.blueprinting"}),
 Object.freeze({from:"system.blueprinting",relation:"produces-plan-for",to:"system.blueprint"})
]);
function tfConstructionArtifactPlanV36352(kind,spec={}){
 const map=Object.freeze({
  templating:["system.templating","system.templator","system.template"],
  templatizing:["system.templatizing","system.templatizer","system.template"],
  prototyping:["system.prototyping","system.prototyper","system.prototype"],
  blueprinting:["system.blueprinting","system.blueprinter","system.blueprint"]
 });
 const row=map[String(kind??"").toLowerCase()];if(!row)throw new Error("[TF:system.construction:invalid-input] Unsupported construction process.");
 return Object.freeze({system:row[0],actor:row[1],artifact:row[2],subject:spec.subject??null,
  planOnly:true,artifactCreated:false,sourceMutated:false,automaticExecution:false,persistencePerformed:false,authorityGranted:false});
}
function tfTemplatePrototypeBlueprintSelfTestV36352(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 const added=["system.template","system.templating","system.templator","system.templatizing","system.templatizer","system.prototype","system.prototyping","system.prototyper","system.blueprint","system.blueprinting","system.blueprinter"];
 for(const id of [...added,"system.engine","system.service"])if(!ids.has(id))missing.push(id);
 for(const k of ["templating","templatizing","prototyping","blueprinting"]){const p=tfConstructionArtifactPlanV36352(k,{subject:"fixture"});if(!p.planOnly||p.artifactCreated||p.sourceMutated||p.automaticExecution||p.persistencePerformed||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Template / prototype / blueprint qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:11,template:true,templating:true,templator:true,templatizing:true,templatizer:true,
  prototype:true,prototyping:true,prototyper:true,blueprint:true,blueprinting:true,blueprinter:true,
  templatingDistinctFromTemplatizing:true,systemsWithEngines:added.length,systemsWithServices:added.length,
  artifactCreationPerformed:false,sourceMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_TEMPLATE_PROTOTYPE_BLUEPRINT_SYSTEMS_V36352=TF_TEMPLATE_PROTOTYPE_BLUEPRINT_SYSTEMS_V36352;
globalThis.TF_TEMPLATE_PROTOTYPE_BLUEPRINT_RELATIONSHIPS_V36352=TF_TEMPLATE_PROTOTYPE_BLUEPRINT_RELATIONSHIPS_V36352;
globalThis.tfConstructionArtifactPlanV36352=tfConstructionArtifactPlanV36352;
 return Object.freeze({TF_TEMPLATE_PROTOTYPE_BLUEPRINT_SYSTEMS_V36352,TF_TEMPLATE_PROTOTYPE_BLUEPRINT_RELATIONSHIPS_V36352,tfConstructionArtifactPlanV36352,tfTemplatePrototypeBlueprintSelfTestV36352});
}
module.exports=Object.freeze({bindTemplatePrototypeBlueprintV04593});

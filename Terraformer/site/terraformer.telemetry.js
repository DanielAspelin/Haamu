"use strict";
function bindTelemetryBiometryContentV04591(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349}=deps;
 /* === Terraformer v0.36.350: Telemetry / Biometry / Reference-Content Fabric === */
const TF_TELEMETRY_BIOMETRY_CONTENT_SYSTEMS_V36350=Object.freeze([
 Object.freeze({id:"system.telemetry",concept:"Telemetry",type:"observational-data-system",mode:"bounded-observation",condition:"telemetry-source-admitted",state:"ready"}),
 Object.freeze({id:"system.biometry",concept:"Biometry",type:"measurement-domain-system",mode:"biological-measurement",condition:"biometric-context-admitted",state:"ready"}),
 Object.freeze({id:"system.about",concept:"About",type:"descriptive-content-system",mode:"subject-description",condition:"subject-context-admitted",state:"ready"}),
 Object.freeze({id:"system.biography",concept:"Biography",type:"reference-content-system",mode:"life-history-description",condition:"biographical-context-admitted",state:"ready"}),
 Object.freeze({id:"system.discography",concept:"Discography",type:"reference-content-system",mode:"recording-catalog-description",condition:"discographical-context-admitted",state:"ready"}),
 Object.freeze({id:"system.paragraph",concept:"Paragraph",type:"document-structure-system",mode:"paragraph-structure",condition:"text-context-admitted",state:"ready"}),
 Object.freeze({id:"system.article",concept:"Article",type:"document-content-system",mode:"article-structure",condition:"content-context-admitted",state:"ready"})
]);
const TF_TELEMETRY_BIOMETRY_CONTENT_RELATIONSHIPS_V36350=Object.freeze([
 Object.freeze({from:"system.telemetry",relation:"uses",to:"system.data"}),
 Object.freeze({from:"system.biometry",relation:"uses",to:"system.data"}),
 Object.freeze({from:"system.biometry",relation:"distinct-from",to:"system.identity"}),
 Object.freeze({from:"system.about",relation:"uses",to:"system.content"}),
 Object.freeze({from:"system.biography",relation:"uses",to:"system.content"}),
 Object.freeze({from:"system.discography",relation:"uses",to:"system.content"}),
 Object.freeze({from:"system.paragraph",relation:"part-of-context",to:"system.document"}),
 Object.freeze({from:"system.article",relation:"uses",to:"system.content"}),
 Object.freeze({from:"system.article",relation:"may-use",to:"system.paragraph"})
]);
function tfTelemetryBiometryContentContextV36350(kind,spec={}){
 const id="system."+String(kind??"").toLowerCase();
 const allowed=new Set(["system.telemetry","system.biometry","system.about","system.biography","system.discography","system.paragraph","system.article"]);
 if(!allowed.has(id))throw new Error("[TF:system.context:invalid-input] Unsupported v0.36.350 context.");
 return Object.freeze({system:id,subject:spec.subject??null,data:spec.data??null,content:spec.content??null,
  observationalOnly:id==="system.telemetry",biometricAuthenticationImplied:false,identityEstablished:false,
  publicationPerformed:false,automaticCollection:false,automaticMutation:false,persistencePerformed:false,authorityGranted:false});
}
function tfTelemetryBiometryContentSelfTestV36350(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 const added=["system.telemetry","system.biometry","system.about","system.biography","system.discography","system.paragraph","system.article"];
 for(const id of [...added,"system.data","system.content","system.document","system.identity","system.engine"])if(!ids.has(id))missing.push(id);
 const contexts=added.map(id=>tfTelemetryBiometryContentContextV36350(id.slice(7),{subject:"fixture"}));
 if(contexts.some(x=>x.biometricAuthenticationImplied||x.identityEstablished||x.publicationPerformed||x.automaticCollection||x.automaticMutation||x.persistencePerformed||x.authorityGranted))missing.push("boundary");
 const engineFabric=tfUniversalEngineFabricV36349(sourceText),owners=new Set(engineFabric.engines.map(x=>x.owner));
 for(const id of added)if(!owners.has(id))missing.push("engine:"+id);
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Telemetry / biometry / content qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:7,telemetry:true,biometry:true,about:true,biography:true,discography:true,paragraph:true,article:true,
  biometryDistinctFromIdentity:true,automaticCollection:false,publicationPerformed:false,systemsWithEngines:added.length,
  authorityAmplification:false,missing:0});
}
globalThis.TF_TELEMETRY_BIOMETRY_CONTENT_SYSTEMS_V36350=TF_TELEMETRY_BIOMETRY_CONTENT_SYSTEMS_V36350;
globalThis.TF_TELEMETRY_BIOMETRY_CONTENT_RELATIONSHIPS_V36350=TF_TELEMETRY_BIOMETRY_CONTENT_RELATIONSHIPS_V36350;
globalThis.tfTelemetryBiometryContentContextV36350=tfTelemetryBiometryContentContextV36350;
 return Object.freeze({TF_TELEMETRY_BIOMETRY_CONTENT_SYSTEMS_V36350,TF_TELEMETRY_BIOMETRY_CONTENT_RELATIONSHIPS_V36350,tfTelemetryBiometryContentContextV36350,tfTelemetryBiometryContentSelfTestV36350});
}
module.exports=Object.freeze({bindTelemetryBiometryContentV04591});

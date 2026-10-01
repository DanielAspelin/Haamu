"use strict";
const SYSTEM=Object.freeze({id:"system.importing",concept:"Importing",scaffold:true,automaticExecution:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
function bindIntegrationCoverageMissionV04661(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397,tfUniversalReferenceFabricV36396,tfUniversalProcessCycleFabricV36395,tfTerraformerHandbookV36410}=deps;
 /* === Terraformer v0.36.411: Import/Export, Coverage/ATCC, Agency/Corporate, Mission Control + Space Agency Reference Fabric === */
const TF_INTEGRATION_COVERAGE_MISSION_SYSTEMS_V36411=Object.freeze([
 Object.freeze({id:"system.importing",concept:"Importing",type:"process-system",mode:"admission-controlled",condition:"source-available",state:"ready"}),
 Object.freeze({id:"system.importer",concept:"Importer",type:"actor-system",mode:"bounded",condition:"import-admitted",state:"ready"}),
 Object.freeze({id:"system.exporting",concept:"Exporting",type:"process-system",mode:"admission-controlled",condition:"target-available",state:"ready"}),
 Object.freeze({id:"system.exporter",concept:"Exporter",type:"actor-system",mode:"bounded",condition:"export-admitted",state:"ready"}),
 Object.freeze({id:"system.atcc",concept:"ATCC",type:"coverage-system",mode:"around-the-clock",condition:"coverage-admitted",state:"ready"}),
 Object.freeze({id:"system.agency",concept:"Agency",type:"organization-system",mode:"descriptive",condition:"identified",state:"available"}),
 Object.freeze({id:"system.space-agency",concept:"Space Agency",type:"agency-type-system",mode:"reference",condition:"documented",state:"available"}),
 Object.freeze({id:"system.corporation",concept:"Corporation",type:"organization-system",mode:"descriptive",condition:"identified",state:"available"}),
 Object.freeze({id:"system.corporate",concept:"Corporate",type:"organization-domain-system",mode:"descriptive",condition:"applicable",state:"available"}),
 Object.freeze({id:"system.mission",concept:"Mission",type:"mission-system",mode:"goal-directed",condition:"admitted",state:"planned"}),
 Object.freeze({id:"system.mission-control",concept:"Mission Control",type:"control-system",mode:"coordinated",condition:"mission-admitted",state:"ready"}),
 Object.freeze({id:"system.mission-controller",concept:"Mission Controller",type:"controller-system",mode:"bounded",condition:"control-admitted",state:"ready"})
]);
const TF_INTEGRATION_COVERAGE_MISSION_RELATIONSHIPS_V36411=Object.freeze([
 Object.freeze({from:"system.importing",relation:"performed-by",to:"system.importer"}),
 Object.freeze({from:"system.exporting",relation:"performed-by",to:"system.exporter"}),
 Object.freeze({from:"system.importing",relation:"uses",to:"system.normalization"}),
 Object.freeze({from:"system.importing",relation:"uses",to:"system.naturalization"}),
 Object.freeze({from:"system.exporting",relation:"uses",to:"system.specification"}),
 Object.freeze({from:"system.atcc",relation:"is-a",to:"system.coverage"}),
 Object.freeze({from:"system.space-agency",relation:"is-a",to:"system.agency"}),
 Object.freeze({from:"system.corporation",relation:"has-domain",to:"system.corporate"}),
 Object.freeze({from:"system.mission-control",relation:"controls",to:"system.mission"}),
 Object.freeze({from:"system.mission-control",relation:"performed-by",to:"system.mission-controller"}),
 Object.freeze({from:"system.mission-controller",relation:"uses",to:"system.coverage"}),
 Object.freeze({from:"system.mission-controller",relation:"may-use",to:"system.atcc"})
]);
const TF_IMPORT_EXPORT_RULES_V36411=Object.freeze({
 importing:Object.freeze({process:"system.importing",actor:"system.importer",purpose:"admit external or predecessor information into native Terraformer representation",normalization:true,naturalization:true,duplicateAuthority:false,automaticMutation:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false}),
 exporting:Object.freeze({process:"system.exporting",actor:"system.exporter",purpose:"produce admitted external representation from Terraformer information",sourceAuthorityPreserved:true,automaticTransmission:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false})
});
const TF_ATCC_RULE_V36411=Object.freeze({id:"rule.coverage.atcc",coverage:"system.coverage",atcc:"system.atcc",meaning:"around-the-clock coverage",continuousIntent:true,automaticBackgroundExecution:false,automaticMonitoring:false,automaticNotification:false,requiresAdmittedSchedulerForRuntime:true,externalEffect:false,authorityAmplification:false});
const TF_SPACE_AGENCY_REFERENCE_V36411=Object.freeze({
 id:"reference.space-agencies.isecg-2026-09-27",type:"documentary-reference-catalogue",classification:"system.space-agency",authority:"external-public-documentation",exhaustiveWorldwideClaim:false,
 source:Object.freeze({publisher:"NASA",title:"International Space Exploration Coordination Group",retrieved:"2026-09-27",statement:"NASA documents ISECG as a non-binding forum with 27 participating international space agencies."}),
 agencies:Object.freeze([
  Object.freeze({abbr:"AEB",name:"Brazilian Space Agency",jurisdiction:"Brazil"}),
  Object.freeze({abbr:"AEM",name:"Mexican Space Agency",jurisdiction:"Mexico"}),
  Object.freeze({abbr:"ASA",name:"Australian Space Agency",jurisdiction:"Australia",note:"NASA ISECG listing associates ASA with CSIRO"}),
  Object.freeze({abbr:"ASI",name:"Italian Space Agency",jurisdiction:"Italy"}),
  Object.freeze({abbr:"CNES",name:"National Centre for Space Studies",jurisdiction:"France"}),
  Object.freeze({abbr:"CNSA",name:"China National Space Administration",jurisdiction:"China"}),
  Object.freeze({abbr:"CSA",name:"Canadian Space Agency",jurisdiction:"Canada"}),
  Object.freeze({abbr:"DLR",name:"German Aerospace Centre",jurisdiction:"Germany"}),
  Object.freeze({abbr:"ESA",name:"European Space Agency",jurisdiction:"Europe"}),
  Object.freeze({abbr:"GISTDA",name:"Geo-Informatics and Space Technology Development Agency",jurisdiction:"Thailand"}),
  Object.freeze({abbr:"ISRO",name:"Indian Space Research Organization",jurisdiction:"India"}),
  Object.freeze({abbr:"JAXA",name:"Japan Aerospace Exploration Agency",jurisdiction:"Japan"}),
  Object.freeze({abbr:"KASA",name:"Korea AeroSpace Administration",jurisdiction:"Republic of Korea"}),
  Object.freeze({abbr:"LSA",name:"Luxembourg Space Agency",jurisdiction:"Luxembourg"}),
  Object.freeze({abbr:"NASA",name:"National Aeronautics and Space Administration",jurisdiction:"United States"}),
  Object.freeze({abbr:"NKAU",name:"State Space Agency of Ukraine",jurisdiction:"Ukraine"}),
  Object.freeze({abbr:"NZSA",name:"New Zealand Space Agency",jurisdiction:"New Zealand"}),
  Object.freeze({abbr:"NOSA",name:"Norwegian Space Agency",jurisdiction:"Norway"}),
  Object.freeze({abbr:"POLSA",name:"Polish Space Agency",jurisdiction:"Poland"}),
  Object.freeze({abbr:"PTSPACE",name:"Portuguese Space Agency",jurisdiction:"Portugal"}),
  Object.freeze({abbr:"ROSA",name:"Romanian Space Agency",jurisdiction:"Romania"}),
  Object.freeze({abbr:"ROSCOSMOS",name:"State Space Corporation for Space Activities Roscosmos",jurisdiction:"Russia"}),
  Object.freeze({abbr:"SERI",name:"State Secretariat for Education, Research, and Innovation",jurisdiction:"Switzerland"}),
  Object.freeze({abbr:"UAESA",name:"United Arab Emirates Space Agency",jurisdiction:"United Arab Emirates"}),
  Object.freeze({abbr:"UKSA",name:"United Kingdom Space Agency",jurisdiction:"United Kingdom"}),
  Object.freeze({abbr:"VNSC",name:"Vietnam National Space Center",jurisdiction:"Vietnam"}),
  Object.freeze({abbr:"CSIRO",name:"Commonwealth Scientific and Industrial Research Organisation",jurisdiction:"Australia",note:"documented with Australian Space Agency in NASA ISECG participation listing"})
 ]),
 note:"Reference coverage is source-bounded and updateable; it does not claim that ISECG membership equals every space agency worldwide."
});
function tfImportV36411(subject,options={}){if(subject==null)throw new Error("[TF:system.importing:missing-subject] subject required.");return Object.freeze({process:"system.importing",actor:"system.importer",subject,source:String(options.source||"unspecified"),normalize:options.normalize!==false,naturalize:options.naturalize!==false,duplicateAuthority:false,automaticMutation:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});}
function tfExportV36411(subject,options={}){if(subject==null)throw new Error("[TF:system.exporting:missing-subject] subject required.");return Object.freeze({process:"system.exporting",actor:"system.exporter",subject,target:String(options.target||"unspecified"),automaticTransmission:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});}
function tfMissionControlV36411(mission,options={}){if(mission==null)throw new Error("[TF:system.mission-control:missing-mission] mission required.");return Object.freeze({mission:"system.mission",missionControl:"system.mission-control",controller:"system.mission-controller",subject:mission,coverage:options.atcc?"system.atcc":"system.coverage",state:String(options.state||"planned"),automaticExecution:false,automaticMonitoring:false,automaticCommand:false,externalEffect:false,authorityAmplification:false});}
function tfIntegrationCoverageMissionSelfTestV36411(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.importing","system.importer","system.exporting","system.exporter","system.coverage","system.atcc","system.agency","system.space-agency","system.corporation","system.corporate","system.mission","system.mission-control","system.mission-controller","system.normalization","system.naturalization"])if(!ids.has(id))missing.push(id);
 const i=tfImportV36411("predecessor",{source:"test"}),e=tfExportV36411("artifact",{target:"test"}),m=tfMissionControlV36411("qualification",{atcc:true});
 if(i.duplicateAuthority||i.automaticMutation||i.externalEffect||i.authorityAmplification||e.automaticTransmission||e.externalEffect||m.automaticExecution||m.automaticMonitoring||m.automaticCommand||m.externalEffect)missing.push("boundary");
 if(TF_SPACE_AGENCY_REFERENCE_V36411.agencies.length!==27||TF_SPACE_AGENCY_REFERENCE_V36411.exhaustiveWorldwideClaim)missing.push("space-agency-reference");
 const n=ids.size;
 if(tfUniversalEngineFabricV36349(sourceText).engines.length!==n||tfCompactSystemSeedV36353(sourceText).entries.length!==n||tfUniversalSystemLayerFabricV36389(sourceText).layers!==n||tfUniversalSystemDefaultsFabricV36388(sourceText).defaults!==n||tfUniversalSpecificationFabricV36397(sourceText).specifications!==n||tfUniversalReferenceFabricV36396(sourceText).references!==n||tfUniversalProcessCycleFabricV36395(sourceText).processes!==n)missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Import/export/coverage/agency/mission fabric failed: "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:12,systemsCovered:n,importing:true,exporting:true,coverageReused:true,atcc:true,agency:true,spaceAgency:true,corporation:true,corporate:true,mission:true,missionControl:true,missionController:true,spaceAgencyReferenceEntries:27,worldwideExhaustiveClaim:false,missing:0});
}
function tfTerraformerHandbookV36411(sourceText){const prior=tfTerraformerHandbookV36410(sourceText),ids=tfCanonicalSystemIdsV36196(sourceText),chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));return Object.freeze({...prior,id:"terraformer::handbook::v0.36.411",version:"0.36.411",systemsCovered:ids.length,canonicalSystems:ids.length,chapters:Object.freeze(chapters),completeCanonicalSystemCoverage:chapters.length===ids.length,includesImportExport:true,includesCoverageATCC:true,includesAgencyCorporate:true,includesMissionControl:true,importExportRules:TF_IMPORT_EXPORT_RULES_V36411,atccRule:TF_ATCC_RULE_V36411,spaceAgencyReference:TF_SPACE_AGENCY_REFERENCE_V36411,relationships:TF_INTEGRATION_COVERAGE_MISSION_RELATIONSHIPS_V36411});}
globalThis.TF_INTEGRATION_COVERAGE_MISSION_SYSTEMS_V36411=TF_INTEGRATION_COVERAGE_MISSION_SYSTEMS_V36411;globalThis.TF_INTEGRATION_COVERAGE_MISSION_RELATIONSHIPS_V36411=TF_INTEGRATION_COVERAGE_MISSION_RELATIONSHIPS_V36411;globalThis.TF_IMPORT_EXPORT_RULES_V36411=TF_IMPORT_EXPORT_RULES_V36411;globalThis.TF_ATCC_RULE_V36411=TF_ATCC_RULE_V36411;globalThis.TF_SPACE_AGENCY_REFERENCE_V36411=TF_SPACE_AGENCY_REFERENCE_V36411;globalThis.tfImportV36411=tfImportV36411;globalThis.tfExportV36411=tfExportV36411;globalThis.tfMissionControlV36411=tfMissionControlV36411;globalThis.tfIntegrationCoverageMissionSelfTestV36411=tfIntegrationCoverageMissionSelfTestV36411;
 return Object.freeze({TF_INTEGRATION_COVERAGE_MISSION_SYSTEMS_V36411,TF_INTEGRATION_COVERAGE_MISSION_RELATIONSHIPS_V36411,TF_IMPORT_EXPORT_RULES_V36411,TF_ATCC_RULE_V36411,TF_SPACE_AGENCY_REFERENCE_V36411,tfImportV36411,tfExportV36411,tfMissionControlV36411,tfIntegrationCoverageMissionSelfTestV36411,tfTerraformerHandbookV36411});
}
module.exports=Object.freeze({SYSTEM,bindIntegrationCoverageMissionV04661});

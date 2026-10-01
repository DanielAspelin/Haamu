'use strict';
const fs=require('fs'),path=require('path');
const ID='system.boundary',VERSION='0.47.34',REGISTRY='terraformer.boundaries.json',BOUNDARY='SYSTEM_BOUNDARY';
const REQUIRED=Object.freeze(['SYSTEM_BOUNDARY','PROJECT_BOUNDARY','PROGRAM_BOUNDARY','APPLICATION_BOUNDARY','PLATFORM_BOUNDARY','COMMON_BOUNDARY','INTERNET_BOUNDARY','FILE_BOUNDARY','USER_BOUNDARY','MACHINE_BOUNDARY','GROUP_BOUNDARY','DIMENSION_BOUNDARY','HOSTING_BOUNDARY','FARMING_BOUNDARY','POOLING_BOUNDARY','RESOURCING_BOUNDARY','PUBLICITY_BOUNDARY','PRIVACY_BOUNDARY']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY),'utf8'));if(x.kind!=='BOUNDARY_REGISTRY'||x.authority!==false||!Array.isArray(x.types))throw Error('BOUNDARY_REGISTRY_INVALID');for(const t of REQUIRED)if(!x.types.includes(t))throw Error('BOUNDARY_TYPE_MISSING:'+t);return Object.freeze(x)}
function normalize(v){if(typeof v!=='string'||!v.trim())throw Error('BOUNDARY_TYPE_INVALID');let x=v.trim().toUpperCase();if(!x.endsWith('_BOUNDARY'))x+='_BOUNDARY';return x}
function validate(v){const type=normalize(v),valid=REQUIRED.includes(type);if(!valid)throw Error('BOUNDARY_TYPE_UNKNOWN:'+type);return Object.freeze({type,valid:true,authority:false})}
function resolve(v){const q=validate(v),r=registry();return Object.freeze({type:q.type,registered:r.types.includes(q.type),authority:false,registryVersion:r.version})}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'})}
function qualify(){const r=registry();return Object.freeze({pass:REQUIRED.every(x=>r.types.includes(x))&&r.authority===false,id:ID,count:r.types.length})}
function externalIdentityBoundaryEvidenceV04690(record){return Object.freeze({systemId:record.systemId,state:record.state,externalBoundaryResolved:false,externalAuthorityAbsorbed:false,authorityCreated:false});}
module.exports=Object.freeze({externalIdentityBoundaryEvidenceV04690,ID,VERSION,REGISTRY,BOUNDARY,REQUIRED,registry,normalize,validate,resolve,descriptor,qualify});

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const VOLATILE_BOUNDARY_SCHEMA='TERRAFORMER-VOLATILE-BOUNDARY/1';
const CONTROL_BOUNDARY_SCHEMA='TERRAFORMER-CONTROL-BOUNDARIES/1';

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_GAP_BOUNDARY_V36415=Object.freeze({automaticExecution:false,automaticEnforcement:false,automaticPersistence:false,automaticTransmission:false,automaticHardwareActuation:false,externalEffect:false,authorityAmplification:false});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_MULTI_GEO_BOUNDARY_V36423=Object.freeze({automaticGeolocation:false,automaticLocationAcquisition:false,automaticNetworkAccess:false,automaticExecution:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_ENABLE_FRAME_BOUNDARY_V36426=Object.freeze({automaticEnable:false,automaticDisable:false,automaticExecution:false,automaticMutation:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_TIME_COUNT_BOUNDARY_V36427=Object.freeze({automaticStart:false,automaticInterval:false,automaticTimeout:false,automaticLoop:false,automaticHalting:false,automaticExecution:false,automaticPersistence:false,backgroundExecution:false,externalEffect:false,authorityAmplification:false});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_CHOICE_CONTROL_BOUNDARY_V36428=Object.freeze({rendererNeutral:true,automaticSelection:false,automaticExecution:false,automaticMutation:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_HIGHLIGHT_CONFIRM_APPLY_CANCEL_BOUNDARY_V36429=Object.freeze({automaticExecution:false,automaticMutation:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_MODEL_BOUNDARY_V36432=Object.freeze({canonicalSubjectReplacement:false,automaticExecution:false,automaticMutation:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false,volatile:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_TBUILD_BOUNDARY_V36439=Object.freeze({singlePersistentDistributionFile:"terraformer.js",automaticDeployment:false,automaticPublication:false,automaticExternalFetch:false,automaticDependencyInstallation:false,automaticNetworkAccess:false,automaticPersistence:false,automaticExternalEffect:false,authorityAmplification:false,externalAdmissionRequired:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_RANKING_BOUNDARY_V36446=Object.freeze({rankingIsAuthority:false,rankingIsPermission:false,rankingIsExecutionPriority:false,rankingIsUtilizationAdmission:false,rankingIsQualification:false,rankingIsFinalization:false,automaticAction:false,automaticExternalEffect:false,deterministicTieHandling:true,evidenceRequired:true,criteriaRequired:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_CODING_BOUNDARY_V36447=Object.freeze({codingIsExecution:false,codingIsBuild:false,codingIsDeployment:false,codingIsQualification:false,codingIsFinalization:false,codingGrantsAuthority:false,automaticExecution:false,automaticPersistence:false,automaticNetwork:false,automaticExternalEffect:false,automaticPermissionGrant:false,authorityAmplification:false,sourceMutationRequiresExplicitRequest:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_SAVING_BOUNDARY_V36449=Object.freeze({volatileByDefault:true,explicitSaveRequired:true,savingGrantsAuthority:false,automaticPersistence:false,automaticExecution:false,automaticDeployment:false,automaticNetwork:false,automaticExternalEffect:false,originPreservationRequired:true,versionIdentityRequired:true,transversionIdentityRequired:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_CHANGE_BOUNDARY_V36450=Object.freeze({capabilityIsAuthority:false,automaticChange:false,automaticExecution:false,automaticDeployment:false,automaticPersistence:false,automaticNetwork:false,automaticExternalEffect:false,authorityAmplification:false,explicitRequestRequired:true,controllerRequired:true,qualificationRequired:true,originPreservationRequired:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_SANDBOX_BOUNDARY_V36451=Object.freeze({isolatedByDefault:true,defaultDeny:true,sandboxIsAuthority:false,sandboxGrantsExecution:false,sandboxGrantsPersistence:false,sandboxGrantsNetwork:false,sandboxGrantsDeployment:false,sandboxGrantsExternalEffect:false,authorityAmplification:false,explicitAdmissionRequired:true,controllerRequired:true,versionBound:true,transversionBound:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_FONT_BOUNDARY_V376=Object.freeze({fontIsAuthority:false,fontChangesSemantics:false,fontChangesQualification:false,grantsExecution:false,grantsPersistence:false,grantsNetwork:false,versioned:true,transversioned:true,checkpointed:true,sandboxed:true});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_CONTENT_BOUNDARY_V377=Object.freeze({contentIsAuthority:false,workerSelfAuthorizes:false,explicitRequestRequired:true,controllerRequired:true,sandboxRequired:true,qualificationRequired:true,grantsExecution:false,grantsPersistence:false,grantsNetwork:false,grantsDeployment:false,grantsExternalEffect:false,versioned:true,transversioned:true,checkpointed:true,documented:true,changeLogged:true});

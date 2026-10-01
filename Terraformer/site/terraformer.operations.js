'use strict';
const TERRAFORMER_OPERATIONS_SYSTEM=Object.freeze({schema:'TERRAFORMER-OPERATIONS-SYSTEM/1',id:'system.operations',name:'Operations System',family:'computation',type:'operations-system',state:'integrated',canonicalPath:'terraformer://operations/',dependsOn:Object.freeze(['system.command','system.procedure']),rule:'Operations System coordinates admitted operations without manufacturing external-effect authority.'});


/* Operations control-plane ownership — v0.47.4 */
const tfOperationsOs=require('os');
const OPERATIONS_SCHEMA='TERRAFORMER-OPERATIONS-CENTER/2';
const OPERATION_RECORD_SCHEMA='TERRAFORMER-OPERATION/2';
const SCHEDULER_SCHEMA='TERRAFORMER-OPERATIONAL-SCHEDULER/2';
const OPERATION_GROUP_SCHEMA='TERRAFORMER-OPERATION-GROUP/1';
const SCHEDULER_CAPACITY=Math.max(1,Number(process.env.TERRAFORMER_SCHEDULER_CAPACITY||Math.max(2,Math.min(8,tfOperationsOs.cpus().length||2))));
const OPERATION_LIFECYCLE=Object.freeze(['REQUESTED','ADMITTED','AUTHORIZED','ASSIGNED','LAUNCHED','IN_TRANSIT','PROCESSING','RETURNING','LANDED','VERIFIED','COMPLETED']);
const OPERATION_EXCEPTION_STATES=Object.freeze(['HELD','REJECTED','FAILED-CONTAINED','RECOVERING','QUARANTINED','CANCELLED']);
const OPERATION_TRANSITIONS=Object.freeze({REQUESTED:['ADMITTED','REJECTED','CANCELLED'],ADMITTED:['AUTHORIZED','HELD','REJECTED','CANCELLED'],AUTHORIZED:['ASSIGNED','HELD','CANCELLED'],ASSIGNED:['LAUNCHED','HELD','CANCELLED'],LAUNCHED:['IN_TRANSIT','FAILED-CONTAINED','CANCELLED'],IN_TRANSIT:['PROCESSING','FAILED-CONTAINED'],PROCESSING:['RETURNING','FAILED-CONTAINED'],RETURNING:['LANDED','FAILED-CONTAINED'],LANDED:['VERIFIED','FAILED-CONTAINED'],VERIFIED:['COMPLETED','FAILED-CONTAINED'],['FAILED-CONTAINED']:['RECOVERING','QUARANTINED'],RECOVERING:['ASSIGNED','QUARANTINED','CANCELLED'],HELD:['ADMITTED','CANCELLED'],REJECTED:[],QUARANTINED:[],CANCELLED:[],COMPLETED:[]});
const OPERATION_REALMS=Object.freeze(['space','orbital','atmospheric','air','ground','on-site','remote','maritime','underground','center','data-center','healthcare','airport','industrial','utility','transportation','emergency','government','civil-public-service','research-laboratory','military'].map(id=>Object.freeze({id:'realm.'+id,name:id.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ')+' Operations',state:'modeled',authority:'bounded; realm identity grants no operational privilege'})));
const OPERATIONS_CENTER=Object.freeze({id:'system.operations-center',name:'Operations Center',family:'service',state:'integrated',schema:OPERATIONS_SCHEMA,controlPlanes:['operations','context','information','instruction','object','process-execution','authority','security','resource','observability','recovery','qualification'],hierarchy:['realm','area','zone','site','system','worker','farm/pool','lane','operation','return','evidence'],qualification:'Under Conditional Experiment',scheduler:'deterministic bounded admission and coordination'});


module.exports=Object.freeze({TERRAFORMER_OPERATIONS_SYSTEM,OPERATIONS_SCHEMA,OPERATION_RECORD_SCHEMA,SCHEDULER_SCHEMA,OPERATION_GROUP_SCHEMA,SCHEDULER_CAPACITY,OPERATION_LIFECYCLE,OPERATION_EXCEPTION_STATES,OPERATION_TRANSITIONS,OPERATION_REALMS,OPERATIONS_CENTER});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_SYSTEMS_OPERATIONS_BOUNDARY_V36424=Object.freeze({automaticConstruction:false,automaticDeployment:false,automaticContainment:false,automaticExecution:false,automaticPersistence:false,automaticNetworkAccess:false,automaticHostMutation:false,externalEffect:false,authorityAmplification:false});

'use strict';
const TERRAFORMER_OPENING_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.opening',name:'Opening System',family:'lifecycle',type:'opening-system',state:'integrated',canonicalPath:'terraformer://opening/',dependsOn:Object.freeze(['system.authorization']),governs:Object.freeze(['open-request','target-reference','admission-reference','state-transition-reference','result-reference','evidence']),rule:'Opening System models an admitted transition toward an open state; it does not bypass locks, grant access, execute targets, or create external effects by itself.'});

function describe(){return TERRAFORMER_OPENING_SYSTEM;}
function admit(spec={},context={}){return Object.freeze({system:TERRAFORMER_OPENING_SYSTEM.id,actor:'agent.opener',admitted:!!spec&&typeof spec==='object'&&context.scopeValid===true&&context.preconditionsPass===true,executed:false,persisted:false,authorityGranted:false});}
function selfTest(){const x=admit({},{scopeValid:true,preconditionsPass:true});return Object.freeze({pass:x.admitted&&!x.executed&&!x.persisted&&!x.authorityGranted});}
module.exports=Object.freeze({TERRAFORMER_OPENING_SYSTEM,describe,admit,selfTest});

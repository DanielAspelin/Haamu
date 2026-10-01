'use strict';
const TERRAFORMER_CLOSING_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.closing',name:'Closing System',family:'lifecycle',type:'closing-system',state:'integrated',canonicalPath:'terraformer://closing/',dependsOn:Object.freeze(['system.opening']),governs:Object.freeze(['close-request','target-reference','state-transition-reference','completion-reference','result-reference','evidence']),rule:'Closing System models an admitted transition toward a closed state; it does not destroy state, revoke unrelated authority, or terminate external resources by itself.'});

function describe(){return TERRAFORMER_CLOSING_SYSTEM;}
function admit(spec={},context={}){return Object.freeze({system:TERRAFORMER_CLOSING_SYSTEM.id,actor:'agent.closer',admitted:!!spec&&typeof spec==='object'&&context.scopeValid===true&&context.preconditionsPass===true,executed:false,persisted:false,authorityGranted:false});}
function selfTest(){const x=admit({},{scopeValid:true,preconditionsPass:true});return Object.freeze({pass:x.admitted&&!x.executed&&!x.persisted&&!x.authorityGranted});}
module.exports=Object.freeze({TERRAFORMER_CLOSING_SYSTEM,describe,admit,selfTest});

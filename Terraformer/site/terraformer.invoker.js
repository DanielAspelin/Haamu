'use strict';
const ROLE=Object.freeze({schema:'TERRAFORMER-INVOKER-ROLE/1',id:'role.invoker',name:'Invoker',type:'bounded-worker-tool-role',memberships:Object.freeze([{"class":"Worker","domain":"tool","identity":"tool.worker.invoker","parent":"system.tool"}]),automaticExecution:false,automaticMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,state:'integrated'});
function describe(){return ROLE;}
function admit(request={}){return Object.freeze({role:ROLE.id,admitted:request&&request.authorized===true&&request.qualified===true,executed:false,reason:'delegates-to-governing-system',authorityGranted:false});}
function selfTest(){const denied=admit({}),admitted=admit({authorized:true,qualified:true});return Object.freeze({pass:!denied.admitted&&admitted.admitted&&!admitted.executed,authorityGranted:false});}
module.exports=Object.freeze({ROLE,describe,admit,selfTest});

'use strict';
const ROLE=Object.freeze({schema:'TERRAFORMER-SERIALIZER-ROLE/1',id:'role.serializer',name:'Serializer',type:'bounded-worker-tool-role',memberships:Object.freeze([{"class":"Worker","domain":"language","identity":"language.worker.serializer","parent":"system.language"}]),automaticExecution:false,automaticMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,state:'integrated'});
function describe(){return ROLE;}
function admit(request={}){return Object.freeze({role:ROLE.id,admitted:request&&request.authorized===true&&request.qualified===true,executed:false,reason:'delegates-to-governing-system',authorityGranted:false});}
function selfTest(){const denied=admit({}),admitted=admit({authorized:true,qualified:true});return Object.freeze({pass:!denied.admitted&&admitted.admitted&&!admitted.executed,authorityGranted:false});}
module.exports=Object.freeze({ROLE,describe,admit,selfTest});

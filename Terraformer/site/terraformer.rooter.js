'use strict';
const ROOTER=Object.freeze({schema:'TERRAFORMER-ROOTER/1',id:'worker.rooter',name:'Rooter',type:'rooting-worker',system:'system.rooting',structural:true,inertByDefault:true,authorizationRequired:true,qualificationRequired:true,osPrivilege:false,selfAuthorizes:false,authorityAmplification:false});
function rooterPrepare(spec={}){return Object.freeze({schema:'TERRAFORMER-ROOTER-PREPARE/1',worker:ROOTER.id,root:String(spec.root||''),target:String(spec.target||''),prepared:true,executed:false,authorizationRequired:true,osPrivilege:false});}
function rooterExecute(plan={},authorization={}){
 const admitted=authorization.authorized===true&&authorization.qualified===true&&plan.admitted===true;
 return Object.freeze({schema:'TERRAFORMER-ROOTER-EXECUTION/1',worker:ROOTER.id,admitted,executed:false,reason:admitted?'execution-delegates-to-root-owner':'authorization-or-qualification-required',osPrivilege:false,authorityAmplification:false});
}
module.exports=Object.freeze({ROOTER,rooterPrepare,rooterExecute});

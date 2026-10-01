'use strict';
const ROOTING_SYSTEM=Object.freeze({schema:'TERRAFORMER-ROOTING-SYSTEM/1',id:'system.rooting',name:'Rooting System',type:'root-process-system',owner:'system.root',actor:'worker.rooter',state:'ready',structural:true,osPrivilege:false,authorityAmplification:false,automaticMutation:false});
function rootingPlan(spec={}){
 const root=String(spec.root||'');
 const target=String(spec.target||'');
 const admitted=Boolean(root&&target&&spec.authorized===true);
 return Object.freeze({schema:'TERRAFORMER-ROOTING-PLAN/1',root,target,admitted,executes:false,mutates:false,osPrivilege:false,authorityGranted:false});
}
function rootingQualify(plan){return Object.freeze({pass:Boolean(plan&&plan.admitted===true&&plan.executes===false&&plan.osPrivilege===false),qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ROOTING_SYSTEM,rootingPlan,rootingQualify});

'use strict';
const TERRAFORMER_PLANNING_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.planning',name:'Planning System',family:'work',type:'planning-system',state:'integrated',canonicalPath:'terraformer://planning/',dependsOn:Object.freeze(['system.work']),governs:Object.freeze(['goal-reference','constraint-reference','step-reference','schedule-reference','dependency-reference','plan-evidence']),rule:'Planning System models goals, constraints, dependencies and proposed steps; a plan does not authorize execution or external effects.'});

function describe(){return TERRAFORMER_PLANNING_SYSTEM;}
function plan(spec={},context={}){
 const admitted=!!spec&&typeof spec==='object'&&context.scopeValid===true&&context.preconditionsPass===true;
 return Object.freeze({schema:'TERRAFORMER-PLANNING-RESULT/1',system:TERRAFORMER_PLANNING_SYSTEM.id,planner:'agent.planner',goal:spec.goal??null,constraints:Object.freeze([...(spec.constraints||[])]),steps:Object.freeze([...(spec.steps||[])]),admitted,executed:false,persisted:false,authorityGranted:false});
}
function selfTest(){const x=plan({goal:'test',steps:['inspect']},{scopeValid:true,preconditionsPass:true});return Object.freeze({pass:x.admitted&&!x.executed&&!x.persisted&&!x.authorityGranted});}
function bindPlanningV04462(){const PLANNING_SYSTEM=Object.freeze({schema:'TERRAFORMER-PLANNING/1',id:'system.planning',mode:'plan-definition',authorityGranted:false,planningGrantsExecution:false});return Object.freeze({PLANNING_SYSTEM});}
module.exports=Object.freeze({TERRAFORMER_PLANNING_SYSTEM,describe,plan,selfTest,bindPlanningV04462});

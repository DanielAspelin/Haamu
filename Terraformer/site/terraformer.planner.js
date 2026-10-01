'use strict';
const TERRAFORMER_PLANNER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.planner',name:'Planner',system:'system.planning',state:'integrated',canonicalPath:'terraformer://planning/planner/',capabilities:Object.freeze(['receive-goal','identify-constraints','prepare-plan','report-plan']),authorityInherited:false,rule:'Planner prepares plans but cannot authorize or execute planned external effects.'});

function describe(){return TERRAFORMER_PLANNER_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.planner'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_PLANNER_AGENT,describe,selfTest});

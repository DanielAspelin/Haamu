'use strict';
const TERRAFORMER_AUTOMATOR=Object.freeze({schema:'TERRAFORMER-AUTOMATOR/1',id:'agent.automator',name:'Automator',family:'automation',type:'automation-agent',state:'integrated',canonicalPath:'terraformer://automation/automator/',system:'system.automation',capabilities:Object.freeze(['observe-trigger','evaluate-condition','request-admission','dispatch-admitted','verify-result']),rule:'Automator is subordinate to Automation System and cannot self-authorize, broaden scope, bypass guards, or remove recovery controls.'});

function describe(){return TERRAFORMER_AUTOMATOR;}
module.exports=Object.freeze({TERRAFORMER_AUTOMATOR,describe});

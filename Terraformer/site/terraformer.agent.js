"use strict";
const TERRAFORMER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent',name:'Agent',family:'agent',type:'bounded-agent',state:'integrated',canonicalPath:'terraformer://agent/',system:'system.authorization',authorityInherited:false,capabilities:Object.freeze(['receive-scope','observe','act-admitted','report','verify']),rule:'Generic Agent is a bounded actor descriptor; agent identity alone grants no authority, privilege, persistence, or external-effect capability.'});
function bindAgentV04465(){
 const AGENT_SYSTEM=Object.freeze({schema:"TERRAFORMER-AGENT/1",id:"system.agent",name:"Agent System",mode:"governed-agent-identity-capability",authorityGranted:false,persists:false});
 function descriptor(spec={}){return Object.freeze({id:String(spec.id||"agent"),kind:String(spec.kind||"general"),capabilities:Object.freeze([...(spec.capabilities||[])]),authorityGranted:false});}
 return Object.freeze({AGENT_SYSTEM,descriptor});
}

function tfFinanceCommerceAgents(){return [globalThis.TERRAFORMER_BANKER_AGENT,globalThis.TERRAFORMER_SHOPPER_AGENT].filter(Boolean).map(tfAgentDescribe)}
function tfAgentDescribe(agent){if(!agent||typeof agent!=='object')return null;return Object.freeze({schema:'TERRAFORMER-AGENT-DESCRIPTOR/1',id:agent.id,name:agent.name,system:agent.system||null,authorityInherited:false,selfAuthorization:false,persisted:false})}
module.exports={bindAgentV04465};

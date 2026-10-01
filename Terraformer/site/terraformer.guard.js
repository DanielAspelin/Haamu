"use strict";
const TERRAFORMER_GUARD=Object.freeze({schema:'TERRAFORMER-GUARD/1',id:'agent.guard',name:'Guard',family:'agent',type:'bounded-agent',state:'integrated',canonicalPath:'terraformer://guard/',system:'system.authorization',authorityInherited:false,capabilities:Object.freeze(['receive-scope','observe','act-admitted','report','verify']),rule:'Guard observes and applies only explicitly admitted protective controls; the role does not create policing, physical-force, detention, surveillance, or access authority.'});
module.exports=Object.freeze({TERRAFORMER_GUARD});

"use strict";
/* Reverse-naturalized minimal owner from established terraformer.temporary.js responsibility. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-SESSION-SYSTEM/1",id:"system.session",concept:"Session",
 typeOf:"system.system",family:"infrastructure",origin:"terraformer.temporary.js",
 transition:"REVERSE_NATURALIZATION",qualification:"UNDER_CONDITIONAL_EXPERIMENT",
 authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfEnsureInternalSessionLane(){if(TF_INTERNAL_SESSION_STATE.server)return TF_INTERNAL_SESSION_STATE;const server=net.createServer(socket=>{if(!TERRAFORMER_ACCESS.admitted){socket.destroy();return}socket.end(JSON.stringify({schema:'TERRAFORMER-INTERNAL-SESSION-ACK/1',sessionId:TF_INTERNAL_SESSION_STATE.sessionId})+'\n')});server.on('error',()=>{});server.listen(TERRAFORMER_INTERNAL_SESSION.internalPort,TERRAFORMER_INTERNAL_SESSION.bind);TF_INTERNAL_SESSION_STATE.server=server;return TF_INTERNAL_SESSION_STATE}

function tfStopInternalSessionLane(){try{TF_INTERNAL_SESSION_STATE.server?.close()}catch{}TF_INTERNAL_SESSION_STATE.server=null;TF_INTERNAL_SESSION_STATE.established=false}

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TF_INTERNAL_SESSION_STATE={server:null,established:false,sessionId:null,admittedAt:null,osAuthenticated:false,osAuthenticatedAt:null};

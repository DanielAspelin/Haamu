"use strict";
function bindKeyPairV04491(){
 const SYSTEM=Object.freeze({id:"system.key-pair",name:"Key Pair System",family:"cryptography",type:"key-pair-system",mode:"volatile-cryptographic-material",state:"naturalized",
  concepts:Object.freeze(["Key","Pair"]),integrates:Object.freeze(["system.cryptography","system.security","system.generator","system.validation","system.verification"]),
  privateMaterialPersistence:false,secretLogging:false,exportsPrivateByDefault:false,grantsAuthority:false});
 function tfKeyPairPlanV36259(spec={}){const algorithm=String(spec.algorithm||"ed25519").toLowerCase();if(!["ed25519","x25519","rsa"].includes(algorithm))throw new Error("key-pair algorithm not admitted");return Object.freeze({algorithm,generate:false,persistPrivate:false,logPrivate:false,exportPrivateByDefault:false,authorizationRequired:true});}
 return Object.freeze({SYSTEM,tfKeyPairPlanV36259});
}
module.exports={bindKeyPairV04491};

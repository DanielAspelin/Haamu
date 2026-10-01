"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-TOKENIZATION-SYSTEM/1",id:"system.tokenization",concept:"Tokenization",typeOf:"system.system",futureConvergence:true,qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function tokenize(kind,identity,payload=null){if(!kind||!identity)throw Error("tokenization: kind and identity required");return Object.freeze({schema:"TERRAFORMER-TOKEN/1",kind:String(kind),identity:String(identity),payload,authorityGranted:false,persistent:false});}
module.exports=Object.freeze({SYSTEM,tokenize});

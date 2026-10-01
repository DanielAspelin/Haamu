"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-CALLER-SYSTEM/1",id:"system.caller",concept:"Caller",typeOf:"system.system",registry:"terraformer.callers.json",authorityGranted:false,callingAuthorityImplied:false});
function identify(id,scope=null){if(typeof id!=="string"||!id.trim())throw Error("caller: id required");return Object.freeze({schema:"TERRAFORMER-CALLER/1",id:id.trim(),scope,authorityGranted:false,callingAuthorityImplied:false});}
function bindCallerV04507(){return Object.freeze({SYSTEM,identify});}
module.exports=Object.freeze({SYSTEM,identify,bindCallerV04507});

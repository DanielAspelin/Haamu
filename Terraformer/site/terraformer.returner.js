"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-RETURNER-SYSTEM/1",id:"system.returner",concept:"Returner",typeOf:"system.system",registry:"terraformer.returners.json",authorityGranted:false,returnAuthorityImplied:false});
function identify(id,scope=null){if(typeof id!=="string"||!id.trim())throw Error("returner: id required");return Object.freeze({schema:"TERRAFORMER-RETURNER/1",id:id.trim(),scope,authorityGranted:false,returnAuthorityImplied:false});}
function bindReturnerV04507(){return Object.freeze({SYSTEM,identify});}
module.exports=Object.freeze({SYSTEM,identify,bindReturnerV04507});

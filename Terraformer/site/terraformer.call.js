"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-CALL-SYSTEM/1",id:"system.call",concept:"Call",typeOf:"system.system",registry:"terraformer.calls.json",authorityGranted:false,automaticExecution:false});
function create({caller=null,callable=null,args=[],site=null,mode="EXPLICIT"}={}){
 if(!Array.isArray(args))throw Error("call: args must be an array");
 return Object.freeze({schema:"TERRAFORMER-CALL/1",caller,callable,args:Object.freeze([...args]),site,mode,executed:false,authorityGranted:false});
}
function bindCallV04504(){return Object.freeze({SYSTEM,create});}
module.exports=Object.freeze({SYSTEM,create,bindCallV04504});

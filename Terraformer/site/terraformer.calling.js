"use strict";
const Call=require("./terraformer.call.js");
const SYSTEM=Object.freeze({schema:"TERRAFORMER-CALLING-SYSTEM/1",id:"system.calling",concept:"Calling",typeOf:"system.system",registry:"terraformer.callings.json",authorityGranted:false,automaticExecution:false});
function prepare(spec={}){return Object.freeze({schema:"TERRAFORMER-CALLING/1",call:Call.create(spec),state:"PREPARED",executionGranted:false,authorityGranted:false});}
function bindCallingV04507(){return Object.freeze({SYSTEM,prepare});}
module.exports=Object.freeze({SYSTEM,prepare,bindCallingV04507});

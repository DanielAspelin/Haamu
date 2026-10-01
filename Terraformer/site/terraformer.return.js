"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-RETURN-SYSTEM/1",id:"system.return",concept:"Return",typeOf:"system.system",registry:"terraformer.returns.json",authorityGranted:false,automaticExecution:false});
function create({returner=null,value=null,site=null,mode="EXPLICIT"}={}){return Object.freeze({schema:"TERRAFORMER-RETURN/1",returner,value,site,mode,delivered:false,authorityGranted:false});}
function bindReturnV04504(){return Object.freeze({SYSTEM,create});}
module.exports=Object.freeze({SYSTEM,create,bindReturnV04504});

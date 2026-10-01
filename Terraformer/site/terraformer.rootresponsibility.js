"use strict";
const fs=require("fs"),path=require("path");
const REGISTRY=path.join(__dirname,"terraformer.rootresponsibilities.json");
function load(){return Object.freeze(JSON.parse(fs.readFileSync(REGISTRY,"utf8")));}
function qualify(){const x=load(),missing=[];if(x.policy.destructiveExtractionPerformed)missing.push("destructive-extraction");if(x.policy.automaticOwnershipTransfer)missing.push("automatic-transfer");if(x.policy.authorityAmplification)missing.push("authority");if(!x.nextExtractionCandidate.qualificationRequired)missing.push("qualification-boundary");return Object.freeze({pass:missing.length===0,missing:Object.freeze(missing),checkpoint:x.checkpoint,root:x.root,nextExtractionCandidate:x.nextExtractionCandidate});}
module.exports=Object.freeze({REGISTRY,load,qualify});

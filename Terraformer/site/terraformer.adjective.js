"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-ADJECTIVE-SYSTEM/1",id:"system.adjective",concept:"Adjective",
 typeOf:"system.system",family:"classification",registry:"terraformer.adjectives.json",
 authorityGranted:false,mutationGranted:false,reclassificationImplied:false
});
function qualify(subject,adjective){if(!subject||typeof adjective!=="string"||!adjective.trim())throw Error("adjective: subject and adjective required");return Object.freeze({subject,adjective:adjective.trim(),descriptive:true,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,qualify});

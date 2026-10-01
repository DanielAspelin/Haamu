"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-RESPONSIBILITY-SYSTEM/1",id:"system.responsibility",concept:"Responsibility",
 typeOf:"system.system",family:"governance",registry:"terraformer.responsibilities.json",
 authorityGranted:false,executionGranted:false,persistenceGranted:false
});
function define(subject,responsibility,evidence=[]){
 if(typeof subject!=="string"||!subject.trim())throw Error("responsibility: subject required");
 if(typeof responsibility!=="string"||!responsibility.trim())throw Error("responsibility: responsibility required");
 return Object.freeze({schema:"TERRAFORMER-RESPONSIBILITY/1",subject:subject.trim(),
  responsibility:responsibility.trim(),evidence:Object.freeze([...evidence]),
  authorityGranted:false,executionGranted:false});
}
module.exports=Object.freeze({SYSTEM,define});

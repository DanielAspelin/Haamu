"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-OBJECTIVE-SYSTEM/1",id:"system.objective",concept:"Objective",
 typeOf:"system.system",family:"goal",registry:"terraformer.objectives.json",
 rule:"An Objective represents a defined intended outcome or target; it does not authorize execution or assert achievement.",authorityGranted:false,automaticExecution:false,automaticPersistence:false
});
function define(subject,evidence=[]){return Object.freeze({schema:"TERRAFORMER-OBJECTIVE/1",subject,evidence:Object.freeze([...evidence]),authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,define});

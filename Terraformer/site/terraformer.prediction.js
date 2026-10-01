"use strict";
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-PREDICTION-SYSTEM/1",id:"system.prediction",concept:"Prediction",
 typeOf:"system.system",family:"forecast-inference",registry:"terraformer.predictions.json",
 authorityGranted:false,factImplied:false,resultImplied:false,automaticExecution:false
});
function predict(subject,{method=null,evidence=[],confidence=null,horizon=null}={}){
 if(!subject)throw Error("prediction: subject required");
 if(confidence!==null&&(!Number.isFinite(confidence)||confidence<0||confidence>1))throw Error("prediction: confidence must be 0..1");
 return Object.freeze({schema:"TERRAFORMER-PREDICTION/1",subject,method,evidence:Object.freeze([...evidence]),confidence,horizon,
  uncertain:true,factImplied:false,authorityGranted:false});
}
module.exports=Object.freeze({SYSTEM,predict});

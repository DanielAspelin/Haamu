"use strict";
function bindCommunicationV04478(){
 const TF_COMMUNICATION_LIFECYCLE_V36246=Object.freeze({
 id:"lifecycle.communication",system:"system.lifecycle",mode:"deterministic-bounded-state-machine",
 states:Object.freeze(["DISCONNECTED","CONNECTING","CONNECTED","SENDING","RECEIVING","TRANSMITTING","COMPLETE","DISCONNECTING","FAILED","RECOVERING"]),
 transitions:Object.freeze({
  DISCONNECTED:Object.freeze(["CONNECTING"]),CONNECTING:Object.freeze(["CONNECTED","FAILED"]),CONNECTED:Object.freeze(["SENDING","RECEIVING","TRANSMITTING","DISCONNECTING","FAILED"]),
  SENDING:Object.freeze(["CONNECTED","COMPLETE","FAILED"]),RECEIVING:Object.freeze(["CONNECTED","COMPLETE","FAILED"]),TRANSMITTING:Object.freeze(["CONNECTED","COMPLETE","FAILED"]),
  COMPLETE:Object.freeze(["CONNECTED","DISCONNECTING"]),DISCONNECTING:Object.freeze(["DISCONNECTED","FAILED"]),FAILED:Object.freeze(["RECOVERING","DISCONNECTED"]),
  RECOVERING:Object.freeze(["DISCONNECTED","CONNECTED","FAILED"])
 }),
 externalEffectsRequireAuthorization:true,connectsByDefault:false,networkAuthority:false,credentialAuthority:false,grantsAuthority:false,persists:false
});
 function tfCommunicationLifecycleV36246(spec={}){
 return Object.freeze({id:String(spec.id||"communication.lifecycle.instance"),state:"DISCONNECTED",generation:0,history:Object.freeze([]),authorized:false,connected:false,
  networkAuthority:false,credentialAuthority:false,persisted:false,authorityGranted:false});
}
 function tfCommunicationTransitionV36246(instance,next,options={}){
 const n=String(next),allowed=TF_COMMUNICATION_LIFECYCLE_V36246.transitions[instance.state]||[];
 if(!allowed.includes(n))throw new Error("invalid communication lifecycle transition "+instance.state+" -> "+n);
 const effectStates=new Set(["CONNECTING","SENDING","RECEIVING","TRANSMITTING"]);
 if(effectStates.has(n)&&options.authorized!==true)throw new Error("authorization required for communication effect transition");
 const connected=["CONNECTED","SENDING","RECEIVING","TRANSMITTING","COMPLETE"].includes(n);
 const event=Object.freeze({from:instance.state,to:n,generation:instance.generation+1,authorized:options.authorized===true,effectExecuted:false});
 return Object.freeze({...instance,state:n,generation:instance.generation+1,connected,authorized:options.authorized===true,
  history:Object.freeze([...(instance.history||[]),event]),networkAuthority:false,credentialAuthority:false,persisted:false,authorityGranted:false});
}
 return Object.freeze({TF_COMMUNICATION_LIFECYCLE_V36246,tfCommunicationLifecycleV36246,tfCommunicationTransitionV36246});
}

function bindFutureOrientationCommunicationV04524(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.290: Goal / Prediction / Prophecy Communication Fabric === */
const TF_FUTURE_ORIENTATION_SYSTEMS_V36290=Object.freeze([
 Object.freeze({id:"system.goal",concept:"Goal",type:"intent-system",mode:"prospective",condition:"intended-outcome-defined",state:"ready",epistemicClass:"intent"}),
 Object.freeze({id:"system.prediction",concept:"Prediction",type:"forecast-system",mode:"evidence-model",condition:"evidence-or-model-identified",state:"ready",epistemicClass:"forecast"}),
 Object.freeze({id:"system.prophecy",concept:"Prophecy",type:"future-claim-system",mode:"claim-record",condition:"claim-source-identified",state:"ready",epistemicClass:"claim"})
]);
const TF_FUTURE_ORIENTATION_RELATIONSHIPS_V36290=Object.freeze([
 Object.freeze({from:"system.goal",relation:"communicates-with",to:"system.prediction"}),
 Object.freeze({from:"system.prediction",relation:"communicates-with",to:"system.goal"}),
 Object.freeze({from:"system.goal",relation:"communicates-with",to:"system.prophecy"}),
 Object.freeze({from:"system.prophecy",relation:"communicates-with",to:"system.goal"}),
 Object.freeze({from:"system.prediction",relation:"communicates-with",to:"system.prophecy"}),
 Object.freeze({from:"system.prophecy",relation:"communicates-with",to:"system.prediction"})
]);
function tfFutureOrientationExchangeV36290(input={}){
 const goal=String(input.goal??""),prediction=String(input.prediction??""),prophecy=String(input.prophecy??"");
 return Object.freeze({
  system:"system.communication",
  participants:Object.freeze(["system.goal","system.prediction","system.prophecy"]),
  messages:Object.freeze([
   Object.freeze({from:"system.goal",class:"intent",content:goal}),
   Object.freeze({from:"system.prediction",class:"forecast",content:prediction,evidenceRequired:true}),
   Object.freeze({from:"system.prophecy",class:"claim",content:prophecy,sourceRequired:true})
  ]),
  reconciliation:Object.freeze({goalMayUsePredictionAsEvidence:false,predictionMayEvaluateGoalFeasibility:true,prophecyPromotedToPrediction:false,claimPromotedToFact:false}),
  executes:false,mutates:false,authorityGranted:false
 });
}
function tfFutureOrientationSelfTestV36290(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.goal","system.prediction","system.prophecy","system.communication","system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 for(const x of TF_FUTURE_ORIENTATION_SYSTEMS_V36290)for(const k of ["type","mode","condition","state","epistemicClass"])if(!x[k])missing.push(x.id+":"+k);
 const e=tfFutureOrientationExchangeV36290({goal:"G",prediction:"P",prophecy:"R"});
 if(e.participants.length!==3||e.messages.length!==3||e.reconciliation.prophecyPromotedToPrediction||e.reconciliation.claimPromotedToFact||e.executes||e.mutates||e.authorityGranted)missing.push("future-orientation-boundary");
 if(missing.length)throw new Error("future orientation qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,goal:true,prediction:true,prophecy:true,communication:true,bidirectionalEdges:6,epistemicSeparation:true,prophecyNotPrediction:true,claimNotFact:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_FUTURE_ORIENTATION_SYSTEMS_V36290,TF_FUTURE_ORIENTATION_RELATIONSHIPS_V36290,tfFutureOrientationExchangeV36290,tfFutureOrientationSelfTestV36290});
}
const TERRAFORMER_COMMUNICATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMMUNICATION-SYSTEM/1',id:'system.communication',name:'Communication System',family:'communication',type:'system',state:'integrated',canonicalPath:'terraformer://communication/',governs:Object.freeze(['exchange','channel','route','session','participant','media','delivery']),rule:'Communication System coordinates admitted exchange paths; transport visibility does not grant provider, network, account, or mutation authority.'});

module.exports=Object.freeze({bindCommunicationV04478,bindFutureOrientationCommunicationV04524,TERRAFORMER_COMMUNICATION_SYSTEM});

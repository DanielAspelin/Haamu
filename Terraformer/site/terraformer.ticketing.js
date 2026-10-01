"use strict";
function bindEventActorsV04577(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.336: Act Correction / Ticketing / Alerting / Alarming Actor Fabric === */
const TF_EVENT_ACTOR_SYSTEMS_V36336=Object.freeze([
 Object.freeze({id:"system.act",concept:"Act",type:"action-result-system",mode:"bounded-act",condition:"action-admitted",state:"ready"}),
 Object.freeze({id:"system.ticketing",concept:"Ticketing",type:"ticket-process-system",mode:"bounded-ticket-coordination",condition:"ticket-context-admitted",state:"ready"}),
 Object.freeze({id:"system.ticketer",concept:"Ticketer",type:"process-actor-system",mode:"ticketing-actor",condition:"ticketing-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.alerting",concept:"Alerting",type:"alert-process-system",mode:"bounded-alert-coordination",condition:"alert-context-admitted",state:"ready"}),
 Object.freeze({id:"system.alerter",concept:"Alerter",type:"process-actor-system",mode:"alerting-actor",condition:"alerting-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.alarming",concept:"Alarming",type:"alarm-process-system",mode:"bounded-alarm-coordination",condition:"alarm-context-admitted",state:"ready"}),
 Object.freeze({id:"system.alarmer",concept:"Alarmer",type:"process-actor-system",mode:"alarming-actor",condition:"alarming-operation-admitted",state:"ready"})
]);
const TF_EVENT_ACTOR_RELATIONSHIPS_V36336=Object.freeze([
 Object.freeze({from:"system.action",relation:"produces",to:"system.act"}),
 Object.freeze({from:"system.actor",relation:"produces",to:"system.action"}),
 Object.freeze({from:"system.ticketer",relation:"part-of",to:"system.ticketing"}),
 Object.freeze({from:"system.alerter",relation:"part-of",to:"system.alerting"}),
 Object.freeze({from:"system.alarmer",relation:"part-of",to:"system.alarming"})
]);
function tfEventActorFabricV36336(kind){
 const map=Object.freeze({ticketing:"ticketer",alerting:"alerter",alarming:"alarmer"});
 const k=String(kind??"");if(!map[k])throw new Error("unsupported process actor kind");
 return Object.freeze({process:"system."+k,actor:"system."+map[k],processActorDistinct:true,
  admittedOnly:true,automaticExternalEffect:false,automaticNotification:false,automaticSound:false,
  mutationPerformed:false,persistencePerformed:false,authorityGranted:false});
}
function tfEventActorSelfTestV36336(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.act","system.action","system.actor","system.ticketing","system.ticketer","system.alerting","system.alerter","system.alarming","system.alarmer"])if(!ids.has(id))missing.push(id);
 const activeActs=/["']system\\.acts["']/.test(sourceText.replace(/if\(ids\.has\("system\\.acts"\)\)[^;]+;/g,""));
 if(activeActs)missing.push("system.acts-retirement");
 for(const k of ["ticketing","alerting","alarming"]){const p=tfEventActorFabricV36336(k);if(!p.processActorDistinct||!p.admittedOnly||p.automaticExternalEffect||p.automaticNotification||p.automaticSound||p.authorityGranted)missing.push(k+"-boundary");}
 if(missing.length)throw new Error("event actor qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:7,act:true,actsRetiredFromCanonical:true,actionReused:true,actorReused:true,
  ticketing:true,ticketer:true,alerting:true,alerter:true,alarming:true,alarmer:true,
  processActorDistinct:true,automaticExternalEffect:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_EVENT_ACTOR_SYSTEMS_V36336,TF_EVENT_ACTOR_RELATIONSHIPS_V36336,tfEventActorFabricV36336,tfEventActorSelfTestV36336});
}
module.exports=Object.freeze({bindEventActorsV04577});

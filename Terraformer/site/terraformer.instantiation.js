"use strict";
function bindInstantiationExecutionTicketV04621(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358,tfCodeOwnershipClosureSelfTestV36270}=deps;
 /* === Terraformer v0.36.377: Universal Instantiation / Function Execution / Ticketer Boundary === */
const TF_INSTANCE_TICKET_SYSTEMS_V36377=Object.freeze([{"id":"system.instance","concept":"Instance","type":"runtime-system-instance"},{"id":"system.constructor","concept":"Constructor","type":"construction-instantiation-actor-system"},{"id":"system.ticket","concept":"Ticket","type":"bounded-error-ticket-record-system"}]);

const TF_INSTANCE_EXECUTION_RELATIONSHIPS_V36377=Object.freeze([
 Object.freeze({from:"system.constructor",relation:"participates-in",to:"system.instantiation"}),
 Object.freeze({from:"system.instantiation",relation:"produces",to:"system.instance"}),
 Object.freeze({from:"system.instance",relation:"binds",to:"system.function"}),
 Object.freeze({from:"system.call",relation:"originates-from",to:"system.instance"}),
 Object.freeze({from:"system.call",relation:"targets",to:"system.instance"}),
 Object.freeze({from:"system.call",relation:"uses",to:"system.parameter"}),
 Object.freeze({from:"system.call",relation:"enters",to:"system.execution"}),
 Object.freeze({from:"system.execution",relation:"produces",to:"system.return"}),
 Object.freeze({from:"system.ticketer",relation:"part-of",to:"system.ticketing"}),
 Object.freeze({from:"system.ticketer",relation:"produces",to:"system.ticket"}),
 Object.freeze({from:"system.ticket",relation:"records",to:"system.error"}),
 Object.freeze({from:"system.ticket",relation:"routes-to",to:"system.administration"})
]);
const TF_INSTANCE_EXECUTION_SCHEMA_V36377=Object.freeze({schema:"TERRAFORMER-INSTANCE-EXECUTION/1",instantiationRequired:true,initializationRequired:true,
 callRequired:true,parameterBindingRequired:true,executionAdmissionRequired:true,returnRequired:true,kernelBootstrapExceptionOnly:true,authorityAmplification:false});
function tfSystemInstanceV36377(owner,generation=0){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.instantiation:invalid-input] System identity required.");
 return Object.freeze({id:id+"::instance::"+generation,system:id,generation,instantiated:true,initialized:true,
  functionOwner:id,engine:id+"::engine",service:id+"::service",worker:id+"::worker",carrier:id+"::io-carrier",socket:id+"::socket",
  server:id+"::server",client:id+"::client",...TF_INSTANCE_EXECUTION_SCHEMA_V36377});
}
function tfInstanceCallV36377(sourceInstance,targetInstance,fn,args=[]){
 if(!sourceInstance?.instantiated||!sourceInstance?.initialized||!targetInstance?.instantiated||!targetInstance?.initialized)throw new Error("[TF:system.execution:admission-denied] Instantiated and initialized source/target required.");
 if(typeof fn!=="function")throw new Error("[TF:system.function:invalid-input] Callable Function required.");
 const parameters=Object.freeze(Array.isArray(args)?[...args]:[args]),value=fn(...parameters);
 return Object.freeze({system:"system.call",sourceInstance:sourceInstance.id,targetInstance:targetInstance.id,functionOwner:targetInstance.system,
  parameters,execution:Object.freeze({system:"system.execution",admitted:true}),return:Object.freeze({system:"system.return",value}),complete:true});
}
const TF_TICKET_BOUNDARY_SCHEMA_V36377=Object.freeze({schema:"TERRAFORMER-ERROR-TICKET/1",terraformerBoundary:true,administratorRetrievable:true,
 automaticRepair:false,automaticExternalSend:false,volatileByDefault:true,authorityAmplification:false});
function tfSystemTicketerV36377(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.ticketing:invalid-input] System identity required.");
 return Object.freeze({id:id+"::ticketer",system:"system.ticketer",owner:id,ticketing:"system.ticketing",destination:"system.administration",...TF_TICKET_BOUNDARY_SCHEMA_V36377});
}
function tfErrorTicketV36377(owner,error,spec={}){
 const t=tfSystemTicketerV36377(owner),message=error instanceof Error?error.message:String(error??"Unknown error");
 return Object.freeze({system:"system.ticket",id:String(spec.id??(t.owner+"::ticket::"+String(spec.sequence??0))),owner:t.owner,ticketer:t.id,
  error:Object.freeze({system:"system.error",message,code:spec.code??null}),createdAt:spec.createdAt??null,status:"open",
  destination:"terraformer-administration-boundary",administratorRetrievable:true,automaticRepair:false,automaticExternalSend:false,volatile:true});
}
function tfUniversalInstantiationTicketFabricV36377(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({systemsCovered:ids.length,instances:Object.freeze(ids.map(id=>tfSystemInstanceV36377(id,0))),
  ticketers:Object.freeze(ids.map(tfSystemTicketerV36377)),everySystemInstantiated:true,everySystemTicketer:true});
}
function tfInstantiationTicketSelfTestV36377(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_INSTANCE_TICKET_SYSTEMS_V36377.map(x=>x.id),u=tfUniversalInstantiationTicketFabricV36377(sourceText);
 for(const id of [...added,"system.instantiation","system.function","system.call","system.parameter","system.execution","system.return","system.ticketing","system.ticketer","system.error","system.administration","system.messenger"])if(!ids.has(id))missing.push(id);
 if(u.instances.length!==ids.size||u.ticketers.length!==ids.size)missing.push("universal-coverage");
 const a=tfSystemInstanceV36377("system.function"),b=tfSystemInstanceV36377("system.call"),c=tfInstanceCallV36377(a,b,(x,y)=>x+y,[2,3]);
 if(c.return.value!==5||!c.complete||c.sourceInstance!==a.id||c.targetInstance!==b.id)missing.push("call-boundary");
 let denied=false;try{tfInstanceCallV36377({instantiated:false},b,x=>x,[1]);}catch(_){denied=true;}if(!denied)missing.push("uninstantiated-execution");
 const ticket=tfErrorTicketV36377("system.function",new Error("fixture"),{id:"fixture-ticket",createdAt:"fixture"});
 if(ticket.status!=="open"||!ticket.administratorRetrievable||ticket.automaticRepair||ticket.automaticExternalSend||ticket.destination!=="terraformer-administration-boundary")missing.push("ticket-boundary");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 const own=tfCodeOwnershipClosureSelfTestV36270(sourceText);if(own.orphans!==0||own.kernelExceptions!==1)missing.push("ownership");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Instantiation / Ticketer qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:3,ticketingReused:true,ticketerReused:true,systemsCovered:u.systemsCovered,instances:u.instances.length,ticketers:u.ticketers.length,
  everySystemInstantiated:true,everySystemTicketer:true,functionExecutionRequiresInstance:true,sourceAndTargetInstanceRequired:true,uninstantiatedExecutionDenied:true,
  ticketsAdministratorRetrievable:true,automaticRepair:false,automaticExternalSend:false,kernelExceptions:own.kernelExceptions,orphans:own.orphans,missing:0});
}
globalThis.TF_INSTANCE_TICKET_SYSTEMS_V36377=TF_INSTANCE_TICKET_SYSTEMS_V36377;
globalThis.TF_INSTANCE_EXECUTION_RELATIONSHIPS_V36377=TF_INSTANCE_EXECUTION_RELATIONSHIPS_V36377;
globalThis.TF_INSTANCE_EXECUTION_SCHEMA_V36377=TF_INSTANCE_EXECUTION_SCHEMA_V36377;
globalThis.TF_TICKET_BOUNDARY_SCHEMA_V36377=TF_TICKET_BOUNDARY_SCHEMA_V36377;
globalThis.tfSystemInstanceV36377=tfSystemInstanceV36377;
globalThis.tfInstanceCallV36377=tfInstanceCallV36377;
globalThis.tfSystemTicketerV36377=tfSystemTicketerV36377;
globalThis.tfErrorTicketV36377=tfErrorTicketV36377;
globalThis.tfUniversalInstantiationTicketFabricV36377=tfUniversalInstantiationTicketFabricV36377;
 return Object.freeze({TF_INSTANCE_TICKET_SYSTEMS_V36377,TF_INSTANCE_EXECUTION_RELATIONSHIPS_V36377,TF_INSTANCE_EXECUTION_SCHEMA_V36377,TF_TICKET_BOUNDARY_SCHEMA_V36377,tfSystemInstanceV36377,tfInstanceCallV36377,tfSystemTicketerV36377,tfErrorTicketV36377,tfUniversalInstantiationTicketFabricV36377,tfInstantiationTicketSelfTestV36377});
}
module.exports=Object.freeze({bindInstantiationExecutionTicketV04621});

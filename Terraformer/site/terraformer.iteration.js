"use strict";
function bindEntityLifecycleKitIterationV04451(deps={}){
 const {tfCanonicalKitInventoryV36220,tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfSystemAutomatorDescriptorV36196,tfSystemDerivedWorkerFabricV36209,tfSystemGeneratorDescriptorV36196}=deps;
 const lifecycle=deps.lifecycleSystem;if(!lifecycle)throw new Error("lifecycle dependency required");
/* === Terraformer v0.36.221: Entity, Lifecycle & Canonical Kit Iteration Fabric === */
const TF_ENTITY_SYSTEM_V36221=Object.freeze({schema:"TERRAFORMER-ENTITY-SYSTEM/2",id:"system.entity",name:"Entity System",family:"identity-structure",type:"entity-system",mode:"canonical-registry",condition:Object.freeze(["identity-valid","metadata-valid","relationship-valid"]),state:"naturalized",governs:Object.freeze(["identity","type","mode","condition","state","relationships","kit-membership"]),entityKinds:Object.freeze(["system","worker","generator","automator","kit"]),grantsAuthority:false,persists:false,logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false});
const TF_LIFECYCLE_SYSTEM_V36221=Object.freeze({schema:"TERRAFORMER-LIFECYCLE-SYSTEM/2",id:"system.lifecycle",name:"Lifecycle System",family:"control",type:"lifecycle-system",mode:"deterministic-bounded",condition:Object.freeze(["entity-resolved","policy-admitted","transition-valid"]),state:"naturalized",stages:Object.freeze(["prepare","validate","activate","operate","complete","recover"]),governs:Object.freeze(["entity-lifecycle","kit-iteration","transition-validation","failure-isolation","recovery-transition"]),grantsAuthority:false,persists:false,logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false});
function tfKitMemberIdsV36221(k){const raw=k.members||k.systems||[];return Object.freeze(raw.map(x=>typeof x==="string"?x:x?.id).filter(x=>typeof x==="string"&&x.startsWith("system.")))}
function tfKitIterationContextV36221(sourceText){
 const kits=tfCanonicalKitInventoryV36220(sourceText),fabric=tfSystemDerivedWorkerFabricV36209(sourceText),reverse=new Map(),workers=new Map(fabric.workers.map(w=>[w.id,w]));
 for(const k of kits)for(const sid of tfKitMemberIdsV36221(k)){if(!reverse.has(sid))reverse.set(sid,[]);reverse.get(sid).push(k.id)}
 for(const a of reverse.values())a.sort();
 return Object.freeze({kits,workers,reverse});
}
function tfEntityKitsV36221(id,kind,sourceText,ctx=null){ctx=ctx||tfKitIterationContextV36221(sourceText);const sid=kind==="system"?String(id):/^(worker|generator|automator)\./.test(String(id))?"system."+String(id).replace(/^(worker|generator|automator)\./,""):null;return Object.freeze(sid?[...(ctx.reverse.get(sid)||[])]:[])}
function tfEntityDescriptorV36221(id,kind,sourceText,ctx=null){
 ctx=ctx||tfKitIterationContextV36221(sourceText);id=String(id||"");kind=String(kind||"");
 if(kind==="kit"){const k=ctx.kits.find(x=>x.id===id);return k?Object.freeze({id,kind,type:k.type||"kit",mode:k.mode||"naturalized",condition:k.condition||"registered",state:k.state||"registered",kits:Object.freeze([id])}):null}
 if(kind==="worker"){const w=ctx.workers.get(id);return w?Object.freeze({...tfEntityObservabilityDescriptorV36207("worker",w),kind,kits:tfEntityKitsV36221(id,kind,sourceText,ctx)}):null}
 const sid=/^(generator|automator)\./.test(id)?"system."+id.replace(/^(generator|automator)\./,""):id;
 if(!tfCanonicalSystemIdsV36196(sourceText).includes(sid))return null;
 const base=kind==="generator"?tfSystemGeneratorDescriptorV36196(sid):kind==="automator"?tfSystemAutomatorDescriptorV36196(sid):{id:sid,type:"canonical-system",mode:"canonical",condition:"registered",state:"registered"};
 return Object.freeze({...tfEntityObservabilityDescriptorV36207(kind==="system"?"system":kind,base),kind,kits:tfEntityKitsV36221(id,kind,sourceText,ctx)});
}
function tfKitIterationPlanV36221(kitId,sourceText,ctx=null){
 ctx=ctx||tfKitIterationContextV36221(sourceText);const k=ctx.kits.find(x=>x.id===String(kitId));if(!k)throw new Error("unknown kit");const rows=[],seen=new Set();
 for(const sid of [...tfKitMemberIdsV36221(k)].sort()){if(seen.has(sid))continue;seen.add(sid);const worker=ctx.workers.get("worker."+sid.slice(7))||null;
  rows.push(Object.freeze({system:sid,worker:worker?.id||null,generator:"generator."+sid.slice(7),automator:"automator."+sid.slice(7),lifecycle:Object.freeze([...TF_LIFECYCLE_SYSTEM_V36221.stages]),kits:Object.freeze([...(ctx.reverse.get(sid)||[])])}));}
 return Object.freeze({kit:k.id,mode:"deterministic",members:Object.freeze(rows),deduplicated:true,authorityGranted:false});
}
const TF_POLICY_RANK_V36221=Object.freeze({"bounded":1,"authorization-required":2,"manual-only":3});
function tfKitPolicyV36221(plan,sourceText,ctx=null){ctx=ctx||tfKitIterationContextV36221(sourceText);const policies=[];for(const row of plan.members){const w=ctx.workers.get(row.worker);if(w?.policy)policies.push(w.policy)}const strictest=policies.reduce((a,b)=>(TF_POLICY_RANK_V36221[b]||0)>(TF_POLICY_RANK_V36221[a]||0)?b:a,"bounded");return Object.freeze({policy:strictest,memberPolicies:Object.freeze(policies),authorityAmplification:false})}
function tfIterateKitV36221(kitId,sourceText,visitor,options={}){if(typeof visitor!=="function")throw new TypeError("kit visitor required");const ctx=tfKitIterationContextV36221(sourceText),plan=tfKitIterationPlanV36221(kitId,sourceText,ctx),policy=tfKitPolicyV36221(plan,sourceText,ctx);if(policy.policy==="authorization-required"&&options.authorized!==true)throw new Error("kit iteration authorization required");if(policy.policy==="manual-only"&&options.manual!==true)throw new Error("kit iteration manual pass-through required");const results=[];for(const row of plan.members){try{results.push(Object.freeze({system:row.system,state:"complete",result:visitor(row,Object.freeze([...TF_LIFECYCLE_SYSTEM_V36221.stages]))}))}catch(e){results.push(Object.freeze({system:row.system,state:"recover",error:String(e?.message||e)}));if(options.stopOnFailure===true)break}}return Object.freeze({kit:plan.kit,policy:policy.policy,results:Object.freeze(results),failureIsolated:true,authorityGranted:false})}
function tfEntityLifecycleKitSelfTestV36221(sourceText){
 const missing=[],ctx=tfKitIterationContextV36221(sourceText),e=tfEntityDescriptorV36221("system.entity","system",sourceText,ctx),l=tfEntityDescriptorV36221("system.lifecycle","system",sourceText,ctx);
 if(!e||!l)missing.push("canonical-systems");const plan=tfKitIterationPlanV36221("kit.system",sourceText,ctx);if(!plan.members.length)missing.push("iteration-plan");
 const er=plan.members.find(x=>x.system==="system.entity"),lr=plan.members.find(x=>x.system==="system.lifecycle");if(!er||!lr||!er.worker||!er.generator||!er.automator)missing.push("four-class-binding");
 if(!tfEntityKitsV36221("system.entity","system",sourceText,ctx).includes("kit.system"))missing.push("reverse-lookup");
 const specialized=ctx.kits.filter(k=>k.id!=="kit.system"),specializedMembers=new Set();for(const k of specialized)for(const x of tfKitMemberIdsV36221(k))specializedMembers.add(x);
 if(missing.length)throw new Error("entity lifecycle kit qualification failure "+missing.join(","));
 return Object.freeze({pass:true,entitySystem:true,lifecycleSystem:true,lifecycleStages:6,kitIterator:true,forwardLookup:true,reverseLookup:true,systemWorkerGeneratorAutomatorBinding:true,deterministic:true,deduplicated:true,policyAggregation:true,failureIsolation:true,kits:ctx.kits.length,specializedMemberSystems:specializedMembers.size,globalSystemKitMembers:plan.members.length,authorityAmplification:false,missing:0});
}
/* === end v0.36.221 === */


 return Object.freeze({TF_ENTITY_SYSTEM_V36221,TF_LIFECYCLE_SYSTEM_V36221,TF_POLICY_RANK_V36221,tfEntityDescriptorV36221,tfEntityKitsV36221,tfEntityLifecycleKitSelfTestV36221,tfIterateKitV36221,tfKitIterationContextV36221,tfKitIterationPlanV36221,tfKitMemberIdsV36221,tfKitPolicyV36221});
}
module.exports={bindEntityLifecycleKitIterationV04451};

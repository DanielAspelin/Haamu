"use strict";
function bindEnvironmentV04452(deps={}){
 const {TF_LIFECYCLE_SYSTEM_V36221,tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.222: Computational Environment System === */
const TF_ENVIRONMENT_SYSTEM_V36222=Object.freeze({
 schema:"TERRAFORMER-ENVIRONMENT-SYSTEM/1",id:"system.environment",name:"Environment System",family:"computational-context",
 type:"environment-system",mode:"isolated-qualified-context",condition:Object.freeze(["environment-defined","boundary-valid","lifecycle-valid","policy-valid"]),state:"naturalized",
 integrates:Object.freeze(["system.entity","system.lifecycle","system.project","system.configuration","system.security","system.validation","system.verification","system.qualification","system.recovery","system.sandbox","system.simulation"]),
 governs:Object.freeze(["environment-definition","isolation","admission","promotion","demotion","qualification","recovery","entity-placement","kit-placement"]),
 grantsAuthority:false,persists:false,logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false
});
const TF_ENVIRONMENTS_V36222=Object.freeze([
 ["development","Development Environment","bounded","construction and local development"],
 ["research","Research Environment","bounded","research, exploration and evidence gathering"],
 ["experimental","Experimental Environment","bounded","conditional experiments and prototypes"],
 ["test","Test Environment","bounded","automated and manual test execution"],
 ["integration","Integration Environment","bounded","multi-system integration qualification"],
 ["build","Build Environment","bounded","deterministic construction and packaging"],
 ["simulation","Simulation Environment","bounded","non-production simulation and modelling"],
 ["sandbox","Sandbox Environment","bounded","isolated constrained computation"],
 ["qualification","Qualification Environment","authorization-required","qualification evidence and gates"],
 ["staging","Staging Environment","authorization-required","production-representative pre-release operation"],
 ["preproduction","Pre-production Environment","authorization-required","final production-boundary verification"],
 ["production","Production Environment","authorization-required","authorized live production operation"],
 ["production-critical","Production-Critical Environment","manual-only","production with elevated continuity and recovery constraints"],
 ["mission-critical","Mission-Critical Environment","manual-only","highest consequence bounded operational context"],
 ["recovery","Recovery Environment","authorization-required","restoration, reconstruction and recovery qualification"],
 ["maintenance","Maintenance Environment","authorization-required","controlled maintenance and repair"],
 ["diagnostic","Diagnostic Environment","bounded","diagnostics and fault localization"],
 ["benchmark","Benchmark Environment","bounded","controlled performance measurement"],
 ["training","Training Environment","bounded","non-authoritative training and rehearsal"],
 ["offline","Offline Environment","bounded","network-independent computation"],
 ["volatile","Volatile Environment","bounded","memory-only transient computation"]
].map(([id,name,policy,purpose],ordinal)=>Object.freeze({id:"environment."+id,name,type:"computational-environment",mode:id,condition:"defined",state:"registered",ordinal:ordinal+1,policy,purpose,
 isolation:true,production:id==="production"||id==="production-critical"||id==="mission-critical",critical:id==="production-critical"||id==="mission-critical",authorityGranted:false})));
const TF_ENVIRONMENT_PROMOTION_V36222=Object.freeze({
 development:Object.freeze(["test","integration"]),research:Object.freeze(["experimental","simulation"]),experimental:Object.freeze(["test","qualification"]),
 test:Object.freeze(["integration","qualification"]),integration:Object.freeze(["qualification","staging"]),build:Object.freeze(["test","qualification"]),
 simulation:Object.freeze(["qualification"]),sandbox:Object.freeze(["development","test"]),qualification:Object.freeze(["staging","preproduction"]),
 staging:Object.freeze(["preproduction"]),preproduction:Object.freeze(["production"]),production:Object.freeze(["production-critical"]),
 "production-critical":Object.freeze(["mission-critical"]),recovery:Object.freeze(["qualification"]),maintenance:Object.freeze(["test","qualification"]),
 diagnostic:Object.freeze(["test","recovery"]),benchmark:Object.freeze(["qualification"]),training:Object.freeze(["simulation"]),offline:Object.freeze(["development"]),
 volatile:Object.freeze(["sandbox"])
});
function tfEnvironmentV36222(id){id=String(id||"").replace(/^environment\./,"");return TF_ENVIRONMENTS_V36222.find(x=>x.id==="environment."+id)||null}
function tfEnvironmentAdmissionV36222(environmentId,entity,options={}){
 const env=tfEnvironmentV36222(environmentId);if(!env)throw new Error("unknown environment");if(!entity?.id)throw new Error("entity required");
 if(env.policy==="authorization-required"&&options.authorized!==true)throw new Error("environment authorization required");
 if(env.policy==="manual-only"&&options.manual!==true)throw new Error("critical environment manual pass-through required");
 return Object.freeze({environment:env.id,entity:entity.id,admitted:true,isolated:true,lifecycle:Object.freeze([...TF_LIFECYCLE_SYSTEM_V36221.stages]),authorityGranted:false});
}
function tfEnvironmentPromotionV36222(from,to,options={}){
 const a=tfEnvironmentV36222(from),b=tfEnvironmentV36222(to);if(!a||!b)throw new Error("unknown environment");
 const allowed=(TF_ENVIRONMENT_PROMOTION_V36222[a.mode]||[]).includes(b.mode);if(!allowed)throw new Error("environment promotion path not admitted");
 if(options.qualified!==true)throw new Error("environment promotion requires qualification");
 if((b.policy==="authorization-required"||b.policy==="manual-only")&&options.authorized!==true)throw new Error("environment promotion authorization required");
 if(b.policy==="manual-only"&&options.manual!==true)throw new Error("critical environment promotion manual pass-through required");
 return Object.freeze({from:a.id,to:b.id,promoted:true,qualified:true,authorized:options.authorized===true,manual:options.manual===true,authorityGranted:false});
}
const TF_ENVIRONMENT_KIT_V36222=Object.freeze({id:"kit.environment",name:"Environment Kit",type:"intrinsic-kit",mode:"naturalized",condition:Object.freeze(["environment-system-canonical","lifecycle-integrated","entity-integrated"]),
 state:"naturalized",members:Object.freeze(["system.environment","system.entity","system.lifecycle","system.project","system.configuration","system.security","system.validation","system.verification","system.qualification","system.recovery","system.sandbox","system.simulation"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,logging:"system.logging",reporting:"system.reporting",grantsAuthority:false});
function tfEnvironmentSelfTestV36222(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const id of TF_ENVIRONMENT_KIT_V36222.members)if(!ids.has(id))missing.push(id);
 for(const required of ["development","research","test","build","simulation","sandbox","qualification","staging","production","production-critical","mission-critical","recovery","maintenance","offline","volatile"])if(!tfEnvironmentV36222(required))missing.push("environment."+required);
 const dev=tfEnvironmentAdmissionV36222("development",{id:"system.entity"}),prod=tfEnvironmentPromotionV36222("preproduction","production",{qualified:true,authorized:true});
 let denied=false;try{tfEnvironmentAdmissionV36222("mission-critical",{id:"system.entity"},{authorized:true})}catch(e){denied=true}
 if(!dev.admitted||!prod.promoted||!denied)missing.push("environment-boundaries");
 if(missing.length)throw new Error("environment qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.environment",environments:TF_ENVIRONMENTS_V36222.length,development:true,research:true,production:true,productionCritical:true,missionCritical:true,
 isolation:true,lifecycleIntegrated:true,entityIntegrated:true,qualificationPromotion:true,criticalManualPassThrough:true,authorityAmplification:false,missing:0});
}
/* === end v0.36.222 === */


 return Object.freeze({TF_ENVIRONMENTS_V36222,TF_ENVIRONMENT_KIT_V36222,TF_ENVIRONMENT_PROMOTION_V36222,TF_ENVIRONMENT_SYSTEM_V36222,tfEnvironmentAdmissionV36222,tfEnvironmentPromotionV36222,tfEnvironmentSelfTestV36222,tfEnvironmentV36222});
}
module.exports={bindEnvironmentV04452};

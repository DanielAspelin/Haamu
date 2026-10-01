"use strict";
const SYSTEM=Object.freeze({id:"system.availability",concept:"Availability",authorityGranted:false,scaffold:true});
function bindAvailabilityV04538(){return Object.freeze({SYSTEM});}

function bindAvailabilityGeoSocialV04584(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.344: Availability / Society / Geographic Scope Fabric === */
const TF_AVAILABILITY_GEOSOCIAL_SYSTEMS_V36344=Object.freeze([
 Object.freeze({id:"system.uptime",concept:"Uptime",type:"operational-duration-system",mode:"available-duration-measurement",condition:"measurement-context-identified",state:"ready"}),
 Object.freeze({id:"system.downtime",concept:"Downtime",type:"operational-duration-system",mode:"unavailable-duration-measurement",condition:"measurement-context-identified",state:"ready"}),
 Object.freeze({id:"system.online",concept:"Online",type:"availability-state-system",mode:"connected-or-available-state",condition:"connectivity-context-identified",state:"ready"}),
 Object.freeze({id:"system.offline",concept:"Offline",type:"availability-state-system",mode:"disconnected-or-unavailable-state",condition:"connectivity-context-identified",state:"ready"}),
 Object.freeze({id:"system.society",concept:"Society",type:"social-organization-system",mode:"societal-context",condition:"societal-context-identified",state:"ready"}),
 Object.freeze({id:"system.national",concept:"National",type:"geographic-scope-system",mode:"national-scope",condition:"country-context-identified",state:"ready"}),
 Object.freeze({id:"system.international",concept:"International",type:"geographic-scope-system",mode:"cross-national-scope",condition:"multiple-country-context-identified",state:"ready"}),
 Object.freeze({id:"system.continental",concept:"Continental",type:"geographic-scope-system",mode:"continental-scope",condition:"continent-context-identified",state:"ready"}),
 Object.freeze({id:"system.country",concept:"Country",type:"geographic-entity-system",mode:"country-context",condition:"country-context-identified",state:"ready"}),
 Object.freeze({id:"system.city",concept:"City",type:"geographic-entity-system",mode:"city-context",condition:"city-context-identified",state:"ready"}),
 Object.freeze({id:"system.province",concept:"Province",type:"geographic-entity-system",mode:"province-context",condition:"province-context-identified",state:"ready"})
]);
const TF_AVAILABILITY_GEOSOCIAL_RELATIONSHIPS_V36344=Object.freeze([
 Object.freeze({from:"system.uptime",relation:"uses",to:"system.availability"}),
 Object.freeze({from:"system.downtime",relation:"uses",to:"system.availability"}),
 Object.freeze({from:"system.online",relation:"uses",to:"system.availability"}),
 Object.freeze({from:"system.offline",relation:"uses",to:"system.availability"}),
 Object.freeze({from:"system.national",relation:"uses",to:"system.country"}),
 Object.freeze({from:"system.international",relation:"uses",to:"system.country"}),
 Object.freeze({from:"system.network.national",relation:"uses",to:"system.national"}),
 Object.freeze({from:"system.network.international",relation:"uses",to:"system.international"}),
 Object.freeze({from:"system.city",relation:"may-be-part-of",to:"system.province"}),
 Object.freeze({from:"system.province",relation:"may-be-part-of",to:"system.country"})
]);
function tfAvailabilityGeoSocialContextV36344(kind,spec={}){
 const allowed=new Set(["uptime","downtime","online","offline","society","national","international","continental","country","city","province"]);
 const k=String(kind??"");if(!allowed.has(k))throw new Error("[TF:system.context:unsupported-operation] Unsupported availability/geosocial context.");
 const duration=(k==="uptime"||k==="downtime")?(Number.isFinite(Number(spec.duration))&&Number(spec.duration)>=0?Number(spec.duration):null):null;
 return Object.freeze({system:"system."+k,duration,descriptive:true,networkAuthority:false,governmentAuthority:false,
  jurisdictionAuthority:false,citizenshipImplied:false,connectivityMutation:false,automaticExternalAction:false,
  persistencePerformed:false,authorityGranted:false});
}
function tfAvailabilityGeoSocialSelfTestV36344(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.uptime","system.downtime","system.online","system.offline","system.society","system.national","system.international",
 "system.continental","system.country","system.city","system.province","system.network.national","system.network.international","system.availability"])if(!ids.has(id))missing.push(id);
 for(const k of ["uptime","downtime","online","offline","society","national","international","continental","country","city","province"]){
  const p=tfAvailabilityGeoSocialContextV36344(k);
  if(!p.descriptive||p.networkAuthority||p.governmentAuthority||p.jurisdictionAuthority||p.citizenshipImplied||p.connectivityMutation||p.automaticExternalAction||p.authorityGranted)missing.push(k+"-boundary");
 }
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Availability / geosocial fabric qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:11,uptime:true,downtime:true,online:true,offline:true,society:true,national:true,
  international:true,continental:true,country:true,city:true,province:true,nationalNetworkReused:true,internationalNetworkReused:true,
  uptimeDistinctFromOnline:true,downtimeDistinctFromOffline:true,governmentAuthority:false,jurisdictionAuthority:false,
  authorityAmplification:false,missing:0});
}
globalThis.TF_AVAILABILITY_GEOSOCIAL_SYSTEMS_V36344=TF_AVAILABILITY_GEOSOCIAL_SYSTEMS_V36344;
globalThis.TF_AVAILABILITY_GEOSOCIAL_RELATIONSHIPS_V36344=TF_AVAILABILITY_GEOSOCIAL_RELATIONSHIPS_V36344;
globalThis.tfAvailabilityGeoSocialContextV36344=tfAvailabilityGeoSocialContextV36344;
 return Object.freeze({TF_AVAILABILITY_GEOSOCIAL_SYSTEMS_V36344,TF_AVAILABILITY_GEOSOCIAL_RELATIONSHIPS_V36344,tfAvailabilityGeoSocialContextV36344,tfAvailabilityGeoSocialSelfTestV36344});
}
module.exports=Object.freeze({bindAvailabilityV04538,bindAvailabilityGeoSocialV04584});

/* Terraformer v0.47.99: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfAvailabilityV4057({subjectId="",scope="system",state="UNKNOWN",start=null,end=null,
 condition=null,source="unknown",observedAt=null,freshUntil=null,context=null}={}){
 if(!subjectId)throw new TypeError("subjectId required");
 if(!TF_AVAILABILITY_V4057.scopes.includes(scope))throw new RangeError("scope");
 if(!TF_AVAILABILITY_V4057.states.includes(state))throw new RangeError("state");
 if(start&&end&&Date.parse(start)>Date.parse(end))throw new RangeError("interval");
 return Object.freeze({subjectId:String(subjectId),scope,state,start,end,
  condition:condition==null?null:String(condition),source:String(source),
  observedAt,freshUntil,context:context==null?null:String(context),
  authority:false,consent:false,presence:false,identity:false});
}

function tfPersonAvailabilityV4057(personId,details={}){
 const r=tfAvailabilityV4057({...details,subjectId:personId,scope:"person"});
 return Object.freeze({...r,system:"system.person-availability",
  privateContextDisclosed:false,contactAuthorized:false,assignmentAuthorized:false});
}


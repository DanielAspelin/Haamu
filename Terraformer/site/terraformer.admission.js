"use strict";
/* Candidate physicalization from explicit pre-existing System definition evidence. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.admission",concept:"Admission",
 typeOf:"system.candidate",origin:"terraformer.entities.json",transition:"REVERSE_NATURALIZATION",
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.47.99: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfAdmissionDecisionV4034({request=null,policy=false,authorization=false,permission=false,scope="",
 resourceClass="",provenance="",protectedExternal=false}={}){
 const missing=[];
 if(!request)missing.push("request"); if(!policy)missing.push("policy"); if(!authorization)missing.push("authorization");
 if(!permission)missing.push("permission"); if(!scope)missing.push("scope"); if(!resourceClass)missing.push("resource-class");
 if(!provenance)missing.push("provenance");
 const decision=missing.length?"DENY":"ADMIT";
 return Object.freeze({system:"system.admission",worker:"system.admitter",decision,missing:Object.freeze(missing),
  protectedExternal:Boolean(protectedExternal),grantsAuthority:false,executes:false,qualifies:false});
}

function tfExternalResourceAdmissionV4034({url="",access="PUBLIC",request=null,policy=false,authorization=false,
 permission=false,scope="",provenance=""}={}){
 if(!/^https?:\/\//i.test(String(url)))return Object.freeze({decision:"DENY",reason:"invalid-external-resource"});
 const protectedExternal=!["PUBLIC","PUBLIC_NO_REGISTRATION"].includes(String(access));
 const d=tfAdmissionDecisionV4034({request,policy,authorization,permission,scope,
  resourceClass:protectedExternal?"protected-external":"public-external",provenance,protectedExternal});
 return Object.freeze({...d,url:String(url),access:String(access),mayFetch:d.decision==="ADMIT",
  credentialsRequired:protectedExternal,credentialsProvided:false});
}

function tfAdmissionSelfTestV4034(){const f=[];
 const denied=tfAdmissionDecisionV4034({request:{},policy:true,authorization:false,permission:true,scope:"x",
  resourceClass:"protected-external",provenance:"registry"});
 if(denied.decision!=="DENY")f.push("default-deny");
 const admitted=tfExternalResourceAdmissionV4034({url:"https://example.invalid/",access:"PUBLIC",request:{},
  policy:true,authorization:true,permission:true,scope:"read",provenance:"registry"});
 if(admitted.decision!=="ADMIT"||!admitted.mayFetch||admitted.grantsAuthority)f.push("public");
 const protectedPlan=tfExternalResourceAdmissionV4034({url:"https://example.invalid/private",access:"CERTIFICATE_AND_API_KEY",
  request:{},policy:true,authorization:true,permission:true,scope:"read",provenance:"registry"});
 if(!protectedPlan.credentialsRequired||protectedPlan.credentialsProvided)f.push("credentials");
 if(TF_ADMISSION_SYSTEM_V4034.authorityGranted)f.push("authority");
 if(f.length)throw Error("Admission qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.34",admission:true,admitter:true,protectedExternal:true,defaultDeny:true});}

/* Terraformer v0.48.3: async-context-preserving migration from temporary. */
async function tfCompleteOsAdmission(){const r=await tfRequestPrivilege('terraformer-session-admission',{purpose:'first-entry-operating-system-authentication'});if(!r||r.state!=='AUTHORIZED_RESUME_SINGLE_USE')return {authenticated:false,state:'OS_AUTH_DENIED',mechanism:r?.mechanism||null};TF_INTERNAL_SESSION_STATE.osAuthenticated=true;TF_INTERNAL_SESSION_STATE.osAuthenticatedAt=new Date().toISOString();if(!TERRAFORMER_ACCESS.admitted){tfPreservePermanentTokenForCanonicalRuntime();const token=tfAutoAdmitPermanentToken();if(!token.admitted){TF_INTERNAL_SESSION_STATE.osAuthenticated=false;return {authenticated:false,state:'TOKEN_VALIDATION_FAILED',mechanism:r.mechanism||null}}}const session=tfEstablishInternalSession();TF_ENTRY_FLOW.stage='TELEGRAM_ACCESS';tfHomeDiscoveryAfterAdmission();return {authenticated:true,state:'TELEGRAM_ACCESS',sessionEstablished:!!session,presentationPort:9966,credentialCustody:false};}

function tfSandboxAdmissionV36451(owner,{requested=false,purpose="",controller=false,qualified=false,version="0.36.451",transversion="tv0.36.451"}={}){const box=tfSystemSandboxV36451(owner,{version,transversion}),why=String(purpose||"").trim();const gates=Object.freeze({requested:Boolean(requested),purpose:Boolean(why),controller:Boolean(controller),qualification:Boolean(qualified),version:Boolean(box.version),transversion:Boolean(box.transversion)});const admitted=Object.values(gates).every(Boolean);return Object.freeze({...box,purpose:why||null,gates,admitted,state:admitted?"sandbox-admitted":"sandbox-isolated",...TF_SANDBOX_BOUNDARY_V36451});}

function tfContentAdmissionV377(kind,{requested=false,operation="",controller=false,sandbox=false,qualified=false}={}){
 const d=tfContentDescriptorV377(kind),op=String(operation||"").trim(),gates=Object.freeze({requested:Boolean(requested),operation:Boolean(op),controller:Boolean(controller),sandbox:Boolean(sandbox),qualification:Boolean(qualified)});
 const admitted=Object.values(gates).every(Boolean);return Object.freeze({system:d.id,worker:d.worker,operation:op||null,gates,admitted,state:admitted?"content-operation-admitted":"content-operation-blocked",...TF_CONTENT_BOUNDARY_V377});
}

function tfReadWriteAdmissionV378(kind,{requested=false,operation="",controller=false,sandbox=false,qualified=false,contentType=""}={}){
 const d=tfReadWriteDescriptorV378(kind),op=String(operation||"").trim(),ct=String(contentType||"").trim();
 const gates=Object.freeze({requested:Boolean(requested),operation:Boolean(op),contentType:Boolean(ct),controller:Boolean(controller),sandbox:Boolean(sandbox),qualification:Boolean(qualified)});
 const admitted=Object.values(gates).every(Boolean);
 return Object.freeze({system:d.id,worker:d.worker,operation:op||null,contentType:ct||null,gates,admitted,state:admitted?(d.id==="system.writing"?"writing-admitted":"reading-admitted"):"read-write-blocked",...TF_READ_WRITE_BOUNDARY_V378});
}

/* Terraformer v0.48.4: bridge-covered cross-owner migration. */
function tfDataQueryAdmissionV391(kind,{requested=false,statement="",operation="query",policy=false,authorization=false,permission=false,controller=false,sandbox=false,validated=false,qualified=false,transaction=false}={}){
 const d=tfDataQueryDescriptorV391(kind),op=String(operation||"query"),stmt=String(statement||"").trim(),
  mutation=["insert","update","delete","write","mutate","ddl"].includes(op.toLowerCase());
 const gates={requested:Boolean(requested),statement:Boolean(stmt),policy:Boolean(policy),authorization:Boolean(authorization),
  permission:Boolean(permission),controller:Boolean(controller),sandbox:Boolean(sandbox),validation:Boolean(validated),
  qualification:Boolean(qualified)};
 if(mutation)gates.transaction=Boolean(transaction);
 const admitted=Object.values(gates).every(Boolean);
 return Object.freeze({system:d.id,worker:d.worker,operation:op,mutation,statement:stmt||null,
  gates:Object.freeze(gates),admitted,state:admitted?"data-query-admitted":"data-query-blocked",authorityAmplification:false});
}

function tfGitActionAdmissionV393(kind,{action="",confirmed=false,approved=false,transaction=false,transactionAdmitted=false,readOnly=false,policy=false,authorization=false,permission=false,controller=false,sandbox=false,validated=false,qualified=false}={}){
 const d=tfGitFederationDescriptorV393(kind),actionGate=tfActionTransactionGateV393({action,confirmed,approved,transaction,transactionAdmitted,readOnly});
 const governance=Boolean(policy&&authorization&&permission&&controller&&sandbox&&validated&&qualified);
 const admitted=governance&&actionGate.admitted;
 return Object.freeze({system:d.id,worker:d.worker,foundation:d.foundation,governance,actionGate,admitted,
  state:admitted?"git-action-admitted":"git-action-blocked",externalEffect:Boolean(!readOnly),authorityAmplification:false});
}

function tfVarianceAdmissionV394({systemId="",scope="",change=null,confirmed=false,approved=false,transaction=false,transactionAdmitted=false,invariantsPreserved=false,validated=false,qualified=false}={}){
 const id=tfNormalizeSystemIdentityV381(systemId),action=tfActionTransactionGateV393({action:"variance:"+String(scope||""),confirmed,approved,transaction,transactionAdmitted,readOnly:false});
 const admitted=Boolean(id&&scope&&change!==null&&invariantsPreserved&&validated&&qualified&&action.admitted);
 return Object.freeze({system:"system.variancy",worker:"system.variancer",owner:id||null,scope:String(scope||"")||null,
  change,invariantsPreserved:Boolean(invariantsPreserved),actionGate:action,validated:Boolean(validated),qualified:Boolean(qualified),
  admitted,state:admitted?"variance-admitted":"variance-blocked",invariantOverride:false});
}

function tfInvariantAdmissionV394({systemId="",name="",value=null,changeExisting=false,explicitTransversion=false,validated=false,qualified=false}={}){
 const id=tfNormalizeSystemIdentityV381(systemId),requiresTransversion=Boolean(changeExisting);
 const admitted=Boolean(id&&name&&value!==null&&validated&&qualified&&(!requiresTransversion||explicitTransversion));
 return Object.freeze({system:"system.invariancy",worker:"system.invariancer",owner:id||null,name:String(name||"")||null,value,
  changeExisting:requiresTransversion,explicitTransversion:Boolean(explicitTransversion),validated:Boolean(validated),
  qualified:Boolean(qualified),admitted,state:admitted?"invariant-admitted":"invariant-blocked"});
}

function tfAddressSpacingAdmissionV401({operation="",context=null,confirmed=false,approved=false,transaction=false,transactionAdmitted=false,readOnly=false,policy=false,authorization=false,permission=false,controller=false,sandbox=false,validated=false,qualified=false}={}){
 const op=String(operation||"").trim(),gate=tfActionTransactionGateV393({action:"address-spacing:"+op,confirmed,approved,transaction,transactionAdmitted,readOnly});
 const contextValid=Boolean(context&&context.system==="system.address-spacing-context"&&context.space&&context.address&&context.owner);
 const governance=Boolean(policy&&authorization&&permission&&controller&&sandbox&&validated&&qualified),admitted=Boolean(op&&contextValid&&governance&&gate.admitted);
 return Object.freeze({system:"system.address-spacing-context",operation:op||null,contextValid,governance,actionGate:gate,admitted,
  state:admitted?"address-spacing-admitted":"address-spacing-blocked"});
}

function tfLocatorMutationAdmissionV403({action="",confirmed=false,approved=false,transaction=false,transactionAdmitted=false,policy=false,authorization=false,permission=false,controller=false,sandbox=false,validated=false,qualified=false}={}){
 const gate=tfActionTransactionGateV393({action:"locator:"+String(action||""),confirmed,approved,transaction,transactionAdmitted,readOnly:false});
 const governance=Boolean(policy&&authorization&&permission&&controller&&sandbox&&validated&&qualified),admitted=Boolean(action&&governance&&gate.admitted);
 return Object.freeze({system:"system.locator",worker:"system.locator-worker",governance,actionGate:gate,admitted,
  state:admitted?"locator-mutation-admitted":"locator-mutation-blocked"});
}

function tfHealthActionAdmissionV404({domain="",action="",confirmed=false,approved=false,transaction=false,transactionAdmitted=false,readOnly=false,
 policy=false,authorization=false,permission=false,controller=false,sandbox=false,validated=false,qualified=false,auditable=false,
 privacyBoundary=false,consentBoundary=false,externalClinicalAuthority=false,clinicalAction=false}={}){
 const d=tfHealthDomainDescriptorV404(domain);
 const gate=tfActionTransactionGateV393({action:"health:"+String(action||""),confirmed,approved,transaction,transactionAdmitted,readOnly});
 const governance=Boolean(policy&&authorization&&permission&&controller&&sandbox&&validated&&qualified&&auditable&&privacyBoundary&&consentBoundary);
 const clinicalOK=!clinicalAction||Boolean(externalClinicalAuthority);
 const admitted=Boolean(action&&governance&&clinicalOK&&gate.admitted);
 return Object.freeze({domain:d.id,action:String(action||"")||null,governance,clinicalAction:Boolean(clinicalAction),
  externalClinicalAuthority:Boolean(externalClinicalAuthority),clinicalAuthoritySatisfied:clinicalOK,actionGate:gate,admitted,
  state:admitted?"health-action-admitted":"health-action-blocked"});
}

function tfSignalActionAdmissionV406({signal=null,action="",confirmed=false,approved=false,transaction=false,transactionAdmitted=false,
 readOnly=false,policy=false,authorization=false,permission=false,controller=false,sandbox=false,validated=false,qualified=false,auditable=false}={}){
 if(!signal||!signal.owner||!signal.kind)throw new TypeError("signal required");
 const gate=tfActionTransactionGateV393({action:"signal:"+String(action||""),confirmed,approved,transaction,transactionAdmitted,readOnly});
 const governance=Boolean(policy&&authorization&&permission&&controller&&sandbox&&validated&&qualified&&auditable);
 const admitted=Boolean(action&&governance&&gate.admitted);
 return Object.freeze({owner:signal.owner,kind:signal.kind,action:String(action||"")||null,governance,actionGate:gate,
  admitted,state:admitted?"signal-action-admitted":"signal-action-blocked",authorityGranted:false});
}


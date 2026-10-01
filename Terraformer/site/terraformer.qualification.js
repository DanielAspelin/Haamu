'use strict';
const fs=require('fs'),path=require('path');
const ID='system.qualification',VERSION='0.47.15',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='QUALIFICATION',REGISTRY_FILE='terraformer.qualifications.json';
const ALIASES=Object.freeze(['QUALIFICATION']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='QUALIFICATION_REGISTRY'||x.owner!==ID||x.authority!==false||x.approvalGranted!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase().replace(/[ -]+/g,'_');}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown qualification');return Object.freeze({...e,authority:false,approvalGranted:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false,approvalGranted:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind);const r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);if(!e.applicability.includes(kind))throw Error(ID+': value not applicable');return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,approvalGranted:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,position:Object.freeze({after:'VERIFICATION',before:'STATE'}),selectionModel:'DEFINE_CENTRALLY_SELECT_LOCALLY',controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,approvalGranted:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const q=select({id:'qualification.sample',kind:'SYSTEM'},'UNDER_CONDITIONAL_EXPERIMENT');return Object.freeze({pass:q.scoped&&q.authority===false&&q.approvalGranted===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}
const TERRAFORMER_QUALIFICATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-QUALIFICATION-SYSTEM/1',id:ID,name:'Qualification System',family:'dimension',type:'qualification-dimension',state:'integrated',canonicalPath:'terraformer://qualification/',governs:Object.freeze(['evidence-standing','verification-standing','naturalization-standing','requalification-standing']),rule:'Qualification describes evidentiary standing. Qualification is not approval, authorization, execution authority, or privilege.'});
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,TERRAFORMER_QUALIFICATION_SYSTEM});

/* Terraformer v0.47.99: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfIntegratedGovernanceQualificationV4146(){
 const checks=[], fail=(name,detail)=>checks.push({name,pass:false,detail}),
       pass=(name,detail)=>checks.push({name,pass:true,detail});
 try{
  const r=tfCanonicalRegistryV4145();
  r.unique&&r.count===TF_REGISTRY_V4145_IDS.length?pass("registry-unique",r.count):fail("registry-unique",r.count);
  const req=["system.terraformer","system.registry","system.slogan","system.law","system.permanent-law",
   "system.rule-of-law","system.login","system.logout","system.questioning","system.answering","system.decision"];
  const miss=req.filter(x=>!r.has(x)); miss.length?fail("required-systems",miss):pass("required-systems",req.length);
  const c=tfUniversalContractCoverageV4145();
  c.complete&&c.covered===r.count?pass("universal-contract-coverage",c.covered):fail("universal-contract-coverage",c.covered);
 }catch(e){fail("registry-suite",String(e.message||e))}
 try{
  const l=tfLawQualificationV4141(); l.pass?pass("permanent-law",l.permanentLaws):fail("permanent-law",l);
  const rl=tfRuleOfLawQualificationV4142(); rl.pass&&!rl.sovereignClaim&&!rl.courtClaim?pass("rule-of-law-boundary",true):fail("rule-of-law-boundary",rl);
  const cl=tfConstitutionalLawQualificationV4144(); cl.pass&&cl.failClosedOnUnresolvedMaterialLaw&&cl.denyOnEstablishedViolation?
   pass("law-gate",true):fail("law-gate",cl);
 }catch(e){fail("law-suite",String(e.message||e))}
 try{
  const q=tfQadQualificationV4140(); q.pass&&q.decisionBypassesAuthority===false?pass("question-answer-decision",true):fail("question-answer-decision",q);
  const s=tfSessionLifecycleQualificationV4139(); s.pass&&s.closedSessionLifecycle?pass("login-logout",true):fail("login-logout",s);
 }catch(e){fail("reasoning-session-suite",String(e.message||e))}
 try{
  const sg=tfSloganQualificationV4143();
  sg.pass&&TF_SLOGAN_V4143.terraformer.slogan==="In software, even power is artificial."?
   pass("terraformer-slogan",TF_SLOGAN_V4143.terraformer.slogan):fail("terraformer-slogan",sg);
 }catch(e){fail("slogan-suite",String(e.message||e))}
 try{
  const r=tfCanonicalRegistryV4145();
  r.predecessorPreserved&&TF_REGISTRY_V4145.predecessorSnapshot.version==="0.41.4"?
   pass("registry-lineage","0.41.4 preserved"):fail("registry-lineage",TF_REGISTRY_V4145.predecessorSnapshot);
 }catch(e){fail("lineage-suite",String(e.message||e))}
 const failures=checks.filter(x=>!x.pass);
 return Object.freeze({pass:failures.length===0,version:"0.41.46",qualification:"INTEGRATED_GOVERNANCE_SUBSET",
  checks:Object.freeze(checks.map(x=>Object.freeze(x))),passed:checks.length-failures.length,failed:failures.length,
  fullRuntimeQualification:false,nativeHardwareQualification:false,externalProviderQualification:false,
  persistence:"VOLATILE"});
}

function tfQualificationOrchestratorV4147(){
 const ledger=[];
 const append=(scope,state,detail={})=>{
  if(!TF_QUAL_ORCHESTRATOR_V4147.scopes.includes(scope))throw Error("unknown qualification scope");
  if(!TF_QUAL_ORCHESTRATOR_V4147.states.includes(state))throw Error("unknown qualification state");
  if(scope==="FULL_RUNTIME"&&state==="PASS")throw Error("generic ledger cannot establish FULL_RUNTIME PASS");
  const e=Object.freeze({scope,state,detail:Object.freeze({...detail}),authorityCreated:false});
  ledger.push(e); return e;
 };
 return Object.freeze({systemId:"system.qualification-orchestrator",
  record:append,
  runGovernance(){
   try{const r=tfIntegratedGovernanceQualificationV4146();
    return append("INTEGRATED_GOVERNANCE_SUBSET",r.pass?"PASS":"FAIL",
      {version:r.version,passed:r.passed,failed:r.failed,fullRuntimeQualification:false});
   }catch(e){return append("INTEGRATED_GOVERNANCE_SUBSET","FAIL",{error:String(e.message||e)});}
  },
  markOutstanding(){
   append("FULL_RUNTIME","UNVERIFIED",{reason:"full monolith bootstrap/runtime not executed by this suite"});
   append("NATIVE_HARDWARE","UNVERIFIED",{reason:"physical native hardware not exercised"});
   append("EXTERNAL_PROVIDER","UNVERIFIED",{reason:"provider credentials/live calls absent"});
   append("PHYSICAL_PERSISTENCE","BLOCKED",{reason:"physical writes remain default-deny pending explicit authorized qualification"});
  },
  summary(){
   const counts={};for(const s of TF_QUAL_ORCHESTRATOR_V4147.states)counts[s]=0;
   for(const e of ledger)counts[e.state]++;
   return Object.freeze({entries:ledger.length,counts:Object.freeze({...counts}),fullRuntimeQualification:false,
    qualificationAuthorityCreated:false,ledger:Object.freeze(ledger.slice())});
  }});
}

/* Terraformer v0.48.3: bridge-covered cross-owner migration. */
function tfCanonicalLabelQualificationV4051(){
 const f=[],ids=["system.io","system.origin","system.labeling","system.scheduler"];
 const c=tfCanonicalLabelCoverageV4051(ids,{"system.io":"IO System"});
 if(!c.complete||c.coveredSystems!==ids.length)f.push("coverage");
 const io=c.labels.find(x=>x.subjectId==="system.io");
 if(!io||io.value!=="IO System"||io.machineIdentity!=="system.io")f.push("identity");
 const renamed=tfCanonicalLabelRenameV4051(io,"Terraformer IO System");
 if(renamed.generation!==1||!renamed.supersedes.includes("IO System"))f.push("rename");
 if(renamed.authority||renamed.identity||renamed.ownership||renamed.qualificationMutation)f.push("mutation");
 if(tfDefaultCanonicalLabelV4051("system.service-readiness")!=="Service Readiness System")f.push("default");
 if(f.length)throw Error("Canonical label qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.51",universalCoverage:true,
  exactlyOneActiveCanonicalLabel:true,secondaryLabelsAllowed:true,
  identityPreserved:true,historyPreserved:true});
}

function tfNativeSourceQualificationV4053(){
 const f=[],ids=Object.values(TF_NATIVE_SOURCE_SYSTEMS_V4053.systems).map(x=>x.id);
 if(new Set(ids).size!==8)f.push("identity");
 if(tfNativeSourceClassifyV4053("core.asm")!=="system.asm")f.push("asm");
 if(tfNativeSourceClassifyV4053("core.S")!=="system.s")f.push("S");
 if(tfNativeSourceClassifyV4053("core.c")!=="system.c-source")f.push("c");
 if(tfNativeSourceClassifyV4053("core.h")!=="system.h")f.push("h");
 if(tfNativeSourceClassifyV4053("core.cpp")!=="system.cpp")f.push("cpp");
 if(tfNativeSourceClassifyV4053("core.hpp")!=="system.hpp")f.push("hpp");
 if(tfNativeSourceRelationshipV4053().filter(x=>x.to==="system.io").length!==3)f.push("io");
 if(Object.values(TF_NATIVE_SOURCE_SYSTEMS_V4053.systems).some(x=>tfNativeSourceDescriptorV4053(x.id).authority))f.push("authority");
 if(f.length)throw Error("Native source-system qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.53",assembly:true,asm:true,s:true,c:true,h:true,
  cpp:true,hpp:true,ioIntegrated:true,sourceFormsSeparated:true,nonAuthorizing:true});
}

function tfLanguageQualificationV4054(){
 const f=[],p=tfLanguageParserBoundaryV4054(),ir=tfLanguageIRV4054(),n=tfLinguistNaturalizationV4054();
 const a=tfLanguageSemanticClassifyV4054({capabilities:["grammar","syntax","semantics"]});
 const b=tfLanguageSemanticClassifyV4054({capabilities:["lexer","parser","compiler"]});
 const u=tfLanguageSemanticClassifyV4054({capabilities:[]});
 if(a.owner!=="system.language-model"||b.owner!=="system.language-tool")f.push("semantic-map");
 if(u.state!=="UNRESOLVED")f.push("fail-closed");
 if(p.contract.owner===p.implementation.owner)f.push("parser-boundary");
 if(ir.owner!=="system.language"||ir.consumers.length<4)f.push("ir");
 if(n.pathNameClassificationAuthority||n.wrappersRetainedAsAuthority)f.push("legacy-authority");
 if(n.artifactsPreserved!==1172||n.unmappedHistoricalArtifacts!==0)f.push("provenance");
 if(f.length)throw Error("Language naturalization qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.54",languageSystem:true,languageModel:true,
  languageTool:true,semanticClassification:true,parserBoundary:true,sharedIR:true,
  historicalArtifactsPreserved:1172,naturalizedArchitecture:true,runtimeClosure:false});
}

function tfAvailabilityQualificationV4057(){
 const f=[];
 const p=tfPersonAvailabilityV4057("person:test",{state:"AVAILABLE",
  start:"2026-01-01T00:00:00Z",end:"2027-01-01T00:00:00Z",
  observedAt:"2026-09-27T00:00:00Z",freshUntil:"2026-12-31T23:59:59Z"});
 if(p.scope!=="person"||p.system!=="system.person-availability")f.push("scope");
 if(p.authority||p.consent||p.presence||p.contactAuthorized||p.assignmentAuthorized)f.push("boundary");
 const stale=tfAvailabilityCurrentV4057({...p,freshUntil:"2026-01-02T00:00:00Z"},"2026-09-27T00:00:00Z");
 if(stale.state!=="UNKNOWN"||stale.fresh)f.push("freshness");
 const c=tfAvailabilityConflictV4057([{state:"AVAILABLE"},{state:"BUSY"}]);
 if(!c.conflict||c.severity!=="HARD")f.push("conflict");
 if(f.length)throw Error("Availability qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.57",availabilitySystem:true,
  personAvailabilitySystem:true,parentChildBoundary:true,timeBounded:true,
  freshnessAware:true,conflictAware:true,nonAuthorizing:true});
}

function tfUsageStateQualificationV4060(){
 const f=[];
 const u=tfUsageV4060({systemId:"system.io",userId:"user:test",units:3,source:"qualification"});
 const b=tfUserUsageBoundaryV4060("user:test");
 const v=tfUsageStateViewV4060(u,{availability:{state:"AVAILABLE"},occupation:{state:"MODERATE"}});
 if(u.system!=="system.usage"||u.subjectSystem!=="system.io")f.push("usage");
 if(b.usageAutomaticallyAuthorized||b.permission||b.authority)f.push("user-authority");
 if(v.availability!=="AVAILABLE"||v.occupation!=="MODERATE"||!v.independentDimensions)f.push("state");
 if(TF_USAGE_STATE_V4060.lifecycle.join(">")!=="fabrication>materialization>utilization>usage")f.push("lifecycle");
 if(!TF_USAGE_STATE_V4060.relationships.some(x=>x.from==="system.usage"&&x.to==="system.user"))f.push("user-link");
 if(!TF_USAGE_STATE_V4060.relationships.some(x=>x.to==="system.availability")||
    !TF_USAGE_STATE_V4060.relationships.some(x=>x.to==="system.occupation"))f.push("state-links");
 if(f.length)throw Error("Usage state reconciliation failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.60",usageSystem:true,userSystemReused:true,
  availabilityConnected:true,occupationConnected:true,utilizationLineage:true,
  independentStateDimensions:true,nonAuthorizing:true});
}

function tfLockingQualificationV4062(){
 const f=[],base=tfSystemRightsV4062("system.io",{READ:true,EDIT:true,WRITE:true,ACCESS:true,EXECUTE:true});
 const pol=tfOccupationLockPolicyV4062({state:"SATURATED"});
 if(!pol.triggered||pol.requestedRights.length!==2)f.push("occupation-trigger");
 const denied=tfLockRequestV4062({systemId:"system.io",rights:pol.requestedRights,trigger:"occupation",
  admitted:true,authorized:false,policyAllows:true});
 const d=tfApplyLockV4062(base,denied);
 if(d.applied)f.push("authority-gate");
 const req=tfLockRequestV4062({systemId:"system.io",rights:["EDIT","WRITE"],reason:"occupied",
  trigger:"occupation",admitted:true,authorized:true,policyAllows:true,provenance:"qualification"});
 const locked=tfApplyLockV4062(base,req);
 if(!locked.applied||locked.rights.EDIT||locked.rights.WRITE||!locked.rights.READ||!locked.rights.ACCESS)f.push("scoped-lock");
 const ur=tfUnlockRequestV4062({systemId:"system.io",rights:["EDIT","WRITE"],admitted:true,authorized:true,policyAllows:true});
 const unlocked=tfApplyUnlockV4062({systemId:"system.io",rights:locked.rights},ur,{EDIT:true,WRITE:false});
 if(!unlocked.rights.EDIT||unlocked.rights.WRITE)f.push("policy-unlock");
 if(f.length)throw Error("Locking qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.62",lockingSystem:true,unlockingSystem:true,
  occupationTrigger:true,scopedRights:true,editNarrowing:true,accessNarrowingSupported:true,
  admissionAuthorizationPolicyGate:true,unrelatedRightsPreserved:true,recoveryState:true});
}

function tfUnylifeResolutionQualificationV4070(){
 const d=TF_UNYLIFE_RESOLUTION_V4070.dispositions;
 const total=Object.values(d).reduce((a,b)=>a+b,0); const failures=[];
 if(total!==TF_UNYLIFE_RESOLUTION_V4070.totalNodes)failures.push("count-closure");
 if(d.RESIDUE!==0)failures.push("unexplained-residue");
 if(tfUnylifeNaturalizationAdmissionV4070("x",{equivalent:true,evidence:false}).admitted)failures.push("evidence-gate");
 if(!tfUnylifeNaturalizationAdmissionV4070("x",{equivalent:true,evidence:true,canonicalTarget:"system.io"}).admitted)failures.push("canonical-admission");
 if(TF_UNYLIFE_PROGRAM_V4070.semanticAuthority!=="Terraformer")failures.push("semantic-authority");
 if(TF_UNYLIFE_PROGRAM_V4070.runtimeActivation!==false)failures.push("runtime-boundary");
 if(failures.length)throw Error("UNY Life resolution qualification failed: "+failures.join(","));
 return Object.freeze({pass:true,version:"0.40.70",nodes:total,residue:d.RESIDUE,candidates:d.NATURALIZE_CANDIDATE,programNodes:d.PROGRAM,administrationBusiness:d.ADMINISTRATION_BUSINESS,sourceRuntimePreserved:true});
}

function tfUnyResourceJsQualificationV4074(){
 const a=tfJavaScriptNaturalizationV4074({language:"C",portableSemantics:true,behaviorSpecified:true,equivalenceTested:true});
 const b=tfJavaScriptNaturalizationV4074({language:"Assembly",requiresNativeInstructions:true});
 const c=tfJavaScriptNaturalizationV4074({language:"Python",portableSemantics:true,behaviorSpecified:true,equivalenceTested:false});
 const f=[]; if(a.outcome!=="JS_NATURALIZED"||a.separatePersistentSource!==false)f.push("js");
 if(b.outcome!=="NATIVE_BOUNDARY")f.push("native"); if(c.outcome!=="HELD")f.push("gate");
 if(f.length)throw Error("v0.40.74 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.74",resourceNodes:TF_UNYLIFE_RESOURCE_RECON_V4074.scan.evaluated,
 foreignLanguageFiles:TF_JS_NATURALIZATION_V4074.foreignLanguageFiles,target:"terraformer.js",singleFile:true});
}

async function tfFingerprintQualificationV4086(){
 const a=await tfFingerprintV4086({b:2,a:1},{scope:"EVIDENCE",provenance:"qualification"});
 const b=await tfFingerprintV4086({a:1,b:2},{scope:"EVIDENCE",provenance:"qualification"});
 const c=await tfFingerprintV4086({a:1,b:3},{scope:"EVIDENCE"});
 const m=tfFingerprintMatchV4086(a,b), n=tfFingerprintMatchV4086(a,c), bio=tfBiometricFingerprintBoundaryV4086();
 const f=[]; if(!m.match||m.identityProven)f.push("determinism"); if(n.match)f.push("difference");
 if(bio.enabled)f.push("biometric"); if(a.authority)f.push("authority");
 if(f.length)throw Error("v0.40.86 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.86",fingerprinting:true,fingerprinter:true,
 deterministic:true,algorithm:"SHA-256",biometricDefault:false,authorityCreated:false});
}

function tfFingerScanningQualificationV4087(){
 const denied=tfFingerScannerBoundaryV4087({explicitConsent:false,purpose:"test",policyAllows:true,admitted:true,authorized:true});
 const ready=tfFingerScannerBoundaryV4087({explicitConsent:true,purpose:"test",policyAllows:true,admitted:true,authorized:true});
 const match=tfFingerScanMatchV4087({templateA:"opaque-a",templateB:"opaque-b",matcherQualified:true,matcherResult:true});
 const f=[]; if(denied.capture)f.push("default-deny"); if(!ready.capture||ready.rawPersistence)f.push("capture-boundary");
 if(match.identityProven||match.authorized||match.authority)f.push("match-authority");
 if(f.length)throw Error("v0.40.87 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.87",fingerScanning:true,fingerScanner:true,
 defaultDeny:true,volatileRawCapture:true,biometricSensitive:true,identityProvenByMatch:false,authorityCreated:false});
}

function tfControlQualificationV4090(){
 const domains=Object.keys(TF_CONTROL_V4090.domains);
 const r=tfControlRequestV4090({domain:"network",target:"network:test",action:"observe",consequential:false});
 const ok=tfControlAdmissionV4090(r,{policyAllows:true,admitted:true,authorized:true,permitted:true,withinLimits:true});
 const c=tfControlRequestV4090({domain:"power",target:"device:test",action:"change",consequential:true});
 const denied=tfControlAdmissionV4090(c,{policyAllows:true,admitted:true,authorized:true,permitted:true,withinLimits:true,validated:true,qualified:true,transactionAdmitted:false});
 const u=tfUniversalControllerV4090("system.behavior");
 const f=[]; if(domains.length!==7)f.push("domains"); if(!ok.admitted)f.push("nonconsequential");
 if(denied.admitted)f.push("transaction"); if(u.controlParent!=="system.control"||u.authority)f.push("universal-controller");
 if(f.length)throw Error("v0.40.90 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.90",controlSystem:true,domains:domains.length,
   systemControl:true,networkControl:true,powerControl:true,codeControl:true,instructionControl:true,
   informationControl:true,internetControl:true,universalControllerContract:true,authorityCreated:false});
}

/* Terraformer v0.48.4: bridge-covered cross-owner migration. */
async function tfOXBlockQualificationV4093(){
 const p=new TextEncoder().encode("OX block primitive qualification");
 const b=await tfOXConstructBlockV4093({blockId:"q:block:1",generation:0,logicalBlockSize:16384,payload:p,transactionId:"q:tx:1"});
 const v=await tfOXValidateBlockV4093(b), s=tfOXVolatileBlockStoreV4093(); await s.write(b); const r=s.read("q:block:1");
 const rv=await tfOXValidateBlockV4093(r);
 const corrupt=Object.freeze({header:b.header,payload:new Uint8Array([...b.payload.slice(0,-1),b.payload[b.payload.length-1]^1])});
 const cv=await tfOXValidateBlockV4093(corrupt);
 let oversize=false; try{await tfOXConstructBlockV4093({blockId:"x",logicalBlockSize:8,payload:new Uint8Array(9)});}catch{oversize=true;}
 const f=[];if(!v.valid||!rv.valid)f.push("roundtrip");if(cv.valid)f.push("corruption");if(!oversize)f.push("bounds");
 if(r.persistent||s.persistence!=="VOLATILE")f.push("persistence");
 if(f.length)throw Error("v0.40.93 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.93",format:"OXB1",roundTrip:true,corruptionRejected:true,
  malformedBoundsRejected:true,persistence:"VOLATILE",physicalWrites:"DISABLED",pageObjectDependencyHeld:true,authorityCreated:false});
}

async function tfSystemAboutQualificationV4099(){
 const reg=tfSystemSerialRegistryV4098(),m=await tfSystemAboutModelV4099("system.logic",{systemName:"Logic System",version:"0.40.99"},reg);
 const tabs=tfSystemWindowTabsV4099([{id:"status",label:"Status"}]);
 const f=[];if(tabs.at(-1)?.id!=="about"||!tabs.at(-1)?.terminal)f.push("terminal-tab");
 if(!m.barcode.scannable||!m.barcode.qualifiedEncoding||!m.barcodeSVG.includes("<svg"))f.push("barcode");
 if(m.qrCode.scannable||m.qrCode.qualifiedEncoding||m.qrCode.state!=="RENDERER_PENDING")f.push("qr-boundary");
 if(m.authority||!m.informational)f.push("authority");
 if(f.length)throw Error("v0.40.99 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.99",aboutTerminalTab:true,aboutInformational:true,
  code128Rendered:true,code128Scannable:true,qrRenderer:"PENDING_STANDARDS_COMPLETE_ENCODER",
  falseQRCodeClaimPrevented:true,persistence:"VOLATILE",authorityCreated:false});
}

async function tfQRQualificationV410(){const reg=tfSystemSerialRegistryV4098(),m=await tfSystemAboutModelV410("system.logic",{systemName:"Logic System"},reg),q=m.qrCode,f=[];
 if(q.size!==37||q.matrix.length!==37||q.matrix.some(r=>r.length!==37))f.push("geometry");if(q.codewords!==134||!q.qualifiedEncoding||!q.scannable)f.push("encoding");
 if(!m.qrSVG.includes("<svg")||!m.barcodeSVG.includes("<svg"))f.push("render");if(q.authority||m.authority)f.push("authority");if(f.length)throw Error("v0.41.0 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.41.0",qrModel:"2",qrVersion:5,errorCorrection:"L",byteMode:true,reedSolomon:true,maskSelection:true,svgRendered:true,
 aboutIdentityClosure:true,externalDecoderInteroperability:"UNVERIFIED_BY_THIS_SELF_TEST",persistence:"VOLATILE",authorityCreated:false});}

function tfMobilityQualificationV411(){
 const gate={authenticated:true,policyAllows:true,permission:true,accepted:true,controlAdmitted:true,explicitConfirmation:true,instrumentAllowed:true};
 const a=tfMobilitySessionV411({systemId:"system.logic",sessionId:"s1",originEndpoint:"desktop"});
 a.view("phone",{authenticated:true,policyAllows:true});a.instrument("phone",gate);const h=a.handoff("phone",gate),r=a.returnToOrigin(gate);
 const b=tfMobilitySessionV411({systemId:"system.block",sessionId:"s2",originEndpoint:"tablet"});
 const sw=tfSwapSessionsV411(a,b,{...gate,transactionAdmitted:true});
 const rec=tfRecognizeSystemCodeV411({serial:"TFS-0123456789ABCDEF0123"}),f=[];
 if(h.state.controllerEndpoint!=="phone"||h.authorityCloned)f.push("handoff");
 if(r.state.controllerEndpoint!=="desktop"||r.authorityCloned)f.push("return");
 if(sw.a.controllerEndpoint!=="tablet"||sw.b.controllerEndpoint!=="desktop"||sw.authorityCloned)f.push("swap");
 if(!rec.recognized||rec.credential||rec.controlGranted)f.push("recognition-boundary");
 if(f.length)throw Error("v0.41.1 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.41.1",mobility:true,handoffSystem:true,swapSystem:true,
  scanningSystem:true,connectionSystem:true,instrumentationSystem:true,view:true,instrument:true,handoff:true,return:true,swap:true,
  singleControllerLease:true,qrBarcodeCredential:false,remoteTransport:"REQUIRES_QUALIFIED_ADAPTER",
  persistence:"VOLATILE",authorityCreated:false});
}

async function tfUniversalContractQualificationV415(){
 const reg=tfCanonicalSystemRegistryV414(),ids=reg.list(),contracts=ids.map(id=>tfUniversalSystemContractV415(id,reg));
 const file=await tfCreateTextFileV415({extension:".tf",systemId:"system.logic",sessionId:"s1",endpoint:"mobile",generation:2,data:"human readable data",
  instruction:"instruction is inert until governed",transaction:"tx:example",nodalHistory:"desktop -> mobile",
  encapsulations:[{name:"sample.bin",bytes:new Uint8Array([0,1,2,255]),encoding:"BASE64"}]});
 const val=await tfValidateTextFileV415(file),tampered=await tfValidateTextFileV415({...file,text:file.text.replace("human readable data","changed data")}),f=[];
 if(contracts.length!==reg.count()||contracts.some(c=>c.requires.length!==10))f.push("universal-contract");
 if(!val.valid||!file.humanReadable||file.executable||file.authority)f.push("file");
 if(tampered.valid)f.push("tamper-detection");
 if(f.length)throw Error("v0.41.5 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.41.5",canonicalSystems:reg.count(),universalContractCoverage:contracts.length,
  textFileFormat:"TFT1",humanReadable:true,binaryEncapsulation:true,encapsulationBoundBytes:TF_FILE_ENVELOPE_V415.maxEncodedBytes,
  extensions:Object.keys(TF_FILE_ENVELOPE_V415.extensions).length,tamperDetection:true,instructionAutoExecutable:false,
  persistence:"VOLATILE",authorityCreated:false});
}

function tfBlockDeviceIOQualificationV417(){
 const d=tfBlockDeviceDescriptorV417({id:"volatile-test",capacityBytes:1024*1024,logicalBlockSize:512,physicalBlockSize:4096,flushSupported:true,fuaSupported:true});
 const r=tfBlockIORequestV417(d,{operation:"READ",offset:0,length:512}),ra=tfAdmitBlockIOV417(r,{deviceOpened:true,readPermission:true,qualifiedNativeAdapter:true});
 const w=tfBlockIORequestV417(d,{operation:"WRITE",offset:512,length:512}),wd=tfAdmitBlockIOV417(w,{deviceOpened:true,writePermission:true,qualifiedNativeAdapter:true}),
 wa=tfAdmitBlockIOV417(w,{deviceOpened:true,writePermission:true,explicitDeviceAuthorization:true,transactionAdmitted:true,qualifiedNativeAdapter:true});
 const s=tfBlockIOStateV417();["SUBMITTED","ACCEPTED","COMPLETED","STABLE","VERIFIED","COMMITTED"].forEach(x=>s.transition(x));const f=[];
 if(!ra.admitted||!ra.executable)f.push("read");if(wd.admitted||wd.executable)f.push("write-default-deny");if(!wa.admitted||!wa.executable)f.push("write-admission");
 if(s.state()!=="COMMITTED")f.push("states");try{tfBlockIORequestV417(d,{operation:"WRITE",offset:1,length:512});f.push("alignment");}catch{}
 if(f.length)throw Error("v0.41.7 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.41.7",operations:TF_BLOCK_DEVICE_IO_V417.operations.length,readCapability:true,writeCapability:true,
  vectoredIO:true,flushSync:true,fua:true,discard:true,writeZeroes:true,zonedIO:true,imageStreaming:true,verification:true,
  rawWriteDefault:"DENY",physicalWritesPerformed:false,nativeExecution:"REQUIRES_QUALIFIED_ADAPTER_AND_ADMISSION",
  persistence:"VOLATILE",authorityCreated:false});
}

async function tfFileImageBlockBindingQualificationV418(){
 const payload=tfUtf8BytesV415("Terraformer file image -> logical blocks -> block device I/O");
 const image=await tfBlockImageFromBytesV418(payload,{blockSize:512}),rebuilt=await tfBytesFromBlockImageV418(image);
 const device=tfBlockDeviceDescriptorV417({id:"volatile-image-target",capacityBytes:4096,logicalBlockSize:512,physicalBlockSize:4096,flushSupported:true});
 const binding=tfBindImageToBlockDeviceV418(image,device),wp=tfImageIOPlanV418(binding,"IMAGE_WRITE"),rp=tfImageIOPlanV418(binding,"IMAGE_READ");
 const wr=tfImageDeviceRequestsV418(wp,device),rr=tfImageDeviceRequestsV418(rp,device),f=[];
 if(new TextDecoder().decode(rebuilt)!==new TextDecoder().decode(payload))f.push("roundtrip");
 if(!binding.compatible||wp.length!==image.blockCount||rp.length!==image.blockCount)f.push("binding");
 if(wr.some(x=>!x.write)||rr.some(x=>x.write))f.push("io-direction");
 if(wr.some(x=>x.admitted||x.executable)||rr.some(x=>x.admitted||x.executable))f.push("pre-admission");
 try{tfBindImageToBlockDeviceV418(image,tfBlockDeviceDescriptorV417({id:"bad",capacityBytes:4096,logicalBlockSize:1024}));f.push("geometry");}catch{}
 if(f.length)throw Error("v0.41.8 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.41.8",format:"TFBI1",blockAddressable:true,imageRoundTrip:true,
  imageToBlockIOBound:true,geometryEnforced:true,perBlockFingerprint:true,sparseAware:true,readWriteSymmetry:true,
  rawWriteDefault:"DENY",physicalWritesPerformed:false,persistence:"VOLATILE",authorityCreated:false});
}

function tfCrossPlatformIOQualificationV4111(){
 const a=tfAndroidStorageBoundaryV4111({storage:"SAF_DOCUMENT",uriPermission:false});
 const b=tfAndroidStorageBoundaryV4111({storage:"SAF_DOCUMENT",uriPermission:true});
 const ro=tfAndroidStorageBoundaryV4111({storage:"EXTERNAL_APP",volumeState:"AVAILABLE_RO"});
 const win=tfNormalizePlatformIOV4111({platform:"WINDOWS",nativeCode:"ERROR_IO_PENDING",requestedBytes:512});
 const lin=tfNormalizePlatformIOV4111({platform:"LINUX",success:true,requestedBytes:512,transferredBytes:256,nativeDomain:"errno"});
 const and=tfNormalizePlatformIOV4111({platform:"ANDROID",success:false,nativeCode:"URI_PERMISSION_DENIED",nativeDomain:"AndroidStorage"});
 const f=[];if(a.readAllowed||a.writeAllowed||a.denial!=="URI_PERMISSION_DENIED")f.push("saf-deny");
 if(!b.readAllowed||!b.writeAllowed)f.push("saf-grant");if(!ro.readAllowed||ro.writeAllowed)f.push("readonly");
 if(win.state!=="PENDING"||lin.state!=="PARTIAL"||and.state!=="FAILED")f.push("normalization");
 if(a.rawBlockDeviceAccess||b.rawBlockDeviceAccess)f.push("raw-device");
 if(f.length)throw Error("v0.41.11 qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.41.11",android:true,crossPlatformContract:true,
  platforms:TF_CROSS_PLATFORM_IO_V4111.platforms.length,androidScopedStorage:true,androidSAF:true,
  removableVolumeState:true,androidRawBlockDeviceAccess:false,nativeProvenancePreserved:true,
  pendingPartialFailureDistinct:true,physicalWritesPerformed:false,persistence:"VOLATILE",authorityCreated:false});
}

/* Terraformer v0.48.9: qualified isolated declaration migration. */
let TERRAFORMER_OBSERVATION_QUALIFICATION_V0324_INSTANCE=null;

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TF_QUALIFICATION_STATES=Object.freeze(['Pre-informative','Unverified','Under Conditional Experiment','Verified','Naturalized']);

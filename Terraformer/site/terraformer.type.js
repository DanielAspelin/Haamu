'use strict';
const fs=require('fs'),path=require('path');
const ID='system.type',VERSION='0.44.15',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='TYPE',REGISTRY_FILE='terraformer.types.json';
const ALIASES=Object.freeze(['TYPE']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='TYPE_REGISTRY'||x.owner!==ID||x.authority!==false||!Array.isArray(x.entries))throw Error(ID+': registry mismatch');return x;}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');return value.trim().toUpperCase();}
function resolve(value){const v=normalize(value),r=registry(),e=r.entries.find(x=>x.id===v||(x.aliases||[]).includes(v));if(!e)throw Error(ID+': unknown '+DIMENSION.toLowerCase());return Object.freeze({...e,authority:false});}
function validate(value){const e=resolve(value);return Object.freeze({dimension:DIMENSION,value:e.id,valid:true,authority:false});}
function select(consumer,value){if(!consumer||typeof consumer!=='object'||typeof consumer.id!=='string'||!consumer.id.trim())throw Error(ID+': invalid consumer');const kind=normalize(consumer.kind);const r=registry();if(!r.eligibleConsumers.includes(kind))throw Error(ID+': ineligible consumer');const e=resolve(value);if(!e.applicability.includes(kind))throw Error(ID+': value not applicable');return Object.freeze({consumer:Object.freeze({id:consumer.id,kind}),dimension:DIMENSION,value:e.id,scoped:true,authority:false,mutatesRegistry:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,registry:REGISTRY_FILE,selectionModel:'DEFINE_CENTRALLY_SELECT_LOCALLY',controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){const r=registry(),q=select({id:'qualification.sample',kind:'SYSTEM'},r.entries[0].id);return Object.freeze({pass:q.scoped&&q.authority===false&&!q.mutatesRegistry,id:ID,dimension:DIMENSION});}

function bindOrthogonalDescriptorFabricV04522(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.288: Orthogonal Type / Mode / Condition / State Fabric === */
const TF_OPERATION_LIFECYCLE_BASES_V36288=Object.freeze([Object.freeze({id:"historical-system.invocation",concept:"Invocation",type:"operation-lifecycle-system",mode:"bounded",condition:"admitted",state:"ready"}),Object.freeze({id:"historical-system.loading",concept:"Loading",type:"operation-lifecycle-system",mode:"bounded",condition:"admitted",state:"ready"}),Object.freeze({id:"historical-system.termination",concept:"Termination",type:"operation-lifecycle-system",mode:"bounded",condition:"admitted",state:"ready"})]);
const TF_ORTHOGONAL_DESCRIPTOR_FABRIC_V36288=Object.freeze([Object.freeze({id:"historical-system.data-type",concept:"Data Type",type:"descriptor-system",mode:"descriptive",condition:"data-scope-identified",state:"ready",domain:"historical-system.data",dimension:"type"}),Object.freeze({id:"historical-system.data-mode",concept:"Data Mode",type:"descriptor-system",mode:"descriptive",condition:"data-scope-identified",state:"ready",domain:"historical-system.data",dimension:"mode"}),Object.freeze({id:"historical-system.data-condition",concept:"Data Condition",type:"descriptor-system",mode:"descriptive",condition:"data-scope-identified",state:"ready",domain:"historical-system.data",dimension:"condition"}),Object.freeze({id:"historical-system.data-state",concept:"Data State",type:"descriptor-system",mode:"descriptive",condition:"data-scope-identified",state:"ready",domain:"historical-system.data",dimension:"state"}),Object.freeze({id:"historical-system.invocation-type",concept:"Invocation Type",type:"descriptor-system",mode:"descriptive",condition:"invocation-scope-identified",state:"ready",domain:"historical-system.invocation",dimension:"type"}),Object.freeze({id:"historical-system.invocation-mode",concept:"Invocation Mode",type:"descriptor-system",mode:"descriptive",condition:"invocation-scope-identified",state:"ready",domain:"historical-system.invocation",dimension:"mode"}),Object.freeze({id:"historical-system.invocation-condition",concept:"Invocation Condition",type:"descriptor-system",mode:"descriptive",condition:"invocation-scope-identified",state:"ready",domain:"historical-system.invocation",dimension:"condition"}),Object.freeze({id:"historical-system.invocation-state",concept:"Invocation State",type:"descriptor-system",mode:"descriptive",condition:"invocation-scope-identified",state:"ready",domain:"historical-system.invocation",dimension:"state"}),Object.freeze({id:"historical-system.execution-type",concept:"Execution Type",type:"descriptor-system",mode:"descriptive",condition:"execution-scope-identified",state:"ready",domain:"historical-system.execution",dimension:"type"}),Object.freeze({id:"historical-system.execution-mode",concept:"Execution Mode",type:"descriptor-system",mode:"descriptive",condition:"execution-scope-identified",state:"ready",domain:"historical-system.execution",dimension:"mode"}),Object.freeze({id:"historical-system.execution-condition",concept:"Execution Condition",type:"descriptor-system",mode:"descriptive",condition:"execution-scope-identified",state:"ready",domain:"historical-system.execution",dimension:"condition"}),Object.freeze({id:"historical-system.execution-state",concept:"Execution State",type:"descriptor-system",mode:"descriptive",condition:"execution-scope-identified",state:"ready",domain:"historical-system.execution",dimension:"state"}),Object.freeze({id:"historical-system.loading-type",concept:"Loading Type",type:"descriptor-system",mode:"descriptive",condition:"loading-scope-identified",state:"ready",domain:"historical-system.loading",dimension:"type"}),Object.freeze({id:"historical-system.loading-mode",concept:"Loading Mode",type:"descriptor-system",mode:"descriptive",condition:"loading-scope-identified",state:"ready",domain:"historical-system.loading",dimension:"mode"}),Object.freeze({id:"historical-system.loading-condition",concept:"Loading Condition",type:"descriptor-system",mode:"descriptive",condition:"loading-scope-identified",state:"ready",domain:"historical-system.loading",dimension:"condition"}),Object.freeze({id:"historical-system.loading-state",concept:"Loading State",type:"descriptor-system",mode:"descriptive",condition:"loading-scope-identified",state:"ready",domain:"historical-system.loading",dimension:"state"}),Object.freeze({id:"historical-system.instantiation-type",concept:"Instantiation Type",type:"descriptor-system",mode:"descriptive",condition:"instantiation-scope-identified",state:"ready",domain:"historical-system.instantiation",dimension:"type"}),Object.freeze({id:"historical-system.instantiation-mode",concept:"Instantiation Mode",type:"descriptor-system",mode:"descriptive",condition:"instantiation-scope-identified",state:"ready",domain:"historical-system.instantiation",dimension:"mode"}),Object.freeze({id:"historical-system.instantiation-condition",concept:"Instantiation Condition",type:"descriptor-system",mode:"descriptive",condition:"instantiation-scope-identified",state:"ready",domain:"historical-system.instantiation",dimension:"condition"}),Object.freeze({id:"historical-system.instantiation-state",concept:"Instantiation State",type:"descriptor-system",mode:"descriptive",condition:"instantiation-scope-identified",state:"ready",domain:"historical-system.instantiation",dimension:"state"}),Object.freeze({id:"historical-system.initialization-type",concept:"Initialization Type",type:"descriptor-system",mode:"descriptive",condition:"initialization-scope-identified",state:"ready",domain:"historical-system.initialization",dimension:"type"}),Object.freeze({id:"historical-system.initialization-mode",concept:"Initialization Mode",type:"descriptor-system",mode:"descriptive",condition:"initialization-scope-identified",state:"ready",domain:"historical-system.initialization",dimension:"mode"}),Object.freeze({id:"historical-system.initialization-condition",concept:"Initialization Condition",type:"descriptor-system",mode:"descriptive",condition:"initialization-scope-identified",state:"ready",domain:"historical-system.initialization",dimension:"condition"}),Object.freeze({id:"historical-system.initialization-state",concept:"Initialization State",type:"descriptor-system",mode:"descriptive",condition:"initialization-scope-identified",state:"ready",domain:"historical-system.initialization",dimension:"state"}),Object.freeze({id:"historical-system.termination-type",concept:"Termination Type",type:"descriptor-system",mode:"descriptive",condition:"termination-scope-identified",state:"ready",domain:"historical-system.termination",dimension:"type"}),Object.freeze({id:"historical-system.termination-mode",concept:"Termination Mode",type:"descriptor-system",mode:"descriptive",condition:"termination-scope-identified",state:"ready",domain:"historical-system.termination",dimension:"mode"}),Object.freeze({id:"historical-system.termination-condition",concept:"Termination Condition",type:"descriptor-system",mode:"descriptive",condition:"termination-scope-identified",state:"ready",domain:"historical-system.termination",dimension:"condition"}),Object.freeze({id:"historical-system.termination-state",concept:"Termination State",type:"descriptor-system",mode:"descriptive",condition:"termination-scope-identified",state:"ready",domain:"historical-system.termination",dimension:"state"})]);
const TF_ORTHOGONAL_DESCRIPTOR_FAMILIES_V36288=Object.freeze({
 data:Object.freeze(["historical-system.data-type","historical-system.data-mode","historical-system.data-condition","historical-system.data-state"]),
 invocation:Object.freeze(["historical-system.invocation-type","historical-system.invocation-mode","historical-system.invocation-condition","historical-system.invocation-state"]),
 execution:Object.freeze(["historical-system.execution-type","historical-system.execution-mode","historical-system.execution-condition","historical-system.execution-state"]),
 loading:Object.freeze(["historical-system.loading-type","historical-system.loading-mode","historical-system.loading-condition","historical-system.loading-state"]),
 instantiation:Object.freeze(["historical-system.instantiation-type","historical-system.instantiation-mode","historical-system.instantiation-condition","historical-system.instantiation-state"]),
 initialization:Object.freeze(["historical-system.initialization-type","historical-system.initialization-mode","historical-system.initialization-condition","historical-system.initialization-state"]),
 termination:Object.freeze(["historical-system.termination-type","historical-system.termination-mode","historical-system.termination-condition","historical-system.termination-state"])
});
function tfOrthogonalDescriptorV36288(domain,dimension){
 const id="historical-system."+String(domain)+"-"+String(dimension),d=TF_ORTHOGONAL_DESCRIPTOR_FABRIC_V36288.find(x=>x.id===id);
 if(!d)throw new Error("unknown orthogonal descriptor");
 return Object.freeze({system:id,domain:d.domain,dimension:d.dimension,descriptive:true,executes:false,mutates:false,authorityGranted:false});
}
function tfOrthogonalDescriptorSelfTestV36288(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["historical-system.data","historical-system.invocation","historical-system.execution","historical-system.loading","historical-system.instantiation","historical-system.initialization","historical-system.termination"])if(!ids.has(id))missing.push(id);
 for(const x of TF_ORTHOGONAL_DESCRIPTOR_FABRIC_V36288){if(!ids.has(x.id))missing.push(x.id);if(!ids.has(x.domain))missing.push(x.domain);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const [f,arr] of Object.entries(TF_ORTHOGONAL_DESCRIPTOR_FAMILIES_V36288)){if(arr.length!==4)missing.push(f+":arity");for(const id of arr)if(!ids.has(id))missing.push(id);}
 const p=tfOrthogonalDescriptorV36288("execution","state");if(p.executes||p.mutates||p.authorityGranted)missing.push("descriptor-boundary");
 if(missing.length)throw new Error("orthogonal descriptor qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,families:7,descriptorSystems:28,data:true,invocation:true,execution:true,loading:true,instantiation:true,initialization:true,termination:true,
  type:true,mode:true,condition:true,state:true,repeatedRequestsDeduplicated:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_OPERATION_LIFECYCLE_BASES_V36288,TF_ORTHOGONAL_DESCRIPTOR_FABRIC_V36288,TF_ORTHOGONAL_DESCRIPTOR_FAMILIES_V36288,tfOrthogonalDescriptorV36288,tfOrthogonalDescriptorSelfTestV36288});
}

function bindCanonicalDescriptorCauseV04523(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.289: Canonical Descriptor Cause Fabric === */
const TF_SYNTAX_SYSTEM_V36289=Object.freeze({id:"system.syntax",concept:"Syntax",type:"language-structure-system",mode:"bounded",condition:"grammar-scope-identified",state:"ready"});
const TF_CANONICAL_DESCRIPTOR_SYSTEMS_V36289=Object.freeze([
 Object.freeze({id:"system.type",concept:"Type",role:"classification",cause:"identifies-what-kind-of-thing-or-operation-is-in-effect"}),
 Object.freeze({id:"system.mode",concept:"Mode",role:"operational-manner",cause:"identifies-how-the-subject-operates-or-is-applied"}),
 Object.freeze({id:"system.condition",concept:"Condition",role:"predicate",cause:"identifies-what-must-or-does-hold-for-transition-or-operation"}),
 Object.freeze({id:"system.state",concept:"State",role:"resulting-status",cause:"identifies-the-current-or-resulting-status-after-causes-and-transitions"})
]);
const TF_DESCRIPTOR_DOMAINS_V36289=Object.freeze(["system.data","system.code","system.syntax","system.invocation","system.execution","system.loading","system.instantiation","system.initialization","system.termination"]);
const TF_DESCRIPTOR_DIMENSIONS_V36289=Object.freeze(["type","mode","condition","state"]);
const TF_DESCRIPTOR_CAUSAL_ORDER_V36289=Object.freeze(["type","mode","condition","state"]);
function tfDescriptorContextV36289(domain,content={}){
 if(!TF_DESCRIPTOR_DOMAINS_V36289.includes(domain))throw new Error("unknown descriptor domain");
 const out={domain,descriptors:{}};
 for(const d of TF_DESCRIPTOR_DIMENSIONS_V36289)out.descriptors[d]=Object.freeze({system:"system."+d,value:content[d]??null});
 return Object.freeze({domain:out.domain,descriptors:Object.freeze(out.descriptors),causalOrder:TF_DESCRIPTOR_CAUSAL_ORDER_V36289,executes:false,mutates:false,authorityGranted:false});
}
function tfDescriptorTransitionV36289(before,after){
 if(!before||!after||before.domain!==after.domain)throw new Error("descriptor transition domain mismatch");
 const changed=TF_DESCRIPTOR_DIMENSIONS_V36289.filter(d=>before.descriptors[d].value!==after.descriptors[d].value);
 return Object.freeze({domain:before.domain,changed:Object.freeze(changed),causeDimensions:Object.freeze(changed.filter(d=>d!=="state")),stateChanged:changed.includes("state"),executes:false});
}
function tfCanonicalDescriptorCauseSelfTestV36289(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.type","system.mode","system.condition","system.state","system.data","system.code","system.syntax","system.invocation","system.execution","system.loading","system.instantiation","system.initialization","system.termination"])if(!ids.has(id))missing.push(id);
 for(const f of ["data","invocation","execution","loading","instantiation","initialization","termination"])for(const d of TF_DESCRIPTOR_DIMENSIONS_V36289)if(ids.has("system."+f+"-"+d))missing.push("compound:"+f+"-"+d);
 const a=tfDescriptorContextV36289("system.code",{type:"javascript",mode:"interpreted",condition:"source-admitted",state:"loaded"});
 const b=tfDescriptorContextV36289("system.code",{type:"javascript",mode:"interpreted",condition:"source-admitted",state:"executing"});
 const t=tfDescriptorTransitionV36289(a,b);
 const syn=tfDescriptorContextV36289("system.syntax",{type:"grammar",mode:"parse",condition:"tokens-valid",state:"accepted"});
 if(a.descriptors.type.system!=="system.type"||syn.descriptors.mode.system!=="system.mode"||!t.stateChanged||t.causeDimensions.length!==0||a.executes||a.mutates||a.authorityGranted)missing.push("cross-functional-descriptor-boundary");
 if(missing.length)throw new Error("canonical descriptor cause failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,canonicalDescriptorSystems:4,domains:TF_DESCRIPTOR_DOMAINS_V36289.length,code:true,syntax:true,data:true,invocation:true,execution:true,loading:true,instantiation:true,initialization:true,termination:true,compoundSystemsRetired:28,contextualClassification:true,crossFunctionality:true,causalOrder:TF_DESCRIPTOR_CAUSAL_ORDER_V36289,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SYNTAX_SYSTEM_V36289,TF_CANONICAL_DESCRIPTOR_SYSTEMS_V36289,TF_DESCRIPTOR_DOMAINS_V36289,TF_DESCRIPTOR_DIMENSIONS_V36289,TF_DESCRIPTOR_CAUSAL_ORDER_V36289,tfDescriptorContextV36289,tfDescriptorTransitionV36289,tfCanonicalDescriptorCauseSelfTestV36289});
}

function bindStandardsTypeExpansionV04539(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.303: RFC / ISO-IEC Reference Systems & Canonical Type Expansion === */
const TF_STANDARDS_REFERENCE_SYSTEMS_V36303=Object.freeze([
 Object.freeze({id:"system.standard",concept:"Standard",type:"reference-system",mode:"normative-or-informative",condition:"source-status-and-scope-identified",state:"ready"}),
 Object.freeze({id:"system.specification",concept:"Specification",type:"reference-system",mode:"technical-description",condition:"subject-and-version-identified",state:"ready"}),
 Object.freeze({id:"system.rfc",concept:"RFC",type:"standards-reference-system",mode:"rfc-series-reference",condition:"rfc-number-status-stream-and-relations-identified",state:"ready"}),
 Object.freeze({id:"system.iso-iec",concept:"ISO/IEC",type:"standards-reference-system",mode:"joint-standards-reference",condition:"standard-identifier-edition-and-scope-identified",state:"ready"})
]);
const TF_RFC_REFERENCE_MODEL_V36303=Object.freeze({
 system:"system.rfc",series:"RFC",statuses:Object.freeze(["proposed-standard","internet-standard","best-current-practice","informational","experimental","historic","unknown"]),
 streams:Object.freeze(["ietf","irtf","iab","independent","editorial","legacy"]),relations:Object.freeze(["updates","obsoletes","updated-by","obsoleted-by","errata"]),
 authorityMode:"external-reference-only",automaticGovernance:false
});
const TF_ISO_IEC_REFERENCE_MODEL_V36303=Object.freeze({
 system:"system.iso-iec",organizations:Object.freeze(["ISO","IEC"]),jointITCommittee:"ISO/IEC JTC 1",
 identityFields:Object.freeze(["identifier","edition","title","scope","status"]),authorityMode:"external-reference-only",automaticGovernance:false
});
const TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303=Object.freeze([
 "system","reference","standards-reference","information","data","object","structural","topology","interaction","communication","network",
 "protocol","transport","security","assurance","identity","access","lifecycle","process","operation","role","actor","control","management",
 "configuration","monitoring","diagnostic","validation","verification","qualification","testing","audit","recovery","persistence","storage",
 "memory","processing","computation","language","syntax","semantic","representation","interface","integration","virtualization","emulation",
 "container","environment","resource","session","event","state","condition","mode","type","classification","selection","planning","requirement",
 "risk","incident","policy","legal","education","media","forecast","position","generation","automation","worker","agent","meta","user-oriented",
 "system-to-system","descriptive","prospective","historical","compatibility","migration","lineage","registry","catalog","index","search","streaming"
]);
function tfCanonicalTypeFamilyV36303(systemId,declaredType=""){
 const id=String(systemId),t=String(declaredType).toLowerCase();
 const probes=[
  ["standards-reference",/rfc|iso-iec|standard/],["network",/network|lan|wan|subnet|vlan|router|switch|nat|dns/],
  ["protocol",/protocol|tcp|udp|websocket/],["security",/security|firewall|crypt|confidential|integrity|auth/],
  ["lifecycle",/lifecycle|startup|shutdown|initialization|termination|maintenance|disposal|acquisition|supply/],
  ["assurance",/assurance|validation|verification|qualification|testing|audit/],["interaction",/interconnection|intercommunication|negotiation|communication/],
  ["representation",/representation|notation|media/],["role",/role|worker|agent|manager|user|student|teacher|lawyer|ruler/],
  ["meta",/meta/],["requirement",/requirement/],["risk",/risk/],["incident",/incident/]
 ];
 for(const [family,re] of probes)if(re.test(id+" "+t))return family;
 return "system";
}
function tfSystemTypeExpansionV36303(systemId,declaredType=""){
 const family=tfCanonicalTypeFamilyV36303(systemId,declaredType);
 return Object.freeze({system:"system.type",subject:String(systemId),declaredType:String(declaredType),canonicalFamily:family,
  vocabularyMember:TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303.includes(family),orthogonal:true,compoundTypeSystemCreated:false,authorityGranted:false});
}
function tfStandardsTypeExpansionSelfTestV36303(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.standard","system.specification","system.rfc","system.iso-iec","system.reference","system.type","system.classification","system.requirement"])if(!ids.has(id))missing.push(id);
 for(const [id,t,expect] of [["system.rfc","standards-reference-system","standards-reference"],["system.tcp","protocol-system","protocol"],["system.firewall","security-system","security"],["system.intercommunication","interaction-system","interaction"]]){
  const x=tfSystemTypeExpansionV36303(id,t);if(x.canonicalFamily!==expect||!x.vocabularyMember||!x.orthogonal||x.compoundTypeSystemCreated)missing.push("type:"+id);
 }
 if(TF_RFC_REFERENCE_MODEL_V36303.automaticGovernance||TF_ISO_IEC_REFERENCE_MODEL_V36303.automaticGovernance)missing.push("external-authority");
 if(missing.length)throw new Error("standards/type expansion qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newReferenceSystems:4,typeFamilies:TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303.length,rfc:true,isoIec:true,
  orthogonalTypeExpansion:true,compoundTypeSystemProliferation:false,externalStandardsAutomaticAuthority:false,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_STANDARDS_REFERENCE_SYSTEMS_V36303,TF_RFC_REFERENCE_MODEL_V36303,TF_ISO_IEC_REFERENCE_MODEL_V36303,TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303,tfCanonicalTypeFamilyV36303,tfSystemTypeExpansionV36303,tfStandardsTypeExpansionSelfTestV36303});
}
const TERRAFORMER_TYPE_SYSTEM=Object.freeze({schema:'TERRAFORMER-TYPE-SYSTEM/1',id:'system.type',name:'Type System',family:'classification',type:'type-system',state:'integrated',canonicalPath:'terraformer://type/',governs:Object.freeze(['type','kind','class','constraint','compatibility','validation']),rule:'Type System classifies admitted entities and values; classification does not create authority or ownership.'});

module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,REGISTRY_FILE,ALIASES,registry,normalize,resolve,validate,select,descriptor,qualify,bindOrthogonalDescriptorFabricV04522,bindCanonicalDescriptorCauseV04523,bindStandardsTypeExpansionV04539,TERRAFORMER_TYPE_SYSTEM});

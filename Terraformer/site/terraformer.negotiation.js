"use strict";
const SYSTEM=Object.freeze({id:"system.negotiation",concept:"Negotiation",authorityGranted:false,scaffold:true});
function bindNegotiationV04537(){return Object.freeze({SYSTEM});}

function bindNegotiationConceptExpansionV04538(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.302: Negotiation Separation & Standards-Grounded Concept Expansion === */
const TF_NEGOTIATION_CONCEPT_EXPANSION_V36302=Object.freeze([
 Object.freeze({id:"system.inter-negotiation",concept:"Inter-negotiation",type:"interaction-process-system",mode:"cross-system-negotiation",condition:"participants-capabilities-and-terms-identified",state:"ready"}),
 Object.freeze({id:"system.preference",concept:"Preference",type:"selection-context-system",mode:"user-oriented",condition:"subject-and-preferred-alternative-identified",state:"ready"}),
 Object.freeze({id:"system.proposal",concept:"Proposal",type:"prospective-information-system",mode:"negotiable",condition:"proposer-and-terms-identified",state:"ready"}),
 Object.freeze({id:"system.stakeholder",concept:"Stakeholder",type:"role-system",mode:"interest-bearing",condition:"system-of-interest-and-interest-identified",state:"ready"}),
 Object.freeze({id:"system.acquisition",concept:"Acquisition",type:"lifecycle-process-system",mode:"obtainment",condition:"subject-and-source-identified",state:"ready"}),
 Object.freeze({id:"system.supply",concept:"Supply",type:"lifecycle-process-system",mode:"provision",condition:"provider-and-subject-identified",state:"ready"}),
 Object.freeze({id:"system.disposal",concept:"Disposal",type:"lifecycle-process-system",mode:"retirement",condition:"subject-and-authority-identified",state:"ready"}),
 Object.freeze({id:"system.risk",concept:"Risk",type:"uncertainty-system",mode:"assessment-context",condition:"subject-likelihood-and-impact-context-identified",state:"ready"}),
 Object.freeze({id:"system.incident",concept:"Incident",type:"event-system",mode:"exceptional-event",condition:"subject-and-occurrence-identified",state:"ready"}),
 Object.freeze({id:"system.confidentiality",concept:"Confidentiality",type:"security-property-system",mode:"disclosure-control",condition:"subject-and-access-boundary-identified",state:"ready"}),
 Object.freeze({id:"system.availability",concept:"Availability",type:"assurance-property-system",mode:"accessibility-context",condition:"subject-and-required-context-identified",state:"ready"}),
 Object.freeze({id:"system.representation",concept:"Representation",type:"information-form-system",mode:"representational",condition:"subject-and-form-identified",state:"ready"}),
 Object.freeze({id:"system.profile",concept:"Profile",type:"descriptive-collection-system",mode:"capability-preference-context",condition:"subject-and-attributes-identified",state:"ready"}),
 Object.freeze({id:"system.adaptation",concept:"Adaptation",type:"transformation-process-system",mode:"context-responsive",condition:"source-and-target-context-identified",state:"ready"}),
 Object.freeze({id:"system.requirement",concept:"Requirement",type:"constraint-system",mode:"normative-specification",condition:"subject-and-required-condition-identified",state:"ready"})
]);
const TF_NEGOTIATION_SEPARATION_V36302=Object.freeze({
 userNegotiation:Object.freeze({system:"system.negotiation",orientation:"user",uses:Object.freeze(["system.user","system.preference","system.proposal","system.agreement"] )}),
 interNegotiation:Object.freeze({system:"system.inter-negotiation",orientation:"system-to-system",uses:Object.freeze(["system.intercommunication","system.capability","system.protocol","system.proposal","system.agreement"])})
});
const TF_CONCEPT_RESEARCH_PROVENANCE_V36302=Object.freeze([
 Object.freeze({authority:"ISO/IEC/IEEE 15288:2023",scope:"system-life-cycle,system-elements,stakeholders,acquisition,supply",status:"external-reference"}),
 Object.freeze({authority:"ISO/IEC/IEEE 12207:2026",scope:"software-life-cycle,acquisition,supply,development,operation,maintenance,disposal",status:"external-reference"}),
 Object.freeze({authority:"NIST SP 800-53 Rev.5",scope:"security,privacy,access,configuration,contingency,identity,incident,communications,integrity,risk",status:"external-reference"}),
 Object.freeze({authority:"RFC 9110",scope:"user-agent-preference,representation,content-negotiation",status:"external-reference"}),
 Object.freeze({authority:"RFC 2703",scope:"capability,feature,provider-recipient-preference,content-negotiation",status:"external-reference"}),
 Object.freeze({authority:"RFC 7301",scope:"application-protocol-negotiation",status:"external-reference"}),
 Object.freeze({authority:"IANA Service Name and Transport Protocol Port Number Registry",scope:"service-name,transport-protocol,port-number-ranges",status:"external-reference"})
]);
function tfNegotiationContextV36302(spec={}){
 const user=String(spec.user??"");if(!user)throw new Error("user negotiation requires user");
 return Object.freeze({system:"system.negotiation",orientation:"user",user,preferences:Object.freeze({...(spec.preferences||{})}),proposal:Object.freeze({...(spec.proposal||{})}),
  agreement:false,binding:false,executes:false,mutates:false,authorityGranted:false});
}
function tfInterNegotiationPlanV36302(spec={}){
 const participants=Array.isArray(spec.participants)?[...new Set(spec.participants.map(String).filter(Boolean))]:[];
 if(participants.length<2)throw new Error("inter-negotiation requires at least two systems");
 return Object.freeze({system:"system.inter-negotiation",orientation:"system-to-system",participants:Object.freeze(participants),
  capabilities:Object.freeze({...(spec.capabilities||{})}),terms:Object.freeze({...(spec.terms||{})}),proposal:true,
  selected:false,agreement:false,binding:false,communicates:false,executes:false,mutates:false,authorityGranted:false});
}
function tfConceptExpansionSelfTestV36302(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_NEGOTIATION_CONCEPT_EXPANSION_V36302)if(!ids.has(x.id))missing.push(x.id);
 for(const id of ["system.negotiation","system.user","system.capability","system.agreement","system.intercommunication","system.protocol","system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 const u=tfNegotiationContextV36302({user:"user:test",preferences:{language:"en"}}),n=tfInterNegotiationPlanV36302({participants:["system.tcp","system.port"],capabilities:{protocol:"tcp"}});
 if(u.orientation!=="user"||u.agreement||u.binding||u.authorityGranted||n.orientation!=="system-to-system"||n.agreement||n.binding||n.authorityGranted)missing.push("negotiation-separation");
 if(missing.length)throw new Error("concept expansion qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:TF_NEGOTIATION_CONCEPT_EXPANSION_V36302.length,userNegotiationSeparated:true,interNegotiation:true,
  researchReferences:TF_CONCEPT_RESEARCH_PROVENANCE_V36302.length,compoundDescriptorProliferation:false,externalAuthorityImported:false,
  executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_NEGOTIATION_CONCEPT_EXPANSION_V36302,TF_NEGOTIATION_SEPARATION_V36302,TF_CONCEPT_RESEARCH_PROVENANCE_V36302,tfNegotiationContextV36302,tfInterNegotiationPlanV36302,tfConceptExpansionSelfTestV36302});
}
module.exports=Object.freeze({bindNegotiationV04537,bindNegotiationConceptExpansionV04538});

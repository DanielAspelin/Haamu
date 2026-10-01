"use strict";
function bindCryptoOntologyV04492(){
 const TF_CRYPTO_ONTOLOGY_V36260=Object.freeze({
 root:Object.freeze({concept:"Cryptography",system:"system.cryptography"}),
 concepts:Object.freeze({
  Key:Object.freeze({kind:"object",contexts:Object.freeze(["Pair"])}),
  Pair:Object.freeze({kind:"structure",path:Object.freeze(["Cryptography","Key","Pair"]),system:"system.key-pair"}),
  Hashing:Object.freeze({kind:"process",system:"system.hashing"}),
  Hasher:Object.freeze({kind:"actor",system:"system.hasher",actsOn:"Hashing"}),
  Salting:Object.freeze({kind:"process",system:"system.salting"}),
  Salter:Object.freeze({kind:"actor",system:"system.salter",actsOn:"Salting"})
 }),
 topology:Object.freeze([
  Object.freeze(["Cryptography","Key","Pair"]),
  Object.freeze(["Cryptography","Hashing","Hasher"]),
  Object.freeze(["Cryptography","Salting","Salter"])
 ]),
 semantics:Object.freeze([
  Object.freeze({from:"Hasher",relation:"performs",to:"Hashing"}),
  Object.freeze({from:"Salter",relation:"performs",to:"Salting"}),
  Object.freeze({from:"Salting",relation:"provides-input-to",to:"Hashing"}),
  Object.freeze({from:"Pair",relation:"contains-contextual",to:"Key"})
 ]),
 boundaries:Object.freeze({secretIsNotSalt:true,hashIsNotEncryption:true,keyPairIsNotCredential:true,privateKeyPersistenceByDefault:false,automaticDeduplication:false})
});
 return Object.freeze({TF_CRYPTO_ONTOLOGY_V36260});
}
module.exports={bindCryptoOntologyV04492};

function bindCanonicalTypeOntologyV04543(deps={}){
 const {tfCanonicalTypeFamilyV36303,TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303,tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.304: Hierarchical Extensible Canonical Type Ontology === */
const TF_TYPE_ONTOLOGY_V36304=Object.freeze({
 protocol:Object.freeze({parent:"network",known:Object.freeze(["tcp","udp","tcpip","websocket","discovery-protocol"])}),
 network:Object.freeze({parent:"system",known:Object.freeze(["lan","wan","subnet","virtual-network","router","switch","bridge","nat","dns"])}),
 security:Object.freeze({parent:"assurance",known:Object.freeze(["authentication","authorization","confidentiality","integrity","isolation","firewall"])}),
 assurance:Object.freeze({parent:"system",known:Object.freeze(["validation","verification","qualification","testing","audit","monitoring","diagnostic"])}),
 lifecycle:Object.freeze({parent:"process",known:Object.freeze(["acquisition","supply","development","operation","maintenance","migration","recovery","disposal","startup","shutdown"])}),
 interaction:Object.freeze({parent:"system",known:Object.freeze(["connection","interconnection","communication","intercommunication","negotiation","inter-negotiation"])}),
 reference:Object.freeze({parent:"information",known:Object.freeze(["standard","specification","rfc","iso","iec","iso-iec"])}),
 standard:Object.freeze({parent:"reference",known:Object.freeze(["iso","iec","iso-iec"])}),
 role:Object.freeze({parent:"system",known:Object.freeze(["user","stakeholder","worker","agent","manager","teacher","student"])}),
 representation:Object.freeze({parent:"information",known:Object.freeze(["notation","media","multimedia","profile"])}),
 requirement:Object.freeze({parent:"information",known:Object.freeze(["requirement","policy","rule","regulation"])}),
 risk:Object.freeze({parent:"assurance",known:Object.freeze(["risk","incident"])}),
 meta:Object.freeze({parent:"descriptive",known:Object.freeze(["meta"])}),
 process:Object.freeze({parent:"system",known:Object.freeze(["operation","procedure","algorithm","task"])}),
 information:Object.freeze({parent:"system",known:Object.freeze(["data","representation","reference","requirement"])}),
 descriptive:Object.freeze({parent:"information",known:Object.freeze(["meta","classification","type","mode","condition","state"])})
});
const TF_TYPE_FACET_RULES_V36304=Object.freeze([
 Object.freeze({facet:"network",pattern:"network|lan|wan|subnet|router|switch|bridge|nat|dns|tcp|udp|protocol|socket|port"}),
 Object.freeze({facet:"security",pattern:"security|firewall|auth|confidential|integrity|isolation|crypt"}),
 Object.freeze({facet:"assurance",pattern:"assurance|validation|verification|qualification|testing|audit|monitor|diagnostic|risk|incident"}),
 Object.freeze({facet:"lifecycle",pattern:"lifecycle|startup|shutdown|initialization|termination|maintenance|migration|recovery|disposal|acquisition|supply|development"}),
 Object.freeze({facet:"interaction",pattern:"connection|communication|negotiation|protocol|interface|integration"}),
 Object.freeze({facet:"reference",pattern:"reference|standard|specification|rfc|iso|iec|iso-iec"}),
 Object.freeze({facet:"standard",pattern:"standard|iso|iec|iso-iec"}),
 Object.freeze({facet:"role",pattern:"user|stakeholder|worker|agent|manager|teacher|student|lawyer|ruler"}),
 Object.freeze({facet:"representation",pattern:"representation|notation|media|profile"}),
 Object.freeze({facet:"requirement",pattern:"requirement|policy|rule|regulation"}),
 Object.freeze({facet:"meta",pattern:"meta"})
]);
function tfTypeOntologyClassifyV36304(systemId,declaredType=""){
 const id=String(systemId),text=(id+" "+String(declaredType)).toLowerCase(),primary=tfCanonicalTypeFamilyV36303(id,declaredType);
 const facets=[];for(const r of TF_TYPE_FACET_RULES_V36304)if(new RegExp(r.pattern).test(text))facets.push(r.facet);
 if(!facets.includes(primary)&&primary!=="system")facets.unshift(primary);
 return Object.freeze({system:"system.type",subject:id,primary,familyKnown:TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303.includes(primary),
  facets:Object.freeze([...new Set(facets)]),ontologyNode:TF_TYPE_ONTOLOGY_V36304[primary]??null,extensible:true,exhaustiveClaim:false,authorityGranted:false});
}
function tfTypeOntologyAdmitV36304(spec={}){
 const name=String(spec.name??"").trim().toLowerCase(),parent=String(spec.parent??"system").trim().toLowerCase();
 if(!/^[a-z][a-z0-9-]{0,63}$/.test(name))throw new Error("invalid type name");
 if(!TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303.includes(parent)&&!TF_TYPE_ONTOLOGY_V36304[parent])throw new Error("unknown parent type");
 return Object.freeze({candidate:name,parent,status:"candidate",requiresValidation:true,requiresCanonicalReconciliation:true,
  automaticallyCanonical:false,createsSystem:false,authorityGranted:false});
}
function tfTypeOntologyCoverageV36304(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),classified=ids.map(id=>tfTypeOntologyClassifyV36304(id));
 return Object.freeze({systems:ids.length,classified:classified.length,coverage:ids.length?classified.length/ids.length:1,
  allRepresentable:classified.every(x=>x.familyKnown),multiFacet:classified.filter(x=>x.facets.length>1).length,exhaustiveClaim:false});
}
function tfTypeOntologySelfTestV36304(sourceText){
 const missing=[],coverage=tfTypeOntologyCoverageV36304(sourceText);
 if(!coverage.allRepresentable||coverage.coverage!==1)missing.push("coverage");
 const tcp=tfTypeOntologyClassifyV36304("system.tcp","protocol-system");
 if(tcp.primary!=="protocol"||!tcp.facets.includes("network")||!tcp.facets.includes("interaction"))missing.push("tcp-multiaxis");
 const cand=tfTypeOntologyAdmitV36304({name:"future-transport",parent:"protocol"});
 if(cand.automaticallyCanonical||cand.createsSystem||!cand.requiresValidation)missing.push("admission-boundary");
 if(missing.length)throw new Error("type ontology qualification failure "+missing.join(","));
 return Object.freeze({pass:true,ontologyFamilies:Object.keys(TF_TYPE_ONTOLOGY_V36304).length,typeVocabulary:TF_CANONICAL_SYSTEM_TYPE_VOCABULARY_V36303.length,
  systems:coverage.systems,coverage:coverage.coverage,allSystemsRepresentable:true,multiAxis:true,hierarchical:true,extensible:true,exhaustiveClaim:false,
  automaticCanonicalAdmission:false,compoundTypeSystemProliferation:false,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_TYPE_ONTOLOGY_V36304,TF_TYPE_FACET_RULES_V36304,tfTypeOntologyClassifyV36304,tfTypeOntologyAdmitV36304,tfTypeOntologyCoverageV36304,tfTypeOntologySelfTestV36304});
}
module.exports=Object.freeze({bindCryptoOntologyV04492,bindCanonicalTypeOntologyV04543});

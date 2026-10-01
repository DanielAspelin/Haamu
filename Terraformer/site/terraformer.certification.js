"use strict";
const SYSTEM=Object.freeze({id:"system.certification",concept:"Certification",type:"certification-process-system",planOnly:true,validationPerformed:false,certificateIssued:false,signingPerformed:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
function plan(spec={}){return Object.freeze({system:SYSTEM.id,subject:spec.subject??null,certificate:spec.certificate??null,planOnly:true,validationPerformed:false,certificateIssued:false,signingPerformed:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,plan});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfCertificationProfileV4041({id="",version="",requirements=[]}={}){
 if(!id||!version||!Array.isArray(requirements)||!requirements.length)throw new TypeError("complete certification profile required");
 return Object.freeze({id:String(id),version:String(version),requirements:Object.freeze(requirements.map(String))});
}

function tfCertificationRecordV4041({certificateId="",subject="",subjectVersion="",scope="",profile=null,
 evidence=[],qualified=false,issuer="system.certifier",issuedAt="",expiresAt=""}={}){
 if(!certificateId||!subject||!scope||!profile||!Array.isArray(evidence)||!evidence.length)throw new TypeError("certification inputs incomplete");
 const certified=Boolean(qualified);
 return Object.freeze({system:"system.certification",worker:"system.certifier",certificateId:String(certificateId),
  subject:String(subject),subjectVersion:String(subjectVersion),scope:String(scope),profile,
  evidence:Object.freeze(evidence.map(String)),qualified:Boolean(qualified),issuer:String(issuer),
  issuedAt:String(issuedAt),expiresAt:String(expiresAt),state:certified?"CERTIFIED":"DRAFT",
  grantsAuthority:false,grantsLicense:false,claimsExternalAccreditation:false,immutable:certified});
}

function tfCertificationTransitionV4041(cert,next,{reason="",successor=""}={}){
 if(!cert||!TF_CERTIFICATION_SYSTEM_V4041.states.includes(cert.state))throw new TypeError("certificate required");
 const allowed={DRAFT:["CERTIFIED"],CERTIFIED:["SUSPENDED","REVOKED","SUPERSEDED","EXPIRED"],
  SUSPENDED:["CERTIFIED","REVOKED","SUPERSEDED","EXPIRED"],REVOKED:[],SUPERSEDED:[],EXPIRED:[]};
 if(!(allowed[cert.state]||[]).includes(next))throw new Error("invalid certification transition");
 return Object.freeze({certificateId:cert.certificateId,from:cert.state,to:next,reason:String(reason),
  successor:String(successor),historicalCertificateImmutable:true});
}

function tfWorldMapCertificationGateV4041({integrity=false,provenance=false,licensing=false,qualification=false}={}){
 const checks=Object.freeze({integrity:Boolean(integrity),provenance:Boolean(provenance),
  licensing:Boolean(licensing),qualification:Boolean(qualification)});
 const pass=Object.values(checks).every(Boolean);
 return Object.freeze({subject:"layer.terraformer.world",checks,mayCertify:pass,certified:false});
}

function tfCertificationSelfTestV4041(){const f=[];
 const profile=tfCertificationProfileV4041({id:"map.release",version:"1",requirements:["integrity","provenance","licensing","qualification"]});
 const draft=tfCertificationRecordV4041({certificateId:"c1",subject:"layer.terraformer.world",scope:"release",
  profile,evidence:["e1"],qualified:false}); if(draft.state!=="DRAFT"||draft.immutable)f.push("draft");
 const cert=tfCertificationRecordV4041({certificateId:"c2",subject:"layer.terraformer.world",scope:"release",
  profile,evidence:["e1","e2"],qualified:true}); if(cert.state!=="CERTIFIED"||!cert.immutable||cert.grantsAuthority)f.push("cert");
 const rev=tfCertificationTransitionV4041(cert,"REVOKED",{reason:"test"});if(rev.to!=="REVOKED"||!rev.historicalCertificateImmutable)f.push("revoke");
 if(tfWorldMapCertificationGateV4041({integrity:true,provenance:true,licensing:true,qualification:false}).mayCertify)f.push("gate");
 if(f.length)throw Error("Certification qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.41",certification:true,certifier:true,evidenceBacked:true,
  immutableIssuedCertificates:true,revocation:true,noAuthority:true,noLicensing:true});}


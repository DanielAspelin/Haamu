"use strict";
function bindDocumentIOSignatureV04560(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.319: Document / PDF / Print / Scan / Signature Reconciliation === */
const TF_DOCUMENT_IO_SIGNATURE_SYSTEMS_V36319=Object.freeze([
 Object.freeze({id:"system.printing",concept:"Printing",type:"output-process-system",mode:"document-to-print-output",condition:"print-context-identified",state:"ready"}),
 Object.freeze({id:"system.printer",concept:"Printer",type:"output-device-role-system",mode:"print-output-device",condition:"printer-capability-identified",state:"ready"}),
 Object.freeze({id:"system.scanning",concept:"Scanning",type:"input-process-system",mode:"physical-or-image-input-capture",condition:"scan-context-identified",state:"ready"}),
 Object.freeze({id:"system.scanner",concept:"Scanner",type:"input-device-role-system",mode:"scan-input-device",condition:"scanner-capability-identified",state:"ready"}),
 Object.freeze({id:"system.digital-signature",concept:"Digital Signature",type:"cryptographic-signature-system",mode:"sign-and-verify",condition:"algorithm-key-and-content-identified",state:"ready"})
]);
const TF_DOCUMENT_IO_SIGNATURE_RELATIONSHIPS_V36319=Object.freeze([
 Object.freeze({from:"system.pdf",relation:"type-of",to:"system.document"}),
 Object.freeze({from:"system.printing",relation:"operates-on",to:"system.document"}),
 Object.freeze({from:"system.printing",relation:"uses",to:"system.printer"}),
 Object.freeze({from:"system.scanning",relation:"uses",to:"system.scanner"}),
 Object.freeze({from:"system.scanning",relation:"produces",to:"system.document"}),
 Object.freeze({from:"system.digital-signature",relation:"type-of",to:"system.signature"}),
 Object.freeze({from:"system.digital-signature",relation:"uses",to:"system.cryptography"}),
 Object.freeze({from:"system.digital-signature",relation:"may-operate-on",to:"system.document"}),
 Object.freeze({from:"system.digital-signature",relation:"may-operate-on",to:"system.pdf"})
]);
function tfDocumentIOPlanV36319(spec={}){
 const op=String(spec.operation??"").toLowerCase();if(!["print","scan"].includes(op))throw new Error("document IO operation must be print or scan");
 return Object.freeze({system:op==="print"?"system.printing":"system.scanning",operation:op,
  documentSystem:"system.document",format:String(spec.format??"unspecified"),deviceSystem:op==="print"?"system.printer":"system.scanner",
  deviceSelected:!!spec.deviceSelected,userMediationRequired:true,automaticDeviceAccess:false,
  executionPerformed:false,persistenceImplied:false,authorityGranted:false});
}
function tfDigitalSignaturePlanV36319(spec={}){
 const operation=String(spec.operation??"verify").toLowerCase();if(!["sign","verify"].includes(operation))throw new Error("digital signature operation must be sign or verify");
 return Object.freeze({system:"system.digital-signature",operation,algorithm:String(spec.algorithm??"unspecified"),
  keyReference:spec.keyReference?String(spec.keyReference):null,contentReference:spec.contentReference?String(spec.contentReference):null,
  privateKeyEmbedded:false,keyGenerationPerformed:false,signingPerformed:false,verificationPerformed:false,
  cryptographicValidity:null,identityValidityImplied:false,legalValidityImplied:false,authorityGranted:false});
}
function tfDocumentIOSignatureSelfTestV36319(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.document","system.pdf","system.printing","system.printer","system.scanning","system.scanner","system.signature","system.digital-signature","system.cryptography"])if(!ids.has(id))missing.push(id);
 const p=tfDocumentIOPlanV36319({operation:"print",format:"PDF"}),s=tfDocumentIOPlanV36319({operation:"scan"}),d=tfDigitalSignaturePlanV36319({operation:"verify",algorithm:"SHA-256-with-public-key-signature"});
 if(p.deviceSystem!=="system.printer"||s.deviceSystem!=="system.scanner"||p.automaticDeviceAccess||s.automaticDeviceAccess||d.privateKeyEmbedded||d.legalValidityImplied||d.identityValidityImplied||d.authorityGranted)missing.push("document-io-signature-boundary");
 if(missing.length)throw new Error("document IO signature qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:5,reusedSystems:4,document:true,pdf:true,printing:true,printer:true,scanning:true,scanner:true,
  signature:true,digitalSignature:true,userMediationRequired:true,automaticDeviceAccess:false,privateKeyEmbedded:false,
  legalValidityImplied:false,identityValidityImplied:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_DOCUMENT_IO_SIGNATURE_SYSTEMS_V36319,TF_DOCUMENT_IO_SIGNATURE_RELATIONSHIPS_V36319,tfDocumentIOPlanV36319,tfDigitalSignaturePlanV36319,tfDocumentIOSignatureSelfTestV36319});
}
module.exports=Object.freeze({bindDocumentIOSignatureV04560});

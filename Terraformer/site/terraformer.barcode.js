"use strict";
function bindMachineReadableCodeV04559(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.318: EAN Barcode / QR Code Fabric === */
const TF_MACHINE_READABLE_CODE_SYSTEMS_V36318=Object.freeze([
 Object.freeze({id:"system.barcode",concept:"Barcode",type:"machine-readable-code-system",mode:"linear-symbolic-encoding",condition:"symbology-and-payload-identified",state:"ready"}),
 Object.freeze({id:"system.ean",concept:"EAN",type:"identifier-standard-system",mode:"numeric-product-identification",condition:"ean-format-identified",state:"ready"}),
 Object.freeze({id:"system.ean-barcode",concept:"EAN Barcode",type:"barcode-system",mode:"ean-8-or-ean-13",condition:"numeric-payload-valid",state:"ready"}),
 Object.freeze({id:"system.qr-code",concept:"QR Code",type:"matrix-code-system",mode:"two-dimensional-payload-encoding",condition:"payload-and-encoding-context-identified",state:"ready"})
]);
const TF_MACHINE_READABLE_CODE_RELATIONSHIPS_V36318=Object.freeze([
 Object.freeze({from:"system.ean-barcode",relation:"type-of",to:"system.barcode"}),
 Object.freeze({from:"system.ean-barcode",relation:"uses",to:"system.ean"}),
 Object.freeze({from:"system.ean",relation:"uses",to:"system.identifier"}),
 Object.freeze({from:"system.ean-barcode",relation:"uses",to:"system.encoding"}),
 Object.freeze({from:"system.qr-code",relation:"uses",to:"system.encoding"}),
 Object.freeze({from:"system.qr-code",relation:"may-represent",to:"system.identifier"}),
 Object.freeze({from:"system.qr-code",relation:"may-represent",to:"system.image"}),
 Object.freeze({from:"system.reader",relation:"may-read",to:"system.ean-barcode"}),
 Object.freeze({from:"system.reader",relation:"may-read",to:"system.qr-code"}),
 Object.freeze({from:"system.writer",relation:"may-write",to:"system.ean-barcode"}),
 Object.freeze({from:"system.writer",relation:"may-write",to:"system.qr-code"})
]);
function tfEANCheckDigitV36318(body){
 const d=String(body??"");if(!/^\d+$/.test(d)||![7,12].includes(d.length))throw new Error("EAN body must contain 7 or 12 digits");
 let sum=0,weight=3;for(let i=d.length-1;i>=0;i--){sum+=Number(d[i])*weight;weight=weight===3?1:3;}
 return String((10-(sum%10))%10);
}
function tfEANBarcodeV36318(value){
 const v=String(value??"");if(!/^\d{8}$|^\d{13}$/.test(v))throw new Error("EAN must be 8 or 13 digits");
 const body=v.slice(0,-1),expected=tfEANCheckDigitV36318(body);
 return Object.freeze({system:"system.ean-barcode",value:v,format:v.length===8?"EAN-8":"EAN-13",
  checkDigit:v.at(-1),expectedCheckDigit:expected,valid:v.at(-1)===expected,numeric:true,encodedImageGenerated:false});
}
function tfQRCodePlanV36318(payload,options={}){
 const text=String(payload??"");if(!text.length)throw new Error("QR payload required");
 const ec=String(options.errorCorrection??"M").toUpperCase();if(!["L","M","Q","H"].includes(ec))throw new Error("invalid QR error correction level");
 return Object.freeze({system:"system.qr-code",payload:text,errorCorrection:ec,encoding:String(options.encoding??"UTF-8"),
  twoDimensional:true,version:options.version??"auto",imageGenerated:false,decoded:false,
  executablePayloadImplied:false,automaticNavigation:false,authorityGranted:false});
}
function tfMachineReadableCodeSelfTestV36318(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.barcode","system.ean","system.ean-barcode","system.qr-code","system.encoding","system.identifier","system.reader","system.writer","system.image"])if(!ids.has(id))missing.push(id);
 const e8=tfEANBarcodeV36318("96385074"),e13=tfEANBarcodeV36318("4006381333931"),bad=tfEANBarcodeV36318("4006381333932"),q=tfQRCodePlanV36318("terraformer",{errorCorrection:"H"});
 if(!e8.valid||!e13.valid||bad.valid||q.errorCorrection!=="H"||q.executablePayloadImplied||q.automaticNavigation||q.authorityGranted)missing.push("code-boundary");
 if(missing.length)throw new Error("machine readable code qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:4,ean8:true,ean13:true,eanCheckDigit:true,qrCode:true,qrErrorCorrectionLevels:true,
  encodingReused:true,identifierReused:true,readerWriterReused:true,executablePayloadImplied:false,
  automaticNavigation:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_MACHINE_READABLE_CODE_SYSTEMS_V36318,TF_MACHINE_READABLE_CODE_RELATIONSHIPS_V36318,tfEANCheckDigitV36318,tfEANBarcodeV36318,tfQRCodePlanV36318,tfMachineReadableCodeSelfTestV36318});
}
module.exports=Object.freeze({bindMachineReadableCodeV04559});

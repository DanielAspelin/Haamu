"use strict";
const SYSTEM=Object.freeze({id:"system.certificate",concept:"Certificate",type:"certificate-artifact-evidence-system",certificateLoaded:false,trustEstablished:false,validationPerformed:false,issuancePerformed:false,signingPerformed:false,persistencePerformed:false,authorityGranted:false});
function describe(spec={}){return Object.freeze({system:SYSTEM.id,subject:spec.subject??null,issuer:spec.issuer??null,serial:spec.serial??null,evidenceOnly:true,trustEstablished:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,describe});

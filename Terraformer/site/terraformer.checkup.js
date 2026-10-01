"use strict";
const SYSTEM=Object.freeze({
 id:"system.checkup",concept:"Checkup",type:"checking-context-system",
 mode:"bounded-observational-checkup",condition:"checkup-context-admitted",state:"ready",
 relatedTo:"system.checking",readOnly:true,automaticMutation:false,automaticRepair:false,
 automaticValidation:false,automaticQualification:false,persistencePerformed:false,
 externalEffect:false,authorityGranted:false
});
function checkup(subject,spec={}){
 return Object.freeze({system:SYSTEM.id,checking:"system.checking",subject:subject??null,
  purpose:spec.purpose??null,admitted:spec.admitted===true,checked:false,readOnly:true,
  automaticMutation:false,automaticRepair:false,automaticValidation:false,
  automaticQualification:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
module.exports=Object.freeze({SYSTEM,checkup});

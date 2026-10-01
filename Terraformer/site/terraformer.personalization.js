"use strict";
/* Candidate physicalization of an already-evidenced identity; not yet canonical responsibility ownership. */
const SYSTEM=Object.freeze({
 schema:"TERRAFORMER-CANDIDATE-PHYSICALIZATION/1",id:"system.personalization",concept:"Personalization",
 typeOf:"system.candidate",origin:"terraformer.temporary.js",
 establishedType:"specializes",establishedFamily:null,
 qualification:"UNVERIFIED",canonicalResponsibility:false,authorityGranted:false,
 automaticExecution:false,automaticPersistence:false
});
function describe(){return SYSTEM;}
module.exports=Object.freeze({SYSTEM,describe});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfPersonalizationV4063({subjectId="",subjectSystem="system.entity",preferences={},visibility="PRIVATE",
 source="unknown",permission=false}={}){
 if(!subjectId)throw new TypeError("subjectId");
 const permitted=permission===true;
 return Object.freeze({system:"system.personalization",subjectId:String(subjectId),subjectSystem:String(subjectSystem),
  preferences:Object.freeze(permitted?{...preferences}:{}),withheld:!permitted&&Object.keys(preferences).length>0,
  visibility:String(visibility),source:String(source),permission:permitted,authority:false,identity:false});
}

function tfPersonalizationBoundaryV4064(userRole,preferences={},permission=false){
 if(!userRole)throw new TypeError("userRole");
 const p=tfPersonalizationV4063({subjectId:userRole.userId,subjectSystem:userRole.system,
  preferences,visibility:userRole.userClass==="human"?"PRIVATE":"INTERNAL",
  source:"user-role",permission});
 return Object.freeze({...p,userClass:userRole.userClass,
  humanPrivacyBoundary:userRole.userClass==="human",
  personPrivateDataInherited:false});
}


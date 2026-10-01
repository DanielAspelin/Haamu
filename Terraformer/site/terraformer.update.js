"use strict";
function bindSelfUpdateV04449(deps={}){
 const {tfSemverCmp}=deps;
/* === Terraformer v0.36.220: Canonical Self-Update Replacement Reconciliation === */
const TF_SELF_UPDATE_POLICY_V36219=Object.freeze({
 schema:"TERRAFORMER-SELF-UPDATE-POLICY/1",id:"system.self-update",target:"~/terraformer.js",
 type:"canonical-self-update-policy",mode:"verified-atomic-replacement",
 condition:Object.freeze(["source-is-strictly-newer-or-placement-admitted","source-hash-verified","target-recoverable"]),
 state:"registered",strictlyNewerSourceReplacesCanonical:true,equalOrOlderDoesNotOverwrite:true,
 stagingBeforeArchive:true,atomicRename:true,postReplaceHashVerification:true,recoveryArchive:true,grantsAuthority:false
});
function tfSelfUpdatePolicySelfTestV36219(){
 const newer=tfSemverCmp("0.36.220","0.36.218")>0,equal=tfSemverCmp("0.36.220","0.36.220")===0,older=tfSemverCmp("0.36.218","0.36.220")<0;
 if(!newer||!equal||!older)throw new Error("self-update semantic version qualification failure");
 return Object.freeze({pass:true,target:"~/terraformer.js",strictUpgradeOverwrites:true,equalOverwrite:false,olderOverwrite:false,
 stageThenVerify:true,recoveryArchive:true,atomicReplacement:true,postReplaceVerification:true,rollbackOnFailure:true,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({TF_SELF_UPDATE_POLICY_V36219,tfSelfUpdatePolicySelfTestV36219});
}
module.exports={bindSelfUpdateV04449};

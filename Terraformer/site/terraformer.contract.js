"use strict";
const SYSTEM=Object.freeze({id:"system.contract",concept:"Contract",type:"contract-system",planOnly:true,ownershipClaimed:false,salePerformed:false,licenseGranted:false,contractExecuted:false,legalAuthority:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_CONTRACT_SYSTEM=Object.freeze({schema:'TERRAFORMER-CONTRACT-SYSTEM/1',id:'system.contract',name:'Contract System',family:'governance',type:'contract-system',state:'integrated',canonicalPath:'terraformer://contract/',dependsOn:Object.freeze(['system.agreement','system.term','system.condition']),governs:Object.freeze(['contract','clause','party-reference','obligation-reference','condition','status','evidence']),rule:'Contract System represents contract structures and evidence; it does not independently determine legal validity, interpretation, enforceability, or authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_CONTRACT_SYSTEM});

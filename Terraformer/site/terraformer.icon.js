"use strict";
const SYSTEM=Object.freeze({id:"system.icon",concept:"Icon",type:"compact-interface-symbol-system",derived:true,privateByDefault:true,inertByDefault:true,contentMutation:false,publication:false,persistence:false,externalEffect:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_ICON_SYSTEM=Object.freeze({schema:'TERRAFORMER-ICON-SYSTEM/1',id:'system.icon',name:'Icon System',family:'information',type:'representation-system',state:'integrated',uri:'terraformer://system/icon',governs:Object.freeze(['icon-registration','icon-resolution','icon-association','icon-metadata','icon-fallback','icon-validation','icon-audit']),capabilities:Object.freeze(['register','resolve','associate','describe','fallback','validate','audit']),rule:'Icons are representational metadata and do not confer target authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_ICON_SYSTEM});

"use strict";
const MANIFEST=Object.freeze({schema:"TERRAFORMER-MANIFEST/1",id:"system.manifest",concept:"Manifest",typeOf:"System",
 responsibility:"Bind Terraformer's distributed physical artifacts, hashes, Token dispositions, and reconstruction entry into one inspectable whole.",
 registry:"terraformer.manifest.json",authorityGranted:false,automaticExecution:false,qualification:"UNDER_CONDITIONAL_EXPERIMENT"});
function validate(x=MANIFEST){return !!x&&x.id==="system.manifest"&&x.registry==="terraformer.manifest.json"&&x.authorityGranted===false;}
module.exports=Object.freeze({MANIFEST,describe:()=>MANIFEST,validate});

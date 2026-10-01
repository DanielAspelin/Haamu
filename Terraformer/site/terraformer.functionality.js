"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-FUNCTIONALITY-SYSTEM/1",id:"system.functionality",concept:"Functionality",typeOf:"system.system",responsibility:"Relate a System to evidenced functions, features, and capabilities without duplicating their implementation.",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function relate(system,functions=[],features=[],capabilities=[]){if(!system)throw Error("functionality: system required");return Object.freeze({system,functions:Object.freeze([...functions]),features:Object.freeze([...features]),capabilities:Object.freeze([...capabilities]),authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,relate});

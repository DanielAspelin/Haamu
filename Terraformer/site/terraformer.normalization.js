"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-NORMALIZATION-SYSTEM/1",id:"system.normalization",concept:"Normalization",typeOf:"system.system",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function normalize(x){if(!x||typeof x!=="object")throw Error("normalization: object required");return Object.freeze({...x,normalized:true});}
module.exports=Object.freeze({SYSTEM,normalize});

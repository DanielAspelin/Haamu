"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-NATURALIZATION-SYSTEM/1",id:"system.naturalization",concept:"Naturalization",typeOf:"system.system",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function naturalize(x,evidence){if(!x||!evidence||!evidence.typeOf)throw Error("naturalization: type evidence required");return Object.freeze({...x,typeOf:evidence.typeOf,naturalized:true});}
module.exports=Object.freeze({SYSTEM,naturalize});

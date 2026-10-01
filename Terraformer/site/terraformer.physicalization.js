"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-PHYSICALIZATION-SYSTEM/1",id:"system.physicalization",concept:"Physicalization",typeOf:"system.system",responsibility:"Bind an established identity to a physical project artifact without implying materialization, fabrication, execution, persistence, or authority.",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function bind(identity,file,evidence){if(!identity||!file)throw Error("physicalization: identity and file required");return Object.freeze({identity,file,evidence:evidence||null,materialized:false,fabricated:false,authorityGranted:false});}
module.exports=Object.freeze({SYSTEM,bind});

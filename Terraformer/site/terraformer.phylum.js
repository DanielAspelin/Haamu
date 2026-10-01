"use strict";
function bindPhylumV04475(){
 const TF_PHYLUM_SYSTEM_V36243=Object.freeze({
 id:"system.phylum",name:"Phylum System",family:"classification",type:"classification-rank-system",mode:"hierarchical-rank",
 condition:Object.freeze(["classification-scheme-defined","rank-admitted","parent-class-resolved","placement-validated"]),state:"naturalized",
 integrates:Object.freeze(["system.classification","system.parent","system.child","system.sibling","system.node","system.tree","system.mind.map","system.data-mining"]),
 governs:Object.freeze(["phylum-rank","phylum-membership","parent-class","child-order","placement-evidence"]),biologicalByDefault:false,mutatesSubject:false,grantsAuthority:false,persists:false,intrinsic:true
});
 return Object.freeze({TF_PHYLUM_SYSTEM_V36243});
}
module.exports={bindPhylumV04475};

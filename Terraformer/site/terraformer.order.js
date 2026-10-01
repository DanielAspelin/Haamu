"use strict";
function bindOrderV04475(){
 const TF_ORDER_SYSTEM_V36243=Object.freeze({
 id:"system.order",name:"Order System",family:"classification",type:"classification-rank-system",mode:"hierarchical-rank",
 condition:Object.freeze(["classification-scheme-defined","rank-admitted","parent-phylum-resolved","placement-validated"]),state:"naturalized",
 integrates:Object.freeze(["system.classification","system.phylum","system.parent","system.child","system.sibling","system.node","system.tree","system.mind.map","system.data-mining"]),
 governs:Object.freeze(["order-rank","order-membership","parent-phylum","child-classification","placement-evidence"]),biologicalByDefault:false,mutatesSubject:false,grantsAuthority:false,persists:false,intrinsic:true
});
 return Object.freeze({TF_ORDER_SYSTEM_V36243});
}
module.exports={bindOrderV04475};

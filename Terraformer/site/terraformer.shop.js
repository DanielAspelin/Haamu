'use strict';
const TERRAFORMER_SHOP_SYSTEM=Object.freeze({schema:'TERRAFORMER-SYSTEM/1',id:'system.shop',name:'Shop System',family:'commerce',type:'shop-system',state:'integrated',canonicalPath:'terraformer://shop/',dependsOn:Object.freeze(['system.commerce','system.product','system.service']),governs:Object.freeze(['shop-reference','catalog-reference','product-reference','service-reference','order-intent','receipt-reference']),rule:'Shop System models commerce/catalog and order intent; it does not purchase, sell, reserve inventory, charge payment instruments, or create an external order without explicit authorization.'});

function describe(){return TERRAFORMER_SHOP_SYSTEM;}
function admit(spec={},context={}){return Object.freeze({system:TERRAFORMER_SHOP_SYSTEM.id,actor:'agent.shopper',admitted:!!spec&&typeof spec==='object'&&context.scopeValid===true&&context.preconditionsPass===true,executed:false,persisted:false,authorityGranted:false});}
function selfTest(){const x=admit({},{scopeValid:true,preconditionsPass:true});return Object.freeze({pass:x.admitted&&!x.executed&&!x.persisted&&!x.authorityGranted});}
module.exports=Object.freeze({TERRAFORMER_SHOP_SYSTEM,describe,admit,selfTest});

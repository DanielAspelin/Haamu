'use strict';
const TERRAFORMER_MONEY_SYSTEM=Object.freeze({schema:'TERRAFORMER-MONEY-SYSTEM/1',id:'system.money',name:'Money System',family:'value',type:'money-system',state:'integrated',canonicalPath:'terraformer://money/',dependsOn:Object.freeze(['system.currency']),governs:Object.freeze(['money','amount','currency-reference','balance-reference','value-reference','transaction-reference']),rule:'Money System models monetary values and references; it does not itself hold funds, establish balances, authorize payments, or provide financial advice.'});

module.exports=Object.freeze({TERRAFORMER_MONEY_SYSTEM});

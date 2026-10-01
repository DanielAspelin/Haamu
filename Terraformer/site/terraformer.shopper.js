'use strict';
const TERRAFORMER_SHOPPER_AGENT=Object.freeze({schema:'TERRAFORMER-AGENT/1',id:'agent.shopper',name:'Shopper',system:'system.shop',state:'integrated',canonicalPath:'terraformer://shop/shopper/',capabilities:Object.freeze(['inspect-catalog-reference','prepare-order-intent','compare-reference','report-selection']),authority:Object.freeze({purchase:false,payment:false,externalOrder:false,credentialAccess:false}),rule:'Shopper is a bounded shop-system agent and cannot purchase, pay, or place an external order by itself.'});

function describe(){return TERRAFORMER_SHOPPER_AGENT;}
function selfTest(){const d=describe();return Object.freeze({pass:d.id==='agent.shopper'&&d.state==='integrated',authorityGranted:false});}
module.exports=Object.freeze({TERRAFORMER_SHOPPER_AGENT,describe,selfTest});

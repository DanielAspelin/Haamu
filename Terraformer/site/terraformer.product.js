'use strict';
const TERRAFORMER_PRODUCT_SYSTEM=Object.freeze({schema:'TERRAFORMER-PRODUCT-SYSTEM/1',id:'system.product',name:'Product System',family:'business',type:'product-system',state:'integrated',canonicalPath:'terraformer://product/',dependsOn:Object.freeze(['system.business', 'system.production']),governs:Object.freeze(['product', 'identity', 'state', 'relation', 'evidence']),rule:'Product System models product identity, specification, lifecycle, and evidence without manufacturing, sale, warranty, or regulatory authority.'});

module.exports=Object.freeze({TERRAFORMER_PRODUCT_SYSTEM});

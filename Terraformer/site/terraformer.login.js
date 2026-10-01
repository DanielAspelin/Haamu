'use strict';
const TERRAFORMER_LOGIN_SYSTEM=Object.freeze({schema:'TERRAFORMER-LOGIN-SYSTEM/1',id:'system.login',name:'Login System',family:'security',type:'login-system',state:'integrated-reconciliation',canonicalPath:'terraformer://login/',dependsOn:Object.freeze(['system.authentication']),rule:'Login System establishes an admitted session entry after authentication; login is not authorization and does not expand privileges.'});

module.exports=Object.freeze({TERRAFORMER_LOGIN_SYSTEM});

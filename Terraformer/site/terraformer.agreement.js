'use strict';
const TERRAFORMER_AGREEMENT_SYSTEM=Object.freeze({schema:'TERRAFORMER-AGREEMENT-SYSTEM/1',id:'system.agreement',name:'Agreement System',family:'governance',type:'agreement-system',state:'integrated',canonicalPath:'terraformer://agreement/',dependsOn:Object.freeze(['system.term','system.condition','system.state']),governs:Object.freeze(['party-reference','term','condition','acceptance-record','status','evidence']),rule:'Agreement System records and evaluates modeled agreements; a software record does not by itself establish legal validity, consent, signature, or enforceability.'});

module.exports=Object.freeze({TERRAFORMER_AGREEMENT_SYSTEM});

"use strict";
const SYSTEM=Object.freeze({id:"system.reference",concept:"Reference",type:"reference-record-system",readOnly:true,identityMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
module.exports=Object.freeze({SYSTEM});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfReferenceClass(id){
 const x=String(id||'');
 if(x==='system.qualification'||x==='system.hierarchy'||x==='system.indexing'||x==='system.object'||x==='system.error'||x==='system.routing'||x==='system.security'||x==='system.science'||x==='system.work')return 'architectural-reference';
 if(x==='protocol.internet.service')return 'external-system';
 if(x==='system.vector'||x==='system.vector-graphic')return 'deferred-system';
 if(x==='system.text'||x==='system.audit'||x==='system.evidence'||x==='system.document'||x==='system.binary'||x==='system.graphics'||x==='system.visual'||x==='system.presentation'||x==='system.knowledge'||x==='system.communication'||x==='system.conversation'||x==='system.event'||x==='system.runtime'||x==='system.history')return 'architectural-reference';
 return 'deferred-system';
}


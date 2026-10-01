'use strict';
const TERRAFORMER_COMMUNITY_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMMUNITY-SYSTEM/1',id:'system.community',name:'Community System',family:'community',type:'community-system',state:'integrated',canonicalPath:'terraformer://community/',dependsOn:Object.freeze(['system.communication']),governs:Object.freeze(['community','member-reference','group','topic','participation','forum-reference','event-reference','moderation-reference']),rule:'Community System represents admitted community structures and participation relationships; membership records do not grant identity, moderation, publication, organizational, or external authority.'});

module.exports=Object.freeze({TERRAFORMER_COMMUNITY_SYSTEM});

'use strict';
const TERRAFORMER_TEAM_SYSTEM=Object.freeze({schema:'TERRAFORMER-TEAM-SYSTEM/1',id:'system.team',name:'Team System',family:'organization',type:'team-system',state:'integrated',canonicalPath:'terraformer://team/',dependsOn:Object.freeze(['system.community', 'system.work']),governs:Object.freeze(['team', 'identity', 'state', 'relation', 'evidence']),rule:'Team System models member, role, work, and coordination references without establishing employment, organizational membership, or delegated authority.'});

module.exports=Object.freeze({TERRAFORMER_TEAM_SYSTEM});

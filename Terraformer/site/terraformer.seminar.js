'use strict';
const TERRAFORMER_SEMINAR_SYSTEM=Object.freeze({schema:'TERRAFORMER-SEMINAR-SYSTEM/1',id:'system.seminar',name:'Seminar System',family:'education',type:'seminar-system',state:'integrated',canonicalPath:'terraformer://education/seminar/',dependsOn:Object.freeze(['system.education','system.event']),governs:Object.freeze(['seminar','session','presenter-reference','participant-reference','agenda','material-reference','discussion']),rule:'Seminar System models admitted seminar structures independent of delivery venue; representation does not establish attendance, credentials, publication, recording, or external communication.'});

module.exports=Object.freeze({TERRAFORMER_SEMINAR_SYSTEM});

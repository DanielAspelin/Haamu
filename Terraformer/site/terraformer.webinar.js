'use strict';
const TERRAFORMER_WEBINAR_SYSTEM=Object.freeze({schema:'TERRAFORMER-WEBINAR-SYSTEM/1',id:'system.webinar',name:'Webinar System',family:'education',type:'webinar-system',state:'integrated',canonicalPath:'terraformer://education/webinar/',dependsOn:Object.freeze(['system.education','system.communication','system.web','system.event']),governs:Object.freeze(['webinar','session','presenter-reference','participant-reference','agenda','media-reference','interaction']),rule:'Webinar System models admitted network-delivered educational or informational sessions; scheduling does not publish, broadcast, record, invite, or contact participants without separate admission.'});

module.exports=Object.freeze({TERRAFORMER_WEBINAR_SYSTEM});

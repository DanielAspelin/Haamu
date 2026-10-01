'use strict';
const TERRAFORMER_UNIVERSITY_SYSTEM=Object.freeze({schema:'TERRAFORMER-UNIVERSITY-SYSTEM/1',id:'system.university',name:'University System',family:'education',type:'university-system',state:'integrated',canonicalPath:'terraformer://education/university/',dependsOn:Object.freeze(['system.education', 'system.research']),governs:Object.freeze(['university', 'faculty-reference', 'course-reference', 'research-reference', 'facility-reference']),rule:'University System models institutional education and research relationships without claiming accreditation, affiliation, ownership, or institutional authority.'});

module.exports=Object.freeze({TERRAFORMER_UNIVERSITY_SYSTEM});

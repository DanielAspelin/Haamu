'use strict';
const TERRAFORMER_HALL_SYSTEM=Object.freeze({schema:'TERRAFORMER-HALL-SYSTEM/1',id:'system.hall',name:'Hall System',family:'facility',type:'hall-system',state:'integrated',canonicalPath:'terraformer://facility/hall/',dependsOn:Object.freeze(['system.facility']),governs:Object.freeze(['hall', 'space', 'capacity-reference', 'event-reference', 'facility-reference']),rule:'Hall System represents a bounded facility space; scheduling or representation does not establish access, occupancy, booking, or safety approval.'});

module.exports=Object.freeze({TERRAFORMER_HALL_SYSTEM});

'use strict';
const TERRAFORMER_FACILITY_SYSTEM=Object.freeze({schema:'TERRAFORMER-FACILITY-SYSTEM/1',id:'system.facility',name:'Facility System',family:'facility',type:'facility-system',state:'integrated',canonicalPath:'terraformer://facility/',dependsOn:Object.freeze(['system.infrastructure']),governs:Object.freeze(['facility', 'space-reference', 'resource-reference', 'service-reference', 'capacity']),rule:'Facility System represents facility structures and services without granting physical access, occupancy, safety, or operational authority.'});

const FACILITY_SCHEMA='TERRAFORMER-FACILITY/1';

module.exports=Object.freeze({TERRAFORMER_FACILITY_SYSTEM,FACILITY_SCHEMA});

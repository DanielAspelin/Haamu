"use strict";
function bindDataSystemV04680(){
const TERRAFORMER_DATA_SYSTEM=Object.freeze({schema:'TERRAFORMER-DATA-SYSTEM/1',id:'system.data',name:'Data System',family:'data',type:'data-system',state:'integrated',canonicalPath:'terraformer://data/',dependsOn:Object.freeze([]),integratesWith:Object.freeze(['system.information']),governs:Object.freeze(['capability-reference','resource-reference','configuration-reference','provenance','state']),externalProvider:false,connected:false,credentialsPresent:false,rule:'Data System represents admitted data values, structures, provenance, and state; data representation does not itself establish information, truth, ownership, persistence, or disclosure authority.'});
 return Object.freeze({TERRAFORMER_DATA_SYSTEM});
}

module.exports=Object.freeze({bindDataSystemV04680,DATA_SYSTEM:Object.freeze({id:"system.data",mode:"governed-data",authorityGranted:false})});

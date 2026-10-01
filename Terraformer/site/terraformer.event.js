"use strict";
const SYSTEM=Object.freeze({id:"system.event",concept:"Event",type:"event-system",planOnly:true,persistencePerformed:false,externalCapture:false,historyRewritten:false,externalEffect:false,authorityGranted:false,scaffold:true});
const TERRAFORMER_EVENT_SYSTEM=Object.freeze({schema:'TERRAFORMER-EVENT-SYSTEM/1',id:'system.event',name:'Event System',family:'temporal',type:'event-system',state:'integrated',canonicalPath:'terraformer://event/',dependsOn:Object.freeze(['system.time']),governs:Object.freeze(['event','timestamp','source','target','type','state','sequence','correlation']),rule:'Event System represents discrete admitted occurrences; recording an event does not grant authority to cause the represented action.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_EVENT_SYSTEM});

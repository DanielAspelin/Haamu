"use strict";
const SYSTEM=Object.freeze({id:"system.power",concept:"Power",type:"physical-system-domain",descriptiveByDefault:true,automaticHardwareControl:false,automaticElectricalActuation:false,externalEffect:false,authorityGranted:false,scaffold:true,reconciledReusedOwner:true});
const TERRAFORMER_POWER_SYSTEM=Object.freeze({schema:'TERRAFORMER-POWER-SYSTEM/1',id:'system.power',name:'Power System',family:'hardware',type:'power-system',state:'integrated',canonicalPath:'terraformer://power/',dependsOn:Object.freeze(['system.hardware', 'system.resource']),governs:Object.freeze(['power', 'identity', 'state', 'relation', 'evidence']),rule:'Power System represents power capability, state, capacity, and relationships without electrical switching, mains, battery, or physical power-control authority.'});

module.exports=Object.freeze({SYSTEM,TERRAFORMER_POWER_SYSTEM});

"use strict";
function bindHardwareV04457(deps={}){
 const HARDWARE_SYSTEM=Object.freeze({schema:"TERRAFORMER-HARDWARE-SYSTEM/1",id:"system.hardware",name:"Hardware System",
  family:"hardware",type:"hardware-system",mode:"architecture-description",authorityGranted:false,grantsDeviceAuthority:false,persists:false});
 function definition(spec={}){return Object.freeze({type:String(spec.type||"virtual-hardware"),configuration:Object.freeze({...spec.configuration}),authorityGranted:false,grantsDeviceAuthority:false});}
 return Object.freeze({HARDWARE_SYSTEM,definition});
}
module.exports={bindHardwareV04457};

const TERRAFORMER_HARDWARE_SYSTEM=Object.freeze({schema:'TERRAFORMER-HARDWARE-SYSTEM/1',id:'system.hardware',name:'Hardware System',family:'hardware',type:'hardware-system',state:'integrated',canonicalPath:'terraformer://hardware/',dependsOn:Object.freeze(['system.device', 'system.machine']),governs:Object.freeze(['hardware', 'identity', 'state', 'relation', 'evidence']),rule:'Hardware System is the parent representation for physical computing components; representation does not grant physical, electrical, firmware, or device-control authority.'});
module.exports.TERRAFORMER_HARDWARE_SYSTEM=TERRAFORMER_HARDWARE_SYSTEM;

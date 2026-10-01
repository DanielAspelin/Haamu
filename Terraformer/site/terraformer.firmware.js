"use strict";
function bindFirmwareV04458(deps={}){
 const FIRMWARE_SYSTEM=Object.freeze({schema:"TERRAFORMER-FIRMWARE-SYSTEM/1",id:"system.firmware",name:"Firmware System",
  family:"boot",type:"firmware-system",mode:"firmware-definition",authorityGranted:false,persists:false});
 const MODES=Object.freeze(["bios","uefi"]);
 function definition(spec={}){const mode=String(spec.mode||"uefi").toLowerCase();if(!MODES.includes(mode))throw new Error("unsupported firmware mode");return Object.freeze({mode,secureBoot:spec.secureBoot===true,authorityGranted:false});}
 function selfTest(){return Object.freeze({pass:MODES.length===2,modes:MODES.length,authorityGranted:false});}
 return Object.freeze({FIRMWARE_SYSTEM,MODES,definition,selfTest});
}
module.exports={bindFirmwareV04458};

const TERRAFORMER_FIRMWARE_SYSTEM=Object.freeze({schema:'TERRAFORMER-FIRMWARE-SYSTEM/1',id:'system.firmware',name:'Firmware System',family:'firmware',type:'firmware-system',state:'integrated',canonicalPath:'terraformer://firmware/',dependsOn:Object.freeze(['system.hardware', 'system.software']),governs:Object.freeze(['firmware', 'identity', 'state', 'relation', 'evidence']),rule:'Firmware System models firmware images, interfaces, versions, and verification evidence; representation does not authorize flashing, replacement, execution, or device mutation.'});
module.exports.TERRAFORMER_FIRMWARE_SYSTEM=TERRAFORMER_FIRMWARE_SYSTEM;

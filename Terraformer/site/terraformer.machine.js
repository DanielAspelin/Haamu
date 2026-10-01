"use strict";
function bindMachineV04457(deps={}){
 const MACHINE_SYSTEM=Object.freeze({schema:"TERRAFORMER-MACHINE-SYSTEM/1",id:"system.machine",name:"Machine System",
  family:"computation",type:"machine-system",mode:"governed-machine-definition",authorityGranted:false,persists:false});
 function definition(spec={}){return Object.freeze({id:String(spec.id||"machine"),type:String(spec.type||"virtual"),hardware:spec.hardware||null,authorityGranted:false});}
 return Object.freeze({MACHINE_SYSTEM,definition});
}
module.exports={bindMachineV04457};

const TERRAFORMER_MACHINE_SYSTEM=Object.freeze({schema:'TERRAFORMER-MACHINE-SYSTEM/1',id:'system.machine',name:'Machine System',family:'hardware',type:'machine-system',state:'integrated',canonicalPath:'terraformer://machine/',dependsOn:Object.freeze(['system.device', 'system.computation']),governs:Object.freeze(['machine', 'device-reference', 'processor-reference', 'resource-reference', 'state']),rule:'Machine System composes admitted device and computation references without assuming physical or administrative machine authority.'});

Object.assign(module.exports,{TERRAFORMER_MACHINE_SYSTEM});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_MACHINE_READABLE_CODE_TYPES_V04559=Object.freeze({"system.ean-barcode":"system.barcode","system.qr-code":"system.code"});

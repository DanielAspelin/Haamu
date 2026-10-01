"use strict";
function bindMachineHardwareReconciliationV04457(deps={}){
 const {tfCanonicalSystemIdsV36196,tfVirtualMachineCreateV36226}=deps;
 if(!deps.machineSystem||!deps.hardwareSystem)throw new Error("machine/hardware owners required");
/* === Terraformer v0.36.227: Machine & Virtual Hardware Architecture === */
const TF_MACHINE_VIRTUALIZATION_RECONCILIATION_V36227=Object.freeze({
 id:"reconciliation.machine.virtualization",system:"system.machine",existingCanonical:true,state:"naturalized",
 extends:Object.freeze(["machine-definition","physical-machine-reference","virtual-machine-reference","architecture","processor-reference","memory-reference","block-reference","device-reference","firmware-reference"]),
 integrates:Object.freeze(["system.hardware","system.virtual-hardware","system.virtual-machine","system.virtualization","system.hypervisor","system.firmware","system.boot","system.lifecycle","system.environment"]),
 physicalAuthority:false,virtualizationAuthority:false,grantsAuthority:false
});
const TF_VIRTUAL_HARDWARE_SYSTEM_V36227=Object.freeze({
 id:"system.virtual-hardware",name:"Virtual Hardware System",family:"virtual-computation",type:"virtual-hardware-system",mode:"bounded-device-composition",
 condition:Object.freeze(["machine-defined","resources-bounded","devices-admitted","backend-compatible"]),state:"naturalized",
 integrates:Object.freeze(["system.machine","system.hardware","system.virtual-machine","system.processor","system.memory","system.block","system.device","system.network","system.graphics","system.input","system.output","system.firmware","system.hypervisor"]),
 governs:Object.freeze(["vcpu","virtual-memory","virtual-block","virtual-bus","virtual-controller","virtual-display","virtual-input","virtual-console","virtual-nic","firmware-reference"]),
 physicalHardwareAuthority:false,hostDeviceAuthority:false,networkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
const TF_VIRTUAL_HARDWARE_TYPES_V36227=Object.freeze({
 cpu:"vcpu",memory:"virtual-memory",block:"virtual-block",bus:"virtual-bus",controller:"virtual-controller",display:"virtual-display",input:"virtual-input",console:"virtual-console",nic:"virtual-nic",firmware:"firmware-reference"
});
function tfVirtualHardwareDefinitionV36227(spec={}){
 const cpus=Math.max(1,Math.min(256,Number(spec.cpus||1))),memoryBytes=Number(spec.memoryBytes||0);
 if(!Number.isSafeInteger(memoryBytes)||memoryBytes<=0)throw new Error("bounded virtual memory required");
 const blocks=Object.freeze((spec.blocks||[]).map((x,i)=>Object.freeze({id:String(x.id||`block${i}`),type:"virtual-block",image:String(x.image||""),readOnly:x.readOnly===true,authorityGranted:false})));
 const nics=Object.freeze((spec.nics||[]).map((x,i)=>Object.freeze({id:String(x.id||`nic${i}`),type:"virtual-nic",model:String(x.model||"generic"),attached:false,networkAuthority:false,authorityGranted:false})));
 return Object.freeze({system:"system.virtual-hardware",machine:String(spec.machine||"generic"),cpus,memoryBytes,blocks,nics,
  buses:Object.freeze((spec.buses||[]).map(String)),controllers:Object.freeze((spec.controllers||[]).map(String)),display:String(spec.display||"none"),
  input:String(spec.input||"none"),console:String(spec.console||"serial"),firmware:String(spec.firmware||"none"),
  hostDeviceAuthority:false,networkAuthority:false,physicalHardwareAuthority:false,authorityGranted:false});
}
function tfVirtualMachineComposeHardwareV36227(vm,hardware){
 if(!vm||vm.system!=="system.virtual-machine")throw new Error("canonical virtual machine required");
 if(!hardware||hardware.system!=="system.virtual-hardware")throw new Error("canonical virtual hardware required");
 if(vm.state!=="DEFINED")throw new Error("virtual hardware composition requires DEFINED virtual machine");
 return Object.freeze({...vm,machine:hardware.machine,cpus:hardware.cpus,memoryBytes:hardware.memoryBytes,virtualHardware:hardware,
  hostAuthority:false,networkAuthority:false,authorityGranted:false});
}
const TF_MACHINE_HARDWARE_KIT_V36227=Object.freeze({id:"kit.machine-virtual-hardware",name:"Machine & Virtual Hardware Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["machine-system-reconciled","virtual-hardware-canonical","authority-boundaries-explicit"]),state:"naturalized",
 members:Object.freeze(["system.machine","system.hardware","system.virtual-hardware","system.virtual-machine","system.virtualization","system.hypervisor","system.processor","system.memory","system.block","system.device","system.network","system.graphics","system.input","system.output","system.firmware","system.boot","system.lifecycle","system.environment","system.security","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfMachineVirtualHardwareSelfTestV36227(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_MACHINE_HARDWARE_KIT_V36227.members)if(!ids.has(x))missing.push(x);
 const hw=tfVirtualHardwareDefinitionV36227({machine:"q35",cpus:4,memoryBytes:128*1024*1024,blocks:[{id:"disk0",image:"guest.img"}],nics:[{id:"nic0"}],buses:["pcie"],controllers:["virtio"],display:"virtual",input:"virtual",console:"serial",firmware:"uefi"});
 let vm=tfVirtualMachineCreateV36226({id:"hardware-qualification-vm",backend:"qemu",cpus:1,memoryBytes:64*1024*1024,image:"guest.img"});vm=tfVirtualMachineComposeHardwareV36227(vm,hw);
 let lateDenied=false;try{tfVirtualMachineComposeHardwareV36227({...vm,state:"RUNNING"},hw)}catch(e){lateDenied=true}
 if(vm.cpus!==4||vm.memoryBytes!==128*1024*1024||hw.blocks.length!==1||hw.nics.length!==1||!lateDenied)missing.push("composition");
 if(hw.nics[0].attached!==false||hw.networkAuthority!==false||hw.hostDeviceAuthority!==false||TF_MACHINE_VIRTUALIZATION_RECONCILIATION_V36227.existingCanonical!==true)missing.push("authority-or-reconciliation");
 if(missing.length)throw new Error("machine virtual hardware qualification failure "+missing.join(","));
 return Object.freeze({pass:true,machineSystemReconciled:true,machineSystemDuplicateCreated:false,virtualHardwareSystem:true,componentTypes:Object.keys(TF_VIRTUAL_HARDWARE_TYPES_V36227).length,
  vcpu:true,virtualMemory:true,virtualBlock:true,virtualBus:true,virtualController:true,virtualDisplay:true,virtualInput:true,virtualConsole:true,virtualNic:true,firmwareReference:true,
  vmComposition:true,definedStateCompositionOnly:true,hostDeviceAuthority:false,networkAuthority:false,physicalHardwareAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.227 === */


 return Object.freeze({TF_MACHINE_HARDWARE_KIT_V36227,TF_MACHINE_VIRTUALIZATION_RECONCILIATION_V36227,TF_VIRTUAL_HARDWARE_SYSTEM_V36227,TF_VIRTUAL_HARDWARE_TYPES_V36227,tfMachineVirtualHardwareSelfTestV36227,tfVirtualHardwareDefinitionV36227,tfVirtualMachineComposeHardwareV36227});
}
module.exports={bindMachineHardwareReconciliationV04457};

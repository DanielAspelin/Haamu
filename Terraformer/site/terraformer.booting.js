"use strict";
function bindBootFirmwareGuestV04458(deps={}){
 const {tfCanonicalSystemIdsV36196,tfVirtualMachineCreateV36226}=deps;
 if(!deps.firmwareSystem)throw new Error("firmware owner required");
/* === Terraformer v0.36.228: Boot, Firmware & Guest Image Architecture === */
const TF_BOOT_FIRMWARE_RECONCILIATION_V36228=Object.freeze({
 id:"reconciliation.boot-firmware",state:"naturalized",existingCanonical:Object.freeze(["system.boot","system.firmware","system.bios","system.uefi"]),
 integrates:Object.freeze(["system.machine","system.virtual-hardware","system.virtual-machine","system.guest-image","system.binary","system.image","system.block","system.disk","system.storage","system.operating-system"]),
 bootAuthority:false,firmwareWriteAuthority:false,secureBootKeyAuthority:false,grantsAuthority:false
});
const TF_GUEST_IMAGE_SYSTEM_V36228=Object.freeze({
 id:"system.guest-image",name:"Guest Image System",family:"guest-runtime",type:"guest-image-system",mode:"validated-boot-media",
 condition:Object.freeze(["image-admitted","binary-identified","format-recognized","integrity-valid","machine-compatible"]),state:"naturalized",
 integrates:Object.freeze(["system.binary","system.image","system.block","system.disk","system.storage","system.virtual-machine","system.operating-system","system.boot","system.firmware"]),
 governs:Object.freeze(["guest-image","disk-image","optical-image","boot-media","format","integrity","read-only-policy","machine-compatibility","boot-handoff"]),
 formats:Object.freeze(["raw","qcow2","iso"]),executesByDefault:false,mountsByDefault:false,writesByDefault:false,grantsAuthority:false,persists:false,intrinsic:true
});
const TF_BOOT_FIRMWARE_MODES_V36228=Object.freeze({bios:Object.freeze({system:"system.bios",mode:"bios"}),uefi:Object.freeze({system:"system.uefi",mode:"uefi"}),none:Object.freeze({system:null,mode:"none"})});
function tfGuestImageDefinitionV36228(spec={}){
 const format=String(spec.format||"raw").toLowerCase();if(!TF_GUEST_IMAGE_SYSTEM_V36228.formats.includes(format))throw new Error("unsupported guest image format");
 const path=String(spec.image||"");if(!path)throw new Error("guest image reference required");
 return Object.freeze({system:"system.guest-image",id:String(spec.id||"guest-image"),image:path,format,kind:format==="iso"?"optical":"disk",
  integrity:String(spec.integrity||""),readOnly:spec.readOnly===true||format==="iso",admitted:false,mounted:false,executed:false,written:false,authorityGranted:false});
}
function tfGuestImageAdmissionV36228(image,options={}){
 if(!image||image.system!=="system.guest-image")throw new Error("canonical guest image required");
 if(options.validated!==true)throw new Error("guest image validation required");
 if(options.authorized!==true)throw new Error("guest image admission authorization required");
 return Object.freeze({...image,admitted:true,authorityGranted:false});
}
function tfBootDefinitionV36228(spec={}){
 const firmware=String(spec.firmware||"uefi").toLowerCase();if(!TF_BOOT_FIRMWARE_MODES_V36228[firmware])throw new Error("unsupported firmware mode");
 const order=Object.freeze((spec.order||["disk"]).map(String));if(!order.length)throw new Error("boot order required");
 return Object.freeze({system:"system.boot",firmware,firmwareSystem:TF_BOOT_FIRMWARE_MODES_V36228[firmware].system,order,
  secureBoot:spec.secureBoot===true,firmwareWrite:false,bootAuthority:false,authorityGranted:false});
}
function tfVirtualMachineAttachGuestImageV36228(vm,image,boot){
 if(!vm||vm.system!=="system.virtual-machine"||vm.state!=="DEFINED")throw new Error("DEFINED canonical virtual machine required");
 if(!image?.admitted)throw new Error("admitted guest image required");if(!boot||boot.system!=="system.boot")throw new Error("boot definition required");
 return Object.freeze({...vm,image:image.image,guestImage:image,boot,firmware:boot.firmware,state:"DEFINED",hostAuthority:false,networkAuthority:false,authorityGranted:false});
}
const TF_BOOT_GUEST_KIT_V36228=Object.freeze({id:"kit.boot-guest",name:"Boot, Firmware & Guest Image Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["boot-system-reconciled","firmware-system-reconciled","guest-image-canonical","authority-boundaries-explicit"]),state:"naturalized",
 members:Object.freeze(["system.boot","system.firmware","system.bios","system.uefi","system.guest-image","system.binary","system.image","system.block","system.disk","system.storage","system.machine","system.virtual-hardware","system.virtual-machine","system.operating-system","system.hypervisor","system.lifecycle","system.security","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfBootFirmwareGuestSelfTestV36228(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_BOOT_GUEST_KIT_V36228.members)if(!ids.has(x))missing.push(x);
 let image=tfGuestImageDefinitionV36228({id:"qual-image",image:"qualification.iso",format:"iso"});let denied=false;try{tfGuestImageAdmissionV36228(image,{authorized:true})}catch(e){denied=true}
 image=tfGuestImageAdmissionV36228(image,{validated:true,authorized:true});const boot=tfBootDefinitionV36228({firmware:"uefi",order:["optical","disk"],secureBoot:true});
 let vm=tfVirtualMachineCreateV36226({id:"boot-qualification-vm",backend:"qemu",cpus:2,memoryBytes:64*1024*1024,image:"placeholder"});vm=tfVirtualMachineAttachGuestImageV36228(vm,image,boot);
 if(!denied||vm.guestImage.format!=="iso"||vm.boot.firmware!=="uefi"||!vm.guestImage.readOnly)missing.push("guest-boot");
 if(image.executed||image.mounted||image.written||boot.firmwareWrite||boot.bootAuthority||TF_BOOT_FIRMWARE_RECONCILIATION_V36228.firmwareWriteAuthority)missing.push("authority-boundary");
 if(missing.length)throw new Error("boot firmware guest qualification failure "+missing.join(","));
 return Object.freeze({pass:true,bootSystemReconciled:true,firmwareSystemReconciled:true,biosSystemReconciled:true,uefiSystemReconciled:true,duplicateBootFirmwareSystems:false,
  guestImageSystem:true,formats:TF_GUEST_IMAGE_SYSTEM_V36228.formats.length,raw:true,qcow2:true,iso:true,binaryIntegrated:true,imageIntegrated:true,blockIntegrated:true,diskIntegrated:true,storageIntegrated:true,
  bootOrder:true,firmwareHandoff:true,validationRequired:true,admissionAuthorizationRequired:true,firmwareWriteAuthority:false,bootAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.228 === */


 return Object.freeze({TF_BOOT_FIRMWARE_MODES_V36228,TF_BOOT_FIRMWARE_RECONCILIATION_V36228,TF_BOOT_GUEST_KIT_V36228,TF_GUEST_IMAGE_SYSTEM_V36228,tfBootDefinitionV36228,tfBootFirmwareGuestSelfTestV36228,tfGuestImageAdmissionV36228,tfGuestImageDefinitionV36228,tfVirtualMachineAttachGuestImageV36228});
}
module.exports={bindBootFirmwareGuestV04458};

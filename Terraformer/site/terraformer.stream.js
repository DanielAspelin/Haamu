"use strict";
function bindStreamV04476(){
 const TF_STREAMABLE_DOMAINS_V36244=Object.freeze([
 ["data","system.data","structured/unstructured admitted data","representation"],
 ["text",null,"textual content and encoded text","representation"],
 ["binary","system.binary","byte and buffer content","representation"],
 ["object","system.object","Terraformer objects and object images","representation"],
 ["block",null,"bounded object/storage blocks","representation"],
 ["image","system.image","image data and frames","media"],
 ["audio","system.audio","audio samples/frames/encoded audio","media"],
 ["video","system.video","video frames/encoded video","media"],
 ["event","system.event","event records and event flows","runtime"],
 ["command","system.command","admitted command messages; streaming does not execute them","control-message"],
 ["communication","system.communication","admitted communication messages","communication"],
 ["network","system.network","admitted network-flow representations","network"],
 ["request",null,"request message flows","protocol"],
 ["response",null,"response message flows","protocol"],
 ["header",null,"header records","protocol"],
 ["session",null,"session event/state representations","runtime"],
 ["log",null,"logging records","evidence"],
 ["report",null,"report records","evidence"],
 ["forensic-evidence",null,"forensic evidence records","evidence"],
 ["node", "system.node","node records and graph updates","structure"],
 ["tree", "system.tree","tree records and hierarchy updates","structure"],
 ["mind-map","system.mind.map","mind-map node/link updates","structure"],
 ["classification","system.classification","classification placements and candidates","knowledge"],
 ["data-mining", "system.data-mining","mining observations, patterns and candidate links","knowledge"],
 ["generator-output",null,"generated admitted output","generation"],
 ["bot-event","system.bot","bounded bot input/output/event evidence","automation"],
 ["file-content",null,"admitted file content represented as bytes/objects","storage"],
 ["object-image",null,"encrypted/unencrypted admitted object-image flow","storage"],
 ["virtual-machine-console","system.virtual-machine","VM console representation when an execution adapter exists","virtualization"]
].map(([id,system,description,kind])=>Object.freeze({id,system,description,kind})));
 function tfStreamDescriptorV36244(spec={}){
 const domain=String(spec.domain||"data"),known=TF_STREAMABLE_DOMAINS_V36244.find(x=>x.id===domain);if(!known)throw new Error("unsupported stream domain");
 return Object.freeze({system:"system.streaming",streamer:"system.streamer",id:String(spec.id||"stream."+domain),domain,kind:known.kind,direction:String(spec.direction||"bidirectional"),
  source:spec.source??null,target:spec.target??null,encoding:spec.encoding??null,contentType:spec.contentType??null,backpressure:true,buffered:true,eventDriven:true,
  live:false,connected:false,deviceOpened:false,payloadExecuted:false,persisted:false,networkAuthority:false,deviceAuthority:false,credentialAuthority:false,authorityGranted:false});
}
 return Object.freeze({TF_STREAMABLE_DOMAINS_V36244,tfStreamDescriptorV36244});
}
module.exports={bindStreamV04476};

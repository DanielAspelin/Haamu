"use strict";
const SYSTEM=Object.freeze({id:"system.construct",concept:"Construct",authorityGranted:false});
function bindConstructV04504(){return Object.freeze({SYSTEM});}
module.exports=Object.freeze({bindConstructV04504});

/* Terraformer v0.48.3: bridge-covered cross-owner migration. */
function tfConstructiveClosureV391(sourceText){
 const prior=tfConstructiveClosureV390(sourceText),dq=tfDataQuerySelfTestV391(sourceText),failures=[];
 if(!prior.pass)failures.push(...prior.failures.map(x=>"v0.39.0:"+x));
 if(!dq.pass)failures.push("data-query-fabric");
 const pass=failures.length===0;
 return Object.freeze({pass,state:pass?"Verified":"Under Conditional Experiment",version:"0.39.1",transversion:"tv0.39.1",
  predecessorSeal:"v0.39.0 Constructive Seal",controlledSuccessor:true,sqlIntegrated:dq.sql,nosqlIntegrated:dq.nosql,
  pgsqlIntegrated:dq.pgsql,constructiveSeal:pass?"ESTABLISHED":"WITHHELD",permanentSeal:false,
  expansionFrozenByDefault:pass,successorChangesRequireDemonstratedGap:true,failures:Object.freeze(failures)});
}

/* Terraformer v0.48.4: bridge-covered cross-owner migration. */
async function tfOXConstructBlockV4093(x={}){
 const size=Number(x.logicalBlockSize||16384), payload=x.payload instanceof Uint8Array?x.payload:new Uint8Array(x.payload||[]);
 if(!tfOXIsPowerOfTwoV4093(size)) throw Error("invalid logical block size");
 if(payload.length>size) throw Error("payload exceeds logical block size");
 const h=Object.freeze({magic:"OXB1",formatVersion:1,blockId:String(x.blockId||""),
  generation:Number(x.generation||0),logicalBlockSize:size,payloadLength:payload.length,
  payloadSHA256:await tfOXSHA256V4093(payload),previousFingerprint:String(x.previousFingerprint||""),
  transactionId:String(x.transactionId||""),flags:Array.isArray(x.flags)?Object.freeze([...x.flags]):Object.freeze([])});
 if(!h.blockId||!Number.isInteger(h.generation)||h.generation<0)throw Error("invalid block identity/generation");
 return Object.freeze({header:h,payload:new Uint8Array(payload),state:"CONSTRUCTED",persistent:false,authority:false});
}

async function tfConstructBlockV4095(x={}){
 const size=Number(x.logicalBlockSize||16384), payload=x.payload instanceof Uint8Array?x.payload:new Uint8Array(x.payload||[]);
 if(!tfOXIsPowerOfTwoV4093(size))throw Error("invalid logical block size");
 if(payload.length>size)throw Error("payload exceeds logical block size");
 const h=Object.freeze({magic:"TFB1",formatVersion:1,blockId:String(x.blockId||""),
  generation:Number(x.generation||0),logicalBlockSize:size,payloadLength:payload.length,
  payloadSHA256:await tfOXSHA256V4093(payload),previousFingerprint:String(x.previousFingerprint||""),
  transactionId:String(x.transactionId||""),flags:Array.isArray(x.flags)?Object.freeze([...x.flags]):Object.freeze([])});
 if(!h.blockId||!Number.isInteger(h.generation)||h.generation<0)throw Error("invalid block identity/generation");
 return Object.freeze({header:h,payload:new Uint8Array(payload),state:"CONSTRUCTED",persistent:false,authority:false});
}

async function tfConstructBlockPageV4096(x={}){
 const refs=Array.isArray(x.blocks)?x.blocks:[];
 const blocks=refs.map((b,i)=>Object.freeze({slot:Number(b.slot??i),blockId:String(b.blockId||b.header?.blockId||""),
  generation:Number(b.generation??b.header?.generation??0),fingerprint:String(b.fingerprint||b.header?.payloadSHA256||"")}));
 const core={magic:"TFP1",formatVersion:1,pageId:String(x.pageId||""),generation:Number(x.generation||0),blocks};
 const canonical=new TextEncoder().encode(JSON.stringify(core));
 return Object.freeze({...core,pageSHA256:await tfOXSHA256V4093(canonical),state:"CONSTRUCTED",persistent:false,authority:false});
}


"use strict";
function bindBlockV04500(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.block",concept:"Block",role:"structure"}),Object.freeze({id:"system.block-page",concept:"Block Page",role:"structure",parent:"system.block"})]);
 return Object.freeze({SYSTEMS});
}
module.exports=Object.freeze({bindBlockV04500});

/* Terraformer v0.48.4: bridge-covered cross-owner migration. */
async function tfOXValidateBlockV4093(block){
 const e=[]; if(!block?.header||block.header.magic!=="OXB1"||block.header.formatVersion!==1)e.push("header");
 if(!tfOXIsPowerOfTwoV4093(block?.header?.logicalBlockSize))e.push("geometry");
 if(!(block?.payload instanceof Uint8Array)||block.header.payloadLength!==block.payload.length)e.push("length");
 if(block?.payload instanceof Uint8Array&&block.header?.payloadSHA256!==await tfOXSHA256V4093(block.payload))e.push("integrity");
 if(!block?.header?.blockId||!Number.isInteger(block?.header?.generation)||block.header.generation<0)e.push("identity");
 return Object.freeze({valid:e.length===0,errors:Object.freeze(e),state:e.length?"REJECTED":"VALIDATED",authority:false});
}

async function tfValidateBlockV4095(block){
 const e=[];if(!block?.header||block.header.magic!=="TFB1"||block.header.formatVersion!==1)e.push("header");
 if(!tfOXIsPowerOfTwoV4093(block?.header?.logicalBlockSize))e.push("geometry");
 if(!(block?.payload instanceof Uint8Array)||block.header.payloadLength!==block.payload.length)e.push("length");
 if(block?.payload instanceof Uint8Array&&block.header?.payloadSHA256!==await tfOXSHA256V4093(block.payload))e.push("integrity");
 if(!block?.header?.blockId||!Number.isInteger(block?.header?.generation)||block.header.generation<0)e.push("identity");
 return Object.freeze({valid:e.length===0,errors:Object.freeze(e),state:e.length?"REJECTED":"VALIDATED",authority:false});
}

async function tfValidateBlockPageV4096(p){
 const e=[];if(!p||p.magic!=="TFP1"||p.formatVersion!==1)e.push("header");
 if(!p?.pageId||!Number.isInteger(p?.generation)||p.generation<0)e.push("identity");
 const slots=new Set();for(const b of p?.blocks||[]){
  if(!Number.isInteger(b.slot)||b.slot<0||slots.has(b.slot))e.push("slot");slots.add(b.slot);
  if(!b.blockId||!Number.isInteger(b.generation)||b.generation<0||!b.fingerprint)e.push("block-reference");
 }
 if(p){const core={magic:p.magic,formatVersion:p.formatVersion,pageId:p.pageId,generation:p.generation,blocks:p.blocks};
  const h=await tfOXSHA256V4093(new TextEncoder().encode(JSON.stringify(core)));if(h!==p.pageSHA256)e.push("integrity");}
 return Object.freeze({valid:e.length===0,errors:Object.freeze([...new Set(e)]),state:e.length?"REJECTED":"VALIDATED",authority:false});
}


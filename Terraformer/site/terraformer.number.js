"use strict";
const SYSTEM=Object.freeze({id:"system.number",concept:"Number",type:"numeric-value-system",automaticMutation:false,persistencePerformed:false,authorityGranted:false,scaffold:true});
module.exports=Object.freeze({SYSTEM});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfRandomNumberV4097(maxExclusive=0x100000000){
 if(!Number.isSafeInteger(maxExclusive)||maxExclusive<2)throw Error("invalid maximum");
 const limit=Math.floor(0x100000000/maxExclusive)*maxExclusive;let n;
 do{n=new Uint32Array(1);crypto.getRandomValues(n);}while(n[0]>=limit);
 return Object.freeze({value:n[0]%maxExclusive,source:"WEB_CRYPTO_CSPRNG",cryptographic:true,authority:false});
}

function tfNumberV4097(x={}){
 const scheme=String(x.scheme||"SEQUENTIAL");
 if(scheme==="SEQUENTIAL"){
  const n=Number(x.value);if(!Number.isSafeInteger(n)||n<0)throw Error("invalid sequential number");
  return Object.freeze({scheme,value:n,display:String(n).padStart(Number(x.width||1),"0"),authority:false});
 }
 if(scheme==="RANDOM"){
  const r=tfRandomNumberV4097(Number(x.maxExclusive||1000000000));
  return Object.freeze({scheme,value:r.value,display:String(r.value).padStart(Number(x.width||1),"0"),randomSource:r.source,authority:false});
 }
 throw Error("unknown numbering scheme");
}


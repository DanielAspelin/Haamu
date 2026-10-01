'use strict';
/* Terraformer v0.44.33: primitive foundation extraction. Distinct system identities; no aggregate authority. */
const crypto=require('node:crypto');
function bind(deps={}){
 const {identity,runtimeUuid,uuidValidate,systemGeneratorDescriptor,systemAutomatorDescriptor,stageDescriptor}=deps;
 for(const [n,f] of Object.entries({identity,runtimeUuid,uuidValidate,systemGeneratorDescriptor,systemAutomatorDescriptor})) if(typeof f!=='function') throw new Error('foundation dependency missing: '+n);
 const systems=Object.freeze([
  {id:'system.code',name:'Code System',caps:['code.describe','code.validate','code.generate','code.inspect','code.hash','code.stage']},
  {id:'system.sha256',name:'SHA-256 System',caps:['sha256.digest','sha256.verify','sha256.object-integrity','sha256.block-integrity']},
  {id:'system.aes256',name:'AES-256 System',caps:['aes256.gcm.encrypt','aes256.gcm.decrypt','aes256.gcm.authenticate','aes256.parameters.validate']},
  {id:'system.rsa2048',name:'RSA-2048 System',caps:['rsa2048.generate','rsa2048.sign','rsa2048.verify','rsa2048.encrypt','rsa2048.decrypt'],compatibility:true},
  {id:'system.base64',name:'Base64 System',caps:['base64.encode','base64.decode','base64.validate']},
  {id:'system.sandbox',name:'Sandbox System',caps:['sandbox.create','sandbox.admit','sandbox.isolate','sandbox.inspect','sandbox.reset','sandbox.release']}
 ].map(x=>Object.freeze({...x,uuid:identity('system',x.id),capabilities:Object.freeze(x.caps)})));
 const system=id=>systems.find(x=>x.id===id)||null;
 const sha256=data=>crypto.createHash('sha256').update(Buffer.isBuffer(data)?data:Buffer.from(String(data))).digest('hex');
 const sha256Verify=(data,digest)=>sha256(data)===String(digest).toLowerCase();
 const base64Encode=data=>(Buffer.isBuffer(data)?data:Buffer.from(String(data))).toString('base64');
 const base64Decode=text=>{const x=String(text);if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(x))throw new Error('invalid base64');return Buffer.from(x,'base64')};
 const aes256Encrypt=(data,key)=>{if(!Buffer.isBuffer(key)||key.length!==32)throw new Error('AES-256 key must be 32 bytes');const iv=crypto.randomBytes(12),c=crypto.createCipheriv('aes-256-gcm',key,iv),ct=Buffer.concat([c.update(Buffer.isBuffer(data)?data:Buffer.from(String(data))),c.final()]);return {iv,tag:c.getAuthTag(),ciphertext:ct}};
 const aes256Decrypt=(e,key)=>{if(!Buffer.isBuffer(key)||key.length!==32)throw new Error('AES-256 key must be 32 bytes');const d=crypto.createDecipheriv('aes-256-gcm',key,e.iv);d.setAuthTag(e.tag);return Buffer.concat([d.update(e.ciphertext),d.final()])};
 const rsa2048Generate=()=>crypto.generateKeyPairSync('rsa',{modulusLength:2048,publicExponent:0x10001});
 const rsa2048Sign=(data,key)=>crypto.sign('sha256',Buffer.isBuffer(data)?data:Buffer.from(String(data)),key);
 const rsa2048Verify=(data,sig,key)=>crypto.verify('sha256',Buffer.isBuffer(data)?data:Buffer.from(String(data)),key,sig);
 const sandboxRecord=(spec={})=>Object.freeze({uuid:runtimeUuid(),systemId:'system.sandbox',state:'isolated',volatile:spec.volatile!==false,scope:spec.scope||'bounded',authorityGranted:false,network:false,persistence:false,execution:false});
 const coverage=()=>systems.map(x=>({system:x,generator:systemGeneratorDescriptor(x.id),automator:systemAutomatorDescriptor(x.id),staging:typeof stageDescriptor==='function'?stageDescriptor('system',x.id):{id:'stage.'+x.id,uuid:identity('stage',x.id)}}));
 const selfTest=()=>{const ids=systems.map(x=>x.id);if(new Set(ids).size!==6)throw Error('foundation system collision');for(const x of systems)if(!uuidValidate(x.uuid))throw Error('foundation UUID missing');const msg=Buffer.from('Terraformer foundation qualification'),h=sha256(msg);if(!sha256Verify(msg,h))throw Error('SHA-256 failed');const b=base64Encode(msg);if(!base64Decode(b).equals(msg))throw Error('Base64 failed');let invalid=false;try{base64Decode('***')}catch(_){invalid=true}if(!invalid)throw Error('invalid Base64 accepted');const key=crypto.randomBytes(32),enc=aes256Encrypt(msg,key);if(!aes256Decrypt(enc,key).equals(msg))throw Error('AES-256-GCM failed');let tamper=false;try{const bad={...enc,tag:Buffer.from(enc.tag)};bad.tag[0]^=1;aes256Decrypt(bad,key)}catch(_){tamper=true}if(!tamper)throw Error('AES authentication failure not rejected');const kp=rsa2048Generate(),sig=rsa2048Sign(msg,kp.privateKey);if(!rsa2048Verify(msg,sig,kp.publicKey))throw Error('RSA-2048 failed');const sb=sandboxRecord();if(sb.authorityGranted||sb.network||sb.persistence||sb.execution)throw Error('sandbox boundary failed');const cov=coverage();if(cov.length!==6||cov.some(x=>!x.generator.uuid||!x.automator.uuid||!x.staging.uuid))throw Error('fabric coverage failed');return {pass:true,systems:ids,uuid:true,sha256:true,aes256gcm:true,rsa2048:true,base64:true,sandbox:true,fabricCoverage:true,authorityGranted:false}};
 return {TF_FOUNDATION_SYSTEMS_V36198:systems,tfFoundationSystemV36198:system,tfSha256V36198:sha256,tfSha256VerifyV36198:sha256Verify,tfBase64EncodeV36198:base64Encode,tfBase64DecodeV36198:base64Decode,tfAes256EncryptV36198:aes256Encrypt,tfAes256DecryptV36198:aes256Decrypt,tfRsa2048GenerateV36198:rsa2048Generate,tfRsa2048SignV36198:rsa2048Sign,tfRsa2048VerifyV36198:rsa2048Verify,tfSandboxRecordV36198:sandboxRecord,tfFoundationCoverageV36198:coverage,tfFoundationSelfTestV36198:selfTest};
}
module.exports=Object.freeze({bind});

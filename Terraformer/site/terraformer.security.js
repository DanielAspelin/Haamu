'use strict';
/* Terraformer v0.44.34: higher-order security-layer formalization extraction. */
function bind(deps={}){
 const {identity,uuidValidate,sha256,sha256Verify,base64Encode,base64Decode}=deps;
 for(const [n,f] of Object.entries({identity,uuidValidate,sha256,sha256Verify,base64Encode,base64Decode})) if(typeof f!=='function') throw new Error('security dependency missing: '+n);
 function layer(id,name,parent,children,capabilities){return Object.freeze({id,uuid:identity('system',id),name,parent,children:Object.freeze(children.slice()),capabilities:Object.freeze(capabilities.slice()),grantsAuthority:false,absoluteSecurityClaim:false});}
 const encoding=layer('system.encoding','Encoding System',null,['system.base64'],['encoding.encode','encoding.decode','encoding.validate','encoding.identify','encoding.transform']);
 const checksum=layer('system.checksum','Checksum System','system.cryptography',['system.sha256'],['checksum.calculate','checksum.verify','checksum.compare','checksum.integrity-evidence']);
 const encryption=layer('system.encryption','Encryption System','system.cryptography',['system.aes256'],['encryption.encrypt','encryption.decrypt','encryption.authenticate','encryption.parameters','encryption.validate']);
 const cryptography=layer('system.cryptography','Cryptography System','system.secure',['system.checksum','system.encryption','system.rsa2048'],['cryptography.hash','cryptography.encrypt','cryptography.decrypt','cryptography.sign','cryptography.verify','cryptography.random','cryptography.policy']);
 const secure=layer('system.secure','Secure System',null,['system.cryptography','system.sandbox','system.validation','system.authorization','system.integrity','system.recovery'],['secure.assess','secure.policy','secure.boundary','secure.isolate','secure.validate','secure.audit','secure.recover']);
 const layers=Object.freeze({encoding,checksum,encryption,cryptography,secure});
 function architecture(){return {uuid:identity('security-architecture','v0.36.220'),layers:Object.values(layers),mappings:Object.freeze({'system.base64':'system.encoding','system.sha256':'system.checksum','system.aes256':'system.encryption','system.rsa2048':'system.cryptography','system.checksum':'system.cryptography','system.encryption':'system.cryptography','system.cryptography':'system.secure','system.sandbox':'system.secure'}),posture:Object.freeze({leastPrivilege:true,failClosed:true,authenticatedEncryption:true,secretsNotEmbedded:true,securityRequiresEvidence:true,absoluteSecurityClaim:false})};}
 function selfTest(){const a=architecture();for(const x of a.layers){if(!uuidValidate(x.uuid))throw new Error('security layer UUID invalid');if(x.grantsAuthority||x.absoluteSecurityClaim)throw new Error('security layer overclaim');}if(a.mappings['system.base64']!=='system.encoding'||a.mappings['system.sha256']!=='system.checksum'||a.mappings['system.aes256']!=='system.encryption'||a.mappings['system.rsa2048']!=='system.cryptography')throw new Error('security mapping regression');const msg=Buffer.from('security-layer-test'),digest=sha256(msg);if(!sha256Verify(msg,digest))throw new Error('checksum primitive regression');const enc=base64Encode(Buffer.from('encoding-layer-test'));if(base64Decode(enc).toString()!=='encoding-layer-test')throw new Error('encoding primitive regression');return {pass:true,layers:a.layers.length,encoding:'base64',checksum:'sha-256',encryption:'aes-256-gcm',signature:'rsa-2048',secureIsPosture:true,authorityGranted:false};}
 return {TF_SECURITY_LAYERS_V36199:layers,tfSecurityArchitectureV36199:architecture,tfSecurityLayerSelfTestV36199:selfTest};
}
const SECURITY_SCHEMA='TERRAFORMER-SECURITY-DOMAINS/1';

module.exports=Object.freeze({bind,SECURITY_SCHEMA});

/* v0.44.73 security-edge canonical integration marker; security authority remains bounded here. */

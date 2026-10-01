'use strict';
const ID="system.image", VERSION="0.44.22";
const STATES=Object.freeze(['DECLARED','VALIDATED','ADMITTED','ACTIVE','RELEASED','FAILED']);
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:'SYSTEM_BOUNDARY',responsibility:"Image representation, validation and governed media/document integration",integrations:Object.freeze(["system.io","system.runtime","system.document","system.object"]),authority:false,nativeAuthority:false,physicalAuthority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function validate(x={}){if(!x||typeof x!=='object')throw new TypeError('INVALID_IMAGE');if(typeof x.id!=='string'||!x.id.trim())throw new TypeError('INVALID_IMAGE_ID');return Object.freeze({valid:true,id:x.id,authority:false});}
function admit(x={}){validate(x);if(x.authorized!==true)return Object.freeze({admitted:false,state:'VALIDATED',reason:'AUTHORIZATION_REQUIRED',authority:false});return Object.freeze({admitted:true,state:'ADMITTED',id:x.id,authority:false});}
function transition(from,to){if(!STATES.includes(from)||!STATES.includes(to))throw new Error('INVALID_IMAGE_STATE');const allowed={DECLARED:['VALIDATED','FAILED'],VALIDATED:['ADMITTED','FAILED'],ADMITTED:['ACTIVE','RELEASED','FAILED'],ACTIVE:['RELEASED','FAILED'],RELEASED:[],FAILED:[]};if(!allowed[from].includes(to))throw new Error('INVALID_IMAGE_TRANSITION');return Object.freeze({from,to,authority:false});}
function qualify(){let denied=!admit({id:'q'}).admitted,bad=false;try{transition('RELEASED','ACTIVE')}catch{bad=true}return Object.freeze({id:ID,pass:denied&&bad&&admit({id:'q',authorized:true}).admitted,qualificationGranted:false});}
function bindNativeDataImageV04663(){
/* === Terraformer v0.36.220: Native Terraformer Data Image Format === */
const TF_DATA_IMAGE_FORMAT_V36191 = Object.freeze({
  extension: ".terraformer",
  mediaType: "application/x-terraformer-data-image",
  magic: "TFDI",
  formatVersion: 1,
  schemaVersion: 1,
  encryptedAtRest: true,
  editableAfterAuthenticatedDecryption: true,
  executable: false,
  sections: Object.freeze([
    "metadata","systems","capabilities","registries","scopes","relationships",
    "configuration","state","projects","resources","history","checkpoints","snapshots"
  ]),
  crypto: Object.freeze({
    cipher: "aes-256-gcm",
    kdf: "scrypt",
    keyBytes: 32,
    saltBytes: 16,
    ivBytes: 12,
    tagBytes: 16
  })
});

function tfDataImageNormalizeV36191(image = {}) {
  const out = Object.create(null);
  for (const section of TF_DATA_IMAGE_FORMAT_V36191.sections) {
    const value = Object.prototype.hasOwnProperty.call(image, section) ? image[section] : null;
    out[section] = value;
  }
  return out;
}

function tfDataImageSerializeV36191(image = {}) {
  return Buffer.from(JSON.stringify({
    schema: TF_DATA_IMAGE_FORMAT_V36191.schemaVersion,
    image: tfDataImageNormalizeV36191(image)
  }), "utf8");
}

function tfDataImageEncryptV36191(image, secret) {
  if (typeof secret !== "string" && !Buffer.isBuffer(secret)) throw new TypeError("Terraformer data-image secret required");
  const crypto = require("node:crypto");
  const salt = crypto.randomBytes(TF_DATA_IMAGE_FORMAT_V36191.crypto.saltBytes);
  const iv = crypto.randomBytes(TF_DATA_IMAGE_FORMAT_V36191.crypto.ivBytes);
  const key = crypto.scryptSync(secret, salt, TF_DATA_IMAGE_FORMAT_V36191.crypto.keyBytes);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plaintext = tfDataImageSerializeV36191(image);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  const header = {
    magic: TF_DATA_IMAGE_FORMAT_V36191.magic,
    formatVersion: TF_DATA_IMAGE_FORMAT_V36191.formatVersion,
    schemaVersion: TF_DATA_IMAGE_FORMAT_V36191.schemaVersion,
    cipher: "aes-256-gcm", kdf: "scrypt",
    salt: salt.toString("base64"), iv: iv.toString("base64"),
    tag: tag.toString("base64"), bytes: ciphertext.length
  };
  return Buffer.from(JSON.stringify({header, payload:ciphertext.toString("base64")}), "utf8");
}

function tfDataImageDecryptV36191(container, secret) {
  const crypto = require("node:crypto");
  const envelope = JSON.parse(Buffer.isBuffer(container) ? container.toString("utf8") : String(container));
  if (!envelope || !envelope.header || envelope.header.magic !== TF_DATA_IMAGE_FORMAT_V36191.magic) throw new Error("Invalid Terraformer data image");
  if (envelope.header.formatVersion !== 1 || envelope.header.cipher !== "aes-256-gcm" || envelope.header.kdf !== "scrypt") throw new Error("Unsupported Terraformer data image");
  const salt=Buffer.from(envelope.header.salt,"base64"), iv=Buffer.from(envelope.header.iv,"base64"), tag=Buffer.from(envelope.header.tag,"base64");
  const key=crypto.scryptSync(secret,salt,32);
  const decipher=crypto.createDecipheriv("aes-256-gcm",key,iv);
  decipher.setAuthTag(tag);
  const plaintext=Buffer.concat([decipher.update(Buffer.from(envelope.payload,"base64")),decipher.final()]);
  const decoded=JSON.parse(plaintext.toString("utf8"));
  if (decoded.schema !== TF_DATA_IMAGE_FORMAT_V36191.schemaVersion) throw new Error("Terraformer data image schema mismatch");
  return decoded.image;
}

function tfDataImageEditV36191(container, secret, editor) {
  if (typeof editor !== "function") throw new TypeError("editor function required");
  const image=tfDataImageDecryptV36191(container,secret);
  const edited=editor(structuredClone(image)) || image;
  return tfDataImageEncryptV36191(edited,secret);
}

function tfDataImageSnapshotV36191(snapshot, checkpoint=null, metadata={}) {
  return tfDataImageNormalizeV36191({metadata, snapshots:[snapshot], checkpoints:checkpoint == null ? [] : [checkpoint]});
}

function tfDataImageSelfTestV36191() {
  const secret="qualification-secret-not-persisted";
  const original=tfDataImageSnapshotV36191({id:"snapshot-test",state:{ready:true}},{id:"checkpoint-test"},{qualification:"Under Conditional Experiment"});
  const enc=tfDataImageEncryptV36191(original,secret);
  const dec=tfDataImageDecryptV36191(enc,secret);
  if (dec.snapshots[0].id !== "snapshot-test" || dec.checkpoints[0].id !== "checkpoint-test") throw new Error("data image round-trip failed");
  const edited=tfDataImageEditV36191(enc,secret,x=>{x.metadata.edited=true; return x;});
  if (tfDataImageDecryptV36191(edited,secret).metadata.edited !== true) throw new Error("data image edit failed");
  let wrong=false; try { tfDataImageDecryptV36191(enc,"wrong-secret"); } catch (_) { wrong=true; }
  if (!wrong) throw new Error("wrong-secret rejection failed");
  const tampered=Buffer.from(enc); tampered[tampered.length-8]^=1;
  let tamper=false; try { tfDataImageDecryptV36191(tampered,secret); } catch (_) { tamper=true; }
  if (!tamper) throw new Error("tamper rejection failed");
  return {pass:true,extension:".terraformer",cipher:"aes-256-gcm",kdf:"scrypt",snapshot:true,checkpoint:true,editable:true,executable:false};
}

globalThis.TF_DATA_IMAGE_FORMAT_V36191=TF_DATA_IMAGE_FORMAT_V36191;
globalThis.tfDataImageEncryptV36191=tfDataImageEncryptV36191;
globalThis.tfDataImageDecryptV36191=tfDataImageDecryptV36191;
globalThis.tfDataImageEditV36191=tfDataImageEditV36191;
globalThis.tfDataImageSnapshotV36191=tfDataImageSnapshotV36191;
 return Object.freeze({TF_DATA_IMAGE_FORMAT_V36191,tfDataImageNormalizeV36191,tfDataImageSerializeV36191,tfDataImageEncryptV36191,tfDataImageDecryptV36191,tfDataImageEditV36191,tfDataImageSnapshotV36191,tfDataImageSelfTestV36191});
}
const TERRAFORMER_IMAGE_SYSTEM=Object.freeze({schema:'TERRAFORMER-IMAGE-SYSTEM/1',id:'system.image',name:'Image System',family:'media',type:'still-image-system',state:'integrated',canonicalPath:'terraformer://image/',dependsOn:Object.freeze(['system.graphics']),governs:Object.freeze(['image','pixel','dimension','format','decode','encode','transform','render','metadata']),formats:Object.freeze(['png','jpeg','webp','gif','svg']),rule:'Image System represents and processes admitted still-image content; decoding or rendering content does not grant filesystem, camera, or publication authority.'});

const TERRAFORMER_BINARY_IMAGE_SYSTEM=Object.freeze({schema:'TERRAFORMER-BINARY-IMAGE-SYSTEM/1',id:'system.image.binary',name:'Binary Image System',family:'media',type:'binary-image-system',state:'integrated',canonicalPath:'terraformer://image/binary/',dependsOn:Object.freeze(['system.binary','system.image']),governs:Object.freeze(['bytes','buffer','signature','format-identification','size','slice','hash','decode-handoff']),signatures:Object.freeze({png:'89504e470d0a1a0a',jpeg:'ffd8ff',gif87a:'474946383761',gif89a:'474946383961',webpRiff:'52494646'}),rule:'Binary Image System represents byte-level image candidates and validates recognizable signatures before Image System decode handoff; binary input is never trusted as image content solely by extension or declaration.'});

function tfBinaryImageInspect(input){const crypto=require('crypto'),b=Buffer.isBuffer(input)?input:Buffer.from(input||[]),hex=b.subarray(0,16).toString('hex'),ascii=b.subarray(0,12).toString('ascii');let format='unknown';if(hex.startsWith('89504e470d0a1a0a'))format='png';else if(hex.startsWith('ffd8ff'))format='jpeg';else if(hex.startsWith('474946383761')||hex.startsWith('474946383961'))format='gif';else if(hex.startsWith('52494646')&&ascii.slice(8,12)==='WEBP')format='webp';return Object.freeze({schema:'TERRAFORMER-BINARY-IMAGE-DESCRIPTOR/1',format,recognized:format!=='unknown',bytes:b.length,signature:hex,sha256:crypto.createHash('sha256').update(b).digest('hex'),decodeAdmitted:false,persisted:false})}
Object.assign(globalThis,{TERRAFORMER_IMAGE_SYSTEM});
const {TERRAFORMER_PHOTO_SYSTEM}=require('./terraformer.photo.js');
Object.assign(globalThis,{TERRAFORMER_PHOTO_SYSTEM});
const {TERRAFORMER_VIDEO_SYSTEM,TERRAFORMER_VISUAL_MEDIA_RELATIONSHIPS,tfImageDescribe,tfPhotoDescribe,tfVideoDescribe}=require('./terraformer.video.js');
Object.assign(globalThis,{TERRAFORMER_VIDEO_SYSTEM,TERRAFORMER_VISUAL_MEDIA_RELATIONSHIPS,tfImageDescribe,tfPhotoDescribe,tfVideoDescribe});
const {TERRAFORMER_RECORD_SYSTEM}=require('./terraformer.record.js');
Object.assign(globalThis,{TERRAFORMER_RECORD_SYSTEM});
const {TERRAFORMER_RECORDING_SYSTEM}=require('./terraformer.recording.js');
Object.assign(globalThis,{TERRAFORMER_RECORDING_SYSTEM});
const {TERRAFORMER_AUDIO_RECORDING_SYSTEM}=require('./terraformer.recording.js');
globalThis.TERRAFORMER_AUDIO_RECORDING_SYSTEM=TERRAFORMER_AUDIO_RECORDING_SYSTEM;
const {TERRAFORMER_SELF_RECORDING_SYSTEM}=require('./terraformer.recording.js');
globalThis.TERRAFORMER_SELF_RECORDING_SYSTEM=TERRAFORMER_SELF_RECORDING_SYSTEM;

module.exports=Object.freeze({ID,VERSION,STATES,descriptor,validate,admit,transition,qualify,bindNativeDataImageV04663,TERRAFORMER_IMAGE_SYSTEM,TERRAFORMER_BINARY_IMAGE_SYSTEM,tfBinaryImageInspect});

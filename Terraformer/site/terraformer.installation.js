"use strict";
const SYSTEM=Object.freeze({id:"system.installation",concept:"Installation",authorityGranted:false,scaffold:true});
function bindInstallationV04508(){return Object.freeze({SYSTEM});}
module.exports=Object.freeze({bindInstallationV04508});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfInstallationId(){const dir=path.dirname(TERRAFORMER_INSTALLATION_ID_PATH);fs.mkdirSync(dir,{recursive:true,mode:0o700});try{const v=fs.readFileSync(TERRAFORMER_INSTALLATION_ID_PATH,'utf8').trim();if(/^[0-9a-f-]{36}$/.test(v))return v;throw new Error('Invalid Terraformer installation identity');}catch(e){if(e.code!=='ENOENT')throw e;const id=tfUuidGenerate(),tmp=TERRAFORMER_INSTALLATION_ID_PATH+'.tmp-'+process.pid;fs.writeFileSync(tmp,id+'\n',{mode:0o600});fs.renameSync(tmp,TERRAFORMER_INSTALLATION_ID_PATH);return id;}}


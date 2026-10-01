"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-TOKEN-SYSTEM/1",id:"system.token",concept:"Token",typeOf:"system.system",role:"future-universal-representation",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
const KINDS=Object.freeze(["input","output","system","application","virtual-machine","function","worker","instance","value","data","program"]);
module.exports=Object.freeze({SYSTEM,KINDS});

function classifyMorphologyV04783(token){
 const raw=String(token||'').trim(),lower=raw.toLowerCase(),candidate=[];
 if(/(?:ion|ing)$/.test(lower)) candidate.push(Object.freeze({kind:'system',basis:'morphology-suffix',qualification:'CANDIDATE'}));
 if(/r$/.test(lower)) candidate.push(Object.freeze({kind:'worker',basis:'morphology-final-r',qualification:'CANDIDATE'}));
 return Object.freeze({token:raw,candidates:Object.freeze(candidate),canonical:false,requiresSemanticReconciliation:true,authorityGranted:false});
}
module.exports=Object.freeze({...module.exports,classifyMorphologyV04783});

/* Terraformer v0.47.98: migrated from terraformer.temporary.js; provenance retained. */
function tfTokenBytes(v){try{return Buffer.from(String(v).replace(/-/g,'+').replace(/_/g,'/')+'==='.slice((String(v).length+3)%4),'base64')}catch{return Buffer.alloc(0)}}

/* Terraformer v0.48.2: cross-owner implementation migrated after bridge qualification. */
function tfDiscoverTokens(){TF_TOKEN_CANDIDATES.clear();const roots=[process.cwd(),path.dirname(__filename),tfLaunchSourceDir(),os.homedir(),path.join(os.homedir(),'Downloads'),path.dirname(TERRAFORMER_CANONICAL_PERMANENT_TOKEN_PATH)].filter(Boolean),seen=new Set(),items=[];for(const root of roots){let names=[];try{names=fs.readdirSync(root)}catch{continue}for(const name of names){if(!name.toLowerCase().endsWith('.key'))continue;const file=path.resolve(root,name);if(seen.has(file))continue;seen.add(file);const status=tfTokenCandidateStatus(file),id=crypto.createHash('sha256').update(file).digest('hex').slice(0,20);if(status.valid)TF_TOKEN_CANDIDATES.set(id,{file,status});items.push({id,filename:path.basename(file),location:root===process.cwd()?'working-directory':root===path.dirname(__filename)?'terraformer-directory':root===process.env.TERRAFORMER_LAUNCH_ORIGIN?'launch-origin':root===os.homedir()?'home':root===path.join(os.homedir(),'Downloads')?'downloads':'approved-location',valid:status.valid,type:status.type||null,generation:status.generation??null,reason:status.valid?null:status.reason})}}return {schema:'TERRAFORMER-TOKEN-DISCOVERY-RESULT/1',validCount:items.filter(x=>x.valid).length,candidateCount:items.length,candidates:items,secretValuesExposed:false,recursive:false};}

function tfAutoAdmitPermanentToken(){const d=tfDiscoverTokens(),permanent=d.candidates.filter(x=>x.valid&&x.type==='permanent-backup'),unique=new Map();for(const x of permanent){const c=TF_TOKEN_CANDIDATES.get(x.id);if(!c)continue;try{const o=JSON.parse(fs.readFileSync(c.file,'utf8')),identity=crypto.createHash('sha256').update(tfTokenBytes(o.token)).digest('hex');if(!unique.has(identity))unique.set(identity,c)}catch{}}if(unique.size!==1)return {admitted:false,state:unique.size>1?'AMBIGUOUS_PERMANENT':'NO_VALID_PERMANENT',count:unique.size};const candidate=[...unique.values()][0];if(!candidate)return {admitted:false,state:'CANDIDATE_LOST',count:1};const fresh=tfTokenCandidateStatus(candidate.file);if(!fresh.valid||fresh.type!=='permanent-backup')return {admitted:false,state:'REVALIDATION_FAILED',count:1};const admission=tfAdmitEnvelope(fs.readFileSync(candidate.file));return admission&&admission.type==='permanent-backup'?{admitted:true,state:'PERMANENT_AUTO_ADMITTED',count:1}:{admitted:false,state:'ADMISSION_FAILED',count:1};}

function tfAdmitDiscoveredToken(id){const discovered=tfDiscoverTokens(),candidate=TF_TOKEN_CANDIDATES.get(String(id));if(!candidate)return null;const fresh=tfTokenCandidateStatus(candidate.file);if(!fresh.valid)return null;return tfAdmitEnvelope(fs.readFileSync(candidate.file));}


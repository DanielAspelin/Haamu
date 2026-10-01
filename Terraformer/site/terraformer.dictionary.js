'use strict';
const fs=require('fs'),path=require('path');
const ID='system.dictionary',VERSION='0.47.19',CORPUS='terraformer.englishtokens.json';
function corpus(){return JSON.parse(fs.readFileSync(path.join(__dirname,CORPUS),'utf8'));}
function normalize(v){const x=String(v||'').trim().toLowerCase();return /^[a-z]+$/.test(x)?x:null;}
function has(v){const x=normalize(v);if(!x)return false;return corpus().tokens.includes(x);}
function lookup(prefix='',limit=100){const q=normalize(prefix)||'';const n=Math.max(1,Math.min(1000,Number(limit)||100));return Object.freeze(corpus().tokens.filter(x=>x.startsWith(q)).slice(0,n));}
function describe(){const x=corpus();return Object.freeze({id:ID,version:VERSION,canonicalPath:'terraformer://dictionary/',language:x.language,tokens:x.counts.tokens,oneWord:true,automaticSystemAdmission:false,authority:false});}
function selfTest(){return Object.freeze({pass:has('system')&&lookup('qualif',10).includes('qualification')&&!has('two words')});}
module.exports=Object.freeze({ID,VERSION,CORPUS,corpus,normalize,has,lookup,describe,selfTest});

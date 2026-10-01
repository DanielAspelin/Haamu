'use strict';
const fs=require('fs'),path=require('path');
const ID='system.reservation',VERSION='0.47.20',REGISTRY_FILE='terraformer.reserved.json';
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,REGISTRY_FILE),'utf8'));if(x.kind!=='URI_TOKEN_RESERVATION'||x.reservation.executionAuthority!==false)throw Error(ID+': invalid reservation registry');return x;}
function normalize(v){const x=String(v||'').trim().toLowerCase();return /^[a-z]+$/.test(x)?x:null;}
function isReserved(v){const x=normalize(v);return !!x&&registry().tokens.includes(x);}
function describe(v){const x=normalize(v),r=registry();return Object.freeze({token:x,reserved:!!x&&r.tokens.includes(x),disposition:x&&r.tokens.includes(x)?'RESERVED':'UNRESERVED',admitted:false,canonical:false,entityCreated:false,systemCreated:false,authority:false});}
function selfTest(){const r=registry(),a=describe('system'),b=describe('two words');return Object.freeze({pass:r.reservation.tokenCount===r.tokens.length&&a.reserved&&!a.admitted&&!a.canonical&&!a.authority&&!b.reserved,count:r.tokens.length});}
module.exports=Object.freeze({ID,VERSION,REGISTRY_FILE,registry,normalize,isReserved,describe,selfTest});

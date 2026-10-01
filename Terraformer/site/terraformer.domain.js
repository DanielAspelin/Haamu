'use strict';
const ID='terraformer.domain',VERSION='0.44.4';
function normalizeName(v){const s=String(v||'').trim().toLowerCase();if(!s||s.length>253||!/^([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(s))throw Error('DOMAIN_NAME_INVALID');return s;}
function describe(v){return Object.freeze({name:normalizeName(v),resolved:false,authoritative:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'domain naming validation; no DNS authority',authority:'NO_DNS_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
const TERRAFORMER_DOMAIN_SYSTEM=Object.freeze({schema:'TERRAFORMER-DOMAIN-SYSTEM/1',id:'system.domain',name:'Domain System',family:'network',type:'domain-system',state:'integrated',canonicalPath:'terraformer://domain/',dependsOn:Object.freeze(['system.internet']),governs:Object.freeze(['domain','name','resolution','mapping','service-relation']),rule:'Domain System represents domain naming and resolution relationships; it does not imply domain ownership, DNS authority, registration, or mutation rights.'});

module.exports=Object.freeze({ID,VERSION,descriptor,normalizeName,describe,TERRAFORMER_DOMAIN_SYSTEM});

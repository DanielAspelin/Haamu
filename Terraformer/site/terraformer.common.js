'use strict';
const ID='terraformer.common',VERSION='0.44.8';
function record(x={}){if(!x||typeof x!=='object'||Array.isArray(x))throw Error('COMMON_RECORD_INVALID');return Object.freeze({...x});}
function text(x){return String(x==null?'':x);}
function flag(x){return x===true;}
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'authority-neutral shared primitives',authority:false});}
function qualify(){return Object.freeze({pass:descriptor().authority===false&&Object.isFrozen(record({a:1})),id:ID});}
const TERRAFORMER_COMMON_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMMON-SYSTEM/1',id:'system.common',name:'Common System',family:'platform',type:'cross-platform-common-capability',state:'integrated',platforms:Object.freeze(['windows','macos','debian','fedora','android','ios-ipados']),capabilities:Object.freeze(['runtime-contract','filesystem-abstraction','network-abstraction','process-contract','URI-contract','presentation-contract','logging','reporting','qualification','lifecycle']),rule:'Common System defines interoperable contracts only; platform-specific authority, authentication, permissions, service control and packaging remain native-platform responsibilities.'});

module.exports=Object.freeze({ID,VERSION,record,text,flag,descriptor,qualify,TERRAFORMER_COMMON_SYSTEM});

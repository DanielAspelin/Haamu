'use strict';
const ID='terraformer.global',VERSION='0.44.8';
function describe(x={}){return Object.freeze({id:ID,version:VERSION,scope:'global',target:String(x.target||''),authority:false,public:false});}
function admit(x={}){return Object.freeze({pass:x&&typeof x==='object'&&!Array.isArray(x),descriptor:describe(x),authority:false});}
function authorize(){return Object.freeze({pass:false,reason:'GLOBAL_SCOPE_DOES_NOT_CREATE_INTERNET_OR_EXTERNAL_AUTHORITY'});}
module.exports=Object.freeze({ID,VERSION,describe,admit,authorize});

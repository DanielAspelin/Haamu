'use strict';
const ID='terraformer.local',VERSION='0.44.8';
function describe(x={}){return Object.freeze({id:ID,version:VERSION,scope:'local',target:String(x.target||''),authority:false});}
function admit(x={}){return Object.freeze({pass:x&&typeof x==='object'&&!Array.isArray(x),descriptor:describe(x),authority:false});}
function authorize(){return Object.freeze({pass:false,reason:'LOCAL_SCOPE_DOES_NOT_CREATE_HOST_OR_FILESYSTEM_AUTHORITY'});}
module.exports=Object.freeze({ID,VERSION,describe,admit,authorize});

/* Terraformer v0.48.14: qualified immutable depth-0 declaration migration. */
const TF_ANDROID_LOCAL_TEST_TAP_V409=Object.freeze({id:"system.android-local-test-tap",version:"0.40.9",platform:"Android",presentationPort:9966,bind:"127.0.0.1",interaction:"direct-inline-tap-fallback",admission:"loopback-explicit-env-only",session:"volatile",destination:"OPERATIONS",persistentCredential:false,authorityAmplification:false});

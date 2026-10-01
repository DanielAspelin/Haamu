'use strict';
const fs=require('fs'),path=require('path');
const ID='system.json',VERSION='0.44.10',BOUNDARY='SYSTEM_BOUNDARY';
function validate(v){if(v===undefined||typeof v==='function'||typeof v==='symbol'||typeof v==='bigint')throw Error('JSON_VALUE_INVALID');return true;}
function parse(s){if(typeof s!=='string')throw Error('JSON_INPUT_INVALID');try{return JSON.parse(s);}catch(e){throw Error('JSON_PARSE_INVALID');}}
function stringify(v){validate(v);const s=JSON.stringify(v);if(s===undefined)throw Error('JSON_SERIALIZE_INVALID');return s;}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,descriptor,parse,stringify,validate});

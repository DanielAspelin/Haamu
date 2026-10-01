'use strict';
const fs=require('fs'),path=require('path');
const ID='system.csv',VERSION='0.44.10',BOUNDARY='SYSTEM_BOUNDARY';
function validate(rows){if(!Array.isArray(rows)||rows.some(r=>!Array.isArray(r)))throw Error('CSV_ROWS_INVALID');return true;}
function parse(s){if(typeof s!=='string')throw Error('CSV_INPUT_INVALID');const out=[];let row=[],f='',q=false;for(let i=0;i<s.length;i++){const c=s[i];if(q){if(c==='"'&&s[i+1]==='"'){f+='"';i++;}else if(c==='"')q=false;else f+=c;}else if(c==='"'){if(f)throw Error('CSV_QUOTE_INVALID');q=true;}else if(c===','){row.push(f);f='';}else if(c==='\n'){row.push(f.replace(/\r$/,''));out.push(row);row=[];f='';}else f+=c;}if(q)throw Error('CSV_UNTERMINATED_QUOTE');if(f||row.length){row.push(f.replace(/\r$/,''));out.push(row);}return out;}
function stringify(rows){validate(rows);return rows.map(r=>r.map(v=>{const s=String(v??'');return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}).join(',')).join('\n');}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,descriptor,parse,stringify,validate});

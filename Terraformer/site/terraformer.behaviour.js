'use strict';
const fs=require('fs'),path=require('path');
const ID='system.behaviour',VERSION='0.44.15',BOUNDARY='DIMENSION_BOUNDARY',DIMENSION='BEHAVIOR';
const ALIASES=Object.freeze(['BEHAVIOUR','BEHAVIOR']);
function registry(){const x=JSON.parse(fs.readFileSync(path.join(__dirname,'terraformer.dimensions.json'),'utf8'));if(x.kind!=='DIMENSION_REGISTRY'||x.authority!==false||!Array.isArray(x.dimensions)||!x.dimensions.includes(DIMENSION))throw Error(ID+': dimension registry mismatch');return Object.freeze(x);}
function normalize(value){if(typeof value!=='string'||!value.trim())throw Error(ID+': invalid value');const v=value.trim().toUpperCase();if(v==='BEHAVIOUR')return 'BEHAVIOR';return v;}
function validate(value){const v=normalize(value);return Object.freeze({dimension:DIMENSION,value:v,valid:true,authority:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,dimension:DIMENSION,controller:ID+'.controller',adapter:ID+'.adapter',bridge:ID+'.bridge',authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function qualify(){registry();const q=validate('behaviour');return Object.freeze({pass:q.valid&&q.authority===false,id:ID,dimension:DIMENSION});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,DIMENSION,ALIASES,registry,normalize,validate,descriptor,qualify});

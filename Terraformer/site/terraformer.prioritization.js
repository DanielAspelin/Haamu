"use strict";
const SYSTEM=Object.freeze({schema:"TERRAFORMER-PRIORITIZATION-SYSTEM/1",id:"system.prioritization",concept:"Prioritization",typeOf:"system.system",uses:"system.priority",qualification:"UNDER_CONDITIONAL_EXPERIMENT",authorityGranted:false});
function compare(a,b){const A=require("./terraformer.priority.js").normalize(a),B=require("./terraformer.priority.js").normalize(b);return A===B?0:(A<B?-1:1);}
function order(records=[]){return Object.freeze([...records].map((x,i)=>({...x,__i:i})).sort((a,b)=>compare(a.priority,b.priority)||a.__i-b.__i).map(({__i,...x})=>Object.freeze(x)));}
module.exports=Object.freeze({SYSTEM,compare,order});

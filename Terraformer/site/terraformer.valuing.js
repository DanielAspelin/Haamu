'use strict';
const Value=require('./terraformer.value.js');
const DESCRIPTOR=Object.freeze({
 schema:'TERRAFORMER-VALUING-SYSTEM/1',id:'system.valuing',name:'Valuing System',
 typeOf:'system.system',input:'admitted value intent or source',
 output:'bounded Value representation',authorityGranted:false,
 mutationGranted:false,persistenceGranted:false
});
function establish(data,meta={}){return Value.value(data,meta);}
function resolve(candidate){if(!Value.validate(candidate))throw Error('valuing: valid Value required');return candidate;}
function compare(a,b){resolve(a);resolve(b);return Object.freeze({equal:Object.is(a.data,b.data),authorityGranted:false});}
module.exports=Object.freeze({DESCRIPTOR,establish,resolve,compare});

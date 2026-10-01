'use strict';
const DESCRIPTOR=Object.freeze({schema:'TERRAFORMER-SIZING-SYSTEM/1',id:'system.sizing',name:'Sizing System',typeOf:'system.adjustment',registry:'terraformer.sizes.json',authorityGranted:false});
function size(value,unit='logical'){if(!Number.isFinite(value)||value<0)throw Error('sizing: finite non-negative size required');return Object.freeze({size:value,unit,authorityGranted:false});}
module.exports=Object.freeze({DESCRIPTOR,size});

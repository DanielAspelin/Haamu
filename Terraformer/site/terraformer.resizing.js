'use strict';
const sizing=require('./terraformer.sizing.js');
const DESCRIPTOR=Object.freeze({schema:'TERRAFORMER-RESIZING-SYSTEM/1',id:'system.resizing',name:'Resizing System',typeOf:'system.adjustment',authorityGranted:false});
function resize(previous,value,unit='logical'){return Object.freeze({previous,next:sizing.size(value,unit),authorityGranted:false,persisted:false});}
module.exports=Object.freeze({DESCRIPTOR,resize});

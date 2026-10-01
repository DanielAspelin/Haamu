'use strict';
const DESCRIPTOR=Object.freeze({schema:'TERRAFORMER-ADJUSTMENT-SYSTEM/1',id:'system.adjustment',name:'Adjustment System',typeOf:'system.system',authorityGranted:false,persistenceGranted:false});
function adjust(current,parameters,mode='CUSTOMIZED'){if(!parameters||typeof parameters!=='object')throw Error('adjustment: parameters required');return Object.freeze({previous:current,next:Object.freeze({...parameters}),mode,authorityGranted:false,persisted:false});}
function restore(defaults,customized,target='DEFAULT'){const t=String(target).toUpperCase();if(t!=='DEFAULT'&&t!=='CUSTOMIZED')throw Error('adjustment: restore target must be DEFAULT or CUSTOMIZED');const src=t==='DEFAULT'?defaults:customized;if(!src||typeof src!=='object')throw Error('adjustment: admitted restore parameters required');return Object.freeze({mode:t,parameters:Object.freeze({...src}),authorityGranted:false,persisted:false});}
module.exports=Object.freeze({DESCRIPTOR,adjust,restore});

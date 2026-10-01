'use strict';
const TARGET_KINDS=Object.freeze(['system','application']);
const METHODS=Object.freeze(['logical','in-space','on-ground']);
const SYSTEMS=Object.freeze([
 Object.freeze({id:'system.shine',concept:'Shine',type:'command-system',state:'available'}),
 Object.freeze({id:'system.shining',concept:'Shining',type:'process-system',state:'ready'}),
 Object.freeze({id:'system.shiner',concept:'Shiner',type:'actor-system',state:'ready'})
]);
const RELATIONSHIPS=Object.freeze([
 Object.freeze({from:'system.shine',relation:'commences',to:'system.shining'}),
 Object.freeze({from:'system.shining',relation:'performed-by',to:'system.shiner'}),
 Object.freeze({from:'system.shining',relation:'may-use',to:'system.reflection'}),
 Object.freeze({from:'system.shining',relation:'may-use',to:'system.reflecting'}),
 Object.freeze({from:'system.shining',relation:'may-use',to:'system.reflector'}),
 Object.freeze({from:'system.shining',relation:'may-use',to:'system.mirroring'}),
 Object.freeze({from:'system.shining',relation:'may-use',to:'system.mirror'}),
 Object.freeze({from:'system.shining',relation:'may-have-context',to:'system.in-space'}),
 Object.freeze({from:'system.shining',relation:'may-have-context',to:'system.on-ground'})
]);
const BOUNDARY=Object.freeze({logicalByDefault:true,physicalImplementationOptional:true,automaticTransmission:false,automaticTargeting:false,automaticHardwareActuation:false,automaticNetwork:false,automaticPersistence:false,automaticGeolocation:false,physicalPresenceClaim:false,externalEffect:false,authorityAmplification:false});
function shine(target,options={}){
 if(!target||typeof target!=='object')throw new Error('[TF:system.shine:target-required] target descriptor required');
 const kind=String(target.kind||'').toLowerCase();
 if(!TARGET_KINDS.includes(kind))throw new Error('[TF:system.shine:target-not-admitted] only System or Application targets are admitted');
 const id=String(target.id||'').trim(); if(!id)throw new Error('[TF:system.shine:target-id-required] target id required');
 const method=String(options.method||'logical').toLowerCase();
 if(!METHODS.includes(method))throw new Error('[TF:system.shine:method-not-admitted] method must be logical, in-space, or on-ground');
 return Object.freeze({schema:'TERRAFORMER-SHINE/1',command:'system.shine',process:'system.shining',actor:'system.shiner',target:Object.freeze({kind,id}),method,spatialContext:method==='in-space'?'system.in-space':method==='on-ground'?'system.on-ground':null,reflection:'system.reflection',reflector:'system.reflector',mirroring:'system.mirroring',mirror:'system.mirror',commenced:true,...BOUNDARY});
}
function qualify(){const s=shine({kind:'system',id:'system.test'}),a=shine({kind:'application',id:'application.test'},{method:'on-ground'}),f=[];if(!s.commenced||s.externalEffect||s.authorityAmplification)f.push('system');if(a.spatialContext!=='system.on-ground')f.push('ground');try{shine({kind:'program',id:'program.test'});f.push('target-gate')}catch(e){};if(f.length)throw new Error('Shining qualification failed: '+f.join(','));return Object.freeze({pass:true,version:'0.47.33',systems:3,targetKinds:TARGET_KINDS,methods:METHODS,reflectionReused:true,mirroringReused:true,spatialScopesReused:true,externalEffect:false,authorityAmplification:false});}
module.exports=Object.freeze({SYSTEMS,RELATIONSHIPS,BOUNDARY,TARGET_KINDS,METHODS,shine,qualify});

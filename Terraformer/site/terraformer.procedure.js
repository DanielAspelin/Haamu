'use strict';
const TERRAFORMER_PROCEDURE_SYSTEM=Object.freeze({schema:'TERRAFORMER-PROCEDURE-SYSTEM/1',id:'system.procedure',name:'Procedure System',family:'computation',type:'procedure-system',state:'integrated',canonicalPath:'terraformer://procedure/',dependsOn:Object.freeze(['system.algorithm']),rule:'Procedure System sequences admitted steps; a procedure inherits no authority beyond each admitted step.'});

module.exports=Object.freeze({TERRAFORMER_PROCEDURE_SYSTEM});

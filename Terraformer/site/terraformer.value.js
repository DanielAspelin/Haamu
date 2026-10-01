'use strict';
const DESCRIPTOR=Object.freeze({
 schema:'TERRAFORMER-VALUE-SYSTEM/1',id:'system.value',name:'Value System',
 typeOf:'system.system',registry:'terraformer.values.json',
 authorityGranted:false,mutationGranted:false,persistenceGranted:false
});
function value(data,meta={}){
 return Object.freeze({schema:'TERRAFORMER-VALUE/1',data,
  type:meta.type||typeof data,unit:meta.unit||null,scope:meta.scope||null,
  provenance:meta.provenance||null,qualification:meta.qualification||'UNVERIFIED',
  authorityGranted:false});
}
function validate(v){return !!v&&v.schema==='TERRAFORMER-VALUE/1'&&v.authorityGranted===false;}
module.exports=Object.freeze({DESCRIPTOR,value,validate});

"use strict";
function bindRegistrarV04450(deps={}){
 const state=new Map();
 function descriptor(){return Object.freeze({schema:"TERRAFORMER-REGISTRAR/1",id:"system.registrar",name:"Registrar System",role:"describes the registrar actor/worker role without conferring authority",authorityGranted:false,persists:false});}
 function record(id,value,options={}){if(!options.authorized) throw new Error("registrar: authorization required"); const r=Object.freeze({id:String(id),value,status:"registered",authorityGranted:false});state.set(r.id,r);return r;}
 function lookup(id){return state.get(String(id))||null;}
 function inventory(){return Object.freeze([...state.values()]);}
 return Object.freeze({descriptor,record,lookup,inventory});
}
module.exports={bindRegistrarV04450};

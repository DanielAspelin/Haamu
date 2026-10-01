'use strict';
const ID='terraformer.persistence', VERSION='0.44.2';
function admit(req={}){const mode=req.mode??'VOLATILE';if(mode==='VOLATILE')return Object.freeze({pass:true,mode,physicalWrite:false});if(mode!=='PERSISTENT')return Object.freeze({pass:false,mode,reason:'UNKNOWN_MODE',physicalWrite:false});const pass=req.authorized===true&&req.qualified===true&&req.transactionAdmitted===true;return Object.freeze({pass,mode,reason:pass?null:'PERSISTENCE_NOT_ADMITTED',physicalWrite:pass});}
function qualify(){return Object.freeze({pass:admit().pass&&!admit({mode:'PERSISTENT'}).pass&&admit({mode:'PERSISTENT',authorized:true,qualified:true,transactionAdmitted:true}).pass,id:ID});}
module.exports=Object.freeze({ID,VERSION,admit,qualify});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfPersistenceStateV383(projectId="terraformer"){
 const id=String(projectId||"terraformer");
 return Object.freeze({projectId:id,version:"0.38.3",transversion:"tv0.38.3",origin:id+"::origin",
  saved:false,checkpointHead:null,versionHead:null,transversionHead:null,recoveryHead:null,
  changeEntries:Object.freeze([]),mainEntries:Object.freeze([]),committedHead:null,generation:0});
}

function tfCommitPersistenceV383(state,change,{requested=false,controller=false,sandbox=false,validated=false,qualified=false,transaction=false,saveAdmitted=false,version="0.38.3",transversion="tv0.38.3"}={}){
 const before=state||tfPersistenceStateV383(),gates=Object.freeze({
  requested:Boolean(requested),controller:Boolean(controller),sandbox:Boolean(sandbox),validated:Boolean(validated),
  qualified:Boolean(qualified),transaction:Boolean(transaction),saveAdmitted:Boolean(saveAdmitted)
 });
 if(!Object.values(gates).every(Boolean))return Object.freeze({committed:false,state:before,gates,reason:"persistence-gate-denied",atomic:true});
 const generation=Number(before.generation||0)+1,base=before.projectId+"::g"+String(generation).padStart(8,"0");
 const checkpoint=base+"::checkpoint",changeEntry=base+"::change",mainEntry=base+"::main",
  recovery=base+"::recovery",head=base+"::committed";
 const after=Object.freeze({...before,saved:true,checkpointHead:checkpoint,versionHead:String(version),
  transversionHead:String(transversion),recoveryHead:recovery,
  changeEntries:Object.freeze([...(before.changeEntries||[]),Object.freeze({id:changeEntry,checkpoint,change:change||null,version:String(version),transversion:String(transversion)})]),
  mainEntries:Object.freeze([...(before.mainEntries||[]),Object.freeze({id:mainEntry,changeEntry,checkpoint})]),
  committedHead:head,generation});
 return Object.freeze({committed:true,state:after,gates,checkpoint,changeEntry,mainEntry,recovery,head,atomic:true,originPreserved:after.origin===before.origin});
}


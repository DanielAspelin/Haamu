'use strict';
const path=require('path');
const ROOT=require('./terraformer.root.js');
const SHINING=require('./terraformer.shining.js');
const ENTRY=Object.freeze({
 schema:'TERRAFORMER-CANONICAL-ENTRY/1',
 id:'program.terraformer',
 file:'terraformer.js',
 responsibilities:Object.freeze(['node-invocation-entry','http-https-access-entry']),
 implementationOwnership:'external-modules',
 temporaryCompatibilitySource:'terraformer.temporary.js',
 automaticListen:false,
 automaticPrivilege:false,
 automaticPersistence:false
});
function describe(){return Object.freeze({entry:ENTRY,root:ROOT.TERRAFORMER_ROOT_SYSTEM,shining:SHINING.SYSTEMS});}
function shine(target,options={}){return SHINING.shine(target,options);}
function loadTemporary(){return require('./terraformer.temporary.js');}
function invoke(argv=process.argv.slice(2)){
 const args=[...argv];
 if(args.includes('--describe'))return describe();
 if(args.includes('--temporary'))return loadTemporary();
 return Object.freeze({schema:'TERRAFORMER-INVOCATION/1',mode:'node',entry:ENTRY.id,admitted:true,
  compatibilityHandoffRequired:true,executed:false,message:'Canonical entry admitted. Explicit --temporary invokes the construction compatibility source.'});
}
function access(request={}){
 const protocol=String(request.protocol||'http').replace(/:$/,'').toLowerCase();
 if(protocol!=='http'&&protocol!=='https')throw new Error('Unsupported access protocol');
 return Object.freeze({schema:'TERRAFORMER-ACCESS/1',protocol,entry:ENTRY.id,root:'system.root',
  requestAccepted:true,serverStarted:false,portBound:false,networkExposure:false,
  dispatchOwner:protocol==='https'?'system.https':'system.http'});
}
module.exports=Object.freeze({ENTRY,describe,invoke,access,shine,loadTemporary});
if(require.main===module){
 const result=invoke();
 if(result!==undefined)process.stdout.write(JSON.stringify(result,null,2)+'\n');
}

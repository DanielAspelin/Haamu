'use strict';
const fs=require('fs'),path=require('path');
const ID='terraformer.application',VERSION='0.47.83',REGISTRY='terraformer.applications.json',KIND='APPLICATION_REGISTRY';
function loadRegistry(){const p=path.join(__dirname,REGISTRY),x=JSON.parse(fs.readFileSync(p,'utf8'));if(x.version!==VERSION||x.kind!==KIND||x.authority!==false)throw Error(ID+': invalid registry');return Object.freeze(x);}
function descriptor(){return Object.freeze({id:ID,version:VERSION,registry:REGISTRY,authority:'GOVERNED_BY_TERRAFORMER'});}
function qualify(){const r=loadRegistry();return Object.freeze({pass:r.kind===KIND&&r.authority===false,id:ID,registry:REGISTRY});}

const TERRAFORMER_APPLICATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-APPLICATION-SYSTEM/1',id:'system.application',name:'Application System',family:'software',type:'application-system',state:'integrated',canonicalPath:'terraformer://application/',dependsOn:Object.freeze(['system.system','system.platform']),governs:Object.freeze(['application','lifecycle','presentation','interaction','capability','entry']),rule:'Application System composes admitted underlying Systems into user-facing capabilities inside a Program; Systems remain behind the Application interaction boundary by default. Application identity does not amplify authority.'});

module.exports=Object.freeze({ID,VERSION,REGISTRY,loadRegistry,descriptor,qualify,TERRAFORMER_APPLICATION_SYSTEM});

const APPLICATION_LAYER_V04783=Object.freeze({schema:'TERRAFORMER-APPLICATION-LAYER/1',version:'0.47.83',developmentPredecessor:'system.system',presentationParent:'system.program',developmentOrder:Object.freeze(['system.system','system.application','system.program']),userProjection:Object.freeze(['system.program','system.application','system.system']),systemsHiddenByDefault:true,authorityGranted:false});
module.exports=Object.freeze({...module.exports,APPLICATION_LAYER_V04783});

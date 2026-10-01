'use strict';
const ID='terraformer.linux', VERSION='0.44.5';
const DENIED=Object.freeze(['shell','root','elevation','package-management','filesystem-mutation','device-access','persistence','deployment']);
function describe(f={}){return Object.freeze({id:ID,version:VERSION,family:'linux',kernel:String(f.kernel||''),distribution:String(f.distribution||''),authority:false});}
function admit(f={}){const d=describe(f);return Object.freeze({pass:d.family==='linux',descriptor:d,denied:DENIED});}
function authorize(){return Object.freeze({pass:false,reason:'PLATFORM_DETECTION_IS_NOT_OPERATIONAL_AUTHORITY'});}
const TERRAFORMER_LINUX_SYSTEM=Object.freeze({schema:'TERRAFORMER-PLATFORM-FAMILY-SYSTEM/1',id:'system.linux',name:'Linux System',uriRoot:'linux',children:Object.freeze(['system.platform.debian','system.platform.fedora']),type:'platform-family-taxonomy',authority:'classification/navigation only'});

module.exports=Object.freeze({ID,VERSION,DENIED,describe,admit,authorize,TERRAFORMER_LINUX_SYSTEM});

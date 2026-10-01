'use strict';
const ID='terraformer.internet',VERSION='0.44.4';
function admitIntent(x){if(!x||typeof x!=='object')throw Error('INTERNET_INTENT_INVALID');if(!(x.authorized===true&&x.validated===true&&x.qualified===true))throw Error('INTERNET_INTENT_NOT_ADMITTED');return Object.freeze({admitted:true,target:String(x.target||''),connected:false,external:true});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'external-network intent admission',authority:'NO_EXTERNAL_CONNECTIVITY_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
const TERRAFORMER_INTERNET_SYSTEM=Object.freeze({schema:'TERRAFORMER-INTERNET-SYSTEM/1',id:'system.internet',name:'Internet System',family:'network',type:'internet-system',state:'integrated',canonicalPath:'terraformer://internet/',dependsOn:Object.freeze(['system.network','protocol.internet.service']),integratesWith:Object.freeze(['system.domain','system.web']),rule:'Internet System represents admitted Internet connectivity and service relationships; registration does not establish connectivity or authorize external communication.'});

module.exports=Object.freeze({ID,VERSION,descriptor,admitIntent,TERRAFORMER_INTERNET_SYSTEM});

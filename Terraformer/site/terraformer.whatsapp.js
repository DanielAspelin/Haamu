'use strict';
const ID='terraformer.whatsapp',VERSION='0.44.4';
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'distinct Whatsapp service boundary',credentials:false,authenticatedSession:false,providerEntitlement:false,liveConnectivity:false,authority:'NO_PROVIDER_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function admit(x){if(!x||typeof x!=='object')throw Error('WHATSAPP_OPERATION_INVALID');if(x.credentials===true||x.authenticatedSession===true||x.providerEntitlement===true||x.liveConnectivity===true)throw Error('WHATSAPP_PROVIDER_CAPABILITY_UNQUALIFIED');if(!(x.authorized===true&&x.validated===true&&x.qualified===true))throw Error('WHATSAPP_OPERATION_NOT_ADMITTED');return Object.freeze({admitted:true,operation:String(x.operation||'DESCRIBE'),providerConnected:false});}
module.exports=Object.freeze({ID,VERSION,descriptor,admit});

'use strict';
const ID='terraformer.api',VERSION='0.44.4';
function admit(x){if(!x||typeof x!=='object'||!x.route)throw Error('API_CALL_INVALID');if(!(x.authorized===true&&x.validated===true&&x.qualified===true))throw Error('API_CALL_NOT_ADMITTED');return Object.freeze({admitted:true,route:String(x.route),method:String(x.method||'CALL').toUpperCase(),payload:x.payload});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'governed API call admission',authority:'NO_PROVIDER_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,descriptor,admit});

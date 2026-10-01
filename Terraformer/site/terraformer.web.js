'use strict';
const ID='terraformer.web',VERSION='0.44.4';
function admitRequest(x){if(!x||typeof x!=='object')throw Error('WEB_REQUEST_INVALID');const scheme=String(x.scheme||'http').toLowerCase();if(!['http','https'].includes(scheme))throw Error('WEB_SCHEME_INVALID');if(!(x.authorized===true&&x.validated===true&&x.qualified===true))throw Error('WEB_REQUEST_NOT_ADMITTED');return Object.freeze({admitted:true,scheme,method:String(x.method||'GET').toUpperCase(),published:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,responsibility:'HTTP(S) surface admission; no publication implication',authority:'NO_PUBLICATION_AUTHORITY',qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
const TERRAFORMER_WEB_SYSTEM=Object.freeze({schema:'TERRAFORMER-WEB-SYSTEM/1',id:'system.web',name:'Web System',family:'web',type:'web-system',state:'integrated',canonicalPath:'terraformer://web/',dependsOn:Object.freeze(['system.internet','system.client','system.server']),integratesWith:Object.freeze(['system.www','system.page','system.browser']),rule:'Web System composes admitted web client/server and presentation capabilities; it does not automatically expose a service to the Internet.'});

module.exports=Object.freeze({ID,VERSION,descriptor,admitRequest,TERRAFORMER_WEB_SYSTEM});

'use strict';
const TERRAFORMER_WWW_SYSTEM=Object.freeze({schema:'TERRAFORMER-WWW-SYSTEM/1',id:'system.www',name:'WWW System',family:'web',type:'world-wide-web-system',state:'integrated',canonicalPath:'terraformer://web/www/',dependsOn:Object.freeze(['system.web','system.domain']),governs:Object.freeze(['web-resource','hyperlink','address','document-relation','navigation']),rule:'WWW System models World Wide Web resource relationships over the Web System without claiming control of the public Web or DNS.'});

module.exports=Object.freeze({TERRAFORMER_WWW_SYSTEM});

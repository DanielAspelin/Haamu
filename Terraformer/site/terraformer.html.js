'use strict';
const TERRAFORMER_HTML_SYSTEM=Object.freeze({schema:'TERRAFORMER-HTML-SYSTEM/1',id:'system.html',name:'HTML System',family:'document',type:'markup-structure',mode:'browser/DOM-integrated',state:'integrated',input:'HTML markup / document construction',output:'document structure for DOM parsing',authority:'Browser System -> HTML System -> DOM System',capabilities:Object.freeze(['document','element-markup','semantic-structure','attribute-markup','form-markup','media-markup','serialization']),persistence:false});

const FOREGROUND_PRESENTATION=Object.freeze({owner:"system.foreground",scope:"VISUAL_PRESENTATION",role:"STRUCTURE",identityPreserved:true,authorityGranted:false});
module.exports=Object.freeze({FOREGROUND_PRESENTATION,TERRAFORMER_HTML_SYSTEM});

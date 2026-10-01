"use strict";
const SYSTEM=Object.freeze({id:"system.container",concept:"Container",authorityGranted:false,scaffold:true});
function bindContainerV04514(){return Object.freeze({SYSTEM});}
const TERRAFORMER_CONTAINER_SYSTEM=Object.freeze({schema:'TERRAFORMER-CONTAINER-SYSTEM/1',id:'system.container',name:'Container System',family:'containment',type:'container-system',state:'integrated',canonicalPath:'terraformer://container/',dependsOn:Object.freeze(['system.resource']),governs:Object.freeze(['container', 'boundary', 'content-reference', 'capacity', 'lifecycle']),rule:'Container System models bounded containment; a container identity does not imply OS-container isolation, execution, persistence, or deployment.'});

module.exports=Object.freeze({bindContainerV04514,TERRAFORMER_CONTAINER_SYSTEM});

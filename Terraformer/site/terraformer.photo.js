'use strict';
const TERRAFORMER_PHOTO_SYSTEM=Object.freeze({schema:'TERRAFORMER-PHOTO-SYSTEM/1',id:'system.photo',name:'Photo System',family:'media',type:'photographic-image-system',state:'integrated-contract',canonicalPath:'terraformer://photo/',dependsOn:Object.freeze(['system.image']),governs:Object.freeze(['photo','capture-result','orientation','dimensions','format','metadata']),requirements:Object.freeze(['admitted-image-or-capture','permission-when-capture-required']),rule:'Photo System specializes Image System for photographic content. Camera capture is not implied by registration and remains permission/capability bounded.'});

module.exports=Object.freeze({TERRAFORMER_PHOTO_SYSTEM});

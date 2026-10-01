'use strict';
const TERRAFORMER_TIME_SYSTEM=Object.freeze({schema:'TERRAFORMER-TIME-SYSTEM/1',id:'system.time',name:'Time System',family:'temporal',type:'system',state:'integrated',canonicalPath:'terraformer://time/',governs:Object.freeze(['instant','duration','sequence','interval','timestamp','ordering']),rule:'Time System is Terraformer temporal representation and ordering authority within admitted operations; external civil time remains source-dependent.'});

module.exports=Object.freeze({TERRAFORMER_TIME_SYSTEM});

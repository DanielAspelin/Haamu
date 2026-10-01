'use strict';
const TERRAFORMER_COMPRESSION_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMPRESSION-SYSTEM/1',id:'system.compression',name:'Compression System',family:'data',type:'transformation-system',state:'integrated',canonicalPath:'terraformer://compression/',runtime:'Node.js zlib where applicable',formats:Object.freeze(['gzip','deflate','brotli']),operations:Object.freeze(['compress','stream-compress','inspect']),rule:'Compression transforms admitted data without implying archive structure or persistence authority.'});

module.exports=Object.freeze({TERRAFORMER_COMPRESSION_SYSTEM});

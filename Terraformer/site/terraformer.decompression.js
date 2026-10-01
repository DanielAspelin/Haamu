'use strict';
const TERRAFORMER_DECOMPRESSION_SYSTEM=Object.freeze({schema:'TERRAFORMER-DECOMPRESSION-SYSTEM/1',id:'system.decompression',name:'Decompression System',family:'data',type:'transformation-system',state:'integrated',canonicalPath:'terraformer://decompression/',runtime:'Node.js zlib where applicable',formats:Object.freeze(['gzip','deflate','brotli']),operations:Object.freeze(['decompress','stream-decompress','inspect']),rule:'Decompression transforms admitted compressed data and must not by itself authorize filesystem extraction or overwrite.'});

module.exports=Object.freeze({TERRAFORMER_DECOMPRESSION_SYSTEM});

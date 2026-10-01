'use strict';
const TERRAFORMER_ARCHIVE_SYSTEM=Object.freeze({schema:'TERRAFORMER-ARCHIVE-SYSTEM/2',id:'system.archive',name:'Archive System',family:'storage',type:'archive-system',state:'integrated',canonicalPath:'terraformer://archive/',formats:Object.freeze(['zip','tar']),uses:Object.freeze(['system.reader','system.writer','system.compression','system.decompression']),rule:'Archive System governs archive structure, preservation, inspection, and controlled extraction; persistence remains separately authorized.'});

module.exports=Object.freeze({TERRAFORMER_ARCHIVE_SYSTEM});

'use strict';
const TERRAFORMER_CLOCK_SYSTEM=Object.freeze({schema:'TERRAFORMER-CLOCK-SYSTEM/1',id:'system.clock',name:'Clock System',family:'temporal',type:'system',state:'integrated',canonicalPath:'terraformer://time/clock/',governs:Object.freeze(['clock-source','tick','monotonic-reading','wall-reading','resolution']),dependsOn:Object.freeze(['system.time']),rule:'Clock System supplies and classifies clock observations; a clock reading is evidence of time measurement, not scheduling authority.'});

module.exports=Object.freeze({TERRAFORMER_CLOCK_SYSTEM});

'use strict';
const TERRAFORMER_GRAPHICS_SYSTEM=Object.freeze({schema:'TERRAFORMER-GRAPHICS-SYSTEM/1',id:'system.graphics',name:'Graphics System',family:'presentation',type:'system',state:'integrated',canonicalPath:'terraformer://presentation/graphics/',dependsOn:Object.freeze(['system.vector','system.vector-graphic']),governs:Object.freeze(['scene','primitive','raster-boundary','vector-boundary','render','projection'])});

const GRAPHICS_PROCESSING=Object.freeze({processingType:"VISUAL",preferredProcessor:"system.gpu",fallbackProcessor:"system.cpu",parallelism:"system.parallelism",concurrency:"system.concurrency",affinity:"system.affinity",conformity:"system.conformity",capabilityDetectionRequired:true,placementGuaranteed:false});


const RENDERING_REPRESENTATIONS=Object.freeze({preferred:"system.vector",fallback:"system.raster",selection:"capability-driven",sameForegroundBoundary:true});
module.exports=Object.freeze({RENDERING_REPRESENTATIONS,GRAPHICS_PROCESSING,TERRAFORMER_GRAPHICS_SYSTEM});

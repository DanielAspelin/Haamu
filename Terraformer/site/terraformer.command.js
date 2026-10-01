'use strict';
const TERRAFORMER_COMMAND_SYSTEM=Object.freeze({schema:'TERRAFORMER-COMMAND-SYSTEM/1',id:'system.command',name:'Command System',family:'computation',type:'command-system',state:'integrated',canonicalPath:'terraformer://command/',dependsOn:Object.freeze(['system.commandline']),rule:'Command System represents admitted commands; representation and parsing do not authorize effects.'});

module.exports=Object.freeze({TERRAFORMER_COMMAND_SYSTEM});

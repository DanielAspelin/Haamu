'use strict';
const TERRAFORMER_SHARING_SYSTEM=Object.freeze({schema:'TERRAFORMER-SHARING-SYSTEM/1',id:'system.sharing',name:'Sharing System',family:'exchange',type:'sharing-system',state:'integrated',canonicalPath:'terraformer://sharing/',dependsOn:Object.freeze(['system.resource','system.network','system.storage']),rule:'Sharing System represents explicitly admitted sharing intents; registration does not publish, transmit, expose, or persist content.'});
const TERRAFORMER_SHARING_AGENT=Object.freeze({schema:'TERRAFORMER-SHARING-AGENT/1',id:'agent.sharing',name:'Sharing Agent',family:'exchange',type:'sharing-agent',state:'integrated',canonicalPath:'terraformer://sharing/agent/',system:'system.sharing',rule:'Sharing Agent may prepare and mediate admitted sharing operations but cannot independently authorize recipients, transmission, publication, or persistence.'});

module.exports=Object.freeze({TERRAFORMER_SHARING_SYSTEM,TERRAFORMER_SHARING_AGENT});

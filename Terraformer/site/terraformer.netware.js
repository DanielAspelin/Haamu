'use strict';
const TERRAFORMER_NETWARE_SYSTEM=Object.freeze({schema:'TERRAFORMER-NETWARE-SYSTEM/1',id:'system.netware',name:'Netware System',family:'network',type:'netware-system',state:'integrated',canonicalPath:'terraformer://network/netware/',dependsOn:Object.freeze(['system.network', 'system.software']),governs:Object.freeze(['netware', 'identity', 'state', 'relation', 'evidence']),rule:'Netware System represents network-oriented software and service composition without implying Novell NetWare identity, network ownership, or administrative authority.'});

module.exports=Object.freeze({TERRAFORMER_NETWARE_SYSTEM});

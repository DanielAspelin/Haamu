'use strict';
const TERRAFORMER_RESOURCE_SYSTEM=Object.freeze({schema:'TERRAFORMER-RESOURCE-SYSTEM/1',id:'system.resource',name:'Resource System',family:'resource',type:'resource-system',state:'integrated',canonicalPath:'terraformer://resource/',governs:Object.freeze(['memory','processor','storage','network','device','time','capacity','budget','admission']),rule:'Resource System accounts and admits Terraformer resource use without claiming ownership of host resources.'});
const TERRAFORMER_RESOURCER=Object.freeze({schema:'TERRAFORMER-RESOURCER/1',id:'agent.resourcer',name:'Resourcer',family:'resource',type:'resource-agent',state:'integrated',canonicalPath:'terraformer://resource/resourcer/',system:'system.resource',rule:'Resourcer measures and proposes bounded resource allocations; allocation remains subject to Resource and Allocator admission.'});

const ASSET_SCHEMA='TERRAFORMER-ASSET/1';

const ASSET_STATES=Object.freeze(['available','allocated','maintenance','degraded','unavailable']);

module.exports=Object.freeze({TERRAFORMER_RESOURCE_SYSTEM,TERRAFORMER_RESOURCER,ASSET_SCHEMA,ASSET_STATES});

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const RESOURCE_ACTIONS = Object.freeze(['create','update','delete','no-op']);

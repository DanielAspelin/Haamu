"use strict";
const SYSTEM=Object.freeze({id:"system.external",concept:"External",authorityGranted:false,scaffold:true});
function bindExternalV04515(){return Object.freeze({SYSTEM});}
module.exports=Object.freeze({bindExternalV04515});

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const EXTERNAL_EFFECT_TYPES_V03012=Object.freeze({persistence:{mutates:true,persists:true,authorization:'explicit'},filesystem_read:{mutates:false,persists:false,authorization:'capability'},filesystem_write:{mutates:true,persists:true,authorization:'explicit'},block_read:{mutates:false,persists:false,authorization:'capability'},block_write:{mutates:true,persists:true,authorization:'explicit'},process_spawn:{mutates:true,persists:false,authorization:'capability'},process_signal:{mutates:true,persists:false,authorization:'controlled'},network_receive:{mutates:false,persists:false,authorization:'capability'},network_transmit:{mutates:true,persists:false,authorization:'controlled'},ipc_receive:{mutates:false,persists:false,authorization:'capability'},ipc_transmit:{mutates:true,persists:false,authorization:'controlled'},export:{mutates:true,persists:true,authorization:'explicit'},device_read:{mutates:false,persists:false,authorization:'capability'},device_write:{mutates:true,persists:true,authorization:'explicit'}});

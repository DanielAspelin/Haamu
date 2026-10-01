"use strict";
const TERRAFORMER_EFFECT_PIPELINE=Object.freeze({schema:'TERRAFORMER-EFFECT-PIPELINE/1',stages:Object.freeze(['request','authentication','authorization','condition','approval','action','operations','procedure','task','processing','response','evidence','history']),externalEffectGate:'authorization-and-applicable-approval',selfAuthorization:false,rule:'A represented request does not become an external effect until governing authentication, authorization, conditions, and applicable approval are satisfied.'});
module.exports=Object.freeze({TERRAFORMER_EFFECT_PIPELINE});

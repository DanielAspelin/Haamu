'use strict';
const TERRAFORMER_FORM_SYSTEM=Object.freeze({schema:'TERRAFORMER-UI-CONTROL-SYSTEM/1',id:'system.form',name:'Form System',parent:'system.customization',family:'presentation',input:'field set + admitted submit intent',output:'validated form result',capabilities:Object.freeze(['fields','group','validation','submit','reset','association','aria']),authority:'collect/validate only; submission effect requires owning operation authority'});

module.exports=Object.freeze({TERRAFORMER_FORM_SYSTEM});

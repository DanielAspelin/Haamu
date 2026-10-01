'use strict';
const TERRAFORMER_CUSTOMIZATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-CUSTOMIZATION-SYSTEM/1',id:'system.customization',name:'Customization System',family:'presentation',type:'presentation-customization',mode:'DOM-integrated',state:'integrated',input:'admitted customization intent',output:'bounded presentation customization',authority:'Presentation -> Customization System',subsystems:Object.freeze(['system.button','system.text-field','system.text-area','system.border','system.dialog','system.theme','system.color','system.visualization','system.field','system.form','system.snap','system.grid.presentation']),capabilities:Object.freeze(['theme','layout-token','control-style','typography','spacing','border','dialog-presentation','theme','color','visualization','field','form','snap','presentation-grid']),persistence:false});

/* v0.48.50 reconciliation:
   Extension systems remain identified by the canonical subsystem IDs above.
   The former depth-0 declaration referenced undeclared runtime bindings and
   was not exported or consumed.  Do not manufacture implicit dependencies. */
module.exports=Object.freeze({TERRAFORMER_CUSTOMIZATION_SYSTEM});

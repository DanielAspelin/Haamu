'use strict';
const TERRAFORMER_DIALOG_SYSTEM=Object.freeze({schema:'TERRAFORMER-UI-CONTROL-SYSTEM/1',id:'system.dialog',name:'Dialog System',parent:'system.customization',element:'dialog',input:'admitted dialog request',output:'modal or non-modal interaction result',capabilities:Object.freeze(['open','close','modal','non-modal','focus-containment','escape','aria','result']),authority:'presentation/interaction only; cannot manufacture operation authority'});

module.exports=Object.freeze({TERRAFORMER_DIALOG_SYSTEM});

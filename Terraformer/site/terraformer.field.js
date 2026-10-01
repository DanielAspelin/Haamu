'use strict';
const TERRAFORMER_FIELD_SYSTEM=Object.freeze({schema:'TERRAFORMER-UI-CONTROL-SYSTEM/1',id:'system.field',name:'Field System',parent:'system.customization',family:'presentation',input:'typed field definition/value',output:'validated field state',capabilities:Object.freeze(['type','label','value','constraint','validation','focus','association']),children:Object.freeze(['system.text-field','system.text-area']),credentialCustody:false});

const TERRAFORMER_TEXT_FIELD_SYSTEM=Object.freeze({schema:'TERRAFORMER-UI-CONTROL-SYSTEM/1',id:'system.text-field',name:'Text Field System',parent:'system.customization',element:'input',input:'single-line text',output:'validated text value',capabilities:Object.freeze(['value','placeholder','selection','focus','validation','autocomplete-policy','aria']),credentialCustody:false});

const TERRAFORMER_TEXT_AREA_SYSTEM=Object.freeze({schema:'TERRAFORMER-UI-CONTROL-SYSTEM/1',id:'system.text-area',name:'Text Area System',parent:'system.customization',element:'textarea',input:'multiline text',output:'validated multiline value',capabilities:Object.freeze(['value','placeholder','selection','focus','validation','resize-policy','aria']),credentialCustody:false});
const {TERRAFORMER_BORDER_SYSTEM}=require('./terraformer.border.js');
Object.assign(globalThis,{TERRAFORMER_BORDER_SYSTEM});
const {TERRAFORMER_DIALOG_SYSTEM}=require('./terraformer.dialog.js');
Object.assign(globalThis,{TERRAFORMER_DIALOG_SYSTEM});
const {TERRAFORMER_THEME_SYSTEM}=require('./terraformer.theme.js');
Object.assign(globalThis,{TERRAFORMER_THEME_SYSTEM});
const {TERRAFORMER_COLOR_SYSTEM}=require('./terraformer.color.js');
Object.assign(globalThis,{TERRAFORMER_COLOR_SYSTEM});
const {TERRAFORMER_VISUALIZATION_SYSTEM}=require('./terraformer.visualization.js');
Object.assign(globalThis,{TERRAFORMER_VISUALIZATION_SYSTEM});
Object.assign(globalThis,{TERRAFORMER_FIELD_SYSTEM});
const {TERRAFORMER_FORM_SYSTEM}=require('./terraformer.form.js');
Object.assign(globalThis,{TERRAFORMER_FORM_SYSTEM});
const {TERRAFORMER_SNAP_SYSTEM}=require('./terraformer.snap.js');
Object.assign(globalThis,{TERRAFORMER_SNAP_SYSTEM});

module.exports=Object.freeze({TERRAFORMER_FIELD_SYSTEM,TERRAFORMER_TEXT_FIELD_SYSTEM,TERRAFORMER_TEXT_AREA_SYSTEM});

'use strict';
const fs=require('fs'),path=require('path');
const ID='system.whatsapp.api',VERSION='0.44.10',BOUNDARY='SYSTEM_BOUNDARY';
function admit(x={}){if(x.providerCapability!==true)throw Error('WHATSAPP_PROVIDER_CAPABILITY_REQUIRED');if(x.credentialsPresent!==true)throw Error('WHATSAPP_CREDENTIALS_REQUIRED');if(x.sessionAuthorized!==true)throw Error('WHATSAPP_SESSION_REQUIRED');return Object.freeze({admitted:true,service:'whatsapp',authority:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,descriptor,admit});

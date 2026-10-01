'use strict';
const fs=require('fs'),path=require('path');
const ID='system.telegram.api',VERSION='0.44.10',BOUNDARY='SYSTEM_BOUNDARY';
function admit(x={}){if(x.providerCapability!==true)throw Error('TELEGRAM_PROVIDER_CAPABILITY_REQUIRED');if(x.credentialsPresent!==true)throw Error('TELEGRAM_CREDENTIALS_REQUIRED');if(x.sessionAuthorized!==true)throw Error('TELEGRAM_SESSION_REQUIRED');return Object.freeze({admitted:true,service:'telegram',authority:false});}
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:BOUNDARY,authority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
module.exports=Object.freeze({ID,VERSION,BOUNDARY,descriptor,admit});
